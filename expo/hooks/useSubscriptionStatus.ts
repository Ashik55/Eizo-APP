import { useState, useEffect, useContext } from "react"
import useApi, { SubscriptionStatusResponse } from "@api/request"
import { useAuthStore } from "@store/useAuthStore"
import { SubscriptionSchema } from "@shared/schemas"

const useSubscriptionStatus = () => {
	const [subscription, setSubscription] = useState<SubscriptionSchema | null>(null)
	const [loading, setLoading] = useState(true)
	const user = useAuthStore().user
	const api = useApi()

	// サブスクリプション情報を取得する関数
	const fetchSubscription = async () => {
		if (!user?.user?.id) {
			setLoading(false)
			return
		}

		setLoading(true)
		try {
			const result = (await api.getSubscriptionStatus()) as SubscriptionStatusResponse
			// console.log(JSON.stringify(result.data.data, null, 2));

			if (result?.data?.data?.paidAccessLevels?.premium?.isActive) {
				setSubscription(result?.data?.data?.paidAccessLevels?.premium)
			} else {
				setSubscription(null)
			}
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}

	// コンポーネントのマウント時にサブスクリプション情報を自動的に取得
	useEffect(() => {
		fetchSubscription()
	}, [user?.user?.id])

	// 再取得用の関数を提供
	const refetchSubscriptionStatus = async () => {
		await fetchSubscription()
	}

	return { subscription, loading, refetchSubscriptionStatus }
}

export default useSubscriptionStatus
