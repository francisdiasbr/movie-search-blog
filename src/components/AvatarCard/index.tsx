import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOpinion } from "@/features/opinion/opinionSlice";
import { RootState } from "@/store/types";
import { useEffect } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { ErrorMessage } from "../ErrorMessage";
import { useParams } from "react-router-dom";

interface AvatarCardProps {
  name: string;
  imageUrl: string;
  fallback: string;
}

export function AvatarCard({ name, imageUrl, fallback }: AvatarCardProps) {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state: RootState) => state.opinion);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchOpinion(movieId));
    }
  }, [dispatch, movieId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

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
            <p className="text-sm text-slate-600">{data.opinion}</p>
            <p className="text-sm text-slate-600">Nota: {data.rate}/10</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}