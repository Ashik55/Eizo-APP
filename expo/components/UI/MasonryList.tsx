import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"
import MasonryList from "@react-native-seoul/masonry-list"
import { pixelFont, pixelHeight, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
import useCustomSafeAreaInsets from "@utils/useCustomSafeAreaInsets"
import colors from "@utils/colors"
import { blurhashes } from "@utils/blurhashes"
import { Image } from "expo-image"
import useThrottle from "@hooks/useThrottle"
import useApi from "@api/request"
import usePreviewStore from "@store/previewStore"
import { PromptData } from "@shared/schemas"
import { usePromptStore } from "@store/promptStore"
import { HapticsTouch } from "@utils/haptics"
import { router } from "expo-router"
import { getImageHeight } from "@utils/utils"

const IMAGE_MARGIN = 12

const columnWidth = SCREEN_WIDTH / 2 - pixelWidth(IMAGE_MARGIN)

const RenderItem: React.FC<{
	prompt: PromptData
	index: number
}> = ({ prompt, index }) => {
	const { setPromptData } = usePreviewStore()
	const uploadedImageUrls = prompt.uploadedImageUrls
	const aspectRatio = prompt.guiPrompts.selectedRatio
	const imageUrl = uploadedImageUrls?.[0]
	const profileImageUrl = prompt?.user?.profileImageUrl ?? undefined
	const nickname = prompt?.user?.nickname
	const publicStatus = prompt.public
	const { updatePublicStatus } = useApi()
	const { showAllPrompts } = usePromptStore()

	const handlePress = useCallback(async () => {
		HapticsTouch()
		setPromptData(prompt)
		router.push({ pathname: "/screens/preview/" })
	}, [setPromptData])

	return (
		<TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
			<View>
				<Image
					style={[styles.image, { height: getImageHeight(aspectRatio, columnWidth) }]}
					source={{ uri: imageUrl }}
					placeholder={blurhashes()}
					contentFit="cover"
					transition={500}
				/>
				{showAllPrompts && (
					<Switch
						style={{
							transform: [{ scale: 0.5 }],
							position: "absolute",
						}}
						trackColor={{ false: "#767577", true: "#81b0ff" }}
						thumbColor={publicStatus ? "#f5dd4b" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={() => {
							updatePublicStatus(prompt.id, !publicStatus)
						}}
						value={publicStatus}
					/>
				)}
			</View>
			<View style={styles.contentInfoContainer}>
				<View style={styles.contentInfoContainerLeft}>
					<Image
						style={styles.userProfileImage}
						source={{ uri: profileImageUrl }}
						placeholder={blurhashes()}
						contentFit="cover"
						transition={500}
					/>
					<Text style={styles.useNameText}>{nickname}</Text>
				</View>
				<View style={styles.useButton}>
					<Text style={styles.useButtonText}>Try</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const MyMasonryList: React.FC = () => {
	const insets = useCustomSafeAreaInsets()
	const [prompts, setPrompts] = useState<PromptData[]>([])
	const [curPage, setCurPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const loadMoreThrottled = useThrottle()
	const { getPrompts } = useApi()
	// const [hasMore, setHasMore] = useState(true)
	const { showAllPrompts, hasMore, setHasMore } = usePromptStore()

	const fetchPrompts = async (page: number) => {
		try {
			setIsLoading(true)

			console.log("showAllPrompts", showAllPrompts)

			const res = await getPrompts({
				page,
				limit: 10,
				userId: undefined,
				isAll: showAllPrompts,
			})
			if (!res.ok) throw new Error(res.message)

			const prompts = res.data.prompts

			setPrompts((prev) => (page === 1 ? prompts : [...prev, ...prompts]))
			setCurPage(page + 1)

			if (prompts.length < 10) {
				setHasMore(false)
			}
		} catch (error) {
			console.error("Error fetching posts:", error)
		} finally {
			setIsLoading(false)
		}
	}

	const throttledFunction = () => {
		if (!isLoading && hasMore) {
			fetchPrompts(curPage)
		}
	}

	const loadMoreItem = () => {
		loadMoreThrottled(throttledFunction, 1000)
	}

	const onRefresh = async () => {
		await fetchPrompts(1)
	}

	useEffect(() => {
		fetchPrompts(1)
	}, [])

	return (
		<>
			{prompts.length > 0 && (
				<MasonryList
					onEndReached={loadMoreItem}
					onEndReachedThreshold={0.1}
					ListFooterComponent={
						isLoading ? (
							<View style={styles.loadingContainer}>
								<ActivityIndicator size="large" color="#aaa" />
							</View>
						) : null
					}
					style={{
						marginTop: insets.top + pixelHeight(52),
						marginHorizontal: pixelWidth(IMAGE_MARGIN / 2),
					}}
					data={prompts}
					contentContainerStyle={styles.contentContainer}
					renderItem={
						({ item, i }) => <RenderItem prompt={item as PromptData} index={i} />
						// <RenderItem prompt={item as PromptData} index={i} />
					}
					keyExtractor={(item) => item.promptId}
					numColumns={2}
					refreshing={isLoading && curPage === 1}
					onRefresh={onRefresh}
				/>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	contentContainer: {
		paddingBottom: 100,
	},
	contentInfoContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: pixelHeight(IMAGE_MARGIN / 2),
	},
	contentInfoContainerLeft: {
		alignItems: "center",
		flexDirection: "row",
	},
	image: {
		borderRadius: 8,
		width: "100%",
	},
	itemContainer: {
		marginBottom: pixelWidth(IMAGE_MARGIN),
		marginHorizontal: pixelWidth(5),
		overflow: "hidden",
	},
	loadingContainer: {
		alignItems: "center",
		marginVertical: 16,
	},
	useButton: {
		borderColor: colors.upvote,
		borderRadius: 20,
		borderWidth: 1,
	},
	useButtonText: {
		color: colors.upvote,
		fontSize: pixelFont(10),
		fontWeight: "bold",
		paddingHorizontal: pixelWidth(6),
		paddingVertical: pixelHeight(3),
	},
	useNameText: {
		color: colors.primary,
		fontSize: pixelFont(12),
		fontWeight: "bold",
	},
	userProfileImage: {
		borderRadius: pixelWidth(8),
		height: pixelWidth(16),
		marginRight: pixelWidth(4),
		width: pixelWidth(16),
	},
})

export default MyMasonryList
