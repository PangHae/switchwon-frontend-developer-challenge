import { apiClient } from '@/lib/apiClient';
import { APIResponse, ErrorDTO } from '@/types/api';
import { WalletsDTO } from '@/types/wallet';

export const getWallet = async () => {
	const response = await apiClient.get('wallets');

	if (!response.ok) {
		const error = (await response.json()) as ErrorDTO<{}>;
		throw new Error(error.message);
	}

	return await response.json<APIResponse<WalletsDTO>>();
};
