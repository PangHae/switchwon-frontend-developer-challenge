import { apiClient } from '@/lib/apiClient';
import { APIResponse, ErrorDTO } from '@/types/api';
import { UserDataDTO } from '@/types/auth';

export const login = async (email: string) => {
	const response = await apiClient.post('auth/login', {
		searchParams: { email },
	});

	if (!response.ok) {
		const error = (await response.json()) as ErrorDTO<{}>;
		throw new Error(error.message);
	}

	return (await response.json()) as APIResponse<UserDataDTO>;
};
