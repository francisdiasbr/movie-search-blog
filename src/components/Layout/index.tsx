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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white', color: '#1e293b' }}>
      <Topbar />
      <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
        <div style={{ width: '100%', maxWidth: '1600px', display: 'flex', flexDirection: 'column', padding: '16px' }}>
          {isInternalPage && (
            <div style={{ position: 'relative', marginLeft: isMobile ? '16px' : '16px', marginTop: '16px', zIndex: 10 }}>
              <GoBack />
            </div>
          )}
          <SubTopbar />
          <main style={{ flexGrow: 1, paddingTop: '24px', marginTop: '16px' }}>
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
