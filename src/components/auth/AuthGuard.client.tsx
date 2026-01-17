'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { getLocalStorage } from '@/lib/localStorage';

interface AuthGuardProps {
	children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
	const router = useRouter();
	const [isAuthenticated] = useState<boolean | null>(() => {
		if (typeof window === 'undefined') return null;
		return getLocalStorage('token') !== null;
	});

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/');
		}
	}, [router, isAuthenticated]);

	if (isAuthenticated === null || !isAuthenticated) {
		return null;
	}

	return <>{children}</>;
};
