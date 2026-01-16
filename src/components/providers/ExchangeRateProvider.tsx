'use client';

import { createContext, FC, ReactNode } from 'react';

import { useExchangeRate } from '@/hooks/api/useExchangeRate';
import { ExchangeRateMap } from '@/types/exchange';

const defaultExchangeRateMap = {
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

export const ExchangeRateContext = createContext<ExchangeRateMap>(
	defaultExchangeRateMap
);

interface ExchangeRateProviderProps {
	children: ReactNode;
}

export const ExchangeRateProvider: FC<ExchangeRateProviderProps> = ({
	children,
}) => {
	const { data: exchangeRatesMap } = useExchangeRate();

	return (
		<ExchangeRateContext.Provider
			value={exchangeRatesMap ?? defaultExchangeRateMap}
		>
			{children}
		</ExchangeRateContext.Provider>
	);
};
