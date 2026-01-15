import { AuthGuard } from '@/components/auth/AuthGuard.client';
import GNB from '@/components/layout/GNB';

interface AuthorizedLayoutProps {
	children: React.ReactNode;
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
	return (
		<AuthGuard>
			<div className="flex flex-col h-full w-full">
				<GNB />
				<div className="flex-1 min-h-0 overflow-auto">{children}</div>
			</div>
		</AuthGuard>
	);
};

export default AuthorizedLayout;
