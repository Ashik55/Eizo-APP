import { apiSlice } from "../index"
import { IGetProfileResponse, IUpdateProfileRequest, IUpdateProfileResponse } from "./types"

export const profileApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query<IGetProfileResponse, void>({
			query: () => ({
				url: `/account-data`,
			}),
			providesTags: ["userProfile"],
		}),
		updateProfile: builder.mutation<IUpdateProfileResponse, IUpdateProfileRequest>({
			query: (body) => ({
				url: `/update-profile`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["userProfile"],
		}),
	}),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApiSlice
