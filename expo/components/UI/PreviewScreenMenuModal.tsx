import React from "react"
import { Modal, Pressable, View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native"
import { AntDesign, FontAwesome6 } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import colors from "@utils/colors"
import { pixelFont, pixelSize } from "@utils/pixels"
import { PromptData } from "@shared/schemas"
import { HapticsTouch } from "@utils/haptics"

const DropDownMenu = ({ label, onPress, icon }: { label: string; onPress: () => void; icon: string }) => {
	return (
		<View style={styles.dropDownMenuWrapper}>
			<TouchableOpacity onPress={onPress} style={styles.dropDownMenuButton}>
				<Text style={styles.dropDownMenuText}>{label}</Text>
				<FontAwesome6 name={icon} size={pixelSize(13)} color={colors.textWhite} />
			</TouchableOpacity>
		</View>
	)
}

interface MenuModalProps {
	showMenus: boolean
	onClose: () => void
	promptData: PromptData
	reportUser: (id: number) => Promise<void>
}

const PreviewScreenMenuModal: React.FC<MenuModalProps> = ({ showMenus, onClose, promptData, reportUser }) => {
	const insets = useSafeAreaInsets()

	const handleMenuClose = () => {
		onClose()
	}

	return (
		<Modal animationType="fade" transparent={true} visible={showMenus} onRequestClose={handleMenuClose}>
			<Pressable onPress={handleMenuClose} style={styles.modalWrapper}>
				<Pressable
					style={[
						styles.modalContainer,
						{
							top: insets.top + pixelSize(22),
						},
					]}
				>
					<View style={styles.modalInnerContainer}>
						<View style={styles.modalInfo}>
							<Text style={styles.modalInfoText}>ID: {promptData?.id}</Text>
							<TouchableOpacity onPress={handleMenuClose} style={styles.modalInfoIcon}>
								<AntDesign name="close" size={12} color="white" />
							</TouchableOpacity>
						</View>
						{[
							{
								label: "Save",
								onPress: async () => {
									HapticsTouch()
									handleMenuClose()
								},
								icon: "download",
							},
							// {
							//   label: "Report",
							//   onPress: () => {
							//     HapticsTouch();
							//     handleMenuClose();
							//     Alert.alert("Report", "Are you sure you want to report?", [
							//       {
							//         text: "Cancel",
							//         onPress: () => console.log("Cancel Pressed"),
							//         style: "cancel",
							//       },
							//       {
							//         text: "OK",
							//         onPress: () => {
							//           reportUser(promptData?.id);
							//           Alert.alert("Reported", "Your report has been submitted.");
							//         },
							//       },
							//     ]);
							//   },
							//   icon: "flag",
							// },
						].map((item, index) => (
							<DropDownMenu key={index} label={item.label} onPress={item.onPress} icon={item.icon} />
						))}
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	)
}

export default PreviewScreenMenuModal

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.black50Alpha,
	},
	modalContainer: {
		position: "absolute",
		right: pixelSize(10),
		backgroundColor: colors.background,
		borderRadius: pixelSize(12),
		padding: pixelSize(12),
	},
	modalInnerContainer: {
		width: pixelSize(150),
	},
	modalInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	modalInfoIcon: {
		width: pixelSize(16),
		backgroundColor: colors.gray,
		borderRadius: pixelSize(16),
		height: pixelSize(16),
		justifyContent: "center",
		alignItems: "center",
	},
	modalInfoText: {
		color: colors.textWhite,
		fontSize: pixelFont(13),
		fontWeight: "700",
	},
	dropDownMenuWrapper: {
		borderRadius: pixelSize(12),
		paddingTop: pixelSize(10),
	},
	dropDownMenuButton: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	dropDownMenuText: {
		color: colors.textWhite,
		fontSize: pixelFont(16),
		fontWeight: "600",
	},
})
