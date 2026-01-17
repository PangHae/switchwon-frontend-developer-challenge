'use client';

import { ExchangeRateCard } from './ExchangeRateCard.client';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useExchangeRateProvider } from '@/hooks/context/useExchangeRateProvider';

const ExchangeRateCardSkeleton = () => {
	return (
		<Card className="flex-1 gap-1">
			<CardHeader>
				<CardTitle className="flex items-center justify-between text-lg">
					<Skeleton className="bg-gray-200 h-5 w-12" />
					<CardDescription>
						<Skeleton className="bg-gray-200 h-4 w-20" />
					</CardDescription>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<Skeleton className="bg-gray-200 h-8 w-32" />
				<Skeleton className="bg-gray-200 h-5 w-16" />
			</CardContent>
		</Card>
	);
};

const ExchangeRateCardContainer = () => {
	const { exchangeRatesMap, isLoading } = useExchangeRateProvider();

	if (isLoading) {
		return (
			<>
				<ExchangeRateCardSkeleton />
				<ExchangeRateCardSkeleton />
			</>
		);
	}

	return (
		<>
			<ExchangeRateCard exchangeInfo={exchangeRatesMap.USD} />
			<ExchangeRateCard exchangeInfo={exchangeRatesMap.JPY} />
		</>
	);
};

export default ExchangeRateCardContainer;
