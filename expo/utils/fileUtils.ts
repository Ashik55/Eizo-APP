import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import { Alert } from "react-native"

export const downloadImage = async (imageUrl: string) => {
	try {
		const { uri } = await FileSystem.downloadAsync(imageUrl, FileSystem.documentDirectory + "image.jpg")
		saveToGallery(uri)
	} catch (error) {
		console.error(error)
	}
}

const saveToGallery = async (uri: string) => {
	try {
		const { status } = await MediaLibrary.requestPermissionsAsync()
		if (status === "granted") {
			const asset = await MediaLibrary.createAssetAsync(uri)
			Alert.alert("Image is saved!", "", [{ text: "OK", onPress: () => shareImage(uri) }])
		}
	} catch (error) {
		console.error(error)
	}
}

const shareImage = async (uri: string) => {
	try {
		await Sharing.shareAsync(uri)
	} catch (error) {
		console.error(error)
	}
}
