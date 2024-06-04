import useImagePicker from "@hooks/useImagePicker"
import { useGetProfileQuery, useUpdateProfileMutation } from "@redux/apis/profileApi"
import { HapticsTouch } from "@utils/haptics"
import { Stack } from "expo-router"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { ActivityIndicator, Alert, Modal, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import * as Yup from "yup"
import DeleteAccount from "@components/Profile/DeleteAccount"
import ProfileImage from "@components/Profile/ProfileImage"
import BackButton from "@components/UI/BackButton"
import ButtonWithGradient from "@components/UI/ButtonWithGradient"
import Header, { HeaderText } from "@components/UI/Header"
import SwInput from "@components/UI/SwInput"
import useAuthGuard from "@hooks/useAuthGuard"
import { useUploadBase64ImageMutation, useUploadImageMutation } from "@redux/apis/uploadImage/index"
import colors from "@utils/colors"
import { pixelHeight, pixelWidth, SCREEN_WIDTH } from "@utils/pixels"
// import * as ImageManipulator from "expo-image-manipulator"
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator"

const validationSchema = Yup.object().shape({
	nickname: Yup.string().required("Nickname is required"),
})

export default function TabOneScreen() {
	useAuthGuard()

	const { data, error, isLoading } = useGetProfileQuery()

	const [updateProfile, updateProfileRes] = useUpdateProfileMutation()

	const [uploadImage, uploadImageRes] = useUploadImageMutation()
	const [uploadBase64Image, uploadBase64ImageRes] = useUploadBase64ImageMutation()

	const { imagePickerIos, file } = useImagePicker({})

	const formik = useFormik({
		initialValues: {
			nickname: "",
			image: "https://storage.googleapis.com/eizoai/profile_photos/391b5a46-6c04-4b0a-978f-4ce34fb97c5e.png",
		},
		onSubmit: async (values) => {
			try {
				let avatar = data?.data?.profileImageUrl

				if (file?.assets?.[0]?.base64) {
					const res = await uploadBase64Image({
						imageData: file?.assets?.[0]?.base64,
					}).unwrap()

					avatar = res?.data?.[0]
					console.log("res", res?.data?.[0])
				}

				const res = await updateProfile({
					nickname: values.nickname,
					avatar: avatar,
				}).unwrap()

				Alert.alert("Profile Updated", "Your profile has been updated successfully")
			} catch (error) {
				console.log(error)
			}
		},
		validationSchema,
	})

	useEffect(() => {
		if (data) {
			formik.setFieldValue("nickname", data.data?.nickname)
			formik.setFieldValue("image", data.data?.profileImageUrl)
		}
	}, [data])

	const resizedPhoto = async (uri: string) => {
		const result = await manipulateAsync(
			uri,
			[{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio
			{ compress: 0.7, format: SaveFormat.JPEG },
		)
		// console.log("result", result)
		formik.setFieldValue("image", result.uri)
	}

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>

			<Header
				LeftComponent={<BackButton style={{ marginLeft: pixelWidth(12) }} />}
				CenterComponent={<HeaderText text={"Edit Profile"} />}
			/>

			<View style={{ flex: 1 }}>
				<KeyboardAwareScrollView>
					<ProfileImage
						image={formik.values.image}
						onPress={() => {
							HapticsTouch()
							imagePickerIos((file) => {
								resizedPhoto(file?.assets?.[0]?.uri)
							})
						}}
					/>
					<SwInput
						label="Nickname"
						onChangeText={formik.handleChange("nickname")}
						value={formik.values.nickname}
						placeholder="Eizo Sakamoto"
						autoCapitalize={"none"}
						securable={false}
						style={{
							marginHorizontal: pixelWidth(12),
							marginTop: pixelHeight(12),
						}}
						onBLur={() => formik.setFieldTouched("nickname")}
					/>
					{formik.touched.nickname && formik.errors.nickname && (
						<Text style={{ color: colors.error, marginLeft: pixelWidth(12), marginTop: pixelWidth(8) }}>
							{formik.errors.nickname}
						</Text>
					)}
				</KeyboardAwareScrollView>
			</View>

			<View>
				{!isLoading && (
					<ButtonWithGradient
						onPress={() => {
							HapticsTouch()
							formik.handleSubmit()
						}}
						buttonText={"Save"}
						buttonStyle={{
							width: SCREEN_WIDTH - pixelWidth(24),
						}}
						disabled={uploadImageRes.isLoading}
					/>
				)}
				<DeleteAccount />
			</View>

			<Modal
				visible={uploadBase64ImageRes.isLoading || updateProfileRes.isLoading || isLoading}
				animationType={"fade"}
				transparent
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: colors.backdrop,
					}}
				>
					<ActivityIndicator color={colors.textWhite} />
				</View>
			</Modal>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		flex: 1,
	},
})
