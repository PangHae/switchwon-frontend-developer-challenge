export interface APIResponse<T> {
	code: string;
	message: string;
	data: T;
}

export interface ErrorDTO<T> {
	code: string;
	message: string;
	data: T | null;
}
