export interface IGetProfileResponse {
	data: Data
	ok: boolean
}

export interface Data {
	createdAt: string
	id: string
	nickname: any
	profileImageUrl: string
}

export interface IUpdateProfileRequest {
	nickname: string
	avatar?: string
}

export interface IUpdateProfileResponse {
	message: string
	ok: boolean
}
