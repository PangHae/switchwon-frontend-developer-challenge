'use client';

import { ExchangeRateCard } from './ExchangeRateCard';
import { useExchangeRateProvider } from '@/hooks/context/useExchangeRateProvider';

const ExchangeRateCardContainer = () => {
	const exchangeRatesMap = useExchangeRateProvider();

	return (
		<>
			<ExchangeRateCard exchangeInfo={exchangeRatesMap.USD} />
			<ExchangeRateCard exchangeInfo={exchangeRatesMap.JPY} />
		</>
	);
};

export default ExchangeRateCardContainer;
