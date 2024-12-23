import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export function Topbar() {
  const navigate = useNavigate();

  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
          onKeyDown={e => e.key === 'Enter' && navigate('/')}
          role="button"
          tabIndex={0}
        >
          <span className="text-3xl font-bold">The Movie Blog</span>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="cursor-pointer text-lg font-medium"
            onClick={() => navigate('/aboutus')}
            onKeyDown={e => e.key === 'Enter' && navigate('/')}
            role="button"
            tabIndex={0}
          >
            ABOUT
          </span>
          <a href="https://github.com/francisdiasbr" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
          <a href="https://linkedin.com/in/francisdiasbr" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
        </div>
      </div>
    </div>
  );
}
