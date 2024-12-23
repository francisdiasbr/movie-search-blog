import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { fetchOpinion } from '../../features/opinion/opinionSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import { ErrorMessage } from '../ErrorMessage';
import { LoadingSpinner } from '../LoadingSpinner';

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
    <div className="mb-4 bg-slate-100">
      <div className="flex items-center gap-8">
        <Avatar className="w-14 h-14 transform scale-150">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-md text-slate-600">{data.opinion}</p>
          <p className="text-md text-slate-600">Nota: {data.rate}/10</p>
        </div>
      </div>
    </div>
  );
}
