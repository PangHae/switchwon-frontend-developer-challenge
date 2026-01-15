import ky from 'ky';

export const apiClient = ky.create({
	prefixUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
	retry: 0,
});
