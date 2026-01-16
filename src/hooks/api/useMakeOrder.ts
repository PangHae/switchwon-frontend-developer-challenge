import { useEffect, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeOrder } from '@/api/order';
import { ExchangeRateMap, ForeignCurrency } from '@/types/exchange';
import { OrderRequestDTO } from '@/types/order';

export const useMakeOrder = (exchangeRatesMap: ExchangeRateMap) => {
	const queryClient = useQueryClient();
	const pendingOrderRef = useRef<OrderRequestDTO | null>(null);

	const mutation = useMutation({
		mutationFn: makeOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wallet'] });
			pendingOrderRef.current = null;
		},
		onError: (error: unknown, variables: OrderRequestDTO) => {
			const err = error as Error & { code?: string };

			if (err.code === 'EXCHANGE_RATE_MISMATCH') {
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
