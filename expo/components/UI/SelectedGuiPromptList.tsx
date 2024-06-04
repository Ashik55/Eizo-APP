import React from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import ImageStyle from "@components/UI/ImageStyle"
import { pixelHeight, pixelWidth } from "@utils/pixels"
import { HapticsTouch } from "@utils/haptics"
import ImageStyleWithCloseButton from "@components/UI/ImageStyleWithCloseButton"
import { SelectedGuiPromptObject } from "@shared/schemas"
import { GUI_PROMPT_LIST } from "@shared/GUI_PROMPT_LIST"
import { colors } from "react-native-elements"

interface SelectedGuiPromptListProps {
	selectedGuiPromptObject: SelectedGuiPromptObject
	guiPromptList: any
	setPageIndex: (index: number) => void
	pageRef: React.RefObject<any>
	guiPromptBottomSheetRef: React.RefObject<any>
	removeSelectedGuiPromptObject: (category: string) => void
	onPressPlusButton: () => void
}

const SelectedGuiPromptList: React.FC<SelectedGuiPromptListProps> = ({
	selectedGuiPromptObject,
	guiPromptList,
	setPageIndex,
	pageRef,
	guiPromptBottomSheetRef,
	removeSelectedGuiPromptObject,
	onPressPlusButton,
}) => {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				marginLeft: pixelWidth(8),
				overflow: "visible",
			}}
		>
			<View style={styles.modelListContainer}>
				{GUI_PROMPT_LIST.map((category, categoryIndex) => {
					const selectedCategory = category.categoryId
					if (selectedGuiPromptObject.hasOwnProperty(selectedCategory)) {
						const optionIndex = selectedGuiPromptObject[selectedCategory].promptItemIndex
						const selectedOptionItem = category.promptItems[optionIndex]

						return (
							<ImageStyleWithCloseButton
								key={categoryIndex}
								selectedCategory={selectedCategory}
								selectedOptionItem={selectedOptionItem}
								onPress={() => {
									HapticsTouch()
									setPageIndex(categoryIndex)
									pageRef?.current?.setPage(categoryIndex)
									guiPromptBottomSheetRef.current?.expand()
								}}
								onClosePress={() => {
									HapticsTouch()
									removeSelectedGuiPromptObject(selectedCategory)
								}}
								showCloseButton={categoryIndex > 0}
							/>
						)
					}
					return null
				})}
				<ImageStyle isPlusButton={true} onPress={onPressPlusButton} />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	modelListContainer: {
		alignItems: "center",
		flexDirection: "row",
		paddingTop: pixelHeight(10),
		justifyContent: "center",
		// flexWrap: "wrap",
		// overflow: "visible",
	},
})

export default SelectedGuiPromptList
