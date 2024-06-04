import { Session } from "@supabase/supabase-js"

export interface IUser {
	_id: string
	email: string
	name: string
	hasVerifiedEmail: boolean
	avatar: string
}

export interface IAuthState {
	user: Session | null
}
