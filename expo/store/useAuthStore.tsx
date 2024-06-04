import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "@shared/schemas"
import { Session } from "@supabase/supabase-js"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface UserState {
	notificationTimer: Date
	user: Session | null
	setUser: (userData: Session | null) => void
	removeUser: () => void
	otherData: User | null
	setOtherData: (data: User) => void
	updateNotificationTimer: (date: Date) => void
	fastPass: boolean
	setFastPass: (value: boolean) => void
}

export const useAuthStore = create<UserState>()(
	persist(
		(set) => ({
			otherData: null,
			user: null,
			notificationTimer: new Date(),
			setUser: (userData: Session | null) => set({ user: userData }),
			removeUser: () => set({ user: null }),
			setOtherData: (data: User) => set({ otherData: data }),
			updateNotificationTimer: (date: Date) => set({ notificationTimer: date }),
			fastPass: false,
			setFastPass: (value: boolean) => set({ fastPass: value }),
		}),
		{
			name: "user", // unique name
			// getStorage: () => AsyncStorage, // Add this here!
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
)
