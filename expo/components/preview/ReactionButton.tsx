import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { pixelFont, pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"
import colors from "@utils/colors"
import React from "react"

export const ReactionButton = ({
	onPress,
	emoji,
	count,
	useridreactions,
}: {
	onPress: () => void
	emoji: string
	count: number
	useridreactions: {
		user_id: string | undefined
	}[]
}) => (
	<TouchableOpacity
		onPress={onPress}
		style={[
			styles.container,
			{
				backgroundColor: useridreactions?.length > 0 ? colors.white50Alpha : colors.transparent,
			},
		]}
	>
		<Text style={styles.emojiText}>{emoji}</Text>
		<Text style={styles.countText}>{count}</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: pixelWidth(2),
		paddingHorizontal: pixelWidth(8),
		paddingVertical: pixelHeight(6),
		borderRadius: pixelSize(16),
	},
	emojiText: {
		color: colors.textWhite,
		fontSize: pixelFont(12),
	},
	countText: {
		color: colors.textWhite,
		fontSize: pixelFont(12),
		fontWeight: "700",
	},
})
