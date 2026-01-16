import ky, { HTTPError } from 'ky';

import { getLocalStorage, removeLocalStorage } from './localStorage';
import { ErrorDTO } from '@/types/api';

/**
 * API 클라이언트
 * 클라이언트 사이드에서 사용됩니다.
 * - localStorage에서 토큰을 읽어 Authorization 헤더에 자동 추가
 * - 401 응답 시 자동으로 토큰 제거 및 로그인 페이지로 리다이렉트
 */
export const apiClient = ky.create({
	prefixUrl: process.env.NEXT_PUBLIC_API_URL,
	retry: 0,
	credentials: 'include',
	hooks: {
		beforeRequest: [
			(request) => {
				if (typeof window !== 'undefined') {
					const token = getLocalStorage('token');
					if (token) {
						request.headers.set('Authorization', `Bearer ${token}`);
					}
				}
			},
		],
		afterResponse: [
			(request, options, response) => {
				if (response.status === 401 && typeof window !== 'undefined') {
					removeLocalStorage('token');
					window.location.href = '/';
				}
				return response;
			},
		],
	},
});

export const isKyHTTPError = (error: unknown): error is HTTPError<ErrorDTO> => {
	return error instanceof HTTPError;
};

export const getKyHTTPError = async (error: HTTPError<ErrorDTO>) => {
	return await error.response.json<ErrorDTO>();
};
