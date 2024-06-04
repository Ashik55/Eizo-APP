/* eslint-disable jsx-a11y/accessible-emoji */
// External imports
import { router, Stack } from "expo-router"
import React, { useContext, useEffect } from "react"
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { useIsFocused } from "@react-navigation/native"

// Internal imports
import { HapticsTouch } from "@utils/haptics"
import { useAuthStore } from "@store/useAuthStore"
import { pixelFont, pixelHeight, pixelSize, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
import ButtonWithGradient from "@components/UI/ButtonWithGradient"
import colors from "@utils/colors"
import Header from "@components/UI/Header"
import BackButton from "@components/UI/BackButton"
import { CreditsButton } from "@components/UI/CreditButton"
import { CreditsContext } from "@context/CreditsContext"
import { NotificationsContext } from "@context/NotificationContext"
import { SubscriptionContext } from "@context/SubscriptionContext"

const Index = () => {
	const { credits } = useContext(CreditsContext)
	const user = useAuthStore().user
	const isFocused = useIsFocused()
	const { shouldGetRewards, handleClaimReward } = useContext(NotificationsContext)
	const { subscription } = useContext(SubscriptionContext)

	useEffect(() => {
		if (!user?.access_token) {
			router.push("/screens/account/login")
		}
	}, [user, isFocused])

	return (
		<View style={styles.creditPageWrapper}>
			<Stack.Screen
				options={{
					headerShown: false,
					animation: "slide_from_bottom",
				}}
			/>
			<SafeAreaView style={styles.safeAreaViewStyle}>
				<Header
					LeftComponent={<BackButton style={styles.backButton} />}
					RightComponent={<CreditsButton credits={credits} style={styles.creditButton} disabled={true} />}
				/>

				{shouldGetRewards && (
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Daily Reward</Text>
						<View style={styles.modalSmallTextContainer}>
							<Text style={styles.modalSmallText}>
								You can get free coins everyday! {"\n"}Let&apos;s splash your infinite creativity now!
							</Text>
						</View>
						<ButtonWithGradient
							onPress={handleClaimReward}
							buttonText={"🤑 Claim 200 🤑"}
							buttonStyle={styles.gradientButtonStyle}
							textStyle={styles.gradientButtonTextStyle}
						/>
					</View>
				)}

				{!subscription && (
					<View style={styles.modalView}>
						<Image source={require("../../../assets/images/ai_artist.png")} style={styles.stickerImage} />
						<Text style={styles.modalText}>Join Pro</Text>
						<View style={styles.modalSmallTextContainer}>
							<Text style={styles.modalSmallText}>🚀 Unlimited Creations</Text>
							<Text style={styles.modalSmallText}>🎉 Remove All Ads</Text>
							<Text style={styles.modalSmallText}>📸 Multiple Results</Text>
							<Text style={styles.modalSmallText}>💰 Get 10,000 Monthly Coins</Text>
						</View>

						<ButtonWithGradient
							onPress={() => {
								HapticsTouch()
								router.push("/screens/pro/")
							}}
							buttonText={"Join Now\n$9.99 / Month"}
							textStyle={styles.gradientButtonTextStyle}
							buttonStyle={styles.gradientButtonStyle}
						/>
					</View>
				)}
			</SafeAreaView>
		</View>
	)
}

export default Index

const styles = StyleSheet.create({
	creditButton: { marginRight: pixelWidth(12) },
	gradientButtonStyle: {
		width: "100%",
	},
	gradientButtonTextStyle: {
		fontSize: pixelFont(15),
		fontWeight: "700",
	},
	backButton: { marginLeft: pixelWidth(12) },
	creditPageWrapper: {
		flex: 1,
		backgroundColor: colors.background,
	},
	safeAreaViewStyle: {
		flex: 1,
		alignItems: "center",
	},
	stickerImage: {
		position: "absolute",
		right: pixelWidth(12),
		top: pixelHeight(12),
		height: pixelSize(120),
		width: pixelSize(120),
		shadowColor: colors.upvote,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.5,
		shadowRadius: pixelWidth(4),
	},
	modalSmallText: {
		color: colors.textWhiteGray,
		fontSize: pixelFont(14),
		fontWeight: "600",
		letterSpacing: 0.1,
	},
	modalSmallTextContainer: {
		marginVertical: pixelHeight(16),
		gap: pixelHeight(8),
	},
	modalText: {
		color: colors.textWhite,
		fontSize: pixelFont(20),
		fontWeight: "700",
	},
	modalView: {
		backgroundColor: colors.backgroundSecondary,
		borderRadius: pixelSize(8),
		elevation: pixelSize(8),
		marginTop: pixelHeight(12),
		padding: pixelSize(12),
		position: "relative",
		shadowColor: colors.background,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: pixelSize(4),
		width: SCREEN_WIDTH - pixelWidth(24),
	},
})
