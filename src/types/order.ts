import { Currency } from './exchange';

export interface OrderQuoteDTO {
	krwAmount: number;
	appliedRate: number;
}

export interface OrderQuoteRequestDTO {
	fromCurrency: Currency;
	toCurrency: Currency;
	forexAmount: number;
}

export interface OrderRequestDTO {
	exchangeRateId: number;
	fromCurrency: Currency;
	toCurrency: Currency;
	forexAmount: number;
}
