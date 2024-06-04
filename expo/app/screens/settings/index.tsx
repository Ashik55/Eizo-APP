import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, Text } from "react-native"
import colors from "@utils/colors"
import { router, Stack } from "expo-router"
import { FontAwesome6 } from "@expo/vector-icons"
import { pixelFont, pixelHeight, pixelSize, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
import { supabase } from "@libs/supabase"
import { useAuthStore } from "@store/useAuthStore"
import { HapticsTouch } from "@utils/haptics"
import BackButton from "@components/UI/BackButton"
import Header, { HeaderText } from "@components/UI/Header"
import RouteButton from "@components/UI/RouteButton"

export default function TabOneScreen() {
	const [rerender, setRerender] = useState(false)
	const userCtrl = useAuthStore.getState()

	useEffect(() => {
		if (!userCtrl?.user?.access_token) {
			router.push("/(tabs)/")
		}
	}, [rerender])

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: false,
					animation: "slide_from_bottom",
				}}
			/>

			<Header
				LeftComponent={<BackButton style={{ marginLeft: pixelWidth(12) }} />}
				CenterComponent={<HeaderText text={"Settings"} />}
			/>

			<Text style={[styles.headerText, { marginTop: pixelHeight(12) }]}>Account</Text>

			<RouteButton
				showArrow
				onPress={() => {
					HapticsTouch()
					router.push("/screens/settings/profile")
				}}
				text="Edit Profile"
				icon={<FontAwesome6 name="edit" size={18} color={colors.iconWhite} />}
				buttonStyle={styles.routeButton}
			/>

			<RouteButton
				showArrow
				onPress={() => {
					HapticsTouch()
					userCtrl.removeUser()
					supabase.auth.signOut()
					setRerender(!rerender)
				}}
				text="Logout"
				icon={<FontAwesome6 name="right-from-bracket" size={18} color={colors.iconWhite} />}
				buttonStyle={styles.routeButton}
			/>

			<Text style={styles.headerText}>About App</Text>

			<RouteButton
				showArrow
				onPress={() => {
					HapticsTouch()
					router.push({
						pathname: "/screens/pages/",
						params: {
							url: "https://alphabyte.notion.site/Terms-of-Service-83697b0670e14eea8c3f7c15eed64b56?pvs=4",
							headerText: "Terms of Service",
						},
					})
				}}
				text="Terms of Service"
				icon={<FontAwesome6 name="newspaper" size={pixelSize(16)} color={colors.iconWhite} />}
				buttonStyle={styles.routeButton}
			/>

			<RouteButton
				showArrow
				onPress={() => {
					HapticsTouch()
					router.push({
						pathname: "/screens/pages/",
						params: {
							url: "https://alphabyte.notion.site/Privacy-Policy-Eizo-ai-83697b0670e14eea8c3f7c15eed64b56?pvs=4",
							headerText: "Privacy Policy",
						},
					})
				}}
				text="Privacy Policy"
				icon={<FontAwesome6 name="shield-halved" size={pixelSize(16)} color={colors.iconWhite} />}
				buttonStyle={styles.routeButton}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		flex: 1,
	},
	headerText: {
		color: colors.textWhite,
		fontSize: pixelFont(16),
		marginLeft: pixelWidth(12),
		fontWeight: "700",
		marginTop: pixelHeight(20),
	},
	routeButton: {
		height: pixelHeight(48),
		width: SCREEN_WIDTH - pixelWidth(24),
		flex: 0,
		alignSelf: "center",
		marginTop: pixelHeight(8),
	},
})
