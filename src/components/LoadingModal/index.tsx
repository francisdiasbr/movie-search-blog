import { useLanguage } from '../../contexts/LanguageContext';
import { ActivityIndicator } from '../ActivityIndicator';
import * as S from './styles';

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal = ({ isOpen }: LoadingModalProps) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.ModalContent>
        <S.LoadingContainer>
          <ActivityIndicator />
        </S.LoadingContainer>
        <S.Message>
          {language === 'pt' ? 'O servidor está iniciando... Por favor, aguarde alguns segundos.' : 'Server is starting... Please wait a few seconds.'}
        </S.Message>
      </S.ModalContent>
    </S.Overlay>
  );
};

export default LoadingModal; 