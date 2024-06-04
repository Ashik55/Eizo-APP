import React, { useContext, useEffect, useState } from "react"
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import MasonryList from "@components/UI/MasonryList"
import colors from "@utils/colors"
import { pixelHeight, pixelWidth } from "@utils/pixels"
import useCustomSafeAreaInsets from "@utils/useCustomSafeAreaInsets"
import { useAuthStore } from "@store/useAuthStore"
import { HapticsTouch } from "@utils/haptics"
import { CreditsButton } from "@components/UI/CreditButton"
import { CreditsContext } from "@context/CreditsContext"
import Logo from "@components/UI/Logo"
import ProButton from "@components/UI/ProButton"
import { usePromptStore } from "@store/promptStore"
import { useGetProfileQuery } from "@redux/apis/profileApi"

export default function MainScreen() {
	const { data, error, isLoading } = useGetProfileQuery()
	const insets = useCustomSafeAreaInsets()
	const user = useAuthStore().user
	const { credits } = useContext(CreditsContext)
	const [tapCount, setTapCount] = useState(0)
	const [lastTapTime, setLastTapTime] = useState(0)
	const { showAllPrompts, setShowAllPrompts, setHasMore } = usePromptStore()

	useEffect(() => {
		let timer: NodeJS.Timeout | undefined
		if (tapCount > 0) {
			timer = setTimeout(() => {
				setTapCount(0)
			}, 2000)
		}
		return () => clearTimeout(timer)
	}, [tapCount])

	const onPressCreditsButton = () => {
		HapticsTouch()
		router.push("/screens/credit/")
	}

	const onTapLogo = () => {
		const currentTime = Date.now()
		if (currentTime - lastTapTime <= 2000) {
			setTapCount((prevCount) => prevCount + 1)
			if (tapCount === 10) {
				Alert.alert("アラート", "Logoが15回連続でタップされました。")
				setShowAllPrompts(!showAllPrompts)
				setHasMore(true)
				setTapCount(0)
			}
		} else {
			setTapCount(1)
		}
		setLastTapTime(currentTime)
	}

	return (
		<View style={styles.container}>
			<LinearGradient colors={["black", "rgba(0,0,0,0.5)", "transparent"]} style={styles.homeScreenGradient}>
				<View style={[styles.headerContainer, { top: insets.top }]}>
					<TouchableOpacity onPress={onTapLogo} activeOpacity={1}>
						<Logo />
					</TouchableOpacity>

					{/*<View style={styles.creditView}>*/}
					{/*  {user && (*/}
					{/*    <CreditsButton onPress={onPressCreditsButton} credits={credits} />*/}
					{/*  )}*/}
					{/*  <ProButton user={user} />*/}
					{/*</View>*/}
				</View>
			</LinearGradient>
			<MasonryList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		flex: 1,
		position: "relative",
	},
	creditView: {
		flexDirection: "row",
		alignItems: "center",
		gap: pixelWidth(8),
	},
	homeScreenGradient: {
		position: "absolute",
		width: "100%",
		height: pixelHeight(100),
		zIndex: 100,
	},
	headerContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: pixelWidth(12),
		position: "absolute",
		width: "100%",
		zIndex: 100,
		paddingVertical: pixelHeight(8),
	},
})
