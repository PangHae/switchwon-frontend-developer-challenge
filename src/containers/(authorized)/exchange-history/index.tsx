import ExchangeHistoryTable from '@/components/views/(authorized)/exchange-history/ExchangeHistoryTable.client';

const ExchangeHistoryContainer = () => {
	return (
		<main className="w-full h-full p-10">
			<section className="flex flex-col gap-8 w-full h-full min-h-0">
				<div className="w-full shrink-0">
					<h1 className="text-[40px] font-bold">환전 내역</h1>
					<span className="text-xl text-gray-600">
						환전 내역을 확인하실 수 있어요.
					</span>
				</div>
				<div className="w-full flex gap-4 flex-1 min-h-0">
					<ExchangeHistoryTable />
				</div>
			</section>
		</main>
	);
};

export default ExchangeHistoryContainer;
