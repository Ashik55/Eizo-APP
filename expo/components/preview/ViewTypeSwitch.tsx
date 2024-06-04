import { StyleSheet, TouchableOpacity, View } from "react-native"
import React from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import ButtonScale from "@components/UI/ButtonScale"
import { pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"
import { HapticsTouch } from "@utils/haptics"
import colors from "@utils/colors"

type Props = {
	switchType: (type: boolean) => void
	gridView: boolean
}

const ViewTypeSwitch = (props: Props) => {
	const { switchType, gridView } = props
	return (
		<View
			style={{
				backgroundColor: colors.background,
				flexDirection: "row",
				borderRadius: pixelSize(4),
			}}
		>
			<ButtonScale
				onPress={() => {
					HapticsTouch()
					switchType(false)
				}}
				style={[styles.button, { backgroundColor: gridView ? colors.transparent : colors.textGray }]}
			>
				<FontAwesome6 name="square" size={16} color={colors.iconWhite} />
			</ButtonScale>
			<TouchableOpacity
				onPress={() => {
					HapticsTouch()
					switchType(true)
				}}
				style={[styles.button, { backgroundColor: gridView ? colors.textGray : colors.transparent }]}
			>
				<FontAwesome6 name="border-all" size={16} color={colors.iconWhite} />
			</TouchableOpacity>
		</View>
	)
}

export default ViewTypeSwitch
const styles = StyleSheet.create({
	button: {
		width: pixelWidth(48),
		height: pixelHeight(28),
		justifyContent: "center",
		alignItems: "center",
		borderRadius: pixelSize(4),
	},
})
