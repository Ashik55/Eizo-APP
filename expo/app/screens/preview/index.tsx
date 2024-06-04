import React, { useEffect } from "react"
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Image } from "expo-image"
import { SafeAreaView } from "react-native-safe-area-context"
import { pixelFont, pixelHeight, pixelSize, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
import colors from "@utils/colors"
import Header from "@components/UI/Header"
import { HapticsTouch } from "@utils/haptics"
import { Stack, useRouter } from "expo-router"
import { blurhashes } from "@utils/blurhashes"
import useCustomSafeAreaInsets from "@utils/useCustomSafeAreaInsets"
import useApi from "@api/request"
import BackButton from "@components/UI/BackButton"
import { TopToBottomBlackGradient } from "@components/UI/TopToBottomBlackGradient"
import { BottomToTopBlackGradient } from "@components/UI/BottomToTopBlackGradient"
import { MenuButton } from "@components/UI/IconButtons"
import usePreviewStore from "@store/previewStore"
import * as Clipboard from "expo-clipboard"
import ButtonWithGradient from "@components/UI/ButtonWithGradient"
import PreviewScreenMenuModal from "@components/UI/PreviewScreenMenuModal"
import ImageStyle from "@components/UI/ImageStyle"
import { usePromptStore } from "@store/promptStore"
import { convertSelectedCategoryAndPromptItem, findSelectedPromptItems } from "@utils/utils"
import { AspectRatioKeys, AspectRatios } from "@utils/aspectRatios"

function getAspectDimensions(aspectRatio: string, screenWidth: number): { aspectWidth: number; aspectHeight: number } {
	const [width, height] = aspectRatio.split(":").map(Number)
	const aspectWidth = screenWidth
	const aspectHeight = screenWidth * (height / width)
	return { aspectWidth, aspectHeight }
}

const PreviewScreen = () => {
	const router = useRouter()
	const { guiPromptList, usedPromptItemsOnPreview, addSelectedGuiPromptObjects, setUsedPromptItemsOnPreview } =
		usePromptStore()
	const { promptData } = usePreviewStore()
	const imageUrl = promptData?.uploadedImageUrls?.[0] ?? undefined
	const selectedAspectRatio = promptData?.guiPrompts?.selectedRatio || "1:1"
	const nickname = promptData?.user?.nickname
	const profileImageUrl = promptData?.user?.profileImageUrl ?? undefined
	const textPrompt = promptData?.textPrompt
	const selectedCategoryAndPromptItem = promptData?.guiPrompts?.selectedCategoryAndPromptItem

	const {
		setTextPrompt,
		// textPrompt,
		// setTextPrompt,
		// selectedGuiPromptObject,
		// updateSelectedGuiPromptObject,
		// guiPromptList,
		// setGuiPromptList,
		// removeSelectedGuiPromptObject,
		// selectedRatio,
		updateSelectedGuiPromptObject,
		setSelectedRatio,
		// setPromptData,
		// showAllPrompts,
	} = usePromptStore()

	const [showMenus, setShowMenus] = React.useState(false)
	const insets = useCustomSafeAreaInsets()
	const { reportUser } = useApi()

	useEffect(() => {
		if (promptData) {
			// @ts-ignore
			const promptItems = findSelectedPromptItems(promptData.guiPrompts.selectedCategoryAndPromptItem, guiPromptList)
			setUsedPromptItemsOnPreview(promptItems)
		}
	}, [promptData])

	const handleMenuClose = () => {
		HapticsTouch()
		setShowMenus(false)
	}

	const { aspectWidth, aspectHeight } = getAspectDimensions(selectedAspectRatio, SCREEN_WIDTH)

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false, animation: "slide_from_bottom" }} />
			<SafeAreaView edges={["top"]} style={{ flex: 1 }}>
				<View style={[styles.headerContainer, { top: insets.top }]}>
					<TopToBottomBlackGradient height={pixelHeight(48)} />

					<Header
						headerStyle={{ position: "absolute" }}
						LeftComponent={<BackButton style={styles.backButton} isXmark={true} />}
						RightComponent={
							<MenuButton
								onPress={() => {
									HapticsTouch()
									setShowMenus(true)
								}}
							/>
						}
					/>
				</View>

				{/* <View style={{ marginTop: pixelHeight(12) }} /> */}
				<ScrollView
					style={{ flex: 1 }}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: pixelHeight(120) }}
				>
					<View>
						<Image
							placeholder={blurhashes()}
							source={{ uri: imageUrl }}
							style={[
								styles.imageBackground,
								{
									height: aspectHeight,
								},
							]}
							transition={500}
						/>
						<View
							style={{
								position: "absolute",
								height: aspectHeight,
								width: SCREEN_WIDTH,
								bottom: 0,
							}}
						>
							<View style={styles.postInfoContainer}>
								<BottomToTopBlackGradient height={pixelHeight(48)} />
								<View style={styles.bottomShadowArea}>
									<View style={styles.userInfoContainer}>
										<Image
											placeholder={blurhashes()}
											source={{ uri: profileImageUrl }}
											style={styles.userProfileImage}
											transition={500}
										/>
										<Text style={styles.userNameText}>{nickname}</Text>
									</View>
								</View>
							</View>
						</View>
					</View>

					<TouchableOpacity
						onLongPress={async () => {
							HapticsTouch()
							await Clipboard.setStringAsync("hello world")
							Alert.alert("", "Prompt is copied to clipboard!")
						}}
						style={styles.promptTextContainer}
					>
						<Text style={styles.promptText}>{textPrompt}</Text>
					</TouchableOpacity>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{
							marginTop: pixelHeight(8),
						}}
					>
						<View style={styles.modelListContainer}>
							{usedPromptItemsOnPreview?.map((promptItem, index) => (
								<View key={index} style={{}}>
									<ImageStyle
										key={promptItem.imageUrl}
										imageUrl={promptItem.imageUrl}
										categoryId={promptItem?.categoryId}
										forGridView={true}
										name={promptItem?.name}
										onPress={() => {
											HapticsTouch()
										}}
									/>
								</View>
							))}
						</View>
					</ScrollView>
				</ScrollView>

				<View style={[styles.tryThisPromptButton, { bottom: insets.bottom + pixelHeight(20) }]}>
					<ButtonWithGradient
						onPress={() => {
							HapticsTouch()
							if (selectedCategoryAndPromptItem) {
								const selectedGuiPrompts = convertSelectedCategoryAndPromptItem(
									selectedCategoryAndPromptItem,
									guiPromptList,
								)
								console.log("aaaaa", JSON.stringify(selectedGuiPrompts, null, 2))
								addSelectedGuiPromptObjects(selectedGuiPrompts)
							}

							// console.log("ta", JSON.stringify(promptData, null, 2))
							setTextPrompt(textPrompt ?? "")
							setSelectedRatio(selectedAspectRatio as AspectRatioKeys)
							// updateSelectedGuiPromptObject(promptData?.guiPrompts?.selectedCategoryAndPromptItem)
							router.push({ pathname: "/screens/create/" })
						}}
						buttonText={"Try this prompt"}
					/>
				</View>
			</SafeAreaView>
			{promptData ? (
				<PreviewScreenMenuModal
					showMenus={showMenus}
					onClose={handleMenuClose}
					promptData={promptData}
					reportUser={reportUser}
				/>
			) : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		flex: 1,
	},
	headerContainer: {
		position: "absolute",
		zIndex: 100,
	},
	imageBackground: {
		alignSelf: "center",
		marginTop: pixelSize(12),
		overflow: "hidden",
		position: "relative",
		width: SCREEN_WIDTH,
	},
	modelListContainer: {
		flexDirection: "row",
		marginHorizontal: pixelWidth(12),
		gap: pixelWidth(8),
	},
	promptText: {
		color: colors.textWhite,
		fontSize: pixelFont(18),
		fontWeight: "500",
	},
	promptTextContainer: {
		marginHorizontal: pixelSize(12),
		marginVertical: pixelSize(12),
	},
	tryThisPromptButton: {
		justifyContent: "center",
		position: "absolute",
		shadowColor: colors.upvote,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.7,
		shadowRadius: pixelSize(4),
		width: "100%",
		zIndex: 100,
	},
	userInfoContainer: {
		alignItems: "center",
		flexDirection: "row",
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.4,
		shadowRadius: pixelSize(2),
	},
	userNameText: {
		color: colors.textWhite,
		fontSize: pixelFont(16),
		fontWeight: "600",
		marginHorizontal: pixelSize(6),
	},
	userProfileImage: {
		borderRadius: pixelWidth(10),
		height: pixelWidth(20),
		width: pixelWidth(20),
	},
	backButton: {
		paddingVertical: pixelSize(12),
		paddingHorizontal: pixelSize(16),
	},
	postInfoContainer: {
		position: "absolute",
		bottom: 0,
		width: SCREEN_WIDTH,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomShadowArea: {
		alignItems: "center",
		flexDirection: "row",
		left: pixelSize(12),
		position: "absolute",
		justifyContent: "space-between",
		width: SCREEN_WIDTH - pixelWidth(24),
	},
})

export default PreviewScreen
