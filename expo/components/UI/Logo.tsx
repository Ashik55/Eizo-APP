// External imports
import { StyleSheet, Text } from "react-native"
import React from "react"

// Internal imports
import colors from "@utils/colors"
import { pixelFont, pixelSize } from "@utils/pixels"

const Logo = () => (
	<Text style={styles.logoText}>
		EIZO.<Text style={styles.logoAccent}>ai</Text>
	</Text>
)

export default Logo

const styles = StyleSheet.create({
	logoText: {
		color: colors.textWhite,
		fontSize: pixelFont(28),
		fontWeight: "800",
		letterSpacing: 1.25,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: pixelSize(2),
	},
	logoAccent: {
		color: colors.upvote,
	},
})
