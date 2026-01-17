'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { CURRENCY_INFO } from '@/constants/currency';
import { useWallet } from '@/hooks/api/useWallet';

export const MyWallet = () => {
	const { data: wallet, isLoading, error, isError } = useWallet();

	if (isLoading) {
		return (
			<WalletCardWrapper>
				<ul className="flex flex-col gap-4 flex-1 text-xl font-medium">
					<li className="flex justify-between items-center">
						<Skeleton className="bg-gray-300 h-6 w-12" />
						<Skeleton className="bg-gray-300 h-6 w-sm" />
					</li>
					<li className="flex justify-between items-center">
						<Skeleton className="bg-gray-300 h-6 w-12" />
						<Skeleton className="bg-gray-300 h-6 w-sm" />
					</li>
					<li className="flex justify-between items-center">
						<Skeleton className="bg-gray-300 h-6 w-12" />
						<Skeleton className="bg-gray-300 h-6 w-sm" />
					</li>
				</ul>
				<Separator />
				<div className="flex justify-between items-center text-xl font-medium">
					<Skeleton className="bg-gray-300 h-6 w-24" />
					<Skeleton className="bg-gray-300 h-7 w-sm" />
				</div>
			</WalletCardWrapper>
		);
	}

	if (isError) {
		return (
			<WalletCardWrapper>
				<div className="flex flex-col items-center justify-center flex-1 gap-4">
					<p className="text-xl text-red-500 font-semibold">
						지갑 정보를 불러오는 중 오류가 발생했습니다.
					</p>
					<p className="text-gray-500">{error?.message}</p>
				</div>
			</WalletCardWrapper>
		);
	}

	return (
		<WalletCardWrapper>
			<ul className="flex flex-col gap-4 flex-1 text-xl font-medium">
				{wallet?.data.wallets.map((wallet) => (
					<li
						key={wallet.walletId}
						className="flex justify-between items-center"
					>
						<span className="text-gray-700">{wallet.currency}</span>
						<span className="text-gray-700 font-semibold">
							{CURRENCY_INFO[wallet.currency].unit}{' '}
							{wallet.balance.toLocaleString()}
						</span>
					</li>
				))}
			</ul>
			<Separator />
			<div className="flex justify-between items-center text-xl font-medium">
				<span className="text-gray-700">총 보유 자산</span>
				<span className="text-xl font-bold text-blue-600">
					₩ {wallet?.data.totalKrwBalance.toLocaleString()}
				</span>
			</div>
		</WalletCardWrapper>
	);
};

const WalletCardWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<Card className="h-full flex flex-col bg-gray-100">
			<CardHeader>
				<CardTitle className="text-xl font-bold">내 지갑</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4 flex-1">
				{children}
			</CardContent>
		</Card>
	);
};
