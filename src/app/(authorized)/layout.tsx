import GNB from '@/components/layout/GNB';

interface AuthorizedLayoutProps {
	children: React.ReactNode;
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
	return (
		<div>
			<GNB />
			{children}
		</div>
	);
};

export default AuthorizedLayout;
