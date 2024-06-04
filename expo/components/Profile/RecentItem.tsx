// components/RecentItem
import React from "react"
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import { Image } from "expo-image"
import { router } from "expo-router"
import { AntDesign } from "@expo/vector-icons"
import { useAuthStore } from "@store/useAuthStore"
import { pixelSize, SCREEN_WIDTH, pixelWidth } from "@utils/pixels"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"
import { supabase } from "@libs/supabase"
import { PromptData } from "@shared/schemas"
import { usePromptStore } from "@store/promptStore"

interface RecentItemProps {
	promptData: PromptData
	enableSelection: boolean
	onItemDelete?: (promptData: PromptData) => void
	// getRecents: (page: number) => Promise<void>;
	// setMaxLimit: (limit: number) => void;
	// setRecent: React.Dispatch<React.SetStateAction<Item[]>>;
}

export const RecentItem: React.FC<RecentItemProps> = ({
	promptData,
	enableSelection,
	onItemDelete,
	// getRecents,
	// setMaxLimit,
	// setRecent
}) => {
	const user = useAuthStore.getState().user
	const { setPromptData } = usePromptStore()
	const { uploadedImageUrls } = promptData

	return (
		<View style={styles.recentItem}>
			<TouchableOpacity
				onPress={() => {
					HapticsTouch()
					// getRecents(1);

					setPromptData(promptData)
					router.push(`/screens/edit/`)
				}}
				style={styles.recentItem}
			>
				{uploadedImageUrls && uploadedImageUrls[0] ? (
					<Image style={styles.recentItemImage} source={{ uri: uploadedImageUrls[0] }} />
				) : null}
			</TouchableOpacity>
			{enableSelection && (
				<TouchableOpacity onPress={() => onItemDelete && onItemDelete(promptData)} style={styles.deleteButton}>
					<AntDesign name="close" size={pixelSize(12)} color={colors.iconWhite} />
				</TouchableOpacity>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	recentItem: {
		aspectRatio: 1,
		width: (SCREEN_WIDTH - pixelWidth(24) - pixelSize(8)) / 3,
		margin: pixelSize(1),
	},
	recentItemImage: {
		borderRadius: pixelSize(4),
		flex: 1,
		resizeMode: "cover",
	},
	deleteButton: {
		position: "absolute",
		top: 5,
		right: 5,
		zIndex: 1,
		backgroundColor: colors.backgroundSecondary,
		borderRadius: 50,
		padding: 5,
	},
})

export default RecentItem
