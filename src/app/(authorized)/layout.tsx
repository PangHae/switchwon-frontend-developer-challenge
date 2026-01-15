import { AuthGuard } from '@/components/auth/AuthGuard.client';
import GNB from '@/components/layout/GNB';

interface AuthorizedLayoutProps {
	children: React.ReactNode;
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
	return (
		<AuthGuard>
			<div>
				<GNB />
				{children}
			</div>
		</AuthGuard>
	);
};

export default AuthorizedLayout;
