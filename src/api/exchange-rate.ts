import { apiClient, getKyHTTPError, isKyHTTPError } from '@/lib/apiClient';
import { APIResponse } from '@/types/api';
import { ExchangeRateDTO } from '@/types/exchange';

export const getExchangeRates = async () => {
	try {
		const response = await apiClient.get('exchange-rates/latest');

		return await response.json<APIResponse<ExchangeRateDTO[]>>();
	} catch (error) {
		if (isKyHTTPError(error)) {
			throw await getKyHTTPError(error);
		}
		throw error;
	}
};
