import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BottomMobileMenu } from './BottomMobileMenu';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomMobileMenu />
    </div>
  );
};
