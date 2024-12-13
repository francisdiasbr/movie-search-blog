import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarCardProps {
  name: string;
  imageUrl: string;
  fallback: string;
}

export function AvatarCard({ name, imageUrl, fallback }: AvatarCardProps) {
  return (
    <Card className="mb-4 bg-slate-100">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 transform scale-110">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <p className="text-sm text-slate-600">Esta obra me tocou profundamente. É um filme de personalidade.</p>
            <p className="text-sm text-slate-600">Nota: 9.5/10</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}