import React from 'react';

import Footer from '../Footer/Footer';
import { Topbar } from '../Topbar';
import * as S from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <S.LayoutContainer>
      <Topbar />
      <S.ContentWrapper>
        <S.InnerContainer>
          <S.MainContent>{children}</S.MainContent>
        </S.InnerContainer>
      </S.ContentWrapper>
      <Footer />
    </S.LayoutContainer>
  );
}
