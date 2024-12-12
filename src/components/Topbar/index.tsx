import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Topbar() {
  const navigate = useNavigate();

  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="text-xl font-bold">Movie Blog</span>
        </div>

        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/francisdiasbr.png" alt="Francis Dias" />
            <AvatarFallback>FD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
} 