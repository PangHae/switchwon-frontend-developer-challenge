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
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CURRENCY_INFO } from '@/constants/currency';
import { useMakeOrder } from '@/hooks/api/useMakeOrder';
import { useOrderQuote } from '@/hooks/api/useOrderQuote';
import { useExchangeRateProvider } from '@/hooks/context/useExchangeRateProvider';
import { useDebounce } from '@/hooks/useDebounce';
import { Currency, ExchangeType, ForeignCurrency } from '@/types/exchange';
import { OrderRequestDTO } from '@/types/order';

export const Exchange = () => {
	const { exchangeRatesMap } = useExchangeRateProvider();
	const [currency, setCurrency] = useState<ForeignCurrency>('USD');
	const [exchangeType, setExchangeType] = useState<ExchangeType>('buy');
	const [amount, setAmount] = useState<string>('30');

	const debouncedAmount = useDebounce(amount, 300);

	const { mutate: makeOrder } = useMakeOrder(exchangeRatesMap);

	const forexAmount = debouncedAmount ? parseFloat(debouncedAmount) : 0;
	const isValidAmount = forexAmount > 0;

	const { data: orderQuote, isLoading: isOrderQuoteLoading } = useOrderQuote(
		{
			fromCurrency: exchangeType === 'buy' ? 'KRW' : currency,
			toCurrency: exchangeType === 'buy' ? currency : 'KRW',
			forexAmount,
		},
		isValidAmount
	);

	const currencyInfo = CURRENCY_INFO[currency];

	const calculatedAmount = orderQuote?.data?.krwAmount
		? orderQuote.data.krwAmount.toLocaleString('ko-KR')
		: '';

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		const rawValue = inputValue.replace(/[^0-9.]/g, '');
		const parts = rawValue.split('.');

		let formattedValue =
			parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : rawValue;

		if (formattedValue.includes('.')) {
			const [integerPart, decimalPart] = formattedValue.split('.');
			if (decimalPart && decimalPart.length > 2) {
				formattedValue = integerPart + '.' + decimalPart.slice(0, 2);
			}
		}

		setAmount(formattedValue);
	};

	const formattedAmount = (() => {
		if (!amount) return '';
		const numValue = parseFloat(amount);
		if (isNaN(numValue)) return amount;

		if (amount.includes('.')) {
			const [integerPart, decimalPart] = amount.split('.');
			const formattedInteger = integerPart
				? parseInt(integerPart, 10).toLocaleString('ko-KR')
				: '';
			return formattedInteger + '.' + decimalPart;
		}
		return numValue.toLocaleString('ko-KR');
	})();

	const currencyUnitText = `${currency === 'USD' ? '달러' : '엔'}${exchangeType === 'buy' ? ' 사기' : ' 팔기'}`;

	const getPaddingRight = () => {
		const basePadding = 12;
		const textLength = currencyUnitText.length;
		return basePadding + textLength * 16;
	};

	const handleClickExchange = () => {
		const orderData: OrderRequestDTO = {
			exchangeRateId: exchangeRatesMap[currency].exchangeRateId,
			fromCurrency: (exchangeType === 'buy' ? 'KRW' : currency) as Currency,
			toCurrency: (exchangeType === 'buy' ? currency : 'KRW') as Currency,
			forexAmount,
		};

		makeOrder(orderData);
	};

	return (
		<Card className="flex flex-col h-full min-h-fit bg-gray-100">
			<CardHeader className="shrink-0">
				<Select
					value={currency}
					onValueChange={(value) => setCurrency(value as ForeignCurrency)}
				>
					<SelectTrigger className="h-[83px] border-0 text-2xl font-bold shadow-none cursor-pointer">
						<SelectValue>
							<div className="flex items-center gap-2">
								<span>{currencyInfo.flag}</span>
								<span>{currency} 환전하기</span>
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
					{isOrderQuoteLoading ? (
						<Skeleton className="h-7 w-48 bg-gray-300" />
					) : (
						<span className="text-xl font-semibold text-gray-700">
							1 {currency} ={' '}
							{exchangeRatesMap[currency].rate.toFixed(2).toLocaleString()} 원
						</span>
					)}
				</div>

				<div className="mt-auto">
					<Button
						className="w-full h-[77px] bg-gray-900 text-white hover:bg-gray-800 cursor-pointer text-xl font-bold"
						onClick={handleClickExchange}
					>
						환전하기
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
