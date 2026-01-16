import { useQuery } from '@tanstack/react-query';

import { getOrderHistory } from '@/api/order';

export const useOrderHistory = () => {
	return useQuery({
		queryKey: ['orders', 'history'],
		queryFn: getOrderHistory,
	});
};
