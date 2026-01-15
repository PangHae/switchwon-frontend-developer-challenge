'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { getLocalStorage } from '@/lib/localStorage';

interface AuthGuardProps {
	children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
	const router = useRouter();

	useEffect(() => {
		const token = getLocalStorage('token');
		if (!token) {
			router.push('/');
		}
	}, [router]);

	return <>{children}</>;
};
