'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '../ui/button';
import { GNB_ITEMS } from '@/constants/nav';
import { removeLocalStorage } from '@/lib/localStorage';

const GNB = () => {
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = () => {
		removeLocalStorage('token');
		router.replace('/');
	};
	return (
		<header className="flex items-center justify-between w-full h-[75px] px-10 border-b border-gray-300">
			<div className="flex gap-2 font-bold text-2xl">
				<Image
					src="/images/switchwon_logo.jpeg"
					alt="logo"
					width={32}
					height={32}
				/>
				Exchange App
			</div>
			<div className="flex items-center gap-8 text-xl">
				<nav>
					<ul className="flex gap-8">
						{GNB_ITEMS.map((item) => {
							const isActive = pathname === item.href;
							return (
								<li key={item.href}>
									<Link
										href={item.href}
										className={isActive ? 'font-bold' : ''}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				<Button
					type="button"
					className="text-xl cursor-pointer"
					onClick={handleLogout}
				>
					Log out
				</Button>
			</div>
		</header>
	);
};

export default GNB;
