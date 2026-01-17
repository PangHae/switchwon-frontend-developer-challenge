import { useEffect, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { makeOrder } from '@/api/order';
import { ErrorCode } from '@/constants/errorCode';
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
			if (error.code === ErrorCode.EXCHANGE_RATE_MISMATCH) {
				queryClient.invalidateQueries({ queryKey: ['exchange-rates'] });
				pendingOrderRef.current = variables;
				return;
			}

			if (error.code === ErrorCode.WALLET_INSUFFICIENT_BALANCE) {
				console.error('지갑의 잔액이 부족합니다:', error.message);
				toast.error('지갑의 잔액이 부족합니다.');
				return;
			}

			if (error.code === ErrorCode.VALIDATION_ERROR) {
				console.error('요청 데이터가 올바르지 않습니다:', error.message);
				return;
			}

			if (error.code === ErrorCode.EXCHANGE_RATE_CURRENCY_MISMATCH) {
				console.error('환율 정보와 통화가 일치하지 않습니다:', error.message);
				return;
			}

			if (error.code === ErrorCode.INVALID_AMOUNT_SCALE) {
				console.error(
					'금액의 소수점 자릿수가 올바르지 않습니다:',
					error.message
				);
				return;
			}

			if (error.code === ErrorCode.CURRENCY_MISMATCH) {
				console.error('통화 타입이 일치하지 않습니다:', error.message);
				return;
			}

			if (error.code === ErrorCode.UNSUPPORTED_FOREX_CONVERSION_CURRENCY) {
				console.error('지원하지 않는 통화 변환입니다:', error.message);
				return;
			}

			console.error('환전 중 오류가 발생했습니다:', error.message);
			toast.error('환전 중 오류가 발생했습니다.');
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
