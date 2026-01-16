import { apiClient, getKyHTTPError, isKyHTTPError } from '@/lib/apiClient';
import { APIResponse } from '@/types/api';
import {
	OrderHistoryDTO,
	OrderQuoteDTO,
	OrderQuoteRequestDTO,
	OrderRequestDTO,
} from '@/types/order';

export const getOrderQuote = async ({
	fromCurrency,
	toCurrency,
	forexAmount,
}: OrderQuoteRequestDTO) => {
	try {
		const response = await apiClient.get('orders/quote', {
			searchParams: { fromCurrency, toCurrency, forexAmount },
		});

		return await response.json<APIResponse<OrderQuoteDTO>>();
	} catch (error) {
		if (isKyHTTPError(error)) {
			throw await getKyHTTPError(error);
		}
		throw error;
	}
};

export const makeOrder = async ({
	exchangeRateId,
	fromCurrency,
	toCurrency,
	forexAmount,
}: OrderRequestDTO) => {
	try {
		const response = await apiClient.post('orders', {
			json: { exchangeRateId, fromCurrency, toCurrency, forexAmount },
		});

		return await response.json<APIResponse<string>>();
	} catch (error) {
		if (isKyHTTPError(error)) {
			throw await getKyHTTPError(error);
		}
		throw error;
	}
};

export const getOrderHistory = async () => {
	try {
		const response = await apiClient.get('orders');

		return await response.json<APIResponse<OrderHistoryDTO[]>>();
	} catch (error) {
		if (isKyHTTPError(error)) {
			throw await getKyHTTPError(error);
		}
		throw error;
	}
};
