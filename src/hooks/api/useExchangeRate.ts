import { useQuery } from '@tanstack/react-query';

import { getExchangeRates } from '@/api/exchange-rate';
import { ExchangeRateMap, ForeignCurrency } from '@/types/exchange';

export const useExchangeRate = () => {
	return useQuery({
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
};
