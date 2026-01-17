import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getWallet } from '@/api/wallet';
import { API_ERROR_CODE } from '@/constants/errorCode';
import { ErrorDTO } from '@/types/api';

export const useWallet = () => {
	const query = useQuery({
		queryKey: ['wallet'],
		queryFn: getWallet,
	});

	useEffect(() => {
		if (query.isError) {
			const error = query.error as unknown as ErrorDTO;

			if (error.code === API_ERROR_CODE.UNAUTHORIZED) {
				console.error('인증이 필요합니다:', error.message);
				return;
			}

			if (error.code === API_ERROR_CODE.NOT_FOUND) {
				console.error('지갑 정보를 찾을 수 없습니다:', error.message);
				toast.error('지갑 정보를 찾을 수 없습니다.');
				return;
			}

			if (error.code === API_ERROR_CODE.BAD_REQUEST) {
				console.error('잘못된 요청입니다:', error.message);
				return;
			}

			console.error(
				'지갑 정보를 불러오는 중 오류가 발생했습니다:',
				error.message
			);
			toast.error('지갑 정보를 불러오는 중 오류가 발생했습니다.');
		}
	}, [query.isError, query.error]);

	return query;
};
