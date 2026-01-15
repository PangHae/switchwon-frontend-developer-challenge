import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export const ExchangeRateCard = () => {
	return (
		<Card className="flex-1 gap-1">
			<CardHeader>
				<CardTitle className="flex items-center justify-between text-lg">
					USD
					<CardDescription>미국 달러</CardDescription>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col">
				<span className="text-2xl font-bold">1,320.50 KRW</span>
				<span className="text-md text-gray-500">+0.5%</span>
			</CardContent>
		</Card>
	);
};
