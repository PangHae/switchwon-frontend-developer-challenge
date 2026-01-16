import { apiClient } from '@/lib/apiClient';
import { APIResponse, ErrorDTO } from '@/types/api';
import { ExchangeRateDTO } from '@/types/exchange';

export const getExchangeRates = async () => {
	const response = await apiClient.get('exchange-rates/latest');

	if (!response.ok) {
		const error = (await response.json()) as ErrorDTO<{}>;
		throw new Error(error.message);
	}

	return await response.json<APIResponse<ExchangeRateDTO[]>>();
};
