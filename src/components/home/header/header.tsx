import Logo from './logo';
import Navigation from './navigation';
import HireMe from './hire-me';
import Burger from './burger';

export interface NavigationProps {
  navigations: { name: string; url: string }[];
}
const Header = ({ navigations }: NavigationProps) => {
  return (
    <header className="flex items-center container mx-auto px-2 py-4">
      <div>
        <Logo />
      </div>
      <div className="ml-auto">
        <Burger navigations={navigations} />
      </div>
      <div className="hidden md:flex items-center ml-auto">
        <Navigation navigations={navigations} />
        <div className="ml-6">
          <HireMe />
        </div>
      </div>
    </header>
  );
};

export default Header;
