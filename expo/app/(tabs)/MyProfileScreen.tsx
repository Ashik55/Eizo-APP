import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native"
import { router, Stack } from "expo-router"

import { useIsFocused } from "@react-navigation/native"
import { useAuthStore } from "@store/useAuthStore"
import { pixelFont, pixelHeight, pixelWidth } from "@utils/pixels"
import colors from "@utils/colors"
import HeaderOnProfileScreen from "@components/Profile/HeaderOnProfileScreen"
import useApi from "@api/request"
import RecentItem from "@components/Profile/RecentItem"
import { PromptData } from "@shared/schemas"
import { supabase } from "@libs/supabase"

export default function MyProfileScreen() {
	const [recent, setRecent] = useState<PromptData[]>([])
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [enableSelection, toggleSelection] = React.useReducer((prevState: boolean) => !prevState, false)
	const user = useAuthStore.getState().user
	const userId = user?.user?.id
	const isFocused = useIsFocused()
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(false)
	const { getRecentPrompts } = useApi()

	useEffect(() => {
		getRecents(1)
	}, [])

	useEffect(() => {
		if (!userId) {
			// @ts-ignore
			router.push("/screens/account/login?redirect=/home")
		}
	}, [user, isFocused])

	const getRecents = useCallback(
		async (newPage: number) => {
			try {
				console.log("getRecents from api userId", userId, "newPage", newPage)
				if (userId) {
					setIsLoading(true)
					const response = await getRecentPrompts(userId, 15, newPage)
					if (response.ok) {
						if (response.data) {
							const { prompts, hasMore } = response.data
							if (prompts && hasMore !== undefined) {
								setRecent((prevRecent) => (newPage === 1 ? prompts : [...prevRecent, ...prompts]))
								setHasMore(hasMore)
								setPage(newPage)
							} else {
								console.error("Error: prompts or hasMore is undefined")
							}
						} else {
							console.error("Error: response.data is undefined")
						}
					} else {
						console.error("Error fetching recent prompts:", response.error)
					}
					setIsLoading(false)
				}
			} catch (error) {
				console.error("Error fetching recent prompts:", error)
			}
		},
		[user?.user?.id],
	)

	const handleLoadMore = useCallback(() => {
		if (hasMore) {
			getRecents(page + 1)
		}
	}, [hasMore, page])

	function onItemDelete(promptData: PromptData) {
		Alert.alert("Delete", "Are you sure you want to delete this?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Delete",
				onPress: async () => {
					try {
						setRecent((prevRecent) => prevRecent.filter((e) => e.id !== promptData.id))
						console.log("promptData.id", promptData.id)
						console.log("user_id", userId)
						var resp = await supabase.from("prompts").delete().eq("id", promptData.id).eq("user_id", userId)
						console.log(resp)
					} catch (error) {
						console.error("Error deleting prompt:", error)
					}
				},
			},
		])
	}

	const renderItem = useCallback(
		({ item }: { item: PromptData }) => (
			// eslint-disable-next-line react/jsx-no-undef
			<RecentItem
				promptData={item}
				enableSelection={enableSelection}
				onItemDelete={onItemDelete}
				// getRecents={getRecents}
				// setRecent={setRecent}
			/>
		),
		[enableSelection, getRecents],
	)

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: false,
					animation: "slide_from_bottom",
					gestureEnabled: false,
					fullScreenGestureEnabled: false,
				}}
			/>
			<View style={styles.mainContainer}>
				<View style={styles.recentContainer}>
					<FlatList
						ListHeaderComponent={
							<HeaderOnProfileScreen enableSelection={enableSelection} toggleSelection={toggleSelection} />
						}
						contentContainerStyle={{
							marginHorizontal: pixelWidth(12),
							paddingBottom: 100,
						}}
						showsVerticalScrollIndicator={false}
						onEndReached={handleLoadMore}
						onEndReachedThreshold={0.1}
						ListFooterComponent={() =>
							hasMore ? (
								<View style={styles.loadingContainer}>
									<ActivityIndicator size="small" color={colors.upvote} />
								</View>
							) : null
						}
						refreshControl={
							<RefreshControl
								colors={[colors.upvote]}
								tintColor={colors.upvote}
								refreshing={isRefreshing}
								onRefresh={async () => {
									setIsRefreshing(true)
									await getRecents(1)
									setIsRefreshing(false)
								}}
							/>
						}
						data={recent}
						numColumns={3}
						ListEmptyComponent={() => {
							if (isLoading)
								return (
									<View style={styles.loadingContainer}>
										<ActivityIndicator size="small" color={colors.upvote} />
									</View>
								)
							if (isRefreshing) return null
							return (
								<View style={styles.noRecentContainer}>
									<Text style={styles.noRecentText}>No images have been generated yet 😜</Text>
								</View>
							)
						}}
						renderItem={renderItem}
						keyExtractor={(item) => item.id.toString()}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		flex: 1,
	},
	mainContainer: {
		flex: 1,
	},
	noRecentContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		marginTop: pixelHeight(160),
	},
	noRecentText: {
		color: colors.primary,
		fontSize: pixelFont(18),
		marginTop: 5,
		textAlign: "center",
	},
	recentContainer: {
		flex: 1,
	},
	loadingContainer: {
		marginVertical: pixelHeight(16),
		alignItems: "center",
	},
})
