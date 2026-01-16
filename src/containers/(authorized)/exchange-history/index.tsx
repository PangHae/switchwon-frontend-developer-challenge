'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useOrderHistory } from '@/hooks/api/useOrderHistory';

const ExchangeHistoryContainer = () => {
	const { data: orderHistoryResponse, isLoading } = useOrderHistory();
	const orderHistory = orderHistoryResponse?.data || [];

	const formatDateTime = (dateTime: string) => {
		return dateTime.replace('T', ' ');
	};

	const formatNumber = (num: number) => {
		return num.toLocaleString('ko-KR');
	};

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
					<div className="w-full bg-white border border-gray-300 overflow-hidden flex-1 min-h-0 flex flex-col rounded-3xl">
						<div className="pt-4 shrink-0">
							<Table>
								<TableHeader className="[&_tr]:border-0 border-y border-gray-300">
									<TableRow className="border-0 hover:bg-gray-100 h-[50px]">
										<TableHead className="text-left text-gray-600 text-sm h-[50px] w-[20%] pl-8 pr-4">
											거래 ID
										</TableHead>
										<TableHead className="text-left text-gray-600 text-sm h-[50px] w-[20%] px-4">
											거래 일시
										</TableHead>
										<TableHead className="text-right text-gray-600 text-sm h-[50px] w-[20%] px-4">
											매수 금액
										</TableHead>
										<TableHead className="text-right text-gray-600 text-sm h-[50px] w-[20%] px-4">
											체결 환율
										</TableHead>
										<TableHead className="text-right text-gray-600 text-sm h-[50px] w-[20%] pl-4 pr-8">
											매도 금액
										</TableHead>
									</TableRow>
								</TableHeader>
							</Table>
						</div>
						<div className="flex-1 min-h-0 overflow-auto custom-scrollbar px-4">
							<Table>
								<TableBody className="[&_tr]:border-0">
									{isLoading ? (
										<TableRow className="border-0">
											<TableCell
												colSpan={5}
												className="text-center py-8 text-gray-500"
											>
												로딩 중...
											</TableCell>
										</TableRow>
									) : orderHistory.length === 0 ? (
										<TableRow className="border-0">
											<TableCell
												colSpan={5}
												className="text-center py-8 text-gray-500"
											>
												거래 내역이 없습니다.
											</TableCell>
										</TableRow>
									) : (
										orderHistory.map((order) => (
											<TableRow
												key={order.orderId}
												className="border-0 bg-white hover:bg-gray-50 h-[50px]"
											>
												<TableCell className="text-left text-gray-700 text-sm h-[50px] w-[20%]">
													{order.orderId}
												</TableCell>
												<TableCell className="text-left text-gray-700 text-sm h-[50px] w-[20%]">
													{formatDateTime(order.orderedAt)}
												</TableCell>
												<TableCell className="text-right text-gray-700 text-sm h-[50px] w-[20%]">
													{formatNumber(order.toAmount)}
												</TableCell>
												<TableCell className="text-right text-gray-700 text-sm h-[50px] w-[20%]">
													{formatNumber(order.appliedRate)}
												</TableCell>
												<TableCell className="text-right text-gray-700 text-sm h-[50px] w-[20%]">
													{formatNumber(order.fromAmount)}
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default ExchangeHistoryContainer;
