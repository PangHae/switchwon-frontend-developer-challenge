import { useEffect, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeOrder } from '@/api/order';
import { ErrorDTO } from '@/types/api';
import { ExchangeRateMap, ForeignCurrency } from '@/types/exchange';
import { OrderRequestDTO } from '@/types/order';

export const useMakeOrder = (exchangeRatesMap: ExchangeRateMap) => {
	const queryClient = useQueryClient();
	const pendingOrderRef = useRef<OrderRequestDTO | null>(null);

	const mutation = useMutation({
		mutationFn: makeOrder,
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ['wallet'] }),
				queryClient.invalidateQueries({ queryKey: ['orders', 'history'] }),
			]);
			pendingOrderRef.current = null;
		},
		onError: (error: ErrorDTO, variables: OrderRequestDTO) => {
			if (error.code === 'EXCHANGE_RATE_MISMATCH') {
				queryClient.invalidateQueries({ queryKey: ['exchange-rates'] });
				pendingOrderRef.current = variables;
			}
		},
	});

	const { mutate } = mutation;

	useEffect(() => {
		if (!pendingOrderRef.current || !exchangeRatesMap) return;

		const pendingOrder = pendingOrderRef.current;
		const currency =
			pendingOrder.toCurrency === 'KRW'
				? (pendingOrder.fromCurrency as ForeignCurrency)
				: (pendingOrder.toCurrency as ForeignCurrency);

		const rate = exchangeRatesMap[currency];
		if (rate) {
			pendingOrderRef.current = null;
			mutate({
				...pendingOrder,
				exchangeRateId: rate.exchangeRateId,
			});
		}
	}, [exchangeRatesMap, mutate]);

	return mutation;
};
