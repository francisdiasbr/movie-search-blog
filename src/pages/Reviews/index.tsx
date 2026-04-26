import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { NoPostsMessage } from '../../components/NoPostsMessage';
import { MovieReviewResponse } from '../../features/writeReviews/types';
import { fetchAllAuthoralReviews } from '../../features/writeReviews/writeReviewsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import * as S from './styles';

export default function Reviews() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, status, error } = useAppSelector((state: RootState) => state.writeReviews);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllAuthoralReviews({ page: 1, pageSize: 50 }));
    }
  }, [status, dispatch]);

  const entries: MovieReviewResponse[] = useMemo(() => {
    return (data as any)?.entries ?? [];
  }, [data]);

  const hasEntries = entries.length > 0;

  const memoizedCards = useMemo(() => {
    if (!hasEntries || status !== 'succeeded') return null;

    const cards = entries.map((post, index) => (
      <Card
        key={post.tconst}
        post={{
          _id: post._id,
          tconst: post.tconst,
          title: post.primaryTitle,
          primaryTitle: post.primaryTitle,
          created_at: post.created_at,
          imageUrl: post.imageUrl ? encodeURI(post.imageUrl) : undefined,
          content: { pt: {}, en: {} },
        }}
        onClick={() => navigate(`/article/${post.tconst}`)}
        isFirst={index === 0}
      />
    ));

    if (cards.length > 1) {
      cards.splice(1, 0, <div key="break" className="card-break" />);
    }

    return cards;
  }, [entries, status, navigate]);

  if (error) return <ErrorMessage message={String(error)} />;

  return (
    <Layout>
      {status === 'loading' && (
        <S.LoadingContainer>
          <S.ActivityIndicator>
            <span />
          </S.ActivityIndicator>
        </S.LoadingContainer>
      )}
      {status === 'succeeded' && !hasEntries && <NoPostsMessage />}
      {status === 'succeeded' && hasEntries && (
        <S.GridContainer>
          {memoizedCards}
        </S.GridContainer>
      )}
    </Layout>
  );
}
