import { z } from "zod"

const ImageSchema = z.object({
	image_url: z.string(),
	image_url_ttl: z.number(),
	image_type: z.enum(["jpeg", "png", "webp"]),
	nsfw_detection_result: z.record(z.string(), z.unknown()),
})
export type Image = z.infer<typeof ImageSchema>

const VideoSchema = z.object({
	video_url: z.string(),
	video_url_ttl: z.string(),
	video_type: z.string(),
})
export type Video = z.infer<typeof VideoSchema>

const TaskSchema = z.object({
	task_id: z.string(),
	status: z.enum(["TASK_STATUS_QUEUED", "TASK_STATUS_SUCCEED", "TASK_STATUS_FAILED", "TASK_STATUS_PROCESSING"]),
	reason: z.string(),
	task_type: z.string(),
	eta: z.number(),
	progress_percent: z.number(),
})

const AsyncTaskResultSchema = z.object({
	extra: z.object({
		seed: z.string(),
		enable_nsfw_detection: z.boolean(),
	}),
	task: TaskSchema,
	images: z.array(ImageSchema),
	videos: z.array(VideoSchema),
})

export type AsyncTaskResult = z.infer<typeof AsyncTaskResultSchema>
