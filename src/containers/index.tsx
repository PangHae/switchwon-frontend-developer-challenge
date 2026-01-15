import Image from 'next/image';

import { LoginFormClient } from '@/components/views/LoginForm.client';

const Home = () => {
	return (
		<main className="w-full h-full flex items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-10 w-[560px]">
				<div className="flex flex-col items-center justify-center gap-4">
					<Image
						src="/images/switchwon_logo.jpeg"
						alt="logo"
						width={80}
						height={80}
					/>
					<span className="text-5xl font-bold">반갑습니다.</span>
					<span className="text-[32px] font-medium text-gray-600">
						로그인 정보를 입력해주세요.
					</span>
				</div>
				<LoginFormClient />
			</div>
		</main>
	);
};

export default Home;
