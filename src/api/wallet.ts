import { apiClient, getKyHTTPError, isKyHTTPError } from '@/lib/apiClient';
import { APIResponse } from '@/types/api';
import { WalletsDTO } from '@/types/wallet';

export const getWallet = async () => {
	try {
		const response = await apiClient.get('wallets');

		return await response.json<APIResponse<WalletsDTO>>();
	} catch (error) {
		if (isKyHTTPError(error)) {
			throw await getKyHTTPError(error);
		}
		throw error;
	}
};
