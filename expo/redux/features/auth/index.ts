import { createSlice } from "@reduxjs/toolkit"
import { Session } from "@supabase/supabase-js"
import { RootState } from "../../index"
import { IAuthState } from "./types"

const initialState: IAuthState = {
	user: null,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (
			state,
			action: {
				payload: Session | null
			},
		) => {
			state.user = action.payload
		},
	},
})

export const { login } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user as Session | null

const authReducer = authSlice.reducer

export default authReducer
