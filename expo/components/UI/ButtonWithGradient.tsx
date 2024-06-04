// ButtonWithGradientx
import React from "react"
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { pixelHeight, pixelSize, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
import colors from "@utils/colors"

interface ButtonWithGradientProps {
	onPress: () => void
	buttonText: string
	buttonStyle?: ViewStyle
	textStyle?: TextStyle
	subText?: string | null
	subTextStyle?: TextStyle
	disabled?: boolean
	leftComponent?: React.ReactNode
	rightComponent?: React.ReactNode
}

const ButtonWithGradient: React.FC<ButtonWithGradientProps> = ({
	onPress,
	buttonText,
	buttonStyle = {},
	textStyle = {},
	disabled = false,
	subText,
	subTextStyle,
	rightComponent,
	leftComponent,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={[styles.buttonContainer, buttonStyle]} disabled={disabled}>
			<LinearGradient
				colors={[colors.upvote, colors.warning]}
				style={[styles.gradient, buttonStyle]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				{/*left*/}
				<View style={{ flex: 1 }}>{leftComponent}</View>

				{/*center*/}
				<View style={{ flex: 2 }}>
					<Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
					{subText ? <Text style={[styles.subText, subTextStyle]}>{subText}</Text> : null}
				</View>

				{/*right*/}
				<View style={{ flex: 1, alignItems: "flex-end" }}>{rightComponent}</View>
			</LinearGradient>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: "center",
		alignSelf: "center",
		borderRadius: pixelSize(8),
		height: pixelHeight(48),
		justifyContent: "center",
		width: SCREEN_WIDTH - pixelWidth(24),
		shadowColor: colors.upvote,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.7,
		shadowRadius: pixelSize(4),
	},
	buttonText: {
		color: colors.textWhite,
		fontSize: pixelSize(15),
		fontWeight: "700",
		textAlign: "center",
	},
	subText: {
		color: colors.textWhite,
		fontSize: pixelSize(10),
		fontWeight: "400",
		textAlign: "center",
	},
	gradient: {
		flexDirection: "row",
		alignItems: "center",
		height: "100%",
		justifyContent: "center",
		width: "100%",
		borderRadius: pixelSize(8),
	},
})

export default ButtonWithGradient
