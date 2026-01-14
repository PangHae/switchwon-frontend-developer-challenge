import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const pretendard = localFont({
	src: './fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard',
});

export const metadata: Metadata = {
	title: '환전 어플리케이션',
	description: 'SwitchOne Frontend Developer Challenge',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${pretendard.className} antialiased flex flex-col w-dvw h-dvh overflow-hidden`}
			>
				{children}
			</body>
		</html>
	);
}
