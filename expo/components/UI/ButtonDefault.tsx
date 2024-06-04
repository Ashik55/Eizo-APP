import React from "react"
import { Text, StyleSheet, TextStyle, ViewStyle } from "react-native"
import ButtonScale from "@components/UI/ButtonScale"
import { pixelFont, pixelHeight, pixelSize } from "@utils/pixels"
import colors from "@utils/colors"

interface CustomButtonProps {
	onPress: () => void
	IconComponent?: React.ReactElement
	buttonStyle?: ViewStyle
	textStyle?: TextStyle
	buttonText: string
	disabled?: boolean
}

const ButtonDefault: React.FC<CustomButtonProps> = ({
	onPress,
	IconComponent,
	buttonStyle,
	textStyle,
	buttonText,
	disabled,
}) => {
	return (
		<ButtonScale onPress={onPress} style={{ ...styles.button, ...buttonStyle }} disabled={disabled}>
			{IconComponent ? IconComponent : null}
			<Text style={{ ...styles.logoText, ...textStyle }}>{buttonText}</Text>
		</ButtonScale>
	)
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		borderColor: colors.borderWhite,
		borderRadius: pixelSize(8),
		borderWidth: pixelSize(2),
		flexDirection: "row",
		height: pixelHeight(40),
		justifyContent: "center",
	},
	logoText: {
		color: colors.textWhite,
		fontSize: pixelFont(14),
		fontWeight: "500",
	},
})

export default ButtonDefault
