import React from "react"
import { View, Text, StyleSheet } from "react-native"
import ButtonScale from "@components/UI/ButtonScale"
import { pixelFont, pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"

interface ToggleSwitchProps {
	isActive: boolean
	onToggle: (value: boolean) => void
	leftText?: string
	rightText?: string
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isActive, onToggle, leftText, rightText }) => {
	return (
		<View style={styles.fastPassSwitchContainer}>
			{leftText && <Text style={styles.fastPassText}>{leftText}</Text>}
			<ButtonScale
				style={styles.fastPassToggle}
				onPress={() => {
					HapticsTouch()
					onToggle(!isActive)
				}}
			>
				<View style={[styles.toggleCircle, isActive && styles.toggleCircleEnabled]} />
			</ButtonScale>
			{rightText && <Text style={styles.fastPassText}>{rightText}</Text>}
		</View>
	)
}
export default ToggleSwitch

const styles = StyleSheet.create({
	fastPassSwitchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: pixelWidth(12),
		gap: pixelWidth(8),
	},
	fastPassToggle: {
		borderWidth: 1,
		borderColor: colors.gray,
		backgroundColor: colors.backgroundTertiary,
		width: pixelSize(40),
		height: pixelSize(24),
		borderRadius: pixelSize(12),
		padding: pixelSize(4),
		justifyContent: "center",
	},
	toggleCircle: {
		width: pixelSize(16),
		height: pixelSize(16),
		borderRadius: pixelSize(10),
		backgroundColor: colors.gray,
	},
	toggleCircleEnabled: {
		alignSelf: "flex-end",
		backgroundColor: colors.warning,
	},
	fastPassText: {
		color: colors.textWhiteGray,
		fontSize: pixelFont(16),
		fontWeight: "700",
	},
})
