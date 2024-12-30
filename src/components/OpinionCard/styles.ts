import styled from 'styled-components';

export const OpinionCard = styled.div`
  align-items: center;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  gap: 16px;
`;

export const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const OpinionText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.5;
  flex: 1;
`;
