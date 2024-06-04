import React, { useEffect, useState } from "react"
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { AntDesign, FontAwesome6 } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { router, Stack } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { pixelFont, pixelHeight, pixelSize, pixelWidth, SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils/pixels"
import colors from "@utils/colors"
import ButtonScale from "@components/UI/ButtonScale"
import Header from "@components/UI/Header"
import SwInput from "@components/UI/SwInput"
import { supabase } from "@libs/supabase"
import { showMessage } from "react-native-flash-message"
import { HapticsTouch } from "@utils/haptics"
import { ScrollView } from "react-native-gesture-handler"
import ButtonDefault from "@components/UI/ButtonDefault"
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import * as AppleAuthentication from "expo-apple-authentication"
import { Image } from "expo-image"

WebBrowser.maybeCompleteAuthSession()

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const [isKeyboardVisible, setKeyboardVisible] = useState(false)
	const [isSignUp, setIsSignUp] = useState(true)

	const [response, promptAsync] = Google.useAuthRequest({
		iosClientId: "414281175059-89qhe2mk9evnebduf244j347h2cuoa6u.apps.googleusercontent.com",
	})

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardVisible(true)
		})
		const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardVisible(false)
		})

		return () => {
			keyboardDidHideListener.remove()
			keyboardDidShowListener.remove()
		}
	}, [])

	const signInWithEmail = async () => {
		try {
			HapticsTouch()
			setLoading(true)
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})

			if (error) throw new Error(error.message)
			router.push("/(tabs)/")
		} catch (e: any) {
			showMessage({
				message: e.message,
				type: "danger",
			})
		} finally {
			setLoading(false)
		}
	}

	const handleGoogleSignIn = async (idToken: string) => {
		const { error } = await supabase.auth.signInWithIdToken({
			provider: "google",
			token: idToken,
		})
		if (error) {
			Alert.alert(error.message)
		} else {
			router.push("/(tabs)/")
		}
	}

	const handleAppleSignIn = async () => {
		try {
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
				if (error) {
					Alert.alert(error.message)
				}
			}
			router.push("/(tabs)/")
		} catch (e: any) {
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
			handleGoogleSignIn(authentication?.idToken || "")
		}
	}, [response])

	const signUpWithEmail = async () => {
		setLoading(true)
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		})

		if (error) Alert.alert(error.message)
		if (!data.session) Alert.alert("Please check your inbox for email verification!")
		setLoading(false)
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<Pressable style={styles.container} onPress={Keyboard.dismiss}>
				<Stack.Screen
					options={{
						headerShown: false,
					}}
				/>
				<Image
					source={require("../../assets/images/smile.jpg")}
					style={styles.backgroundImage}
					resizeMode={"contain"}
				/>

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
								<ButtonScale
									style={{ marginLeft: pixelWidth(20) }}
									onPress={() => {
										HapticsTouch()
										router.push("/(tabs)")
									}}
								>
									<FontAwesome6 name="chevron-left" size={24} color={colors.iconWhite} />
								</ButtonScale>
							}
						/>
						<ScrollView
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
												marginTop: pixelHeight(32),
												marginLeft: 20,
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
												marginTop: pixelHeight(100),
												marginLeft: 20,
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
										onChangeText={setEmail}
										value={email}
										placeholder="email@address.com"
										autoCapitalize={"none"}
										securable={false}
									/>

									<SwInput
										label="Password"
										onChangeText={setPassword}
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
										onPress={handleAppleSignIn}
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
												source={require("../../assets/images/google.png")}
												style={{
													width: pixelSize(20),
													height: pixelSize(20),
													position: "absolute",
													left: pixelWidth(16),
												}}
											/>
										}
									/>
								</View>
							</View>
						</ScrollView>
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
		fontSize: pixelFont(12),
		fontWeight: "500",
		textAlign: "center",
	},
	signUpTextContainer: {
		flexDirection: "row",
		gap: pixelWidth(4),
		justifyContent: "center",
		marginTop: pixelHeight(8),
	},
})

export default WelcomeScreen
