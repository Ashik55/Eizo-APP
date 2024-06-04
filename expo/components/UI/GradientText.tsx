import React from "react"
import { Text, View, StyleSheet } from "react-native"
import MaskedView from "@react-native-masked-view/masked-view"
import colors from "@utils/colors"

interface GradientTextProps {
	text: string
	style?: Text["props"]["style"]
}

const GradientText: React.FC<GradientTextProps> = ({ text, style }) => {
	return (
		<MaskedView style={styles.maskedView} maskElement={<Text style={[styles.text, style]}>{text}</Text>}>
			<View style={[styles.backgroundView, { backgroundColor: maskColors.background }]} />
			<View style={[styles.backgroundView, { backgroundColor: maskColors.upvote }]} />
			<View style={[styles.backgroundView, { backgroundColor: maskColors.warning }]} />
			<View style={[styles.backgroundView, { backgroundColor: maskColors.text }]} />
		</MaskedView>
	)
}

const styles = StyleSheet.create({
	backgroundView: {
		flex: 1,
		height: "100%",
	},
	maskedView: {
		flex: 1,
		flexDirection: "row",
		height: "100%",
	},
	text: {
		color: colors.black,
		fontSize: 60,
		fontWeight: "bold",
	},
})

const maskColors = {
	upvote: "#F5DD90",
	warning: "#F76C5E",
	background: "#324376",
	text: "#e1e1e1",
}

export default GradientText
