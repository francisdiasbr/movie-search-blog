interface ReviewCardProps {
  post: {
    tconst: string;
    title: string;
    created_at: string;
  };
  onClick: (movieId: string) => void;
}

export function ReviewCard({ post, onClick }: ReviewCardProps) {
  return (
    <div 
      onClick={() => onClick(post.tconst)}
      style={{
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <img 
            src="https://github.com/francisdiasbr.png" 
            alt="Francis Dias" 
            style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '8px' }} 
          />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>{post.title}</h3>
        </div>
      </div>
      <p style={{ color: '#999', fontSize: '0.875rem', textAlign: 'right', marginTop: 'auto' }}>
        {post.created_at}
      </p>
    </div>
  );
} 