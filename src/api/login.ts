import { apiClient, getKyHTTPError, isKyHTTPError } from '@/lib/apiClient';
import { APIResponse } from '@/types/api';
import { UserDataDTO } from '@/types/auth';

export const login = async (email: string) => {
	try {
		const response = await apiClient.post('auth/login', {
			searchParams: { email },
		});

		return await response.json<APIResponse<UserDataDTO>>();
	} catch (error) {
		if (isKyHTTPError(error)) {
			throw await getKyHTTPError(error);
		}
		throw error;
	}
};
