import { useNavigate } from 'react-router-dom';

export function SubTopbar() {
  const navigate = useNavigate();

  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-center px-4">
        <div className="flex items-center gap-2">
          <span 
            className="cursor-pointer text-lg font-medium"
            onClick={() => navigate('/reviews')}
          >
            REVIEWS
          </span>
        </div>
      </div>
    </div>
  );
} 