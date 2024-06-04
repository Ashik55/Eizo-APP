import { create } from "zustand"
import { PublishedImage } from "@shared/schemas"

interface EditState {
	publishedImage: PublishedImage | null
	setPublishedImage: (publishedImage: PublishedImage) => void
}
const usePromptStore = create<EditState>((set) => ({
	publishedImage: null,
	setPublishedImage: (publishedImage) => set({ publishedImage }),
}))

export { usePromptStore }
