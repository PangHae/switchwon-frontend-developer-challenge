import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getOrderQuote } from '@/api/order';
import { API_ERROR_CODE, ErrorCode } from '@/constants/errorCode';
import { ErrorDTO } from '@/types/api';
import { OrderQuoteRequestDTO } from '@/types/order';

export const useOrderQuote = (
	{ fromCurrency, toCurrency, forexAmount }: OrderQuoteRequestDTO,
	enabled: boolean
) => {
	const query = useQuery({
		queryKey: ['order', 'quote', fromCurrency, toCurrency, forexAmount],
		queryFn: () => getOrderQuote({ fromCurrency, toCurrency, forexAmount }),
		enabled,
	});

	useEffect(() => {
		if (query.isError) {
			const error = query.error as unknown as ErrorDTO;
			if (error.code === API_ERROR_CODE.VALIDATION_ERROR) {
				console.error('요청 데이터가 올바르지 않습니다:', error.message);
				return;
			}

			if (error.code === API_ERROR_CODE.MISSING_PARAMETER) {
				console.error('필수 요청 파라미터가 누락되었습니다:', error.message);
				return;
			}

			if (error.code === ErrorCode.EXCHANGE_RATE_CURRENCY_MISMATCH) {
				console.error('환율 정보와 통화가 일치하지 않습니다:', error.message);
				return;
			}

			if (error.code === ErrorCode.UNSUPPORTED_FOREX_CONVERSION_CURRENCY) {
				console.error('지원하지 않는 통화 변환입니다:', error.message);
				return;
			}

			if (error.code === ErrorCode.INVALID_AMOUNT_SCALE) {
				console.error(
					'금액의 소수점 자릿수가 올바르지 않습니다:',
					error.message
				);
				toast.error('금액의 소수점 자릿수가 올바르지 않습니다.');
				return;
			}

			if (error.code === API_ERROR_CODE.BAD_REQUEST) {
				console.error('잘못된 요청입니다:', error.message);
				toast.error('잘못된 요청입니다.');
				return;
			}

			console.error(
				'환전 견적을 조회하는 중 오류가 발생했습니다:',
				error.message
			);
			toast.error('환전 견적을 조회하는 중 오류가 발생했습니다.');
		}
	}, [query.isError, query.error]);

	return query;
};
