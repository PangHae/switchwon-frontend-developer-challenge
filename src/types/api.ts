export interface APIResponse<T> {
	code: string;
	message: string;
	data: T;
}

export interface ErrorDTO {
	code: string;
	message: string;
	data: {} | null;
}
