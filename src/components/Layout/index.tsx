import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';

import Footer from '../Footer/Footer';
import { GoBack } from '../GoBack';
import { SubTopbar } from '../SubTopbar';
import { Topbar } from '../Topbar';
import * as S from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isInternalPage = location.pathname.includes('movie') || location.pathname.includes('review');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <S.LayoutContainer>
      <Topbar />
      <S.ContentWrapper>
        <S.InnerContainer>
          <SubTopbar />
          {isInternalPage && (
            <S.GoBackWrapper isMobile={isMobile}>
              <GoBack />
            </S.GoBackWrapper>
          )}
          <S.MainContent>{children}</S.MainContent>
        </S.InnerContainer>
      </S.ContentWrapper>
      <Footer />
    </S.LayoutContainer>
  );
}
