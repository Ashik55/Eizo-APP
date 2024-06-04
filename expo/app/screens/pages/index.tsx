import * as React from "react"
import { WebView } from "react-native-webview"
import { StyleSheet, View } from "react-native"
import { Stack, useLocalSearchParams } from "expo-router"

export default function Index() {
	const { url, headerText } = useLocalSearchParams()

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<Stack.Screen
				options={{
					headerShown: true,
					title: headerText as string,
					animation: "slide_from_bottom",
				}}
			/>
			<WebView style={styles.container} source={{ uri: url as string }} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
