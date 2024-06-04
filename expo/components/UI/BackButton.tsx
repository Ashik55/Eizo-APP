import React from "react"
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FontAwesome6 } from "@expo/vector-icons"
import { router } from "expo-router"
import { HapticsTouch } from "@utils/haptics"
import { pixelSize } from "@utils/pixels"
import colors from "@utils/colors" // Adjust this import based on your project setup

interface BackButtonProps {
	style?: ViewStyle
	isXmark?: boolean
	onPress?: () => void
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, style, isXmark }) => {
	return (
		<TouchableOpacity style={[styles.button, style]} onPress={onPress || defaultOnPress}>
			{isXmark ? (
				<FontAwesome6 name="xmark" size={pixelSize(20)} color={colors.iconWhite} />
			) : (
				<FontAwesome6 name="chevron-left" size={pixelSize(20)} color={colors.iconWhite} />
			)}
		</TouchableOpacity>
	)
}

// Default onPress function if none provided
const defaultOnPress = () => {
	HapticsTouch()
	router.back()
}

const styles = StyleSheet.create({
	button: {
		padding: pixelSize(12),
	},
})

export default BackButton
