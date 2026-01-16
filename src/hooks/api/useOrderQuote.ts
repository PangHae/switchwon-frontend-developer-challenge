import { useQuery } from '@tanstack/react-query';

import { getOrderQuote } from '@/api/order';
import { OrderQuoteRequestDTO } from '@/types/order';

export const useOrderQuote = (
	{ fromCurrency, toCurrency, forexAmount }: OrderQuoteRequestDTO,
	enabled: boolean
) => {
	return useQuery({
		queryKey: ['order', 'quote', fromCurrency, toCurrency, forexAmount],
		queryFn: () => getOrderQuote({ fromCurrency, toCurrency, forexAmount }),
		enabled,
	});
};
