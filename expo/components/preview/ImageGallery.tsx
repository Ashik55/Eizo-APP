import React, { useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import ButtonScale from "@components/UI/ButtonScale"
import { FontAwesome6 } from "@expo/vector-icons"
import { pixelHeight, pixelSize, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"
import { blurhashes } from "@utils/blurhashes"
import { Image } from "expo-image"
import { usePromptStore } from "@store/promptStore"
import Carousel from "react-native-snap-carousel"
import { downloadImage } from "@utils/fileUtils"

interface GalleryNewProps {
	gridView: boolean
	handleGridView: (value: boolean) => void
}

const maxWidth = SCREEN_WIDTH - pixelWidth(80)

const ImageGallery: React.FC<GalleryNewProps> = ({ gridView, handleGridView }) => {
	const carouselRef = useRef<Carousel<any>>()
	const [currentIndex, setCurrentIndex] = useState(0)
	const [imageHeightCalc, setImageHeightCalc] = useState(0)
	const { promptData } = usePromptStore()

	const selectedRatio = promptData?.guiPrompts?.selectedRatio || "1:1"
	const { imageWidth, imageHeight } = calculateDimensions(selectedRatio, maxWidth, imageHeightCalc - pixelHeight(100))

	const imageUrls = promptData?.uploadedImageUrls ?? []

	return (
		<>
			<View
				onLayout={(e) => {
					setImageHeightCalc(e.nativeEvent.layout.height)
				}}
				style={{
					flex: 1,
					display: gridView ? "none" : "flex",
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
					}}
				>
					<View>
						<Carousel
							// @ts-ignore
							ref={carouselRef}
							data={imageUrls}
							layout={"default"}
							sliderWidth={SCREEN_WIDTH}
							itemWidth={SCREEN_WIDTH * 0.8}
							onSnapToItem={(index) => {
								setCurrentIndex(index)
							}}
							renderItem={({ item, index }) => {
								return (
									<View
										key={index}
										style={[
											styles.mainImageContainer,
											{
												width: imageWidth,
												height: imageHeight,
											},
										]}
									>
										<Image
											style={[
												styles.mainImage,
												{
													width: imageWidth,
													height: imageHeight,
												},
											]}
											source={{ uri: item }}
											placeholder={blurhashes()}
											transition={500}
										/>
										<ButtonScale
											onPress={async () => {
												HapticsTouch()
												downloadImage(item)
											}}
											style={styles.shareButton}
										>
											<FontAwesome6 name="download" size={16} color="white" />
										</ButtonScale>
									</View>
								)
							}}
						/>
					</View>
				</View>

				{/*72*/}
				<View style={styles.imageListContainer}>
					{imageUrls?.map((imageUrl, index) => {
						return (
							<ButtonScale
								key={index}
								onPress={() => {
									HapticsTouch()
									if (carouselRef.current) {
										carouselRef.current.snapToItem(index)
									}
								}}
								style={[
									styles.smallImageContainer,
									{
										borderColor: currentIndex == index ? colors.upvote : colors.transparent,
									},
								]}
							>
								<Image
									style={styles.smallImage}
									source={{ uri: imageUrl }}
									placeholder={blurhashes()}
									transition={500}
								/>
							</ButtonScale>
						)
					})}
				</View>
			</View>

			<View
				style={[
					styles.gridViewContainer,
					{
						display: gridView ? "flex" : "none",
						flex: 1,
					},
				]}
			>
				<View
					style={[
						styles.gridViewImagesContainer,
						{
							flexWrap: imageUrls.length > 2 ? "wrap" : "nowrap",
						},
					]}
				>
					{imageUrls.map((imageUrl, index) => {
						return (
							<ButtonScale
								key={index}
								onPress={() => {
									HapticsTouch()
									if (carouselRef.current) {
										carouselRef.current?.snapToItem(index)
									}
									handleGridView(false)
								}}
								style={[
									styles.gridViewImageContainer,
									{
										borderColor: currentIndex == index ? colors.upvote : colors.transparent,
									},
								]}
							>
								<Image
									style={styles.gridViewImage}
									source={{ uri: imageUrl }}
									placeholder={blurhashes()}
									transition={500}
								/>
							</ButtonScale>
						)
					})}
				</View>
			</View>
		</>
	)
}

export default ImageGallery

const styles = StyleSheet.create({
	mainImageContainer: {
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	mainImage: {
		resizeMode: "cover",
		borderRadius: pixelSize(8),
	},
	shareButton: {
		position: "absolute",
		bottom: pixelSize(12),
		right: pixelSize(12),
		width: pixelSize(32),
		height: pixelSize(32),
		borderRadius: pixelSize(10),
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.black50Alpha,
	},
	imageListContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: pixelHeight(14),
		gap: pixelWidth(6),
		height: pixelHeight(72),
	},
	smallImageContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderWidth: pixelSize(2),
		borderRadius: pixelSize(6),
		overflow: "hidden",
	},
	smallImage: {
		resizeMode: "cover",
		width: pixelSize(44),
		height: pixelSize(44),
		borderRadius: pixelSize(4),
	},
	gridViewImage: {
		resizeMode: "cover",
		width: (SCREEN_WIDTH - pixelWidth(20)) / 2,
		height: (SCREEN_WIDTH - pixelWidth(20)) / 2,
		borderRadius: pixelSize(8),
	},
	gridViewImageContainer: {
		width: (SCREEN_WIDTH - pixelWidth(20)) / 2,
		height: (SCREEN_WIDTH - pixelWidth(20)) / 2,
		borderWidth: 1,
		borderRadius: pixelSize(8),
		overflow: "hidden",
	},
	gridViewImagesContainer: {
		flexDirection: "row",
		gap: pixelSize(2),
		width: SCREEN_WIDTH - pixelWidth(18),
	},
	gridViewContainer: {
		height: SCREEN_WIDTH,
		justifyContent: "center",
		alignItems: "center",
	},
})

function calculateDimensions(aspectRatio: string, maxWidth: number, maxHeight: number) {
	const [aspectWidth, aspectHeight] = aspectRatio.split(":").map(Number)
	const imageWidth = Math.min(maxWidth, Math.floor((maxHeight * aspectWidth) / aspectHeight))
	const imageHeight = Math.min(maxHeight, Math.floor((maxWidth * aspectHeight) / aspectWidth))
	return { imageWidth, imageHeight }
}
