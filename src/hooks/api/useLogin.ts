import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { login } from '@/api/login';
import { setLocalStorage } from '@/lib/localStorage';

export const useLogin = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			setLocalStorage('token', data.data.token);
			router.push('/exchange');
		},
		onError: (error) => {
			console.error(error);
		},
	});
};
