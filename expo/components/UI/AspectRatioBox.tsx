import React, { useMemo } from "react"
import { View, StyleSheet } from "react-native"
import { pixelSize } from "@utils/pixels"
import colors from "@utils/colors"

interface AspectRatioBoxProps {
	ratio: string
}

const AspectRatioBox: React.FC<AspectRatioBoxProps> = ({ ratio }) => {
	const [widthRatio, heightRatio] = useMemo(() => ratio.split(":").map(Number), [ratio])
	const maxWidth = 28
	const maxHeight = 28

	const { width, height } = useMemo(() => {
		const calculatedWidth = widthRatio > heightRatio ? maxWidth : (maxWidth * widthRatio) / heightRatio
		const calculatedHeight = heightRatio > widthRatio ? maxHeight : (maxHeight * heightRatio) / widthRatio

		return { width: calculatedWidth, height: calculatedHeight }
	}, [widthRatio, heightRatio])

	return <View style={[styles.aspectRatioBox, { width, height }]} />
}

const styles = StyleSheet.create({
	aspectRatioBox: {
		alignItems: "center",
		borderColor: colors.primary,
		borderRadius: 4,
		borderWidth: pixelSize(3),
		justifyContent: "center",
		margin: 4,
	},
})

export default AspectRatioBox
