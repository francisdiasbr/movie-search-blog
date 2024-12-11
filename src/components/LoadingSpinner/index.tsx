import { Loader2 } from 'lucide-react';
import { Container } from './styles';

export function LoadingSpinner() {
  return (
    <Container>
      <Loader2 className="spinner" />
    </Container>
  );
}