import React, { FC, RefObject, useCallback, useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import useCustomSafeAreaInsets from "@utils/useCustomSafeAreaInsets"
import { pixelHeight, pixelSize, pixelWidth, SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils/pixels"
import { HEADER_HEIGHT } from "@components/UI/Header"
import ImageStyle, { STYLE_IMAGE_SIZE } from "@components/UI/ImageStyle"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { ScrollView } from "react-native-gesture-handler"

const styleTabs = [
	{
		text: "style",
		component: <FontAwesome name="paint-brush" size={24} color={colors.iconGray} />,
	},
	{
		text: "style",
		component: <FontAwesome name="paint-brush" size={24} color={colors.iconGray} />,
	},
	{
		text: "style",
		component: <FontAwesome name="paint-brush" size={24} color={colors.iconGray} />,
	},
]

export const GalleryBottomSheet: FC<{
	setRef: RefObject<BottomSheet>
	data: any
	handleBottomSheetClose: () => void
}> = ({ setRef, data, handleBottomSheetClose }) => {
	const { top } = useCustomSafeAreaInsets()

	const bottomSheetHeight = data?.height || SCREEN_HEIGHT - top
	const snapPoints = useMemo(() => [bottomSheetHeight], [])

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		if (index == -1) {
			handleBottomSheetClose()
		}
	}, [])

	return (
		<BottomSheet
			ref={setRef}
			index={-1}
			style={{
				backgroundColor: "red",
			}}
			// containerStyle={{
			//   backgroundColor: "blue",
			// }}
			handleStyle={{
				backgroundColor: "green",
			}}
			handleIndicatorStyle={{
				backgroundColor: "yellow",
			}}
			backgroundStyle={{
				borderTopRightRadius: 0,
				borderTopLeftRadius: 0,
				backgroundColor: colors.backgroundSecondary,
			}}
			snapPoints={snapPoints}
			handleComponent={() => <View style={{ height: pixelSize(0), backgroundColor: "red" }} />}
			handleHeight={pixelSize(20)}
			onChange={handleSheetChanges}
			enablePanDownToClose={true}
		>
			<View style={styles.contentContainer}>
				<View
					style={{
						width: 50,
						height: 6,
						backgroundColor: "white",
						borderRadius: 20,
						marginTop: 10,
					}}
				/>
				<View
					style={{
						flex: 1,
						width: SCREEN_WIDTH,
					}}
				>
					{data?.component}
				</View>
			</View>
		</BottomSheet>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: colors.background,
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.background,
	},
	tabContainer: {
		justifyContent: "center",
		backgroundColor: "red",
		flex: 1,
	},
})
