import { Currency } from './exchange';

export interface WalletsDTO {
	totalKrwBalance: number;
	wallets: CurrencyWalletDTO[];
}

export interface CurrencyWalletDTO {
	walletId: number;
	currency: Currency;
	balance: number;
}
