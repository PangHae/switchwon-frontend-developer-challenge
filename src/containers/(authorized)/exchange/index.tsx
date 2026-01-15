import { Card, CardHeader } from '@/components/ui/card';
import { ExchangeRateCard } from '@/components/views/exchange/ExchangeRateCard';
import { MyWallet } from '@/components/views/exchange/MyWallet';

const ExchangeContainer = () => {
	return (
		<main className="w-full h-full p-10">
			<section className="flex flex-col gap-8 w-full h-full min-h-0">
				<div className="w-full shrink-0">
					<h1 className="text-[40px] font-bold">환율 정보</h1>
					<span className="text-xl text-gray-600">
						실시간 환율을 확인하고 간편하게 환전하세요.
					</span>
				</div>
				<div className="w-full flex gap-4 flex-1 min-h-0">
					<div className="flex flex-col gap-4 flex-1 min-h-0">
						<div className="flex gap-4 shrink-0">
							<ExchangeRateCard />
							<ExchangeRateCard />
						</div>
						<div className="flex-1 min-h-0">
							<MyWallet />
						</div>
					</div>
					<div className="flex-1 min-h-0">
						<Card className="h-full">
							<CardHeader></CardHeader>
						</Card>
					</div>
				</div>
			</section>
		</main>
	);
};

export default ExchangeContainer;
