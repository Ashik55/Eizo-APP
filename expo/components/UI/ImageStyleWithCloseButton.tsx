import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import ImageStyle from "@components/UI/ImageStyle"
import { pixelSize } from "@utils/pixels"
import colors from "@utils/colors"
import { PromptItem } from "@shared/schemas"

interface ImageStyleWithCloseButtonProps {
	selectedCategory: string
	selectedOptionItem: PromptItem
	onPress: () => void
	onClosePress: () => void
	showCloseButton: boolean
}

const ImageStyleWithCloseButton: React.FC<ImageStyleWithCloseButtonProps> = ({
	selectedCategory,
	selectedOptionItem,
	onPress,
	onClosePress,
	showCloseButton,
}) => {
	return (
		<View>
			<ImageStyle
				imageUrl={selectedOptionItem.imageUrl}
				categoryId={selectedCategory}
				name={selectedOptionItem.name}
				onPress={onPress}
			/>
			{showCloseButton && (
				<TouchableOpacity style={styles.closeButton} onPress={onClosePress}>
					<FontAwesome name="close" size={pixelSize(10)} color={colors.iconGray} />
				</TouchableOpacity>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	closeButton: {
		alignItems: "center",
		backgroundColor: colors.secondary,
		borderColor: colors.black,
		borderRadius: pixelSize(12),
		borderWidth: pixelSize(4),
		height: pixelSize(24),
		justifyContent: "center",
		position: "absolute",
		right: -pixelSize(8),
		top: -pixelSize(8),
		width: pixelSize(24),
	},
})
export default ImageStyleWithCloseButton
