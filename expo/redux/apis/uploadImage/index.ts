import { apiSlice } from "../index"
import { IUploadFileRequest, IUploadFileResponse } from "./types"

export const uploadImageApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		uploadImage: builder.mutation<IUploadFileResponse, FormData>({
			query: (body) => ({
				url: `/upload`,
				method: "POST",
				body,
			}),
		}),
		uploadBase64Image: builder.mutation<
			IUploadFileResponse,
			{
				imageData: string
			}
		>({
			query: (body) => ({
				url: `/upload-image`,
				method: "POST",
				body,
			}),
		}),
	}),
})

export const { useUploadImageMutation, useUploadBase64ImageMutation } = uploadImageApiSlice
