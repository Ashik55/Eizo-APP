import React, { ReactNode } from "react"
import { View, StyleSheet, Text, ViewStyle } from "react-native"
import { pixelFont, pixelHeight } from "@utils/pixels"
import colors from "@utils/colors"

type HeaderProps = {
	LeftComponent?: ReactNode
	CenterComponent?: ReactNode
	RightComponent?: ReactNode
	headerStyle?: ViewStyle
	centerStyle?: ViewStyle
}

const Header: React.FC<HeaderProps> = ({
	LeftComponent,
	CenterComponent,
	RightComponent,
	headerStyle,
	centerStyle,
}) => {
	return (
		<View style={[styles.headerContainer, headerStyle]}>
			<View style={styles.leftContainer}>{LeftComponent}</View>
			<View style={[styles.centerContainer, centerStyle]}>{CenterComponent}</View>
			<View style={styles.rightContainer}>{RightComponent}</View>
		</View>
	)
}

export const HeaderText = ({ text, style }: { text: string; style?: ViewStyle }) => {
	return <Text style={[styles.centerText, style]}>{text}</Text>
}

export const HEADER_HEIGHT = pixelHeight(56)
const styles = StyleSheet.create({
	centerContainer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	headerContainer: {
		alignItems: "center",
		flexDirection: "row",
		height: HEADER_HEIGHT,
		justifyContent: "space-between",
		width: "100%",
	},
	leftContainer: {
		flex: 1,
		justifyContent: "center",
	},
	rightContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-end",
	},
	centerText: {
		fontSize: pixelFont(16),
		color: colors.textWhite,
		fontWeight: "700",
	},
})

export default Header
