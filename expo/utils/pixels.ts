import { PixelRatio, Dimensions } from "react-native"

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

const widthBaseScale = SCREEN_WIDTH / 375
const heightBaseScale = SCREEN_HEIGHT / 812 //860

const normalize = (size: number, based = "width") => {
	const newSize = based === "height" ? size * heightBaseScale : size * widthBaseScale
	return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

//for width  pixel
const pixelWidth = (size: number) => {
	return normalize(size, "width")
}
//for height  pixel
const pixelHeight = (size: number) => {
	return normalize(size, "height")
}
//for font  pixel
const pixelFont = (size: number) => {
	return size
}
//for letter spacing
const pixelLetterSpacing = (size: number) => {
	return size * widthBaseScale
}
//for icon size
const pixelSize = (size: number) => {
	return normalize(size, "height")
}
//for letter height
const pixelLetterHeight = (size: number) => {
	return size
}

export { pixelWidth, pixelHeight, pixelFont, pixelLetterSpacing, pixelSize, pixelLetterHeight }
