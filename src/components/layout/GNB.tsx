'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { GNB_ITEMS } from '@/constants/nav';

const GNB = () => {
	const pathname = usePathname();

	return (
		<header className="flex items-center justify-between w-full h-[75px] px-10">
			<div className="flex gap-2 font-bold text-2xl">
				<Image
					src="/images/switchwon_logo.jpeg"
					alt="logo"
					width={32}
					height={32}
				/>
				Exchange App
			</div>
			<nav>
				<ul className="flex gap-4">
					{GNB_ITEMS.map((item) => {
						const isActive = pathname === item.href;
						return (
							<li key={item.href}>
								<Link href={item.href} className={isActive ? 'font-bold' : ''}>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
};

export default GNB;
