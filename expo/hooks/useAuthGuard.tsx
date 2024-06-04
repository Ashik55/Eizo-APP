import { useEffect } from "react"
import { useAuthStore } from "@store/useAuthStore"
import { router } from "expo-router"

const useAuthGuard = () => {
	const userCtrl = useAuthStore().user
	useEffect(() => {
		// Redirect to home screen if user is not logged in
		if (!userCtrl?.user?.id) {
			router.push("/(tabs)/")
		}
	}, [])
	if (!userCtrl?.user?.id) return null
}

export default useAuthGuard
