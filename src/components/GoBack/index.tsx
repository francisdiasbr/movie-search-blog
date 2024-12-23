import { useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';

export function GoBack() {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(-1)}>Voltar</Button>;
}
