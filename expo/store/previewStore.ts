import { create } from "zustand"
import { PromptData, PublishedImage } from "@shared/schemas"

interface PreviewState {
	publishedImage: PublishedImage | null
	setPublishedImage: (publicImage: PublishedImage) => void
	promptData: PromptData | null
	setPromptData: (promptData: PromptData) => void
}

const usePreviewStore = create<PreviewState>((set) => ({
	publishedImage: null,
	setPublishedImage: (publishedImage) => set({ publishedImage }),
	promptData: null,
	setPromptData: (promptData) => set({ promptData }),
}))

export default usePreviewStore
