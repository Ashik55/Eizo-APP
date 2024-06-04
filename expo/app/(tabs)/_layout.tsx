import React from "react"
import { StyleSheet } from "react-native"
import { Tabs, router } from "expo-router"
import { FontAwesome6 } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { LinearGradient } from "expo-linear-gradient"
import { useAuthStore } from "@store/useAuthStore"
import { pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"

const styles = StyleSheet.create({
	plusButton: {
		alignItems: "center",
		borderRadius: pixelSize(18),
		height: pixelSize(36),
		justifyContent: "center",
		marginBottom: pixelHeight(16),
		paddingLeft: pixelWidth(1),
		width: pixelSize(36),
	},
	tabBarBackground: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: colors.transparent,
		overflow: "hidden",
	},
	tabBarStyle: {
		height: pixelHeight(90),
		paddingBottom: pixelHeight(24),
		paddingHorizontal: pixelWidth(48),
		position: "absolute",
	},
})

const tabBarBackground = () => <BlurView tint="dark" intensity={50} style={styles.tabBarBackground} />

const handleTabPress = (event?: React.BaseSyntheticEvent, condition: boolean = true, haptic: boolean = true) => {
	HapticsTouch()

	if (condition && event) event.preventDefault()
}

const iconComponent = (name: string, size: number, color: string) => (
	<FontAwesome6 name={name} size={pixelSize(size)} color={color} />
)

const plusIconComponent = (
	<LinearGradient
		colors={[colors.upvote, colors.warning]}
		style={styles.plusButton}
		start={{ x: 0, y: 0 }}
		end={{ x: 1, y: 1 }}
	>
		{iconComponent("plus", 18, colors.iconWhite)}
	</LinearGradient>
)

export default function TabLayout() {
	const user = useAuthStore((state) => state.user)

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.iconWhite,
				tabBarInactiveTintColor: colors.iconGray,
				tabBarStyle: styles.tabBarStyle,
				tabBarBackground,
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					href: "/(tabs)",
					tabBarIcon: ({ focused }) => iconComponent("house", 20, focused ? colors.iconWhite : colors.iconGray),
				}}
				listeners={{
					tabPress: () => handleTabPress(),
				}}
			/>
			<Tabs.Screen
				name="dummy"
				options={{
					href: "/screens/create",
					tabBarIcon: () => plusIconComponent,
				}}
				listeners={{
					tabPress: (event) => handleTabPress(event, true),
				}}
			/>
			<Tabs.Screen
				name="MyProfileScreen"
				listeners={{
					tabPress: (event) => {
						HapticsTouch()
						if (!user?.access_token) {
							handleTabPress(event, true, false)
							router.push("/screens/account/login")
						}
					},
				}}
				options={{
					href: user?.access_token ? "/(tabs)/MyProfileScreen" : "/screens/account/login",
					title: "Profile",
					tabBarIcon: ({ focused }) => iconComponent("user-large", 20, focused ? colors.iconWhite : colors.iconGray),
				}}
			/>
		</Tabs>
	)
}
