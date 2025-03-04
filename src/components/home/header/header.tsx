import Logo from './logo';
import Navigation from './navigation';
import HireMe from './hire-me';

export interface NavigationProps {
  navigations: { name: string; url: string }[];
}
const Header = ({ navigations }: NavigationProps) => {
  return (
    <header className="flex items-center container mx-auto px-2 py-4">
      <div>
        <Logo />
      </div>
      <div className="flex items-center ml-auto mr-4">
        <Navigation navigations={navigations} />
        <div className='ml-6'>
          <HireMe />
        </div>
      </div>
    </header>
  );
};

export default Header;
