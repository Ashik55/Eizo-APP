import { supabase } from "@libs/supabase"

type TUserToAdd = {
	id: string
	nickName?: string
	profileImage?: string
}

export type addUserToDatabase = (user: TUserToAdd) => Promise<void>

const addUserToDatabase: addUserToDatabase = async (user) => {
	try {
		const { id, nickName, profileImage } = user
		const isUserExist = await supabase.from("users").select("*").eq("id", id)

		console.log(user)

		if (isUserExist) {
			return
		}

		const { data, error } = await supabase
			.from("users")
			.insert([{ id, nickname: nickName, profile_image_url: profileImage }])
		if (error) {
			throw new Error(error.message)
		}
	} catch (error) {
		console.error(error)
	}
}

export default addUserToDatabase
