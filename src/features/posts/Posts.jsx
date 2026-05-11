import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './postsSlice';

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <section className="card">
      <h2>Fetch API Sederhana</h2>
      {status === 'loading' && <p>Memuat data...</p>}
      {status === 'failed' && <p className="error">Error: {error}</p>}
      {status === 'succeeded' && (
        <ul className="post-list">
          {posts.map(post => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
