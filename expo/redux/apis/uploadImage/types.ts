export interface IUploadFileResponse {
	data: string[]
	ok: boolean
}

export interface IUploadFileRequest extends FormData {
	file: any
	folder: string
}
