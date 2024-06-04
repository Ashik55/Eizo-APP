import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
import { Database } from "@shared/types/supabase"
import PROJECTKEYS from "@shared/constants/Keys"

const supabaseUrl = PROJECTKEYS.SUPABASE.SUPABASE_URL
const supabaseAnonKey = PROJECTKEYS.SUPABASE.SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})
