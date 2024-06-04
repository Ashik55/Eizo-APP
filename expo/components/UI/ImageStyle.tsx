import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { pixelFont, pixelHeight, pixelSize, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
import colors from "@utils/colors"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import ButtonScale from "@components/UI/ButtonScale"
import { Image } from "expo-image"
import { blurhashes } from "@utils/blurhashes"

interface StyleItemProps {
	imageUrl?: string
	selected?: boolean
	categoryId?: string
	name?: string
	onPress: () => void
	isPlusButton?: boolean
	forGridView?: boolean
}

const gridViewItemWidth = (SCREEN_WIDTH - pixelWidth(48)) / 3

const ImageStyle: React.FC<StyleItemProps> = ({
	imageUrl,
	selected,
	categoryId,
	name,
	onPress,
	isPlusButton,
	forGridView,
}) => {
	const getCategoryColor = (category: string | undefined) => {
		switch (category) {
			case "style":
				return colors.orange40Alpha
			case "face":
				return colors.blue40Alpha
			case "emotion":
				return colors.softIndigo40Alpha
			case "pose":
				return colors.teal30Alpha
			case "tool":
				return colors.coral30Alpha
			case "clothe":
				return colors.midnightBlue30Alpha
			case "view":
				return colors.mintGreen30Alpha
			default:
				return colors.orange40Alpha
		}
	}

	if (forGridView) {
		return (
			<ButtonScale style={{ width: gridViewItemWidth }} onPress={onPress}>
				<View style={{ width: gridViewItemWidth }}>
					<Image
						source={{ uri: imageUrl }}
						placeholder={blurhashes()}
						transition={500}
						style={{
							width: gridViewItemWidth,
							height: gridViewItemWidth,
							borderRadius: pixelSize(8),
							borderWidth: 2,
							borderColor: selected ? colors.upvote : colors.transparent,
						}}
					/>
				</View>
				<Text style={[styles.styleText, { color: selected ? colors.upvote : colors.textWhite }]}>{name}</Text>
			</ButtonScale>
		)
	}

	if (isPlusButton) {
		return (
			<ButtonScale style={styles.styleItemContainer} onPress={onPress}>
				<View style={[styles.itemContainer, { backgroundColor: colors.secondary }]}>
					<FontAwesome name="plus" size={24} color={colors.primary} />
				</View>
				{/* <Text style={styles.styleText}>Optional</Text> */}
			</ButtonScale>
		)
	}

	if (imageUrl) {
		const color = getCategoryColor(categoryId)

		return (
			<ButtonScale style={styles.styleItemContainer} onPress={onPress}>
				<View style={styles.itemContainer}>
					<Image source={{ uri: imageUrl }} style={styles.styleImage} />
					<View style={[styles.categoryContainer, { backgroundColor: color }]}>
						<Text style={styles.categoryText}>{categoryId}</Text>
					</View>
				</View>
				{/* <Text style={styles.styleText}>{name}</Text> */}
			</ButtonScale>
		)
	}

	return null
}

export const STYLE_IMAGE_SIZE = pixelSize(90)

const componentCustomColors = {
	categoryContainerBg: "rgba(0,52,204,0.5)",
	categoryText: "rgba(0, 0, 0, 0.75)",
}

const styles = StyleSheet.create({
	categoryContainer: {
		alignItems: "center",
		height: 25,
		justifyContent: "center",
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
	},
	categoryText: {
		color: colors.textWhite,
		fontSize: pixelFont(13),
		fontWeight: "600",
		textShadowColor: componentCustomColors.categoryText,
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	itemContainer: {
		alignItems: "center",
		borderRadius: pixelSize(8),
		height: STYLE_IMAGE_SIZE,
		justifyContent: "center",
		overflow: "hidden",
		width: STYLE_IMAGE_SIZE,
	},
	styleImage: {
		height: "100%",
		width: "100%",
	},
	styleItemContainer: {
		borderRadius: pixelSize(8),
		justifyContent: "center",
		marginLeft: pixelWidth(8),
		overflow: "hidden",
	},
	styleText: {
		fontSize: pixelFont(13),
		fontWeight: "600",
		marginTop: pixelHeight(4),
	},
})

export default ImageStyle
