import React, { FC, RefObject, useMemo } from "react"
import { StyleSheet, View } from "react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import useCustomSafeAreaInsets from "@utils/useCustomSafeAreaInsets"
import { pixelHeight, pixelSize, SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils/pixels"
import { HEADER_HEIGHT } from "./Header"
import { STYLE_IMAGE_SIZE } from "@components/UI/ImageStyle"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"
import PagerView from "react-native-pager-view"
import GuiPromptGridView from "./GuiPromptGridView"
import { usePromptStore } from "@store/promptStore"
import { SelectedGuiPromptObject } from "@shared/schemas"
import TabScrollView from "./TabScrollView"
import CheckButton from "./CheckButtonForGuiPromptBottomSheet"

interface ModelBottomSheetProps {
	guiPromptBottomSheetRef: RefObject<BottomSheet>
	pageIndex: number
	setPageIndex: (index: number) => void
	pageRef: RefObject<PagerView>
}

export const GuiPromptBottomSheet: FC<ModelBottomSheetProps> = ({
	guiPromptBottomSheetRef,
	setPageIndex,
	pageIndex,
	pageRef,
}) => {
	const { top } = useCustomSafeAreaInsets()
	const bottomSheetHeight =
		SCREEN_HEIGHT - top - HEADER_HEIGHT - STYLE_IMAGE_SIZE - pixelSize(36) - pixelSize(20) - pixelSize(8)

	const { selectedGuiPromptObject, guiPromptList } = usePromptStore()

	const snapPoints = useMemo(() => [bottomSheetHeight], [bottomSheetHeight])

	return (
		<BottomSheet
			ref={guiPromptBottomSheetRef}
			index={-1}
			backgroundStyle={styles.bottomSheetBackground}
			snapPoints={snapPoints}
			handleComponent={() => <View style={styles.handleComponent} />}
			handleHeight={pixelSize(20)}
			enablePanDownToClose={true}
		>
			<View style={styles.contentContainer}>
				<View style={styles.barContainer}>
					<TabScrollView
						guiPromptList={guiPromptList}
						selectedGuiPromptObject={selectedGuiPromptObject}
						pageIndex={pageIndex}
						setPageIndex={setPageIndex}
						pageRef={pageRef}
					/>
					<CheckButton
						onPress={() => {
							HapticsTouch()
							guiPromptBottomSheetRef.current?.close()
						}}
					/>
				</View>

				<PagerView
					ref={pageRef}
					style={styles.viewPager}
					initialPage={pageIndex}
					onPageSelected={(e) => {
						HapticsTouch()
						const pageIndex = e.nativeEvent.position
						setPageIndex(pageIndex)
					}}
					scrollEnabled={true}
				>
					{Object.entries(guiPromptList).map(([cateIndex, item]) => {
						const categoryId = item.categoryId
						const categoryIndex = Number(cateIndex)
						return (
							<View style={styles.page} key={cateIndex}>
								<GuiPromptGridView
									selectedPromptItemIndex={getOptionIndexByCategoryIndex(selectedGuiPromptObject, categoryId)}
									categoryIndex={categoryIndex}
								/>
							</View>
						)
					})}
				</PagerView>
			</View>
		</BottomSheet>
	)
}

function getOptionIndexByCategoryIndex(
	selectedGuiPromptObject: SelectedGuiPromptObject,
	categoryId: string,
): number | null {
	return selectedGuiPromptObject[categoryId]?.promptItemIndex ?? null
}

const styles = StyleSheet.create({
	barContainer: {
		backgroundColor: colors.backgroundSecondary,
		height: pixelHeight(56),
	},
	bottomSheetBackground: {
		backgroundColor: colors.backgroundTertiary,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},

	contentContainer: {
		alignItems: "center",
		flex: 1,
	},
	handleComponent: {
		backgroundColor: colors.upvote,
		height: pixelSize(0),
	},
	page: {
		alignItems: "center",
		justifyContent: "center",
	},
	viewPager: {
		flex: 1,
		width: SCREEN_WIDTH,
	},
})
