import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import { pixelFont, pixelHeight, pixelSize, pixelWidth, SCREEN_HEIGHT } from "@utils/pixels"
import { HapticsTouch } from "@utils/haptics"
import ButtonScale from "@components/UI/ButtonScale"
import colors from "@utils/colors"
// import EditPrompt from "./ImprovementStep/EditPrompt";
import useCustomSafeAreaInsets from "@utils/useCustomSafeAreaInsets"
import Variation from "./ImprovementStep/Variation"

type Props = {
	handleBottomSheetContent: (data: any) => void
}

const EditOptions = (props: Props) => {
	const { handleBottomSheetContent } = props
	const { top } = useCustomSafeAreaInsets()

	const editOptions = [
		// {
		//   imageSource: <FontAwesome6 name="pen" size={18} color={colors.iconWhite} />,
		//   categoryText: "Edit Prompt",
		//   component: <EditPrompt id={props?.promptData?.id} />,
		//   height: SCREEN_HEIGHT - top
		// },
		{
			imageSource: <FontAwesome6 name="dice-four" size={18} color={colors.iconWhite} />,
			categoryText: "Variation",
			component: <Variation id={props?.promptData?.id} />,
			height: SCREEN_HEIGHT - top - 500,
		},
		{
			imageSource: <FontAwesome6 name="maximize" size={18} color={colors.iconWhite} />,
			categoryText: "Upscale",
		},
		{
			imageSource: <FontAwesome6 name="face-smile-wink" size={18} color={colors.iconWhite} />,
			categoryText: "Face Fix",
		},
		{
			imageSource: <FontAwesome6 name="shuffle" size={18} color={colors.iconWhite} />,
			categoryText: "Face Swap",
		},
	]

	return (
		<View
			style={{
				marginBottom: pixelHeight(20),
			}}
		>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<View style={styles.buttonsContainer}>
					{editOptions.map((item, index) => (
						<ButtonScale
							key={index}
							onPress={() => {
								HapticsTouch()
								handleBottomSheetContent(item)
							}}
							style={styles.button}
						>
							{item.imageSource}
							<Text style={styles.text}>{item.categoryText}</Text>
						</ButtonScale>
					))}
				</View>
			</ScrollView>
		</View>
	)
}

export default EditOptions

const styles = StyleSheet.create({
	text: {
		color: colors.textWhite,
		textAlign: "center",
		fontSize: pixelFont(10),
		fontWeight: "600",
		marginTop: pixelHeight(4),
	},
	button: {
		width: pixelWidth(68),
		height: pixelHeight(68),
		borderRadius: pixelSize(8),
		backgroundColor: colors.backgroundSecondary,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: pixelWidth(8),
		marginHorizontal: pixelWidth(12),
	},
})
