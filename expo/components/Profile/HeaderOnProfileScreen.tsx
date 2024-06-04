import React, { memo, useMemo } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"
import { FontAwesome6 } from "@expo/vector-icons"
import * as Linking from "expo-linking"
import * as Sharing from "expo-sharing"
import useCustomSafeAreaInsets from "@utils/useCustomSafeAreaInsets"
import { useAuthStore } from "@store/useAuthStore"
import { pixelFont, pixelHeight, pixelLetterSpacing, pixelSize, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
import Header from "@components/UI/Header"
import colors from "@utils/colors"
import RouteButton from "@components/UI/RouteButton"
import { HapticsTouch } from "@utils/haptics"
import * as Clipboard from "expo-clipboard"

const itunesItemId = 6478105854

interface HeaderComponentProps {
	enableSelection: boolean
	toggleSelection: () => void
}

const HeaderComponent = memo(({ enableSelection, toggleSelection }: HeaderComponentProps) => {
	const insets = useCustomSafeAreaInsets()
	const user = useAuthStore.getState().user

	const feedMail = useMemo(
		() => (uid: string, mail: string) => `Feedback:

==================
Leave this text below:
uid: ${uid}
mail address: ${mail}
==================`,
		[],
	)

	return (
		<View
			style={{
				marginTop: insets.top,
				marginBottom: pixelHeight(6),
				marginHorizontal: pixelWidth(2),
			}}
		>
			<Header
				LeftComponent={<Text style={styles.headerText}>Eizo</Text>}
				RightComponent={
					<TouchableOpacity
						onPress={() => {
							HapticsTouch()
							router.push("/screens/settings/")
						}}
					>
						<FontAwesome6 name="gear" size={18} color={colors.iconWhite} />
					</TouchableOpacity>
				}
			/>

			<View style={styles.buttonContainer}>
				<View style={styles.buttonRow}>
					<RouteButton
						onPress={() => {
							HapticsTouch()
							Linking.openURL(`https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`)
						}}
						text="Rate Us"
						icon={<FontAwesome6 name="star" size={pixelSize(16)} color={colors.iconWhite} />}
					/>
					<RouteButton
						onPress={() => {
							HapticsTouch()
							Sharing.shareAsync("https://apps.apple.com/app/id6478105854")
						}}
						text="Share App"
						icon={<FontAwesome6 name="share" size={pixelSize(16)} color={colors.iconWhite} />}
					/>
				</View>
				<View style={styles.buttonRow}>
					<RouteButton
						showArrow
						onPress={() => {
							HapticsTouch()
							Linking.openURL(`mailto:hello@eizo.ai?body=${feedMail(user?.user?.id, user?.user?.email!)}`).catch(
								async (e) => {
									//console.log(e, feedMail(user?.user?.id, user?.user?.email!))
									await Clipboard.setStringAsync(feedMail(user?.user?.id, user?.user?.email!))
									Alert.alert(
										"Feedback Text Copied",
										"The feedback text has been copied to the clipboard.",
										[{ text: "OK" }],
										{ cancelable: true },
									)
								},
							)
						}}
						text="Feedback"
						icon={<FontAwesome6 name="message" size={pixelSize(16)} color={colors.iconWhite} />}
					/>
				</View>
			</View>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<Text style={styles.recentText}>RECENT</Text>
				<TouchableOpacity
					onPress={toggleSelection}
					style={{
						position: "absolute",
						right: 10,
					}}
				>
					{!enableSelection ? (
						<Text style={styles.selectText}>Select</Text>
					) : (
						<Text
							style={[
								styles.recentText,
								{
									color: colors.upvote,
								},
							]}
						>
							Done
						</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	)
})

export default HeaderComponent

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: "center",
		flexDirection: "column",
		gap: pixelHeight(12),
		paddingTop: pixelHeight(12),
	},
	buttonRow: {
		flexDirection: "row",
		gap: pixelWidth(12),
	},
	container: {
		backgroundColor: colors.background,
		flex: 1,
	},
	headerText: {
		color: colors.textWhite,
		fontSize: pixelFont(20),
		fontWeight: "bold",
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
	recentItem: {
		aspectRatio: 1,
		width: (SCREEN_WIDTH - pixelWidth(24) - pixelSize(8)) / 3,
		// flex: 1,
		margin: pixelSize(1),
	},
	recentItemImage: {
		borderRadius: pixelSize(4),
		flex: 1,
		resizeMode: "cover",
	},
	recentText: {
		color: colors.primary,
		fontSize: pixelFont(14),
		letterSpacing: pixelLetterSpacing(1),
		marginBottom: pixelHeight(6),
		marginTop: pixelHeight(12),
		textAlign: "center",
	},
	selectText: {
		color: colors.primary,
		fontSize: pixelFont(12),
		marginBottom: pixelHeight(6),
		marginTop: pixelHeight(12),
		textAlign: "center",
	},
})
