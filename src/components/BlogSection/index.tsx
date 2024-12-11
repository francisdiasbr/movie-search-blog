import { Container, Title, Content } from './styles';

interface BlogSectionProps {
  title: string;
  content: string;
}

export function BlogSection({ title, content }: BlogSectionProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Container>
  );
}