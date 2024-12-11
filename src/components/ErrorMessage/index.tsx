import { Container, Message } from './styles';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
}