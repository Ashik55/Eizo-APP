import React from "react"
import { StyleSheet, View } from "react-native"
import { pixelHeight, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
import ImageStyle from "@components/UI/ImageStyle"
import { FlatList } from "react-native-gesture-handler"
import { HapticsTouch } from "@utils/haptics"
import { usePromptStore } from "@store/promptStore"
import { PromptItem } from "@shared/schemas"
import { BottomSheetFlatList } from "@gorhom/bottom-sheet"

interface RenderItemProps {
	promptItem: PromptItem
	index: number
	onPressGuiPrompt: (index: number) => void
	selectedGuiPromptIndex: number | null
}

const RenderItem = ({ promptItem, index, onPressGuiPrompt, selectedGuiPromptIndex }: RenderItemProps) => (
	<View
		style={{
			marginHorizontal: pixelWidth(4),
			marginBottom: pixelHeight(16),
		}}
	>
		<ImageStyle
			key={promptItem?.name}
			imageUrl={promptItem?.imageUrl}
			categoryId={promptItem?.name}
			forGridView={true}
			name={promptItem?.name}
			selected={selectedGuiPromptIndex !== null && selectedGuiPromptIndex === index}
			onPress={() => {
				HapticsTouch()
				onPressGuiPrompt(index)
			}}
		/>
	</View>
)

//TODO memo
interface OptionGridViewProps {
	categoryIndex?: number
	selectedPromptItemIndex: number | null
}

const GuiPromptGridView = ({ categoryIndex, selectedPromptItemIndex }: OptionGridViewProps) => {
	const { selectedGuiPromptObject, updateSelectedGuiPromptObject, guiPromptList } = usePromptStore()

	const category = guiPromptList[categoryIndex ?? 0]

	const promptItems = category.promptItems

	const onPressGuiPrompt = (index: number) => {
		HapticsTouch()

		updateSelectedGuiPromptObject({
			categoryIndex: categoryIndex ?? 0,
			promptItemIndex: index,
			categoryId: category.categoryId,
			promptItemId: category.promptItems[index].promptItemId,
			...(category.categoryId === "style" && { fields: category.promptItems[index].fields }),
			...(category.promptItems[index].textPrompt && { textPrompt: category.promptItems[index].textPrompt }),
			...(category.promptItems[index].fields && { fields: category.promptItems[index].fields }),
		})
	}

	const renderItem = ({ item, index }: { item: PromptItem; index: number }) => (
		<RenderItem
			key={item.promptItemId}
			promptItem={item}
			index={index}
			onPressGuiPrompt={onPressGuiPrompt}
			selectedGuiPromptIndex={selectedPromptItemIndex}
		/>
	)

	return (
		<BottomSheetFlatList
			data={promptItems}
			renderItem={renderItem}
			keyExtractor={(item, index) => index.toString()}
			numColumns={3}
			contentContainerStyle={styles.container}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: pixelWidth(12),
		paddingBottom: pixelWidth(30),
		paddingHorizontal: pixelWidth(12),
		width: SCREEN_WIDTH,
	},
})

export default GuiPromptGridView
