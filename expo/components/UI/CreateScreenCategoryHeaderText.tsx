import React from "react"
import { Text, StyleSheet } from "react-native"
import colors from "@utils/colors"
import { pixelFont, pixelSize } from "@utils/pixels"

interface CreateScreenCategoryHeaderTextProps {
	text: string
	boldText?: string
	style?: any
}

const CreateScreenCategoryHeaderText: React.FC<CreateScreenCategoryHeaderTextProps> = ({ text, boldText, style }) => {
	return (
		<Text style={[styles.largeText, style]}>
			{text} {boldText && <Text style={styles.boldText}>{boldText}</Text>}
		</Text>
	)
}

const styles = StyleSheet.create({
	largeText: {
		color: colors.textWhite,
		fontSize: pixelFont(20),
		fontWeight: "500",
		marginHorizontal: pixelSize(16),
		marginTop: pixelSize(8),
	},
	boldText: {
		fontWeight: "800",
	},
})

export default CreateScreenCategoryHeaderText
