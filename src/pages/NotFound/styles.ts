import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

export const Code = styled.p`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: 72px;
  line-height: 1;
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
`;
