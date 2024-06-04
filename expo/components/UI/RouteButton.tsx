import { FontAwesome5 } from "@expo/vector-icons"
import React, { memo } from "react"
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import colors from "@utils/colors"
import { pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"

interface RouteButtonProps {
	showArrow?: boolean
	onPress: () => void
	text: string
	icon: React.ReactElement
	buttonStyle?: ViewStyle
}

// eslint-disable-next-line react/display-name
const RouteButton = memo(({ showArrow = false, onPress, text, icon, buttonStyle }: RouteButtonProps) => {
	return (
		<TouchableOpacity style={[styles.routeButtonContainer, buttonStyle]} onPress={onPress}>
			<View style={styles.routeButtonContent}>
				{icon}
				<Text style={styles.routeButtonText}>{text}</Text>
			</View>
			{showArrow && <FontAwesome5 name="angle-right" size={20} color={colors.iconWhite} />}
		</TouchableOpacity>
	)
})

const styles = StyleSheet.create({
	routeButtonContainer: {
		alignItems: "center",
		backgroundColor: colors.backgroundSecondary,
		borderRadius: pixelSize(8),
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: pixelWidth(12),
		paddingVertical: pixelHeight(12),
	},
	routeButtonContent: {
		alignItems: "center",
		flexDirection: "row",
		gap: pixelWidth(12),
	},
	routeButtonText: {
		color: colors.textWhite,
		fontSize: pixelSize(13),
		fontWeight: "600",
	},
})

export default RouteButton
