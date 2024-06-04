import React, { useState, useEffect } from "react"
import { ImageBackground, StyleSheet, Dimensions, ImageSourcePropType, View, Image } from "react-native"

const screenWidth = Dimensions.get("window").width

interface ResizableImageProps {
	source: ImageSourcePropType
}

const ResizableImage: React.FC<ResizableImageProps> = ({ source }) => {
	const [imageSize, setImageSize] = useState({
		width: screenWidth - 24,
		height: 720,
		borderRadius: 12,
	}) // デフォルトサイズ

	useEffect(() => {
		if (typeof source === "object" && "uri" in source) {
			// sourceがImageURISource型の場合
			const uri = source.uri
			Image.getSize(
				uri,
				(width, height) => {
					const aspectRatio = width / height
					console.log("aspectRatio:", aspectRatio)
					console.log("width:", screenWidth - 24)
					console.log("height:", (screenWidth - 24) / aspectRatio)
					if (aspectRatio > 1) {
						// 横の方が長い場合
						setImageSize({
							width: screenWidth - 24,
							height: (screenWidth - 24) / aspectRatio,
							borderRadius: 12,
						})
					} else {
						// 縦の方が長い場合
						setImageSize({
							width: 720 * aspectRatio,
							height: 720,
							borderRadius: 12,
						})
					}
				},
				(error) => {
					console.error("ImageBackground getSize error:", error)
				},
			)
		}
	}, [source])

	return (
		<View style={[styles.wrapper, imageSize]}>
			<ImageBackground source={source} resizeMode="contain" style={[styles.image, imageSize]}>
				{/* ここに子コンポーネントを配置できます */}
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		borderRadius: 12,
		height: 300,
		width: 300,
	},
	wrapper: {
		borderRadius: 12,
		overflow: "hidden",
	},
})

export default ResizableImage
