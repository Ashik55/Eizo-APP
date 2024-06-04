import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import colors from "@utils/colors"
import { pixelFont, pixelHeight, pixelWidth } from "@utils/pixels"
import useApi from "@api/request"
import { showMessage } from "react-native-flash-message"
import { useAuthStore } from "@store/useAuthStore"
import { supabase } from "@libs/supabase"
import { router } from "expo-router"

const DeleteAccount = () => {
	const userCtrl = useAuthStore.getState()
	const { deleteAccount } = useApi()

	const handleDeleteAccountConfirmation = async () => {
		const response = await deleteAccount()

		if (response.ok) {
			showMessage({
				message: "Account deleted! Logging out...",
				type: "danger",
			})

			// Remove user from store and logout user
			userCtrl.removeUser()
			supabase.auth.signOut()

			// Redirect to home screen
			router.push("/(tabs)/")
		} else {
			showMessage({
				message: "Error deleting account!",
				type: "danger",
			})
		}
	}

	const handleDeleteAccount = async () => {
		Alert.alert("Delete Account", "Are you sure you want to delete your account? This action is irreversible.", [
			{
				text: "Cancel",
				onPress: () => {
					return
				},
				style: "cancel",
			},
			{
				text: "OK",
				onPress: handleDeleteAccountConfirmation,
			},
		])
	}

	return (
		<TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
			<FontAwesome6 name="trash-can" size={16} color={colors.textLightGray} />
			<Text style={styles.deleteText}>Delete Account</Text>
		</TouchableOpacity>
	)
}

export default DeleteAccount

const styles = StyleSheet.create({
	deleteButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: pixelHeight(16),
		marginHorizontal: pixelWidth(12),
		gap: pixelWidth(8),
		marginTop: pixelHeight(12),
	},

	deleteText: {
		color: colors.textLightGray,
		fontWeight: "500",
		fontSize: pixelFont(12),
	},
})
