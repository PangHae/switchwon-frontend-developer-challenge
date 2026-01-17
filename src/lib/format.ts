export const formatDateTime = (dateTime: string) => {
	return dateTime.replace('T', ' ');
};

export const formatNumber = (num: number) => {
	return num.toLocaleString('ko-KR');
};
