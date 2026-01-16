'use client';

import { useContext } from 'react';

import { ExchangeRateContext } from '@/components/providers/ExchangeRateProvider';

export const useExchangeRateProvider = () => {
	const context = useContext(ExchangeRateContext);

	// if (!context) {
	// 	throw new Error(
	// 		'useExchangeRateProvider must be used within an ExchangeRateProvider'
	// 	);
	// }

	return context;
};
