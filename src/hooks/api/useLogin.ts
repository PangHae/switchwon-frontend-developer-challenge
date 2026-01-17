import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { login } from '@/api/login';
import { API_ERROR_CODE } from '@/constants/errorCode';
import { setLocalStorage } from '@/lib/localStorage';
import { ErrorDTO } from '@/types/api';

export const useLogin = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			setLocalStorage('token', data.data.token);
			router.push('/exchange');
		},
		onError: (error: ErrorDTO) => {
			if (error.code === API_ERROR_CODE.VALIDATION_ERROR) {
				console.error('입력한 이메일 형식이 올바르지 않습니다:', error.message);
				toast.error('입력한 이메일 형식이 올바르지 않습니다.');
				return;
			}

			if (error.code === API_ERROR_CODE.BAD_REQUEST) {
				console.error('잘못된 요청입니다:', error.message);
				return;
			}

			console.error('로그인 중 오류가 발생했습니다:', error.message);
			toast.error('로그인 중 오류가 발생했습니다.');
		},
	});
};
