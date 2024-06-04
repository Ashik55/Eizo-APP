// External imports
import { createContext, useEffect, useState } from "react"
import * as Notifications from "expo-notifications"
import { ImageSourcePropType, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import FlashMessage, { showMessage } from "react-native-flash-message"
import { Image } from "expo-image"

// Internal imports
import { useAuthStore } from "@store/useAuthStore"
import colors from "@utils/colors"
import { pixelFont, pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"
import useApi from "@api/request"
import Header, { HeaderText } from "@components/UI/Header"
import ButtonWithGradient from "@components/UI/ButtonWithGradient"
import { HapticsTouch } from "@utils/haptics"

interface CloseButtonProps {
	onPress: () => void
}

const CloseButton: React.FC<CloseButtonProps> = ({ onPress }) => (
	<TouchableOpacity onPress={onPress} style={styles.closeButton}>
		<FontAwesome6 name="xmark" size={12} color={colors.iconWhite} />
	</TouchableOpacity>
)

interface ModalViewProps {
	onPress: () => void
	onPressClose: () => void
	titleText: string
	bodyText: string
	buttonText: string
	imageSource?: ImageSourcePropType
	buttonRightComponent?: React.ReactNode
}

const ModalView: React.FC<ModalViewProps> = ({
	onPress,
	onPressClose,
	titleText,
	bodyText,
	buttonText,
	imageSource,
	buttonRightComponent,
}) => {
	return (
		<View style={styles.modalView}>
			<Header
				headerStyle={{ height: pixelHeight(48) }}
				CenterComponent={<HeaderText text={titleText} />}
				RightComponent={<CloseButton onPress={onPressClose} />}
				centerStyle={{ flex: 5 }}
			/>
			{imageSource && (
				<Image
					source={imageSource}
					style={{
						width: pixelSize(120),
						height: pixelSize(120),
						marginTop: pixelHeight(12),
						resizeMode: "contain",
					}}
				/>
			)}
			<Text style={styles.modalSmallText}>{bodyText}</Text>
			<ButtonWithGradient
				onPress={onPress}
				buttonText={buttonText}
				buttonStyle={{
					width: "95%",
					marginBottom: pixelHeight(16),
					marginTop: pixelHeight(20),
				}}
				textStyle={{
					fontSize: pixelFont(14),
				}}
				rightComponent={buttonRightComponent}
			/>
		</View>
	)
}

interface NotificationsContextType {
	dismissAllScheduledNotifications: () => Promise<void>
	schedulePushNotification: (options: {
		title: string
		body: string
		repeat: boolean
		seconds: number
	}) => Promise<void>
	updateDefaultNotificationTimer: () => void
	shouldGetRewards: boolean
	handleClaimReward: () => void
}

const NotificationsContext = createContext<NotificationsContextType>({
	dismissAllScheduledNotifications: async () => {},
	schedulePushNotification: async () => {},
	updateDefaultNotificationTimer: () => {},
	shouldGetRewards: false,
	handleClaimReward: () => {},
})

const NotificationsWrapper = ({ children }: { children: React.ReactNode }) => {
	const [showRewardPopup, setShowRewardPopup] = useState(false)
	const [shouldGetRewards, setShouldGetRewards] = useState(false)
	const [allowNotificationPopup, setAllowNotificationPopup] = useState(false)
	const { checkDailyReward, claimDailyReward } = useApi()
	const user = useAuthStore().user
	const dismissAllScheduledNotifications = async () => {
		Notifications.cancelAllScheduledNotificationsAsync()
	}

	async function schedulePushNotification({
		title,
		body,
		repeat,
		seconds,
	}: {
		title: string
		body: string
		repeat: boolean
		seconds: number
	}) {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: title,
				body: body,
			},
			trigger: { seconds: seconds, repeats: repeat },
		})
	}

	const updateDefaultNotificationTimer = () => {
		dismissAllScheduledNotifications()
		schedulePushNotification({
			title: "Claim your daily reward",
			body: "You have a daily reward waiting for you!",
			repeat: true,
			seconds: 60 * 60 * 24,
		})
	}

	const handleClaimReward = async () => {
		HapticsTouch()
		setShowRewardPopup(false)
		setShouldGetRewards(false)
		const data = await claimDailyReward()

		if (data?.ok) {
			showMessage({
				message: "Claimed",
				description: "You have claimed your daily reward",
				type: "success",
			})
			updateDefaultNotificationTimer()
			try {
				const haveNotificationPermission = await allowsNotificationsAsync()
				if (!haveNotificationPermission) {
					setAllowNotificationPopup(true)
				}
			} catch (e) {
				console.log(e)
			}
		} else {
			showMessage({
				message: "Error",
				description: "Something went wrong, please try again later.",
				type: "danger",
			})
		}
	}

	// useEffect(() => {
	//   (async () => {
	//     const data = await checkDailyReward();
	//     if (data?.ok) {
	//       setShowRewardPopup(true);
	//       setShouldGetRewards(true);
	//     }
	//   })();
	// }, [user?.user?.id]);

	return (
		<NotificationsContext.Provider
			value={{
				dismissAllScheduledNotifications,
				schedulePushNotification,
				updateDefaultNotificationTimer,
				shouldGetRewards,
				handleClaimReward,
			}}
		>
			<FlashMessage position="top" />
			{children}
			{/* Daily Reward Modal */}
			<Modal
				animationType="fade"
				transparent={true}
				visible={showRewardPopup}
				onRequestClose={() => {
					setShowRewardPopup(!showRewardPopup)
				}}
			>
				<BlurView intensity={10} tint="light" style={styles.centeredView}>
					<ModalView
						onPress={handleClaimReward}
						onPressClose={() => {
							HapticsTouch()
							setShowRewardPopup(false)
						}}
						titleText={"Daily Reward"}
						bodyText={"Coins are token for advanced features\nYou can get 200 coins everyday!"}
						buttonText={"Claim 200 Coins"}
						imageSource={require("../assets/images/coins.png")}
						buttonRightComponent={
							<FontAwesome6 name="coins" size={16} color={colors.textWhite} style={{ marginRight: pixelWidth(12) }} />
						}
					/>
				</BlurView>
			</Modal>
			{/* 
    Notification permission modal
    */}
			<Modal
				animationType="fade"
				transparent={true}
				visible={allowNotificationPopup}
				onRequestClose={() => {
					setAllowNotificationPopup(!allowNotificationPopup)
				}}
			>
				<BlurView intensity={10} tint="light" style={styles.centeredView}>
					<ModalView
						onPress={() => {
							HapticsTouch()
							Linking.openSettings()
						}}
						onPressClose={() => {
							HapticsTouch()
							setAllowNotificationPopup(false)
						}}
						titleText={"Don't Miss Out!"}
						bodyText={"Enable the notifications 🔔\nGet Free Coins and Other Exciting Offers 🎉"}
						buttonText={"Enable Notification"}
					/>
				</BlurView>
			</Modal>
		</NotificationsContext.Provider>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	modalSmallText: {
		color: colors.textWhiteGray,
		textAlign: "center",
		marginTop: pixelHeight(12),
		marginHorizontal: pixelWidth(12),
		lineHeight: pixelFont(20),
		fontSize: pixelFont(14),
	},
	modalView: {
		alignItems: "center",
		backgroundColor: colors.background,
		borderRadius: pixelSize(12),
		elevation: 5,
		// padding: 20,
		position: "relative",
		shadowColor: colors.background,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		width: "80%",
	},
	closeButton: {
		borderRadius: pixelSize(10),
		width: pixelSize(20),
		height: pixelSize(20),
		backgroundColor: colors.secondary,
		alignItems: "center",
		justifyContent: "center",
		marginRight: pixelWidth(12),
	},
})

export { NotificationsContext, NotificationsWrapper }

async function allowsNotificationsAsync() {
	const settings = await Notifications.getPermissionsAsync()

	return settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
}
