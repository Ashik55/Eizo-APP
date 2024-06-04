import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from ".."
import PROJECTKEYS from "@shared/constants/Keys"

const API_URL = PROJECTKEYS.API.API_URL

const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	prepareHeaders: (headers, api) => {
		const { auth } = api.getState() as RootState
		if (auth.user) {
			headers.set("authorization", `Bearer ${auth.user.access_token}`)
		}
		return headers
	},
})

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQuery,
	tagTypes: ["userProfile"],
	endpoints: (builder) => ({}),
})

export default apiSlice.reducer
