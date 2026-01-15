import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */

	rewrites: () => [
		{
			source: '/api/:path*',
			destination: `${process.env.API_ENDPOINT}/:path*`,
		},
	],
};

export default nextConfig;
