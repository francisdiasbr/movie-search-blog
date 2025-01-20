import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import SkeletonBlogPost from '../../components/SkeletonBlogPost';
import { fetchAuthoralReview } from '../../features/authoralReview/authoralReviewSlice';
import { fetchOpinion } from '../../features/opinion/opinionSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function Review() {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, error, status } = useAppSelector(state => state.authoralReview);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchAuthoralReview(movieId));
      dispatch(fetchOpinion(movieId));
    }
  }, [dispatch, movieId]);

  if (error) return <ErrorMessage message={error} />;
  if (status === 'loading') return <Layout><SkeletonBlogPost /></Layout>;
  if (!data) return null;

  return (
    <Layout>
      {status === 'succeeded' && data && (
        <>
          <h1>{data.primaryTitle}</h1>
          <div>
            {data.content.pt.text.split('\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>
            ))}
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '2rem' 
          }}>
            <img 
              src="https://github.com/francisdiasbr.png" 
              alt="Francis Dias"
              style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%'
              }} 
            />
          </div>
        </>
      )}
    </Layout>
  );
} 
