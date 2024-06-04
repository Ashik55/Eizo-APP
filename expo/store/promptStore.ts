import { create } from "zustand"
import { GuiPromptData, PromptData, PromptItem, SelectedGuiPrompt, SelectedGuiPromptObject } from "@shared/schemas"
import { DEFAULT_FIELDS, DEFAULT_PROMPT_TEXT, GUI_PROMPT_LIST } from "@shared/GUI_PROMPT_LIST"
import { AspectRatioKeys, ratios } from "@utils/aspectRatios"

interface PromptState {
	textPrompt: string
	setTextPrompt: (textPrompt: string) => void

	selectedGuiPromptObject: SelectedGuiPromptObject
	addSelectedGuiPromptObjects: (selectedGuiPrompts: SelectedGuiPromptObject) => void
	updateSelectedGuiPromptObject: (selectedGuiPrompt: SelectedGuiPrompt) => void
	removeSelectedGuiPromptObject: (categoryId: string) => void

	guiPromptList: GuiPromptData[]
	setGuiPromptList: (guiPromptList: GuiPromptData[]) => void

	selectedRatio: AspectRatioKeys
	setSelectedRatio: (ratio: AspectRatioKeys) => void

	promptData: PromptData | null
	setPromptData: (promptData: PromptData) => void

	usedPromptItemsOnPreview: PromptItem[]
	setUsedPromptItemsOnPreview: (promptItems: PromptItem[]) => void

	showAllPrompts: boolean
	setShowAllPrompts: (showAllPrompts: boolean) => void

	hasMore: boolean
	setHasMore: (hasMore: boolean) => void
}
const usePromptStore = create<PromptState>((set) => ({
	textPrompt: DEFAULT_PROMPT_TEXT,
	setTextPrompt: (textPrompt) => set({ textPrompt }),

	selectedGuiPromptObject: {
		style: {
			categoryIndex: 0,
			promptItemIndex: 0,
			categoryId: "style",
			promptItemId: DEFAULT_FIELDS.promptItems[0].promptItemId,
			fields: DEFAULT_FIELDS.promptItems[0].fields,
			// ...DEFAULT_FIELDS,
		},
	},
	addSelectedGuiPromptObjects: (SelectedGuiPromptObject) =>
		set((state) => ({
			selectedGuiPromptObject: {
				...state.selectedGuiPromptObject,
				...SelectedGuiPromptObject,
			},
		})),

	updateSelectedGuiPromptObject: (selectedGuiPrompt) =>
		set((state) => ({
			selectedGuiPromptObject: {
				...state.selectedGuiPromptObject,
				[selectedGuiPrompt.categoryId]: selectedGuiPrompt,
			},
		})),
	removeSelectedGuiPromptObject: (categoryId) =>
		set((state) => {
			const { [categoryId]: _, ...rest } = state.selectedGuiPromptObject
			return { selectedGuiPromptObject: rest }
		}),

	guiPromptList: GUI_PROMPT_LIST,
	setGuiPromptList: (guiPromptList) => set({ guiPromptList }),

	selectedRatio: ratios[0],
	setSelectedRatio: (ratio) => set({ selectedRatio: ratio }),

	promptData: null,
	setPromptData: (promptData) => set({ promptData }),

	usedPromptItemsOnPreview: [],
	setUsedPromptItemsOnPreview: (promptItems) => set({ usedPromptItemsOnPreview: promptItems }),

	showAllPrompts: false,
	setShowAllPrompts: (showAllPrompts) => set({ showAllPrompts }),

	hasMore: true,
	setHasMore: (hasMore) => set({ hasMore }),
}))

export { usePromptStore }
