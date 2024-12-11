import { Container, Input, Label } from './styles';

interface MovieIdInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function MovieIdInput({ value, onChange, onSubmit }: MovieIdInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <Container>
      <Label htmlFor="movieId">ID do Filme (ex: tt0059319):</Label>
      <Input
        id="movieId"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite o ID do filme..."
      />
    </Container>
  );
}