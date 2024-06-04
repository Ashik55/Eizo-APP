import React, { useContext, useEffect, useRef, useState } from "react"
import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { router, Stack, useLocalSearchParams } from "expo-router"
import BottomSheet from "@gorhom/bottom-sheet"
import { SafeAreaView } from "react-native-safe-area-context"
import { useIsFocused } from "@react-navigation/native"
import PagerView from "react-native-pager-view"
import { pixelFont, pixelHeight, pixelSize, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
import { aspectRatioAndSize, ratios } from "@utils/aspectRatios"
import { usePromptStore } from "@store/promptStore"
import useCustomSafeAreaInsets from "@utils/useCustomSafeAreaInsets"
import ButtonWithGradient from "@components/UI/ButtonWithGradient"
import Header, { HeaderText } from "@components/UI/Header"
import AspectRatioBox from "@components/UI/AspectRatioBox"
import ButtonScale from "@components/UI/ButtonScale"
import { useAuthStore } from "@store/useAuthStore"
import useApi from "@api/request"
import BackButton from "@components/UI/BackButton"
import { SubscriptionContext } from "@context/SubscriptionContext"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"
import { Fields, GenerateImageRequestBody, GuiPromptData } from "@shared/schemas"
import { DEFAULT_FIELDS } from "@shared/GUI_PROMPT_LIST"
import { GuiPromptBottomSheet } from "@components/UI/GuiPromptBottomSheet"
import SelectedGuiPromptList from "@components/UI/SelectedGuiPromptList"
import CreateScreenCategoryHeaderText from "@components/UI/CreateScreenCategoryHeaderText"
import { adUnitId, extractPrompt, extractPromptItemIds } from "@utils/utils"
import { useInterstitialAd } from "react-native-google-mobile-ads"
import Loading from "@components/loading/Loading"

type RatioButtonProps = {
	ratio: string
	isSelected: boolean
	onSelect: () => void
}

const RATIO_BUTTON_SIZE = (SCREEN_WIDTH - pixelWidth(32) - pixelWidth(6) * 5) / 6
const RatioButton: React.FC<RatioButtonProps> = ({ ratio, isSelected, onSelect }) => (
	<View style={{ alignItems: "center" }}>
		<ButtonScale onPress={onSelect} style={[styles.ratioButton, isSelected && styles.selectedRatioButton]}>
			<AspectRatioBox ratio={ratio} />
		</ButtonScale>
		<Text style={[styles.ratioText, { color: isSelected ? colors.upvote : colors.textLightGray }]}>{ratio}</Text>
	</View>
)

export default function CreateScreen() {
	const fastPass = useAuthStore((state) => state.fastPass)
	const handleFastPass = useAuthStore((state) => state.setFastPass)
	const { generateImage, getSubscriptionStatus, getGuiPromptList, getPrompt } = useApi()
	const { id, redirect } = useLocalSearchParams()
	const [promptFromTextInput, setPromptFromTextInput] = useState("")
	const insets = useCustomSafeAreaInsets()
	const [pageIndex, setPageIndex] = useState(0)
	const pageRef = useRef<PagerView>(null)
	const isFocused = useIsFocused()
	const guiPromptBottomSheetRef = useRef<BottomSheet>(null)
	const user = useAuthStore().user
	const {
		textPrompt,
		setTextPrompt,
		selectedGuiPromptObject,
		updateSelectedGuiPromptObject,
		guiPromptList,
		setGuiPromptList,
		removeSelectedGuiPromptObject,
		selectedRatio,
		setSelectedRatio,
		setPromptData,
		showAllPrompts,
	} = usePromptStore()
	const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId)
	const [isGenerating, setIsGenerating] = useState(false)

	const { subscription, loading, refetchSubscriptionStatus } = useContext(SubscriptionContext)

	useEffect(() => {
		// Start loading the interstitial straight away
		load()
	}, [load])

	useEffect(() => {
		if (isClosed) {
			// Action after the ad is closed
			// navigation.navigate('NextScreen');
		}
	}, [isClosed])

	useEffect(() => {
		;(async () => {
			await setupInitialPrompt()
		})()
	}, [])

	// const loadInterstitial = () => {
	// 	console.log("Loading inter ads")
	// 	const unsubscribeLoaded = interstitialRef.addAdEventListener(
	// 		// RewardedAdEventType.LOADED,
	// 		AdEventType.LOADED,
	// 		() => {
	// 			console.log("Inter ads loaded")
	// 			// You can also use state here to observe whether the Ads is loaded or not
	// 		},
	// 	)
	//
	// 	const unsubscribeClosed = interstitialRef.addAdEventListener(AdEventType.CLOSED, () => {
	// 		console.log("Rewarded ads closed")
	// 		// rewardedRef.load()
	// 	})
	//
	// 	interstitialRef.load()
	//
	// 	return () => {
	// 		unsubscribeLoaded()
	// 		unsubscribeClosed()
	// 	}
	// }

	// useEffect(() => {
	// 	const unsubscribeInterstitialEvents = loadInterstitial()
	// 	return () => {
	// 		unsubscribeInterstitialEvents()
	// 	}
	// }, [])

	// useEffect(() => {
	// 	if (isClosed && !isGenerating) {
	// 		// Action after the ad is closed and image generation is complete
	// 		router.push("/screens/edit/")
	// 	}
	// }, [isClosed, isGenerating, router])

	const setupInitialPrompt = async () => {
		const res = await getGuiPromptList()
		if (!res.ok) {
			console.error("Error getting prompt list")
			return
		}
		const guiPromptList = res.data as GuiPromptData[]
		setGuiPromptList(guiPromptList)

		const categoryId = guiPromptList[0].categoryId
		const promptItemId = guiPromptList[0].promptItems[0].promptItemId
		const fields = guiPromptList[0].promptItems[0].fields

		if (!selectedGuiPromptObject["style"]) {
			updateSelectedGuiPromptObject({
				categoryIndex: 0,
				promptItemIndex: 0,
				categoryId: categoryId,
				promptItemId: promptItemId,
				fields: (fields as Fields) ?? DEFAULT_FIELDS,
			})
		}
	}

	const onPressCreate = async () => {
		HapticsTouch()

		if (!user) {
			return router.push({
				pathname: "/screens/account/login",
				params: {
					redirect: "/screens/creating",
				},
			})
		}

		setIsGenerating(true)
		const finalPrompt = extractPrompt(selectedGuiPromptObject, textPrompt)

		console.log("selectedGuiPromptObject", JSON.stringify(selectedGuiPromptObject, null, 2))

		const fields = selectedGuiPromptObject["style"].fields
		if (fields) {
			fields.prompt = finalPrompt
			fields.width = aspectRatioAndSize[selectedRatio].width
			fields.height = aspectRatioAndSize[selectedRatio].height
		}

		if (fields?.hiresFix) {
			fields.hiresFix.targetWidth = aspectRatioAndSize[selectedRatio].width * 2
			fields.hiresFix.targetHeight = aspectRatioAndSize[selectedRatio].height * 2
		}

		const stylePromptItemId = selectedGuiPromptObject["style"].promptItemId

		const generatedImageParams: GenerateImageRequestBody = {
			stylePromptItemId: stylePromptItemId,
			fields: fields as Fields,
			textPrompt: textPrompt,
			selectedRatio: selectedRatio,
			selectedCategoryAndPromptItem: extractPromptItemIds(selectedGuiPromptObject),
			skipAds: fastPass,
		}

		if (isLoaded && !showAllPrompts) {
			show()
		}

		generateImage(generatedImageParams).then((response) => {
			const resData = response.data
			setPromptData(resData)
			setIsGenerating(false)

			router.push("/screens/edit/")
		})
	}

	const onPressPlusButton = () => {
		HapticsTouch()
		guiPromptBottomSheetRef.current?.expand()
		pageRef?.current?.setPage(pageIndex + 1)
	}

	return (
		<TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Stack.Screen
					options={{
						headerShown: false,
						animation: "slide_from_bottom",
					}}
				/>

				<SafeAreaView edges={["top"]} style={{ flex: 1, justifyContent: "space-between" }}>
					{/* main content */}
					<View>
						<Header
							LeftComponent={
								<BackButton
									style={{ marginLeft: pixelWidth(12) }}
									onPress={() => {
										HapticsTouch()
										if (redirect) {
											router.push("/(tabs)")
										} else {
											router.back()
										}
									}}
								/>
							}
							CenterComponent={<HeaderText text={"Create"} />}
						/>

						<CreateScreenCategoryHeaderText text={"Easy"} boldText={"Model"} />

						<SelectedGuiPromptList
							selectedGuiPromptObject={selectedGuiPromptObject}
							guiPromptList={guiPromptList}
							setPageIndex={setPageIndex}
							pageRef={pageRef}
							guiPromptBottomSheetRef={guiPromptBottomSheetRef}
							removeSelectedGuiPromptObject={removeSelectedGuiPromptObject}
							onPressPlusButton={onPressPlusButton}
						/>

						<CreateScreenCategoryHeaderText
							text={"Custom"}
							boldText={"Prompt"}
							style={{
								marginTop: pixelHeight(20),
								marginBottom: pixelHeight(8),
							}}
						/>

						<TextInput
							style={styles.textInput}
							placeholder="Type your imagination..."
							placeholderTextColor={colors.textWhiteGray}
							value={textPrompt}
							onChangeText={setTextPrompt}
							multiline
						/>

						<CreateScreenCategoryHeaderText
							text={"Canvas"}
							boldText={"Ratio"}
							style={{
								marginTop: pixelHeight(20),
							}}
						/>

						<View style={styles.ratioSelector}>
							{ratios.map((ratio) => (
								<RatioButton
									key={ratio}
									ratio={ratio}
									isSelected={selectedRatio === ratio}
									onSelect={() => {
										HapticsTouch()
										setSelectedRatio(ratio)
									}}
								/>
							))}
						</View>
					</View>

					{/* footer area */}
					<View style={[styles.bottomAreaContainer, { paddingBottom: insets.bottom }]}>
						<ButtonWithGradient
							onPress={onPressCreate}
							buttonText={"Create"}
							buttonStyle={{ marginBottom: pixelWidth(12) }}
							subText={subscription ? null : "Watch Ads"}
							// rightComponent={
							//   fastPass ? (
							//     <View style={styles.buttonRightConponent}>
							//       <FontAwesome6
							//         name="coins"
							//         size={pixelFont(16)}
							//         color={colors.textWhite}
							//       />
							//       <Text style={styles.coinPriceText}>
							//         60
							//       </Text>
							//     </View>
							//   ) : null
							// }
						/>
						{/*{!loading ? (*/}
						{/*  <ButtonWithGradient*/}
						{/*    onPress={onPressCreate}*/}
						{/*    buttonText={"Create"}*/}
						{/*    buttonStyle={{ marginBottom: pixelWidth(12)}}*/}
						{/*    subText={subscription ? null : "Watch Ads"}*/}
						{/*    rightComponent={*/}
						{/*      fastPass ? (*/}
						{/*        <View style={styles.buttonRightConponent}>*/}
						{/*          <FontAwesome6*/}
						{/*            name="coins"*/}
						{/*            size={pixelFont(16)}*/}
						{/*            color={colors.textWhite}*/}
						{/*          />*/}
						{/*          <Text style={styles.coinPriceText}>*/}
						{/*            60*/}
						{/*          </Text>*/}
						{/*        </View>*/}
						{/*      ) : null*/}
						{/*    }*/}
						{/*  />*/}
						{/*) : (*/}
						{/*  <ActivityIndicator color={"white"} />*/}
						{/*)}*/}
						{/*{subscription ? null : (*/}
						{/*  <ToggleSwitch*/}
						{/*    isActive={fastPass}*/}
						{/*    onToggle={handleFastPass}*/}
						{/*    rightText={"Fast Pass"}*/}
						{/*    />*/}
						{/*)}*/}
					</View>
				</SafeAreaView>

				<GuiPromptBottomSheet
					pageRef={pageRef}
					pageIndex={pageIndex}
					setPageIndex={setPageIndex}
					guiPromptBottomSheetRef={guiPromptBottomSheetRef}
				/>

				{isGenerating && <Loading />}
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		flex: 1,
	},
	loadingOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.black50Alpha,
	},
	ratioButton: {
		alignItems: "center",
		borderColor: colors.textLightGray,
		borderRadius: pixelSize(8),
		borderWidth: pixelSize(3),
		height: RATIO_BUTTON_SIZE,
		justifyContent: "center",
		width: RATIO_BUTTON_SIZE,
	},
	ratioSelector: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: pixelHeight(20),
		marginHorizontal: pixelWidth(16),
		marginTop: pixelHeight(8),
	},
	ratioText: {
		color: colors.textLightGray,
		fontSize: pixelFont(16),
		fontWeight: "500",
		marginTop: pixelHeight(4),
	},
	selectedRatioButton: {
		borderColor: colors.upvote,
	},
	textInput: {
		borderColor: colors.textWhite,
		borderRadius: pixelSize(8),
		borderWidth: 2,
		color: colors.textWhite,
		fontSize: pixelFont(14),
		height: pixelHeight(100),
		marginBottom: pixelHeight(20),
		marginHorizontal: pixelWidth(16),
		paddingBottom: pixelHeight(8),
		paddingHorizontal: pixelWidth(12),
		paddingTop: pixelHeight(8),
		textAlignVertical: "top",
	},
	bottomAreaContainer: {
		backgroundColor: colors.backgroundSecondary,
		paddingTop: pixelHeight(16),
	},
})
