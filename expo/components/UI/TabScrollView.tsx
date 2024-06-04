import React from "react"
import { ScrollView, View, Text, StyleSheet } from "react-native"
import ButtonScale from "@components/UI/ButtonScale"
import CategoryIcon from "./CategoryIcon"
import { pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"
import { GuiPromptData, SelectedGuiPromptObject } from "@shared/schemas"

interface TabScrollViewProps {
	guiPromptList: GuiPromptData[]
	selectedGuiPromptObject: SelectedGuiPromptObject
	pageIndex: number
	setPageIndex: (index: number) => void
	pageRef: React.RefObject<any>
}

const TabScrollView: React.FC<TabScrollViewProps> = ({
	guiPromptList,
	selectedGuiPromptObject,
	pageIndex,
	setPageIndex,
	pageRef,
}) => {
	const iconColor = (index: number) => {
		return index === pageIndex ? colors.iconWhite : colors.iconGray
	}

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollViewContainer}>
			<View style={styles.tabContainer}>
				{Object.entries(guiPromptList).map(([key, item], index) => (
					<ButtonScale
						onPress={() => {
							HapticsTouch()
							setPageIndex(index)
							pageRef.current?.setPage(index)
						}}
						key={key}
						style={styles.tabItem}
					>
						<CategoryIcon color={iconColor(index)} categoryId={guiPromptList[index].categoryId} />

						{item.promptType && (
							<Text style={styles.tabText} numberOfLines={1} ellipsizeMode="tail">
								{item.promptType}
							</Text>
						)}
						{item.categoryId in selectedGuiPromptObject ? <View style={styles.selectedTabDot} /> : null}
					</ButtonScale>
				))}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	tabContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	tabItem: {
		alignItems: "center",
		justifyContent: "flex-end",
		width: pixelSize(56),
	},
	tabScrollViewContainer: {
		paddingRight: pixelWidth(56),
	},
	tabText: {
		color: colors.iconGray,
		fontSize: pixelSize(10),
		marginTop: pixelSize(4),
	},
	selectedTabDot: {
		backgroundColor: colors.upvote,
		borderRadius: pixelSize(2),
		height: pixelSize(4),
		position: "absolute",
		right: pixelWidth(8),
		top: pixelHeight(0),
		width: pixelSize(4),
	},
})

export default TabScrollView
