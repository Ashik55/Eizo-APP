import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { pixelFont, pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"

type Props = {
	curPage: number
	totalPage: number
	gotoPage: (val: number) => void
}

const Pagination = (props: Props) => {
	const { curPage, totalPage, gotoPage } = props

	return (
		<View style={styles.container}>
			{new Array(totalPage).fill("").map((e, i) => (
				<TouchableOpacity
					key={i}
					onPress={() => {
						HapticsTouch()
						gotoPage(i)
					}}
					style={[
						styles.button,
						{
							backgroundColor: i == curPage ? colors.iconGray : colors.background,
						},
					]}
				>
					<Text style={styles.numberText}>{i + 1}</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}

export default Pagination

const styles = StyleSheet.create({
	numberText: {
		color: colors.textWhite,
		fontSize: pixelFont(12),
		fontWeight: "500",
	},
	button: {
		width: pixelWidth(36),
		height: pixelHeight(28),
		borderRadius: pixelSize(4),
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: pixelWidth(8),
		marginBottom: pixelHeight(12),
	},
})
