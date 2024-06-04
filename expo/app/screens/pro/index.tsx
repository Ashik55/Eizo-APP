/* eslint-disable jsx-a11y/accessible-emoji */
// External imports
import { Stack, router } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { adapty } from "react-native-adapty"
import { LinearGradient } from "expo-linear-gradient"
import { AdaptyPaywallProduct } from "react-native-adapty/dist/types"

// Internal imports
import colors from "@utils/colors"
import { SCREEN_WIDTH, pixelFont, pixelHeight, pixelSize, pixelWidth, SCREEN_HEIGHT } from "@utils/pixels"
import { HapticsTouch } from "@utils/haptics"
import { useAuthStore } from "@store/useAuthStore"
import { useIsFocused } from "@react-navigation/native"
import ButtonWithGradient from "@components/UI/ButtonWithGradient"
import CloseButton from "@components/UI/CloseButton"
import UnderLineTextButton from "@components/UI/UnderLineTextButton"
import SubscriptionOptionButton from "@components/UI/SubscriptionOptionButton"
import { SubscriptionContext } from "@context/SubscriptionContext"
import PROJECTKEYS from "@shared/constants/Keys"

const Index = () => {
	const [products, setProducts] = useState<AdaptyPaywallProduct[]>([])
	const [active, setActive] = useState(0)
	const user = useAuthStore().user
	const isFocused = useIsFocused()
	const [purchasing, setPurchasing] = useState(false)
	const { subscription, loading, refetchSubscriptionStatus } = useContext(SubscriptionContext)

	useEffect(() => {
		if (!user?.access_token) {
			router.push("/screens/account/login")
		}
	}, [user, isFocused])

	const getPayWalls = async () => {
		const locale = "en"
		const id = PROJECTKEYS.ADAPTY_PLACEMENT_ID
		try {
			const paywall = await adapty.getPaywall(id, locale)
			try {
				const products = await adapty.getPaywallProducts(paywall)
				setProducts(products)
			} catch (error) {
				Alert.alert("Error", "Failed to get products")
				console.log(error)
			}
		} catch (error) {
			console.log(error)
		}
	}
	const onPressContinue = async () => {
		try {
			HapticsTouch()
			setPurchasing(true)
			await adapty.makePurchase(products[active])
			await refetchSubscriptionStatus()
			setTimeout(() => {
				subscription && router.back()
			}, 3000)
		} catch (e) {
			console.log(e)
		} finally {
			setPurchasing(false)
		}
	}

	useEffect(() => {
		getPayWalls()
	}, [])

	return (
		<View style={styles.proPageWrapper}>
			<Stack.Screen
				options={{
					headerShown: false,
					animation: "slide_from_bottom",
				}}
			/>

			<View style={styles.proImageBackground}>
				<LinearGradient
					colors={[colors.transparent, colors.black]}
					style={styles.gradient}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
				/>
				<Image
					source={require("../../../assets/images/smile.jpg")}
					style={styles.proBackgroundImage}
					resizeMode={"contain"}
				/>
			</View>

			<View style={styles.fullScreenContainer}>
				<SafeAreaView style={styles.flexOne}>
					<CloseButton
						style={styles.closeButton}
						onPress={() => {
							HapticsTouch()
							router.back()
						}}
						iconSize={12}
						disabled={loading || purchasing}
					/>

					{purchasing && (
						<Pressable onPress={() => {}} style={styles.loadingBackground}>
							<ActivityIndicator size="large" color={colors.upvote} />
						</Pressable>
					)}

					{!loading && (
						<>
							{subscription ? (
								<>
									<View style={styles.flexOne} />
									<Text style={styles.alreadySubscribedText}>You already have a subscription 🎉</Text>
									<Text style={styles.validTillText}>Valid till {new Date(subscription.expiresAt).toDateString()}</Text>
									<ButtonWithGradient
										buttonStyle={{
											width: SCREEN_WIDTH - pixelWidth(24),
											height: pixelHeight(56),
											marginTop: pixelHeight(16),
										}}
										buttonText={"Go Back"}
										onPress={() => {
											HapticsTouch()
											router.back()
										}}
									/>
								</>
							) : (
								<View style={styles.optionButtonsContainer}>
									<View>
										<Text style={styles.listText}>✅ Unlimited Creations</Text>
										<Text style={styles.listText}>✅ Remove All Ads</Text>
										<Text style={styles.listText}>✅ Multiple Results</Text>
										<Text style={styles.listText}>✅ Get 10,000 Monthly Coins</Text>
									</View>
									{products &&
										products?.map((product, index) => {
											return (
												<SubscriptionOptionButton
													key={index}
													product={product}
													onPress={() => {
														HapticsTouch()
														setActive(index)
													}}
													active={active}
													index={index}
												/>
											)
										})}

									<ButtonWithGradient
										onPress={onPressContinue}
										buttonStyle={{
											width: SCREEN_WIDTH - pixelWidth(24),
											height: pixelHeight(56),
											marginTop: pixelHeight(16),
										}}
										buttonText={"Continue"}
									/>
								</View>
							)}
						</>
					)}
					<View>
						{!subscription && (
							<Text style={styles.cancelAnyTimeText}>You can cancel your subscription at any time.</Text>
						)}
						<View style={styles.tocppContainer}>
							<UnderLineTextButton
								text="Terms of Service"
								onPress={() => {
									HapticsTouch()
									router.push({
										pathname: "/screens/pages/",
										params: {
											url: "https://alphabyte.notion.site/Terms-of-Service-83697b0670e14eea8c3f7c15eed64b56?pvs=4",
											headerText: "Terms of Service",
										},
									})
								}}
							/>
							<UnderLineTextButton
								text="Privacy Policy"
								onPress={() => {
									HapticsTouch()
									router.push({
										pathname: "/screens/pages/",
										params: {
											url: "https://alphabyte.notion.site/Privacy-Policy-Eizo-ai-83697b0670e14eea8c3f7c15eed64b56?pvs=4",
											headerText: "Privacy Policy",
										},
									})
								}}
							/>
						</View>
					</View>
				</SafeAreaView>
			</View>
		</View>
	)
}

export default Index

const styles = StyleSheet.create({
	proPageWrapper: {
		flex: 1,
		position: "relative",
		backgroundColor: colors.background,
	},
	proImageBackground: {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
	},
	proBackgroundImage: {
		width: SCREEN_WIDTH,
		height: (SCREEN_WIDTH * 1872) / 1528,
	},

	flexOne: {
		flex: 1,
	},
	tocppContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginTop: pixelHeight(40),
		marginBottom: pixelHeight(12),
	},
	cancelAnyTimeText: {
		color: colors.textWhite,
		fontSize: pixelFont(10),
		textAlign: "center",
	},

	optionButtonsContainer: {
		flex: 1,
		width: SCREEN_WIDTH,
		alignItems: "center",
		justifyContent: "flex-end",
		marginBottom: pixelHeight(20),
	},
	loadingBackground: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: colors.black50Alpha,
		zIndex: 1000,
		justifyContent: "center",
		alignItems: "center",
	},
	closeButton: {
		height: pixelSize(40),
		width: pixelSize(40),
		justifyContent: "center",
		alignItems: "center",
		marginLeft: pixelWidth(12),
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.5,
		shadowRadius: pixelSize(4),
	},

	alreadySubscribedText: {
		color: colors.textWhite,
		fontSize: pixelFont(16),
		textAlign: "center",
		fontWeight: "600",
	},
	validTillText: {
		color: colors.textWhite,
		fontSize: pixelFont(14),
		textAlign: "center",
		fontWeight: "600",
		marginTop: pixelHeight(8),
	},
	fullScreenContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
	},
	listText: {
		color: colors.textWhite,
		fontSize: pixelFont(14),
		fontWeight: "600",
		letterSpacing: 0.2,
		textAlign: "left",
		marginBottom: pixelHeight(4),
	},
	gradient: {
		height: pixelHeight(300),
		width: SCREEN_WIDTH,
		justifyContent: "center",
		position: "absolute",
		bottom: 0,
		zIndex: 1000,
	},
})
