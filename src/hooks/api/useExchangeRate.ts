import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getExchangeRates } from '@/api/exchange-rate';
import { API_ERROR_CODE } from '@/constants/errorCode';
import { ErrorDTO } from '@/types/api';
import { ExchangeRateMap, ForeignCurrency } from '@/types/exchange';

export const useExchangeRate = () => {
	const query = useQuery({
		queryKey: ['exchange-rates'],
		queryFn: getExchangeRates,
		refetchInterval: 60 * 1000, // 1분마다 폴링
		select: (response): ExchangeRateMap => {
			if (!response.data) {
				return {
					USD: {
						exchangeRateId: 0,
						currency: 'USD' as const,
						rate: 0,
						changePercentage: 0,
						applyDateTime: '',
					},
					JPY: {
						exchangeRateId: 0,
						currency: 'JPY' as const,
						rate: 0,
						changePercentage: 0,
						applyDateTime: '',
					},
				} as ExchangeRateMap;
			}

			const ratesMap = {} as ExchangeRateMap;

			response.data.forEach((rate) => {
				if (rate.currency !== 'KRW') {
					// JPY는 100엔당 KRW을 1엔당 KRW로 변환
					const processedRate = {
						...rate,
						rate: rate.currency === 'JPY' ? rate.rate / 100 : rate.rate,
					};
					ratesMap[rate.currency as ForeignCurrency] = processedRate;
				}
			});

			return ratesMap;
		},
	});

	useEffect(() => {
		if (query.isError) {
			const error = query.error as unknown as ErrorDTO;

			if (error.code === API_ERROR_CODE.UNAUTHORIZED) {
				console.error('인증이 필요합니다:', error.message);
				return;
			}

			if (error.code === API_ERROR_CODE.NOT_FOUND) {
				console.error('환율 정보를 찾을 수 없습니다:', error.message);
				return;
			}

			if (error.code === API_ERROR_CODE.BAD_REQUEST) {
				console.error('잘못된 요청입니다:', error.message);
				return;
			}

			console.error(
				'환율 정보를 불러오는 중 오류가 발생했습니다:',
				error.message
			);
			toast.error('환율 정보를 불러오는 중 오류가 발생했습니다.');
		}
	}, [query.isError, query.error]);

	return query;
};
