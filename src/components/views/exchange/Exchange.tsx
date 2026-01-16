'use client';

import { ChangeEvent, useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Currency, ExchangeType } from '@/types/exchange';

const CURRENCY_INFO = {
	USD: {
		label: 'USD 환전하기',
		flag: '🇺🇸',
		fullName: '미국 USD',
	},
	JPY: {
		label: 'JPY 환전하기',
		flag: '🇯🇵',
		fullName: '일본 JPY',
	},
};

const EXCHANGE_RATE = {
	USD: 1320.5,
	JPY: 8.5,
};

export const Exchange = () => {
	const [currency, setCurrency] = useState<Currency>('USD');
	const [exchangeType, setExchangeType] = useState<ExchangeType>('buy');
	const [amount, setAmount] = useState<string>('30');

	const currencyInfo = CURRENCY_INFO[currency];
	const exchangeRate = EXCHANGE_RATE[currency];
	const calculatedAmount = amount
		? (parseFloat(amount) * exchangeRate).toLocaleString('ko-KR')
		: '';

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value.replace(/[^0-9.]/g, '');
		setAmount(rawValue);
	};

	const formattedAmount = amount
		? parseFloat(amount).toLocaleString('ko-KR', {
				maximumFractionDigits: 0,
			})
		: '';

	const currencyUnitText = `${currency === 'USD' ? '달러' : '엔'}${exchangeType === 'buy' ? ' 사기' : ' 팔기'}`;

	const getPaddingRight = () => {
		const basePadding = 12;
		const textLength = currencyUnitText.length;
		return basePadding + textLength * 16;
	};

	return (
		<Card className="flex flex-col h-full bg-gray-100">
			<CardHeader className="shrink-0">
				<Select
					value={currency}
					onValueChange={(value) => setCurrency(value as Currency)}
				>
					<SelectTrigger className="h-[83px] border-0 text-2xl font-bold shadow-none cursor-pointer">
						<SelectValue>
							<div className="flex items-center gap-2">
								<span>{currencyInfo.flag}</span>
								<span>{currencyInfo.label}</span>
							</div>
						</SelectValue>
					</SelectTrigger>
					<SelectContent position="popper" align="start">
						<SelectItem value="USD">
							<div className="flex text-paragraph items-center gap-2 whitespace-nowrap">
								<span>🇺🇸</span>
								<span>미국 USD</span>
							</div>
						</SelectItem>
						<SelectItem value="JPY">
							<div className="flex items-center gap-2 whitespace-nowrap">
								<span>🇯🇵</span>
								<span>일본 JPY</span>
							</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="flex flex-col gap-6 flex-1">
				<Tabs
					value={exchangeType}
					onValueChange={(value) => setExchangeType(value as ExchangeType)}
					className="w-full"
				>
					<TabsList className="w-full grid grid-cols-2 h-[83px] p-2 bg-white border">
						<TabsTrigger
							value="buy"
							className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xl font-bold cursor-pointer text-red-500"
						>
							살래요
						</TabsTrigger>
						<TabsTrigger
							value="sell"
							className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xl font-bold cursor-pointer text-blue-500"
						>
							팔래요
						</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="flex flex-col gap-4 flex-1">
					<div className="flex flex-col gap-2">
						<label className="text-xl font-medium text-gray-500">
							{exchangeType === 'buy' ? '매수 금액' : '매도 금액'}
						</label>
						<div className="relative flex items-center">
							<Input
								type="text"
								value={formattedAmount}
								onChange={handleAmountChange}
								className="text-right h-[75px] text-xl! bg-white"
								style={{ paddingRight: `${getPaddingRight()}px` }}
							/>
							<span className="absolute right-3 text-xl text-gray-700 pointer-events-none whitespace-nowrap">
								{currencyUnitText}
							</span>
						</div>
					</div>

					<div className="flex justify-center">
						<div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-gray-200">
							<ChevronDown className="w-4 h-4 text-white" strokeWidth={4} />
						</div>
					</div>

					<div className="flex flex-col gap-2 ">
						<label className="text-xl font-medium text-gray-500">
							필요 원화
						</label>
						<div className="w-full h-[75px] text-xl! rounded-md border bg-gray-200 px-3 py-1 flex items-center justify-end text-gray-700 font-semibold cursor-default border-gray-400">
							{calculatedAmount}
							<span
								className={`${exchangeType === 'buy' ? 'text-red-500' : 'text-blue-500'} font-medium pl-2`}
							>
								{exchangeType === 'buy' ? '원 필요해요' : '원 받을 수 있어요'}
							</span>
						</div>
					</div>
				</div>

				<Separator />

				<div className="flex justify-between items-center">
					<span className="text-xl font-medium text-gray-500">적용 환율</span>
					<span className="text-xl font-semibold text-gray-700">
						1 {currency} = {exchangeRate.toLocaleString('ko-KR')} 원
					</span>
				</div>

				<div className="mt-auto">
					<Button className="w-full h-[77px] bg-gray-900 text-white hover:bg-gray-800 cursor-pointer text-xl font-bold">
						환전하기
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
