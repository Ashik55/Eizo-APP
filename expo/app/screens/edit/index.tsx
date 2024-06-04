import React, { useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import useCustomSafeAreaInsets from "@utils/useCustomSafeAreaInsets"
import BottomSheet from "@gorhom/bottom-sheet"
import BackButton from "@components/UI/BackButton"
import ImageGallery from "@components/preview/ImageGallery"
import EditOptions from "@components/preview/EditOptions"
import { pixelWidth } from "@utils/pixels"
import Header from "@components/UI/Header"
import colors from "@utils/colors"
import { usePromptStore } from "@store/promptStore"
import { aspectRatios } from "@utils/aspectRatios"
import { undefined } from "zod"
import useApi from "@api/request"
import ButtonWithGradient from "@components/UI/ButtonWithGradient"
import { HapticsTouch } from "@utils/haptics"

export default function EditScreen() {
	const [curPage, setCurPage] = useState(0)
	const totalPage = 2
	const modelBottomSheetRef = useRef<BottomSheet>(null)
	const [bottomSheetContent, setBottomSheetContent] = useState(null)
	const { top, bottom } = useCustomSafeAreaInsets()
	const [gridView, setGridView] = useState(false)
	const { updatePublicStatus } = useApi()
	const { promptData, setPromptData } = usePromptStore()
	const promptId = promptData?.id || undefined
	const selectedAspectRatio = promptData?.guiPrompts?.selectedRatio || "1:1"
	// @ts-ignore
	const { width: imageWidth, height: imageHeight } = aspectRatios[selectedAspectRatio]
	const isPublic = promptData?.public || false

	const router = useRouter()

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: false,
					animation: "slide_from_bottom",
				}}
			/>
			<SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
				{/* main content */}
				<Header
					LeftComponent={
						<BackButton
							style={{ marginLeft: pixelWidth(12) }}
							isXmark={true}
							onPress={() => {
								HapticsTouch()
								router.back()
							}}
						/>
					}
					// RightComponent={
					//   <ToggleSwitch
					//     isActive={isPublic}
					//     onToggle={(value) => {
					//       HapticsTouch();
					//       if (promptData && promptId) {
					//         setPromptData({
					//           ...promptData,
					//           public: value
					//         });
					//         updatePublicStatus(promptId, value)
					//       }
					//     }}
					//     leftText={"Public"}
					//   />
					// }
				/>
				<View style={{ flex: 1 }}>
					<ImageGallery handleGridView={(val) => setGridView(val)} gridView={gridView} />

					{/*<ButtonWithGradient*/}
					{/*	onPress={onPress}*/}
					{/*	buttonText={"Save"}*/}
					{/*	buttonStyle={{ marginBottom: pixelWidth(12) }}*/}
					{/*/>*/}

					{/*46*/}
					{/*<View style={styles.viewOptionRowContainer}>*/}
					{/*  <ViewTypeSwitch*/}
					{/*    gridView={gridView}*/}
					{/*    switchType={(val) => {*/}
					{/*      HapticsTouch();*/}
					{/*      setGridView(val);*/}
					{/*    }}*/}
					{/*  />*/}
					{/*</View>*/}

					{/*88*/}
					{/*<EditOptions*/}
					{/*	// promptData={promptData}*/}
					{/*	handleBottomSheetContent={(data) => {*/}
					{/*		setBottomSheetContent(data)*/}
					{/*	}}*/}
					{/*/>*/}

					{/*48*/}
					{/*<Pagination*/}
					{/*  gotoPage={(val) => setCurPage(val)}*/}
					{/*  curPage={curPage}*/}
					{/*  totalPage={totalPage}*/}
					{/*/>*/}
				</View>
			</SafeAreaView>
			{/*{bottomSheetContent && (*/}
			{/*  <GalleryBottomSheet*/}
			{/*    key={bottomSheetContent?.height}*/}
			{/*    handleBottomSheetClose={() => {*/}
			{/*      setBottomSheetContent(null);*/}
			{/*      modelBottomSheetRef?.current?.forceClose();*/}
			{/*    }}*/}
			{/*    setRef={modelBottomSheetRef}*/}
			{/*    data={bottomSheetContent}*/}
			{/*  />*/}
			{/*)}*/}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		flex: 1,
	},
	viewOptionRowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: pixelWidth(12),
		marginBottom: pixelWidth(18),
	},
})
