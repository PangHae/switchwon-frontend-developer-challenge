export type Currency = 'USD' | 'JPY' | 'KRW';
export type ExchangeType = 'buy' | 'sell';
export type ForeignCurrency = Exclude<Currency, 'KRW'>;

export interface ExchangeRateDTO {
	exchangeRateId: number;
	currency: Currency;
	rate: number;
	changePercentage: number;
	applyDateTime: string;
}

export type ExchangeRateMap = Record<ForeignCurrency, ExchangeRateDTO>;
