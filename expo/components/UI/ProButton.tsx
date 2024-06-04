// External imports
import { StyleSheet, Text } from "react-native"
import React from "react"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { Session } from "@supabase/supabase-js"

// Internal imports
import ButtonScale from "@components/UI/ButtonScale"
import { HapticsTouch } from "@utils/haptics"
import colors from "@utils/colors"
import { pixelFont, pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"

const ProButton = ({ user }: { user: Session | null }) => {
	const handlePress = () => {
		HapticsTouch()
		router.push(user ? "/screens/pro/" : "/screens/account/login")
	}

	return (
		<ButtonScale onPress={handlePress} style={styles.proButton}>
			<LinearGradient colors={[colors.upvote, colors.warning]} style={styles.proButtonGradient}>
				<Text style={styles.proText}>Pro</Text>
			</LinearGradient>
		</ButtonScale>
	)
}

export default ProButton

const styles = StyleSheet.create({
	proButtonGradient: {
		height: pixelHeight(32),
		alignItems: "center",
		borderRadius: pixelSize(20),
		justifyContent: "center",
		paddingHorizontal: pixelWidth(16),
	},
	proText: {
		color: colors.textWhite,
		fontSize: pixelFont(15),
		fontWeight: "800",
		textAlign: "center",
	},
	proButton: {
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: pixelSize(2),
	},
})
