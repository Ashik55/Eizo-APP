import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import { HapticsTouch } from "@utils/haptics"
import React from "react"
// eslint-disable-next-line react-native/split-platform-components
import { ActionSheetIOS } from "react-native"

type TOnImageUpload = (res: ImagePicker.ImagePickerResult | undefined) => void

type TUseImagePicker = {
	image: string | null
	pickImage: () => void
	captureImage: () => void
	isLoading: boolean
	file: ImagePicker.ImagePickerResult | null
	fileName: string | null
	fileSize: number | null
	imagePickerIos: (cb: TOnImageUpload) => void
}

export default function useImagePicker(props: { options?: ImagePicker.ImagePickerOptions }): TUseImagePicker {
	const [image, setImage] = React.useState<string | null>(null)
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const [file, setFile] = React.useState<ImagePicker.ImagePickerResult | null>(null)
	// ImagePicker Result
	const [fileName, setFileName] = React.useState<string | null>(null)

	const [fileSize, setFileSize] = React.useState(null)
	const config = props.options || {}

	const opt = {
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		quality: 0.4,
		...config,
	}

	const captureImage = async () => {
		HapticsTouch()
		// No permissions request is necessary for launching the image library
		setIsLoading(true)
		const result = await ImagePicker.launchCameraAsync({
			...opt,
			base64: true,
		})

		if (!result.canceled) {
			setImage(result.assets[0].uri)
			setFile(result)
			setIsLoading(false)
			return result
		}
	}

	const pickImage = async () => {
		HapticsTouch()
		// No permissions request is necessary for launching the image library
		setIsLoading(true)
		const result = await ImagePicker.launchImageLibraryAsync({
			...opt,
			base64: true,
		})
		if (!result.canceled) {
			setImage(result.assets[0].uri)
			setFile(result)
			setIsLoading(false)
			return result
		}
	}

	const imagePickerIos = async (cb: TOnImageUpload) => {
		HapticsTouch()
		ActionSheetIOS.showActionSheetWithOptions(
			{
				options: ["Cancel", "Take Photo", "Choose from Library"],
				cancelButtonIndex: 0,
			},
			async (buttonIndex) => {
				if (buttonIndex === 1) {
					const res = await captureImage()
					cb(res)
				} else if (buttonIndex === 2) {
					const res = await pickImage()
					// @ts-ignore
					cb(res)
				}
			},
		)
	}

	React.useEffect(() => {
		const getFileInfo = async (fileURI: string) => {
			const fileInfo = (await FileSystem.getInfoAsync(fileURI)) as any
			const { size } = fileInfo
			setFileName(fileInfo.uri.split("/").pop())

			setFileSize(size)
		}

		if (image) {
			getFileInfo(image)
		}
	}, [image])

	return {
		image,
		pickImage,
		captureImage,
		isLoading,
		file,
		fileName,
		fileSize,
		imagePickerIos,
	}
}
