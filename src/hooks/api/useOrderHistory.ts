import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getOrderHistory } from '@/api/order';
import { API_ERROR_CODE } from '@/constants/errorCode';
import { ErrorDTO } from '@/types/api';

export const useOrderHistory = () => {
	const query = useQuery({
		queryKey: ['orders', 'history'],
		queryFn: getOrderHistory,
	});

	useEffect(() => {
		if (query.isError) {
			const error = query.error as unknown as ErrorDTO;

			if (error.code === API_ERROR_CODE.UNAUTHORIZED) {
				console.error('인증이 필요합니다:', error.message);
				return;
			}

			if (error.code === API_ERROR_CODE.NOT_FOUND) {
				console.error('환전 내역을 찾을 수 없습니다:', error.message);
				toast.error('환전 내역을 찾을 수 없습니다.');
				return;
			}

			if (error.code === API_ERROR_CODE.BAD_REQUEST) {
				console.error('잘못된 요청입니다:', error.message);
				return;
			}

			console.error(
				'환전 내역을 불러오는 중 오류가 발생했습니다:',
				error.message
			);
			toast.error('환전 내역을 불러오는 중 오류가 발생했습니다.');
		}
	}, [query.isError, query.error]);

	return query;
};
