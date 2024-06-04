import { StyleProp, StyleSheet, Text, ViewStyle } from "react-native"
import React, { memo } from "react"
import ButtonScale from "@components/UI/ButtonScale"
import { pixelHeight, pixelSize } from "@utils/pixels"
import colors from "@utils/colors"

export interface SwButtonProps {
	title: string
	onPress: () => void
	disabled?: boolean
	style?: StyleProp<ViewStyle>
}

// eslint-disable-next-line react/display-name
const SwButton: React.FC<SwButtonProps> = memo(
	// eslint-disable-next-line react/prop-types
	({ title, onPress, disabled = false, style }) => {
		return (
			<ButtonScale disabled={disabled} onPress={onPress} style={[styles.button, style]}>
				<Text style={styles.buttonText}>{title}</Text>
			</ButtonScale>
		)
	},
)

export default SwButton

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.bgwhite,
		borderRadius: pixelSize(8),
		height: pixelHeight(40),
		justifyContent: "center",
	},
	buttonText: {
		color: colors.textBlack,
		fontSize: pixelSize(14),
		fontWeight: "600",
		textAlign: "center",
	},
})
