import { AntDesign } from "@expo/vector-icons"
import * as AppleAuthentication from "expo-apple-authentication"
import * as Google from "expo-auth-session/providers/google"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { router, Stack, useLocalSearchParams } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import React, { useEffect, useState } from "react"
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { showMessage } from "react-native-flash-message"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { SafeAreaView } from "react-native-safe-area-context"
import BackButton from "@components/UI/BackButton"
import ButtonDefault from "@components/UI/ButtonDefault"
import Header from "@components/UI/Header"
import LoadingOverlay from "@components/UI/LoadingOverlay"
import SwInput from "@components/UI/SwInput"
import addUserToDatabase from "@functions/addUserToDatabase"
import { supabase } from "@libs/supabase"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"
import { pixelFont, pixelHeight, pixelSize, pixelWidth, SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils/pixels"

//TODO Rayhan fix inline styles
WebBrowser.maybeCompleteAuthSession()
const WelcomeScreen = () => {
	const { redirect } = useLocalSearchParams<{
		redirect: `${string}:${string}`
	}>()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const [isKeyboardVisible, setKeyboardVisible] = useState(false)
	const [isSignUp, setIsSignUp] = useState(true)

	const [_, response, promptAsync] = Google.useAuthRequest({
		iosClientId: "414281175059-89qhe2mk9evnebduf244j347h2cuoa6u.apps.googleusercontent.com",
	})

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardVisible(true) // or some other action
		})
		const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardVisible(false) // or some other action
		})

		return () => {
			keyboardDidHideListener.remove()
			keyboardDidShowListener.remove()
		}
	}, [])

	useEffect(() => {
		if (response?.type === "success") {
			const { id_token } = response.params
			handleGoogleSignIn(id_token)
		}
	}, [response])

	async function signInWithEmail() {
		try {
			HapticsTouch()
			setLoading(true)
			const { error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			})

			if (error) {
				throw new Error(error.message)
			}

			const res = await supabase.auth.getUser()

			if (res.data?.user) {
				const user = {
					id: res.data.user?.id,
					nickName: res?.data?.user?.user_metadata?.full_name,
					profileImage: res?.data?.user?.user_metadata?.avatar_url,
				}

				await addUserToDatabase(user)
			}

			if (redirect) {
				router.push({
					pathname: redirect,
					params: {
						redirect: "/screens/account/login",
					},
				})
			} else {
				router.push("/(tabs)/")
			}
		} catch (error) {
			if (error instanceof Error) {
				showMessage({
					message: error.message,
					type: "danger",
				})
			} else {
				console.error("An unknown error occurred:", error)
				showMessage({
					message: "An unknown error occurred. Please try again later.",
					type: "danger",
				})
			}
		} finally {
			setLoading(false)
		}
	}

	const handleGoogleSignIn = async (idToken: string) => {
		try {
			HapticsTouch()
			const { error } = await supabase.auth.signInWithIdToken({
				provider: "google",
				token: idToken,
			})

			if (error) {
				throw error
			} else {
				const res = await supabase.auth.getUser()

				if (res.data?.user) {
					const user = {
						id: res.data.user?.id,
						nickName: res?.data?.user?.user_metadata?.full_name,
						profileImage: res?.data?.user?.user_metadata?.avatar_url,
					}
					console.log(user)

					await addUserToDatabase(user)
				}

				if (redirect) {
					router.push({
						pathname: redirect,
						params: {
							redirect: "/screens/account/login",
						},
					})
				} else {
					router.push("/(tabs)/")
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message)
			} else {
				console.error("An unknown error occurred:", error)
				Alert.alert("An unknown error occurred. Please try again later.")
			}
		}
	}

	const handleAppleSignIn = async () => {
		try {
			HapticsTouch()
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			})

			if (credential.identityToken) {
				const { error } = await supabase.auth.signInWithIdToken({
					provider: "apple",
					token: credential.identityToken,
				})
				const res = await supabase.auth.getUser()

				if (res.data?.user) {
					const user = {
						id: res.data.user?.id,
						nickName: res?.data?.user?.user_metadata?.full_name,
						profileImage: res?.data?.user?.user_metadata?.avatar_url,
					}

					await addUserToDatabase(user)
				}
				if (error) {
					Alert.alert(error.message)
				}
			}
			if (redirect) {
				router.push({
					pathname: redirect,
					params: {
						redirect: "/screens/account/login",
					},
				})
			} else {
				router.push("/(tabs)/")
			}
			// signed in
		} catch (e) {
			if (e.code === "ERR_REQUEST_CANCELED") {
				Alert.alert("User cancelled the request")
			} else {
				Alert.alert("Error occurred", e.message)
			}
		}
	}

	useEffect(() => {
		if (response?.type === "success") {
			const { authentication } = response
			handleGoogleSignIn(authentication?.idToken)
		}
	}, [response])

	async function signUpWithEmail() {
		try {
			HapticsTouch()
			setLoading(true)
			const {
				data: { session },
				error,
			} = await supabase.auth.signUp({
				email: email,
				password: password,
			})

			if (error) {
				throw new Error(error.message)
			}
			if (!session) Alert.alert("Please check your inbox for email verification!")
		} catch (e) {
			Alert.alert(e.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
			<LoadingOverlay loading={loading} />

			<Pressable style={styles.container} onPress={Keyboard.dismiss}>
				<Stack.Screen
					options={{
						headerShown: false,
						animation: "slide_from_bottom",
						gestureEnabled: false,
						fullScreenGestureEnabled: false,
					}}
				/>

				<Image source={require("../../../assets/images/coolbg1.jpg")} style={styles.backgroundImage} />

				<LinearGradient colors={["rgba(0,0,0,0.20)", "black", "black"]} style={styles.gradient} />

				<View
					style={{
						position: "absolute",
						height: SCREEN_HEIGHT,
						width: SCREEN_WIDTH,
					}}
				>
					<SafeAreaView style={{ flex: 1 }}>
						<Header
							LeftComponent={
								<BackButton
									style={{ marginLeft: pixelWidth(12) }}
									onPress={() => {
										HapticsTouch()
										if (redirect) {
											router.push({
												pathname: "/(tabs)",
												params: {
													redirect: "/screens/account/login",
												},
											})
										} else {
											router.back()
										}
									}}
									isXmark={true}
								/>
							}
						/>
						<KeyboardAwareScrollView
							contentContainerStyle={[
								{ flexGrow: 1 },
								isKeyboardVisible ? { marginBottom: pixelHeight(400) } : { marginBottom: pixelHeight(40) },
							]}
						>
							<View style={{ flex: 1 }}>
								<View style={{ flex: 1 }}>
									<Text
										style={[
											styles.logoText,
											{
												marginTop: pixelHeight(20),
												marginLeft: pixelWidth(24),
												shadowColor: colors.black,
												shadowOffset: { width: 0, height: 2 },
												shadowOpacity: 0.4,
												shadowRadius: pixelSize(2),
											},
										]}
									>
										EIZO.
										<Text
											style={[
												styles.logoText,
												{
													color: colors.upvote,
												},
											]}
										>
											ai
										</Text>
									</Text>

									<Text
										style={[
											styles.logoText,
											{
												marginTop: pixelHeight(80),
												marginHorizontal: pixelWidth(24),
												shadowColor: colors.black,
												shadowOffset: { width: 0, height: 2 },
												shadowOpacity: 0.4,
												shadowRadius: pixelSize(2),
											},
										]}
									>
										<Text
											style={[
												styles.logoText,
												{
													color: colors.upvote,
												},
											]}
										>
											{isSignUp ? "AI Magic " : ""}
										</Text>
										{isSignUp ? "Transforms Dreams into Visual Reality" : "Welcome Back"}
									</Text>
								</View>

								<View
									style={{
										marginHorizontal: pixelWidth(20),
									}}
								>
									<SwInput
										label="Email"
										onChangeText={(text) => setEmail(text)}
										value={email}
										placeholder="email@address.com"
										autoCapitalize={"none"}
										securable={false}
									/>

									<SwInput
										label="Password"
										onChangeText={(text) => setPassword(text)}
										value={password}
										securable={true}
										placeholder="12345678"
										autoCapitalize={"none"}
									/>

									{isSignUp ? null : (
										<TouchableOpacity
											onPress={() => {
												HapticsTouch()
												router.push("/(user)/reset")
											}}
										>
											<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
										</TouchableOpacity>
									)}

									<ButtonDefault
										disabled={loading}
										onPress={() => {
											HapticsTouch()
											isSignUp ? signUpWithEmail() : signInWithEmail()
										}}
										textStyle={{
											color: colors.textBlack,
											textAlign: "center",
											fontSize: pixelSize(14),
											fontWeight: "600",
										}}
										buttonStyle={{
											marginTop: pixelHeight(20),
											backgroundColor: colors.borderWhite,
										}}
										buttonText={isSignUp ? "Sign Up" : "Sign In"}
									/>

									<View style={styles.signUpTextContainer}>
										<Text style={styles.signUpText}>
											{isSignUp ? "Already have an account?" : "Don't have an account?"}
										</Text>
										<TouchableOpacity
											onPress={() => {
												HapticsTouch()
												setIsSignUp(!isSignUp)
											}}
										>
											<Text
												style={[
													styles.signUpText,
													{
														color: colors.upvote,
														fontWeight: "800",
													},
												]}
											>
												{isSignUp ? "Sign In" : "Sign Up"}
											</Text>
										</TouchableOpacity>
									</View>

									<ButtonDefault
										onPress={async () => {
											HapticsTouch()
											handleAppleSignIn()
										}}
										buttonStyle={{
											marginTop: pixelHeight(20),
										}}
										buttonText={isSignUp ? "Sign Up with Apple" : "Sign In with Apple"}
										IconComponent={
											<AntDesign
												name="apple1"
												size={20}
												color="white"
												style={{
													position: "absolute",
													left: pixelWidth(16),
												}}
											/>
										}
									/>
									<ButtonDefault
										onPress={() => {
											HapticsTouch()
											promptAsync()
										}}
										buttonStyle={{
											marginTop: pixelHeight(20),
										}}
										buttonText={isSignUp ? "Sign Up with Google" : "Sign In with Google"}
										IconComponent={
											<Image
												source={require("../../../assets/images/google.png")}
												style={{
													width: pixelSize(20),
													height: pixelSize(20),
													position: "absolute",
													left: pixelWidth(16),
												}}
											/>
										}
									/>
									{/*<OtherSignIn/>*/}
								</View>
							</View>
						</KeyboardAwareScrollView>
					</SafeAreaView>
				</View>
			</Pressable>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	backgroundImage: {
		height: (SCREEN_WIDTH * 1872) / 1528,
		width: SCREEN_WIDTH,
	},
	container: {
		flex: 1,
	},
	forgotPasswordText: {
		color: colors.textGray,
		fontSize: pixelFont(12),
		fontWeight: "500",
		marginTop: pixelHeight(8),
		textAlign: "right",
	},
	gradient: {
		flex: 2,
		height: "100%",
		left: 0,
		position: "absolute",
		right: 0,
		width: "100%",
	},
	logoText: {
		color: colors.textWhite,
		fontSize: pixelFont(28),
		fontWeight: "800",
		letterSpacing: 1.25,
	},
	signUpText: {
		color: colors.textWhite,
		fontSize: pixelFont(13),
		fontWeight: "500",
		textAlign: "center",
	},
	signUpTextContainer: {
		// marginBottom: pixelHeight(20),
		flexDirection: "row",
		gap: pixelWidth(4),
		justifyContent: "center",
		marginTop: pixelHeight(8),
	},
})

export default WelcomeScreen
