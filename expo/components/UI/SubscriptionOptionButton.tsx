import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { AdaptyPaywallProduct } from "react-native-adapty"
import colors from "@utils/colors"
import { pixelFont, pixelHeight, pixelSize, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"

interface SubscriptionOptionButtonProps {
	product: AdaptyPaywallProduct
	onPress: () => void // onPressが引数を取らない関数であると仮定しています。
	active: number
	index: number
}

// eslint-disable-next-line react/prop-types
const SubscriptionOptionButton: React.FC<SubscriptionOptionButtonProps> = ({ product, onPress, active, index }) => {
	const color = index === active ? colors.upvote : colors.textWhite

	return (
		<TouchableOpacity onPress={onPress} key={index} style={[styles.optionButtonContainer, { borderColor: color }]}>
			<View
				style={[
					styles.circle,
					{
						borderColor: color,
						backgroundColor: color,
					},
				]}
			/>
			<View style={{ flexDirection: "column" }}>
				<Text
					style={[
						styles.optionTitleText,
						{
							color: color,
						},
					]}
				>
					{product.localizedTitle} {product.price?.currencyCode} {product.price?.localizedString}
				</Text>
				<Text
					style={[
						styles.optionSmallText,
						{
							color: color,
						},
					]}
				>
					{product.localizedDescription}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export default SubscriptionOptionButton

const styles = StyleSheet.create({
	optionButtonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: pixelHeight(12),
		width: SCREEN_WIDTH - pixelWidth(24),
		paddingHorizontal: pixelWidth(16),
		marginTop: pixelHeight(12),
		borderWidth: 2,
		padding: pixelHeight(12),
		borderRadius: pixelSize(8),
	},
	circle: {
		width: pixelSize(12),
		height: pixelSize(12),
		borderRadius: pixelSize(6),
		borderWidth: 2,
	},
	optionTitleText: {
		fontSize: pixelFont(16),
		fontWeight: "700",
	},
	optionSmallText: {
		fontSize: pixelFont(14),
		marginTop: pixelHeight(4),
		fontWeight: "600",
	},
})
