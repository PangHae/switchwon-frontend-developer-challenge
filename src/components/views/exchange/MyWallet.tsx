import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const MyWallet = () => {
	return (
		<Card className="h-full flex flex-col">
			<CardHeader>
				<CardTitle className="text-xl font-bold">내 지갑</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4 flex-1">
				<ul className="flex flex-col gap-4 flex-1">
					<li className="flex justify-between items-center">
						<span className="text-gray-700">KRW</span>
						<span className="text-gray-700">₩ 1,200,000</span>
					</li>
					<li className="flex justify-between items-center">
						<span className="text-gray-700">USD</span>
						<span className="text-gray-700">$ 50,000</span>
					</li>
					<li className="flex justify-between items-center">
						<span className="text-gray-700">JPY</span>
						<span className="text-gray-700">₩ 150,000</span>
					</li>
				</ul>
				<Separator />
				<div className="flex justify-between items-center">
					<span className="text-gray-700">총 보유 자산</span>
					<span className="text-xl font-bold text-blue-600">₩ 3,000,000</span>
				</div>
			</CardContent>
		</Card>
	);
};
