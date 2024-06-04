import { GuiPromptData, PromptItem, SelectedGuiPrompt, SelectedGuiPromptObject } from "@shared/schemas"
import { InterstitialAd, TestIds } from "react-native-google-mobile-ads"

export const extractPromptItemIds = (selectedOptions: SelectedGuiPromptObject) => {
	const extractedData: { [key: string]: string } = {}

	Object.keys(selectedOptions).forEach((category) => {
		const item = selectedOptions[category]
		extractedData[category] = item.promptItemId
	})

	return extractedData
}

export function extractPrompt(selectedGuiPromptObject: SelectedGuiPromptObject, basePrompt: string): string {
	let prompt = basePrompt

	for (const option of Object.values(selectedGuiPromptObject)) {
		if (option.categoryId === "style" && option.fields && option.fields.prompt) {
			prompt = `${option.fields.prompt}, ${prompt}`
		} else if (option.categoryId !== "style" && option.textPrompt) {
			prompt += `, ${option.textPrompt}`
		}
	}

	return prompt
}

export function findSelectedPromptItems(
	selectedCategoryAndPromptItems: { [key: string]: string },
	guiPromptList: GuiPromptData[],
): PromptItem[] {
	const usedGuiPromptList: PromptItem[] = []

	guiPromptList.forEach((guiPrompt) => {
		const selectedPromptItemId = selectedCategoryAndPromptItems[guiPrompt.categoryId]

		if (selectedPromptItemId) {
			const promptItem = guiPrompt.promptItems.find((item) => item.promptItemId === selectedPromptItemId)

			if (promptItem) {
				usedGuiPromptList.push({ ...promptItem, categoryId: guiPrompt.categoryId })
			}
		}
	})

	return usedGuiPromptList
}

export const convertSelectedCategoryAndPromptItem = (
	selectedCategoryAndPromptItem: Record<string, string>,
	guiPromptList: GuiPromptData[],
): Record<string, SelectedGuiPrompt> => {
	const selectedGuiPromptObject: Record<string, SelectedGuiPrompt> = {}

	for (const [categoryId, promptItemId] of Object.entries(selectedCategoryAndPromptItem)) {
		const category = guiPromptList.find((category) => category.categoryId === categoryId)
		if (!category) continue

		const promptItem = category.promptItems.find((item) => item.promptItemId === promptItemId)
		if (!promptItem) continue

		const categoryIndex = guiPromptList.findIndex((category) => category.categoryId === categoryId)
		const promptItemIndex = category.promptItems.findIndex((item) => item.promptItemId === promptItemId)

		selectedGuiPromptObject[categoryId] = {
			categoryIndex,
			promptItemIndex,
			categoryId,
			promptItemId,
			...("fields" in promptItem ? { fields: promptItem.fields } : { textPrompt: promptItem.textPrompt }),
		}
	}

	return selectedGuiPromptObject
}

export const getImageHeight = (aspectRatio: string, width: number) => {
	// const aspectRatio = publishedImage.aspectRatio;
	const aspectRatioArray = aspectRatio.split(":").map(Number)

	// const columnWidth = SCREEN_WIDTH / 2 - pixelWidth(IMAGE_MARGIN);
	const calculatedHeight = width / (aspectRatioArray[0] / aspectRatioArray[1])
	return calculatedHeight
}

export const adUnitId = __DEV__ ? TestIds.REWARDED : "ca-app-pub-7857055136883344/3823003357"

export const interstitialRef = InterstitialAd.createForAdRequest(adUnitId, {
	requestNonPersonalizedAdsOnly: true,
})
