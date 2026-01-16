'use client';

import { FC } from 'react';

import { Triangle } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CURRENCY_INFO } from '@/constants/currency';
import { ExchangeRateDTO } from '@/types/exchange';

interface ExchangeRateCardProps {
	exchangeInfo: ExchangeRateDTO;
}

export const ExchangeRateCard: FC<ExchangeRateCardProps> = ({
	exchangeInfo,
}) => {
	const { changePercentage } = exchangeInfo;
	const isPositive = changePercentage > 0;
	const isNegative = changePercentage < 0;
	const isNeutral = changePercentage === 0;

	const getTextColor = () => {
		if (isPositive) return 'text-red-500';
		if (isNegative) return 'text-blue-500';
		return 'text-gray-500';
	};

	const formatPercentage = () => {
		if (isNeutral) return '0.00%';
		const sign = isPositive ? '+' : '';
		return `${sign}${changePercentage.toFixed(2)}%`;
	};

	return (
		<Card className="flex-1 gap-1">
			<CardHeader>
				<CardTitle className="flex items-center justify-between text-lg">
					{exchangeInfo.currency}
					<CardDescription>
						{CURRENCY_INFO[exchangeInfo.currency].label}
					</CardDescription>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col">
				<span className="text-2xl font-bold">{`${exchangeInfo.rate.toFixed(2).toLocaleString()} KRW`}</span>
				<div className="flex items-center gap-1">
					{isPositive && (
						<Triangle className="w-3 h-3 fill-red-500 text-red-500" />
					)}
					{isNegative && (
						<Triangle className="w-3 h-3 fill-blue-500 text-blue-500 rotate-180" />
					)}
					{isNeutral && <span className="text-md text-gray-500">-</span>}
					<span className={`text-md ${getTextColor()}`}>
						{formatPercentage()}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
