import { record, z } from "zod"
import PROJECTKEYS from "./constants/Keys"
const subscriptionsKeys = PROJECTKEYS.ADAPTY_SUBSCRIPTION_KEYS
const paidAccessLevelKeys = PROJECTKEYS.ADAPTY_PAID_ACCESS_LEVEL_KEYS

export const UserSchema = z
	.object({
		id: z.string(),
		createdAt: z.string(),
		nickname: z.string().optional().nullable(),
		profileImageUrl: z.string().optional().nullable(),
	})
	.strict()
export type User = z.infer<typeof UserSchema>

export const ResponseDataSchema = z
	.object({
		ok: z.boolean(),
		headers: z.record(z.string()).optional(),
		data: z.any().optional(),
		error: z.string().optional(),
		message: z.string().optional(),
	})
	.strict()

export type ResponseData<T> = z.infer<typeof ResponseDataSchema> & { data?: T }

export const PublishedImageSchema = z
	.object({
		id: z.number(),
		userId: z.string(),
		uploadedImageUrls: z.string().array(),
		promptId: z.number(),
		user: z.object({
			id: z.string(),
			nickname: z.string().optional(),
			profileImageUrl: z.string().optional(),
		}),
		aspectRatio: z.string(),
		// reactionData: ReactionDataSchema,
	})
	.strict()

export type PublishedImage = z.infer<typeof PublishedImageSchema>

const LoraSchema = z
	.object({
		modelName: z.string(),
		strength: z.number().min(-10).max(10),
	})
	.strict()

const HiresFixSchema = z
	.object({
		targetWidth: z.number().int().min(128).max(4096),
		targetHeight: z.number().int().min(128).max(4096),
		strength: z.number().max(1),
		upscaler: z.enum(["RealESRGAN_x4plus_anime_6B", "RealESRNet_x4plus", "Latent"]).default("Latent").optional(),
	})
	.strict()

const RefinerSchema = z
	.object({
		switchAt: z.number().max(1),
		width: z.number().int().min(128).max(2048),
		height: z.number().int().min(128).max(2048),
	})
	.strict()

const FieldsSchema = z
	.object({
		width: z.number().int().min(128).max(2048),
		height: z.number().int().min(128).max(2048),
		modelName: z.string(),
		prompt: z.string().min(1).max(1024),
		negativePrompt: z.string().min(1).max(1024),
		sdVae: z.string().optional(),
		loras: z.array(LoraSchema).max(5).optional(),
		embeddings: z
			.array(z.object({ modelName: z.string() }))
			.max(5)
			.optional(),
		hiresFix: HiresFixSchema.optional(),
		refiner: RefinerSchema.optional(),
		imageNum: z.number().int().min(1).max(8),
		steps: z.number().int().min(1).max(100),
		seed: z.number().int(),
		clipSkip: z.number().int().min(1).max(12).optional(),
		guidanceScale: z.number().min(1).max(30),
		samplerName: z.enum([
			"Euler a",
			"Euler",
			"LMS",
			"Heun",
			"DPM2",
			"DPM2 a",
			"DPM++ 2S a",
			"DPM++ 2M",
			"DPM++ SDE",
			"DPM fast",
			"DPM adaptive",
			"LMS Karras",
			"DPM2 Karras",
			"DPM2 a Karras",
			"DPM++ 2S a Karras",
			"DPM++ 2M Karras",
			"DPM++ SDE Karras",
			"DDIM",
			"PLMS",
			"UniPC",
		]),
	})
	.strict()
export type Fields = z.infer<typeof FieldsSchema>

// const UrlsSchema = z.object({
//   get: z.string().url(),
//   cancel: z.string().url(),
// }).strict();

const ImageSchema = z.object({
	imageUrl: z.string(),
	imageUrlTtl: z.string().optional(),
	imageType: z.enum(["jpeg", "png", "webp"]),
	nsfwDetectionResult: z.unknown().nullable(),
})
// export type Image = z.infer<typeof ImageSchema>;

const VideoSchema = z.object({
	videoUrl: z.string(),
	videoUrlTtl: z.string(),
	videoType: z.string(),
})
// export type Video = z.infer<typeof VideoSchema>;

const TaskSchema = z.object({
	taskId: z.string(),
	status: z.enum(["TASK_STATUS_QUEUED", "TASK_STATUS_SUCCEED", "TASK_STATUS_FAILED", "TASK_STATUS_PROCESSING"]),
	reason: z.string(),
	taskType: z.string(),
	eta: z.number(),
	progressPercent: z.number(),
})

const ResponseFromNovitaSchema = z.object({
	extra: z.object({
		seed: z.string(),
		enableNsfwDetection: z.boolean(),
		debugInfo: z.unknown().optional(),
	}),
	task: TaskSchema,
	images: z.array(ImageSchema).optional(),
	videos: z.array(VideoSchema).optional(),
})

const GuiPromptsSchema = z
	.object({
		selectedRatio: z.string(),
		selectedCategoryAndPromptItem: z.record(z.string(), z.string()),
	})
	.strict()
export type GuiPrompts = z.infer<typeof GuiPromptsSchema>

export const PromptDataSchema = z
	.object({
		id: z.number(),
		createdAt: z.string(),
		userId: z.string(),
		status: z.string(),
		fields: FieldsSchema,
		responseFromNovita: ResponseFromNovitaSchema.nullable(),
		guiPrompts: GuiPromptsSchema,
		mainPromptId: z.number().nullable(),
		public: z.boolean(),
		uploadedImageUrls: z.array(z.string().url()).nullable(),
		textPrompt: z.string().optional(),
		stylePromptItemId: z.string(),
		user: UserSchema.optional(),
	})
	.strict()
export type PromptData = z.infer<typeof PromptDataSchema>

export const UpdatePromptDataSchema = PromptDataSchema.partial()
export type UpdatePromptData = z.infer<typeof UpdatePromptDataSchema>

const PromptItemSchema = z
	.object({
		promptItemId: z.string(),
		name: z.string(),
		imageUrl: z.string().url(),
		fields: FieldsSchema.optional(),
		textPrompt: z.string().optional(),
		categoryId: z.string().optional(),
	})
	.strict()
export type PromptItem = z.infer<typeof PromptItemSchema>

export const GuiPromptDataSchema = z
	.object({
		categoryId: z.string(),
		promptType: z.string(),
		promptItems: z.array(PromptItemSchema),
	})
	.strict()
export type GuiPromptData = z.infer<typeof GuiPromptDataSchema>

// Subscription interface in camelCase
const SubscriptionSchema = z
	.object({
		id: z.string().optional(),
		isActive: z.boolean(),
		isLifetime: z.boolean(),
		expiresAt: z.string(),
		startsAt: z.string().nullable(),
		willRenew: z.boolean(),
		vendorProductId: z.string(),
		vendorTransactionId: z.string().optional(),
		vendorOriginalTransactionId: z.string().optional(),
		store: z.string(),
		activatedAt: z.string(),
		renewedAt: z.string(),
		unsubscribedAt: z.string().nullable().optional(),
		billingIssueDetectedAt: z.string().nullable().optional(),
		isInGracePeriod: z.boolean(),
		activeIntroductoryOfferType: z.string().nullable(),
		offerId: z.string().nullable(),
		activePromotionalOfferType: z.string().nullable(),
		activePromotionalOfferId: z.string().nullable(),
		cancellationReason: z.string().nullable(),
		isSandbox: z.boolean().optional(),
		isRefund: z.boolean(),
	})
	.strict()
// Dynamic keys for Subscriptions and PaidAccessLevels
// AdaptyData interface in camelCase
export const AdaptyDataSchema = z
	.object({
		data: z.object({
			appId: z.string(),
			profileId: z.string(),
			customerUserId: z.string(),
			totalRevenueUsd: z.number(),
			segmentHash: z.string(),
			timestamp: z.number(),
			paidAccessLevels: z.object({
				...//TODO Taishi can we make this a resuable function?
				paidAccessLevelKeys.reduce(
					(acc, key) => {
						acc[key] = SubscriptionSchema
						return acc
					},
					{} as {
						[key in (typeof paidAccessLevelKeys)[number]]: typeof SubscriptionSchema
					},
				),
			}),
			subscriptions: z.object({
				...//TODO Taishi can we make this a resuable function?
				subscriptionsKeys.reduce(
					(acc, key) => {
						acc[key] = SubscriptionSchema
						return acc
					},
					{} as {
						[key in (typeof subscriptionsKeys)[number]]: typeof SubscriptionSchema
					},
				),
			}),
			nonSubscriptions: z.any(), // Define more specific schema if possible
			customAttributes: z.record(z.any()), // Define more specific schema if possible
			promotionalOfferEligibility: z.boolean(),
			introductoryOfferEligibility: z.boolean(),
		}),
	})
	.strict()

export type SubscriptionStatus = z.infer<typeof AdaptyDataSchema>
export type SubscriptionSchema = z.infer<typeof SubscriptionSchema>

const SelectedGuiPromptSchema = z
	.object({
		categoryIndex: z.number(),
		promptItemIndex: z.number(),
		categoryId: z.string(),
		promptItemId: z.string(),
		name: z.string().optional(),
		textPrompt: z.string().optional(),
		fields: FieldsSchema.optional(),
	})
	.strict()
export type SelectedGuiPrompt = z.infer<typeof SelectedGuiPromptSchema>

const SelectedGuiPromptObjectSchema = z.record(SelectedGuiPromptSchema)
export type SelectedGuiPromptObject = z.infer<typeof SelectedGuiPromptObjectSchema>

// Request body for /generate-image
export const GenerateImageRequestBodySchema = z
	.object({
		stylePromptItemId: z.string(),
		fields: FieldsSchema,
		textPrompt: z.string(),
		selectedRatio: z.string(),
		selectedCategoryAndPromptItem: z.record(z.string(), z.string()),
		skipAds: z.boolean().optional(),
	})
	.strict()
export type GenerateImageRequestBody = z.infer<typeof GenerateImageRequestBodySchema>

// Response body for /generate-image
export const GenerateImageResponseBodySchema = z.object({})
export type GenerateImageResponseBody = z.infer<typeof GenerateImageResponseBodySchema>

// Profile schemas

export const ProfileNicknameUpdateSchema = z
	.object({
		nickname: z.string(),
		avatar: z.string().optional(),
	})
	.strict()

export type ProfileNicknameUpdate = z.infer<typeof ProfileNicknameUpdateSchema>

export const ProfilePhotoUpdateSchema = z
	.object({
		imageData: z.string(),
	})
	.strict()

export type ProfilePhotoUpdate = z.infer<typeof ProfilePhotoUpdateSchema>
