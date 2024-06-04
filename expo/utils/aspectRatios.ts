const maxWidth = 512
const maxHeight = 512

interface Size {
	width: number
	height: number
}

export type AspectRatios = {
	[key in "1:1" | "2:3" | "3:4" | "9:16" | "4:3" | "16:9"]: Size
}

export type AspectRatioKeys = keyof AspectRatios

export const ratios: AspectRatioKeys[] = ["1:1", "2:3", "3:4", "9:16", "4:3", "16:9"]

// export const getAspectRatioSize = (maxWidth: number = 512, maxHeight: number = 512): AspectRatios => {
//   return {
//     "1:1": calculateSize(1, 1, maxWidth, maxHeight),
//     "2:3": calculateSize(2, 3, maxWidth, maxHeight),
//     "3:4": calculateSize(3, 4, maxWidth, maxHeight),
//     "9:16": calculateSize(9, 16, maxWidth, maxHeight),
//     "4:3": calculateSize(4, 3, maxWidth, maxHeight),
//     "16:9": calculateSize(16, 9, maxWidth, maxHeight)
//   }
// };

export const aspectRatioAndSize = {
	"1:1": { width: 512, height: 512 },
	"2:3": { width: 512, height: 768 },
	"3:4": { width: 512, height: 680 },
	"9:16": { width: 504, height: 896 },
	"4:3": { width: 680, height: 512 },
	"16:9": { width: 912, height: 512 },
}

export const aspectRatios: AspectRatios = {
	"1:1": {
		width: Math.min(maxWidth, maxHeight),
		height: Math.min(maxWidth, maxHeight),
	},
	"2:3": calculateSize(2, 3, maxWidth, maxHeight),
	"3:4": calculateSize(3, 4, maxWidth, maxHeight),
	"9:16": calculateSize(9, 16, maxWidth, maxHeight),
	"4:3": calculateSize(4, 3, maxWidth, maxHeight),
	"16:9": calculateSize(16, 9, maxWidth, maxHeight),
}

// Calculates the optimal size of an element based on the given aspect ratio and maximum dimensions
export function calculateSize(widthRatio: number, heightRatio: number, maxWidth: number, maxHeight: number): Size {
	const aspectRatio = widthRatio / heightRatio
	let width = maxWidth
	let height = Math.round(width / aspectRatio)

	if (height > maxHeight) {
		height = maxHeight
		width = Math.round(height * aspectRatio)
	}

	// 幅と高さを8の倍数に丸める
	width = Math.round(width / 8) * 8
	height = Math.round(height / 8) * 8

	return { width, height }
}
