import axios, { AxiosRequestConfig } from "axios"

import { useAuthStore } from "@store/useAuthStore"
import { supabase } from "@libs/supabase"
import PROJECTKEYS from "@shared/constants/Keys"
import {
	GenerateImageRequestBody,
	GuiPromptData,
	ProfileNicknameUpdate,
	ProfilePhotoUpdate,
	PromptData,
	PublishedImage,
	ResponseData,
	SubscriptionStatus,
	User,
} from "@shared/schemas"

const baseUrl = PROJECTKEYS.API.API_URL

// interface PostPublicImageParams {
//   promptId: string;
//   isPublic: boolean;
// }

export interface SubscriptionStatusResponse {
	data: SubscriptionStatus
}

interface RequestParams<T extends object | null> {
	endpoint: string
	method?: "GET" | "POST" | "PUT" | "DELETE"
	body?: T
	withCredentials?: boolean
}

const useApi = () => {
	// Ensuring the user token is always up to date when making requests
	const user = useAuthStore((state) => state.user)
	const userId = user?.user?.id

	const request = async <RequestBodyType extends object | null, ResponseDataType>({
		endpoint,
		method = "GET",
		body,
		withCredentials = false,
	}: RequestParams<RequestBodyType | null>): Promise<ResponseData<ResponseDataType>> => {
		const url = `${baseUrl}${endpoint}`
		const headers: Record<string, string> = user?.access_token ? { Authorization: `Bearer ${user.access_token}` } : {}

		const config: AxiosRequestConfig = {
			method,
			url,
			headers,
			withCredentials,
			data: body !== null ? body : undefined,
		}

		try {
			const { data } = await axios<ResponseData<ResponseDataType>>(config)
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					ok: false,
					error: error.response?.data?.error || "Request failed",
					message: error.response?.data?.message || error.message,
				}
			}
			console.error("Unknown error:", error)
			throw error
		}
	}

	const getPublishedImages = async (): Promise<ResponseData<PublishedImage[]>> => {
		const response = await request<null, PublishedImage[]>({
			endpoint: `/published-images`,
			method: "GET",
		})

		if (!response.ok) {
			console.error("[getPublishedImages] Error fetching image:", response.error, response.message)
			return response
		}

		return response
	}

	const getPrompt = async (promptId: number): Promise<ResponseData<PromptData>> => {
		const response = await request<null, PromptData>({
			endpoint: `/prompt?promptId=${promptId}`,
			method: "GET",
		})

		if (!response.ok) {
			console.error("[getPrompt] Error fetching image:", response.error, response.message)
			return response
		}

		return response
	}

	const getGuiPromptList = async (): Promise<ResponseData<GuiPromptData[]>> => {
		const response = await request<null, GuiPromptData[]>({
			endpoint: `/gui-prompt-list`,
			method: "GET",
		})

		if (!response.ok) {
			console.error("[getGuiPromptList] Error fetching image:", response.error, response.message)
			return response
		}

		return response
	}

	const generateImage = async (data: GenerateImageRequestBody): Promise<ResponseData<PromptData>> => {
		console.log("[generateImage] Generating image...")
		const response = await request<GenerateImageRequestBody, PromptData>({
			endpoint: "/generate-image",
			method: "POST",
			body: data,
		})

		if (!response.ok) {
			console.error("[generateImage] Error generating image:", response.error, response.message)
			return response
		}

		return response
	}

	const getPublishedImageById = async (id: string): Promise<ResponseData<PublishedImage>> => {
		const response = await request<null, PublishedImage>({
			endpoint: `/published-image/${id}`,
			method: "GET",
		})

		if (!response.ok) {
			console.error("[getPublishedImageById] Error fetching image:", response.error, response.message)
			return response
		}

		return response
	}

	const updatePublicStatus = (promptId: number, isPublic: boolean) => {
		return request({
			endpoint: `/update-public-status`,
			method: "POST",
			body: {
				promptId,
				isPublic,
			},
		})
	}

	interface GetPromptsParams {
		page: number
		userId?: string
		limit?: number
		isAll?: boolean
	}
	const getPrompts = async ({ page, userId, limit = 20, isAll = false }: GetPromptsParams) => {
		let endpoint = `/prompts?limit=${limit}&page=${page}&isAll=${isAll}`

		if (userId) {
			endpoint += `&userId=${userId}`
		}

		return request({
			endpoint,
			method: "GET",
		})
	}

	const getRecentPrompts = (userId: string, limit: number = 20, page: number) => {
		return request({
			endpoint: `/recent-prompts?userId=${userId}&limit=${limit}&page=${page}`,
			method: "GET",
		})
	}

	//TODO Rayhan try this endpoint
	const getSubscriptionStatus = async (): Promise<ResponseData<SubscriptionStatusResponse>> => {
		const response = await request<null, SubscriptionStatusResponse>({
			endpoint: `/subscription-status?userId=${userId}`,
			method: "GET",
		})

		if (!response.ok) {
			console.error("[getSubscriptionStatus] Error fetching subscription status:", response.error, response.message)
			return response
		}

		return response
	}

	const deleteAccount = async (): Promise<ResponseData<Response>> => {
		const response = await request<null, Response>({
			endpoint: `/delete-account`,
			method: "GET",
		})

		if (!response.ok) {
			console.error("[deleteAccount] Error fetching delete account:", response.error, response.message)
			return response
		}

		return response
	}

	const updateProfilePhoto = async ({ imageData }: ProfilePhotoUpdate): Promise<ResponseData<Response>> => {
		const response = await request<ProfilePhotoUpdate, Response>({
			endpoint: `/update-profile-image`,
			method: "POST",
			body: {
				imageData,
			},
		})

		if (!response.ok) {
			console.error("[updateProfilePhoto] Error updating photo:", response.error, response.message)
			return response
		}

		return response
	}

	const updateProfileNickname = async ({ nickname }: ProfileNicknameUpdate): Promise<ResponseData<Response>> => {
		const response = await request<ProfileNicknameUpdate, Response>({
			endpoint: `/update-profile-nickname`,
			method: "POST",
			body: {
				nickname,
			},
		})

		if (!response.ok) {
			console.error("[updateProfileNickname] Error updating nickname:", response.error, response.message)
			return response
		}

		return response
	}

	const getAccountData = async (): Promise<ResponseData<User>> => {
		const response = await request<null, User>({
			endpoint: `/account-data`,
			method: "GET",
		})

		if (!response.ok) {
			console.error("[getAccountData] Error fetching account data:", response.error, response.message)
			return response
		}

		return response
	}

	const getCredits = async () => {
		const { data } = await supabase
			// .from('random_published')
			.from("credits")
			.select("*")
			.single()

		return data?.credits || 0
	}

	const checkDailyReward = async (): Promise<ResponseData<Response>> => {
		const response = await request<null, Response>({
			endpoint: `/check-daily-reward`,
			method: "GET",
		})

		if (!response.ok) {
			return response
		}

		return response
	}

	const claimDailyReward = async (): Promise<ResponseData<Response>> => {
		const response = await request<null, Response>({
			endpoint: `/claim-daily-reward`,
			method: "GET",
		})

		if (!response.ok) {
			console.error("[claimDailyReward] Error fetching claim daily reward:", response.error, response.message)
			return response
		}

		return response
	}

	const reportUser = async (id: number) => {
		return
		// const { data, error } = await supabase.from("reports").insert({
		//   prompt_id: id,
		//   user_id: user?.user?.id,
		// });
	}

	return {
		generateImage,
		updatePublicStatus,
		getSubscriptionStatus,
		deleteAccount,
		updateProfilePhoto,
		getAccountData,
		checkDailyReward,
		claimDailyReward,
		getCredits,
		reportUser,
		getGuiPromptList,
		getPublicImages: getPublishedImages,
		getPrompt,
		updateProfileNickname,
		getPublishedImageById,
		getRecentPrompts,
		getPrompts,
	}
}

export default useApi

// const pictureReact = async (
//   reactionTypeId: string,
//   userId: string | undefined,
//   add: boolean
// ) => {
//   // const { data, error } = await supabase
//   //   // .from('random_published')
//   //   .from('reactions')
//   //   .select('*')
//   //   .eq('reaction_type', reactionTypeId)
//   //   .eq('user_id', userId)
//   //   .single();
//   if (add) {
//     await supabase
//       // .from('random_published')
//       .from("reactions")
//       .insert({
//         reaction_type: reactionTypeId,
//         user_id: userId,
//         rid_user: `${reactionTypeId}${userId}`,
//       })
//       .select("*");
//   } else {
//     await supabase
//       // .from('random_published')
//       .from("reactions")
//       .delete()
//       .eq("reaction_type", reactionTypeId)
//       .eq("user_id", userId)
//       .select("*");
//   }
//   return;
// };
