import React from "react"
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FontAwesome6 } from "@expo/vector-icons"
import { router } from "expo-router"
import { HapticsTouch } from "@utils/haptics"
import { pixelSize } from "@utils/pixels"
import colors from "@utils/colors" // Adjust this import based on your project setup

// Assuming `colors`, `HapticsTouch`, `router`, and `pixelSize` are defined elsewhere in your project
// import colors from 'path-to-your-colors-definition';
// import { HapticsTouch, pixelSize } from 'path-to-your-utils';
// import router from 'path-to-your-router-setup';

interface BackButtonProps {
	style?: ViewStyle
	onPress?: () => void
	iconSize?: number
	disabled?: boolean
}

const CloseButton: React.FC<BackButtonProps> = ({ onPress, style, iconSize = 20, disabled }) => {
	return (
		<TouchableOpacity style={[styles.button, style]} onPress={onPress || defaultOnPress} disabled={disabled}>
			<FontAwesome6 name="xmark" size={pixelSize(iconSize)} color={colors.iconWhite} />
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

export default CloseButton
