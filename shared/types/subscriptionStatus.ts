import PROJECTKEYS from "shared/constants/Keys"

const Subscriptions = PROJECTKEYS.ADAPTY_SUBSCRIPTION_KEYS
const PaidAccessLevelKeys = PROJECTKEYS.ADAPTY_PAID_ACCESS_LEVEL_KEYS

export interface Subscription {
	is_active: boolean
	is_lifetime: boolean
	expires_at: string
	starts_at: string | null
	will_renew: boolean
	vendor_product_id: string
	vendor_transaction_id: string
	vendor_original_transaction_id: string
	store: string
	activated_at: string
	renewed_at: string
	unsubscribed_at: string
	billing_issue_detected_at: string | null
	is_in_grace_period: boolean
	active_introductory_offer_type: string | null
	offer_id: string | null
	active_promotional_offer_type: string | null
	active_promotional_offer_id: string | null
	cancellation_reason: string | null
	is_sandbox: boolean
	is_refund: boolean
}

type subscriptionsT = (typeof Subscriptions)[number]

export type Subscriptions = {
	[key in subscriptionsT]: Subscription
}

type PaidAccessLevelsT = (typeof PaidAccessLevelKeys)[number]

export type PaidAccessLevels = {
	[key in PaidAccessLevelsT]: Subscription
}

export interface AdaptyData {
	data: {
		app_id: string
		profile_id: string
		customer_user_id: string
		total_revenue_usd: number
		segment_hash: string
		timestamp: number
		paid_access_levels: PaidAccessLevels
		subscriptions: Subscriptions
		non_subscriptions: any
		custom_attributes: Record<string, any>
		promotional_offer_eligibility: boolean
		introductory_offer_eligibility: boolean
	}
}

export interface AdaptyError {
	errors: {
		detail: string
		status: string
		source: {
			pointer: string
		}
		code: string
	}
}
