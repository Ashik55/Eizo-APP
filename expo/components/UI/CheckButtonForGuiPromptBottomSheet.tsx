import React from "react"
import { View, StyleSheet } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import ButtonScale from "@components/UI/ButtonScale"
import { pixelHeight, pixelWidth } from "@utils/pixels"
import colors from "@utils/colors"

interface CheckButtonProps {
	onPress: () => void
}

const CheckButton: React.FC<CheckButtonProps> = ({ onPress }) => {
	return (
		<View style={styles.checkButtonAbsolute}>
			<ButtonScale style={styles.checkButton} onPress={onPress}>
				<FontAwesome5 name="check" size={12} color={colors.iconWhite} />
			</ButtonScale>
		</View>
	)
}

const styles = StyleSheet.create({
	checkButton: {
		alignItems: "center",
		backgroundColor: colors.upvote,
		borderRadius: pixelWidth(8),
		height: pixelHeight(32),
		justifyContent: "center",
		marginRight: pixelWidth(8),
		width: pixelWidth(32),
	},
	checkButtonAbsolute: {
		alignItems: "center",
		backgroundColor: colors.backgroundSecondary,
		height: pixelHeight(56),
		justifyContent: "center",
		marginLeft: pixelWidth(8),
		position: "absolute",
		right: 0,
		shadowColor: colors.backgroundSecondary,
		shadowOffset: {
			width: -10,
			height: -10,
		},
		shadowOpacity: 1,
		shadowRadius: pixelWidth(8),
		width: pixelWidth(48),
	},
})

export default CheckButton
