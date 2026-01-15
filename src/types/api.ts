export interface APIResponse<T> {
	code: string;
	message: string;
	data: T;
}
