import React from "react"
import ButtonScale from "@components/UI/ButtonScale"
import { FontAwesome6 } from "@expo/vector-icons"
import { pixelSize } from "@utils/pixels"
import colors from "@utils/colors"
import { StyleSheet } from "react-native"

interface MenuButtonProps {
	onPress: () => void
}
export const MenuButton: React.FC<MenuButtonProps> = ({ onPress }) => {
	return (
		<ButtonScale onPress={onPress} style={styles.menuButton}>
			<FontAwesome6 name="ellipsis-vertical" size={pixelSize(20)} color={colors.iconWhite} />
		</ButtonScale>
	)
}

const styles = StyleSheet.create({
	menuButton: {
		paddingVertical: pixelSize(12),
		paddingHorizontal: pixelSize(16),
		justifyContent: "center",
		alignItems: "center",
	},
})
