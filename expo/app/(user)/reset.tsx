import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { supabase } from "@libs/supabase"
import Colors from "@constants/Colors"
import { AntDesign } from "@expo/vector-icons"
import { router } from "expo-router"
import SwInput, { SwInputProps } from "@components/UI/SwInput"
import SwButton, { SwButtonProps } from "@components/UI/SwButton"
import { showMessage } from "react-native-flash-message"
import PROJECTKEYS from "@shared/constants/Keys"
import { HapticsTouch } from "@utils/haptics"
import colors from "@utils/colors"

const getURL = `${PROJECTKEYS.API.API_URL}/auth/callback`

interface ResetPasswordScreenProps {}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = () => {
	const [email, setEmail] = useState("")
	const [loading, setLoading] = useState(false)

	const resetPassword = async () => {
		try {
			setLoading(true)
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${getURL}?next=/account/update-password`,
			})

			if (error) {
				showMessage({
					message: error.message,
					type: "danger",
				})
			} else {
				showMessage({
					message: "Please check your inbox for further instructions!",
					type: "success",
				})
				router.push("/login")
			}
		} catch (err: any) {
			showMessage({
				message: err.message || "An error occurred while resetting the password.",
				type: "danger",
			})
		} finally {
			setLoading(false)
		}
	}

	const handleBackPress = () => {
		router.back()
		HapticsTouch()
	}

	const swInputProps: SwInputProps = {
		label: "Email",
		onChangeText: setEmail,
		value: email,
		placeholder: "email@address.com",
		autoCapitalize: "none",
		securable: false,
	}

	const swButtonProps: SwButtonProps = {
		title: "Reset",
		disabled: loading,
		onPress: () => {
			resetPassword()
			HapticsTouch()
		},
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
				<AntDesign name="arrowleft" size={18} color="white" />
			</TouchableOpacity>
			<View style={styles.contentContainer}>
				<Text style={styles.heading}>Reset Password</Text>
				<SwInput {...swInputProps} />
				<View style={styles.buttonContainer}>
					<SwButton {...swButtonProps} />
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	backButton: {
		alignItems: "center",
		backgroundColor: colors.lightGrey,
		borderRadius: 20,
		height: 40,
		justifyContent: "center",
		marginLeft: 20,
		marginTop: 20,
		width: 40,
	},
	buttonContainer: {
		paddingVertical: 20,
	},
	container: {
		backgroundColor: Colors.dark.background,
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: 20,
	},
	heading: {
		color: colors.textWhite,
		fontFamily: "Oswald_500Medium",
		fontSize: 30,
		fontWeight: "bold",
		marginTop: 20,
	},
})

export default ResetPasswordScreen
