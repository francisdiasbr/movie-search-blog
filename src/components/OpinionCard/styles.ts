import styled from 'styled-components';

export const OpinionCard = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
  padding: 16px;
  gap: 16px;
`;

export const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  height: 40px;
  object-fit: cover;
  width: 40px;
`;

export const OpinionText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  font-size: 1rem;
  line-height: 1.5;
`;
