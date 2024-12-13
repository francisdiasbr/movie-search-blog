import { Topbar } from '../Topbar';
import { GoBack } from '../GoBack';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Footer from '../Footer/Footer';
import { SubTopbar } from '../SubTopbar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isInternalPage = location.pathname.includes('movie');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Topbar />
      <div className="flex justify-center flex-grow">
        <div className="w-full max-w-[1200px] flex flex-col">
          {isInternalPage && (
            <div className={`relative ${isMobile ? 'ml-4 mt-4' : 'ml-4 mt-4'} z-10`}>
              <GoBack />
            </div>
          )}
          <SubTopbar />
          <main className="flex-grow pt-6 mt-4">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
} 