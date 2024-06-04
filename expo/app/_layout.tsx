/* eslint-disable react/jsx-filename-extension */
// External imports
import {
	Oswald_200ExtraLight,
	Oswald_300Light,
	Oswald_400Regular,
	Oswald_500Medium,
	Oswald_600SemiBold,
	Oswald_700Bold,
} from "@expo-google-fonts/oswald"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Asset } from "expo-asset"
import { useFonts } from "expo-font"
import * as Notifications from "expo-notifications"
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import { adapty } from "react-native-adapty"
import { GestureHandlerRootView } from "react-native-gesture-handler"

// Internal imports
import PROJECTKEYS from "@shared/constants/Keys"
import { NotificationsWrapper } from "@context/NotificationContext"
import { supabase } from "@libs/supabase"

import mobileAds from "react-native-google-mobile-ads"
import { Provider, useDispatch } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import store, { persistor } from "@redux/index"
import { login } from "@redux/features/auth"
import { useAuthStore } from "@store/useAuthStore"

mobileAds()
	.initialize()
	.then((adapterStatuses) => {
		// Initialization complete!
		console.log("mobile ads are initialized", adapterStatuses)
	})

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
})

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const localImages = [
	require("../assets/images/coolbg1.jpg"),
	require("../assets/images/coolbg2.jpeg"),
	require("../assets/images/coolbg3.jpeg"),
	require("../assets/images/coolbg4.jpg"),
	require("../assets/images/coolbg5.jpg"),
	require("../assets/images/ai_artist.png"),
	require("../assets/images/coins.png"),
	require("../assets/images/google.png"),
	require("../assets/images/smile.jpg"),
]

const preloadImages = localImages.map((image) => {
	return Asset.fromModule(image).downloadAsync()
})

export default function RootLayout() {
	const [fontsLoaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Oswald: require("../assets/fonts/Oswald-VariableFont_wght.ttf"),
		Oswald_200ExtraLight,
		Oswald_300Light,
		Oswald_400Regular,
		Oswald_500Medium,
		Oswald_600SemiBold,
		Oswald_700Bold,
		...FontAwesome.font,
	})
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		async function prepare() {
			try {
				// フォントと画像をプリロード
				await Promise.all([...preloadImages])
			} catch (e) {
				console.warn(e)
			} finally {
				setIsImageLoaded(true)
			}
		}

		prepare()
	}, [])

	useEffect(() => {
		if (fontsLoaded && isImageLoaded) {
			SplashScreen.hideAsync()
			// router.push("/(tabs)");
		}
	}, [fontsLoaded, isImageLoaded])

	useEffect(() => {
		;(async () => {
			// TODO
			// const fetchedPrompt = (await getPrompts()) as GetPrompts;
			// updatePromptTemplateData(fetchedPrompt?.data);
		})()
	}, [])

	if (!fontsLoaded) {
		return null
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RootLayoutNav />
			</PersistGate>
		</Provider>
	)
}

function RootLayoutNav() {
	const colorScheme = useColorScheme()
	const dispatch = useDispatch()
	const userStore = useAuthStore()

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			dispatch(login(session))
			userStore.setUser(session)
		})
	}, [])

	useEffect(() => {
		// preloadImages();
		console.log("*Adapty init*", userStore?.user?.user?.id)
		if (userStore?.user?.user?.id) {
			adapty.activate(PROJECTKEYS.ADAPTY_KEY, {
				customerUserId: userStore?.user?.user?.id,
			})
		} else {
			adapty.logout()
		}
	}, [userStore])

	return (
		<GestureHandlerRootView
			style={{
				flex: 1,
			}}
		>
			<StatusBar animated={true} style={"light"} />
			<NotificationsWrapper>
				{/*<SubscriptionWrapper>*/}
				{/*  <CreditsWrapper>*/}
				<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
					<>
						<Stack initialRouteName="(tabs)">
							<Stack.Screen
								name="(tabs)"
								options={{
									headerTitle: "",
									headerShown: false,
									headerTransparent: true,
									headerBackVisible: false,
								}}
							/>
							<Stack.Screen
								name="(user)"
								options={{
									headerTitle: "",
									headerTransparent: true,
									headerBackVisible: false,
									headerShown: false,
								}}
							/>
						</Stack>
					</>
				</ThemeProvider>
				{/*  </CreditsWrapper>*/}
				{/*</SubscriptionWrapper>*/}
			</NotificationsWrapper>
		</GestureHandlerRootView>
	)
}
