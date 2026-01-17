import {
	API_ERROR_CODE,
	DOMAIN_ERROR_CODE,
	SUCCESS_CODE,
} from '@/constants/errorCode';

export interface APIResponse<T> {
	code: ResponseCode;
	message: string;
	data: T;
}

export interface ErrorDTO {
	code: ApiErrorCode;
	message: string;
	data: {} | null;
}

export type ApiErrorCode =
	| (typeof API_ERROR_CODE)[keyof typeof API_ERROR_CODE]
	| (typeof DOMAIN_ERROR_CODE)[keyof typeof DOMAIN_ERROR_CODE];

export type ResponseCode = (typeof SUCCESS_CODE)[keyof typeof SUCCESS_CODE];
