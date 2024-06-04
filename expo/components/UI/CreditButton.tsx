import React from "react"
import { Text, TouchableOpacity, Image, StyleSheet, ViewStyle } from "react-native"
import colors from "@utils/colors"
import { pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"
interface CreditsButtonProps {
	credits: number
	onPress?: () => void
	style?: ViewStyle
	disabled?: boolean
}

export const CreditsButton: React.FC<CreditsButtonProps> = ({ credits, onPress, style, disabled }) => {
	return (
		<TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled}>
			<Image source={require("../../assets/images/coins.png")} style={styles.image} />
			<Text style={styles.text}>{credits}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		gap: pixelWidth(8),
		flexDirection: "row",
		height: pixelHeight(32),
		paddingHorizontal: pixelWidth(16),
		justifyContent: "center",
		alignItems: "center",
		borderRadius: pixelSize(24),
		backgroundColor: colors.backgroundSecondary,
	},
	text: {
		color: colors.textWhite,
		fontWeight: "700",
		fontSize: pixelSize(15),
	},
	image: {
		width: pixelSize(24),
		height: pixelSize(24),
		resizeMode: "contain",
	},
})
