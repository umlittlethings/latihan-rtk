import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost, updatePost, deletePost, clearError } from './postsSlice';

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingId, setEditingId] = useState(null);
  const [editPost, setEditPost] = useState({ title: '', body: '' });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    try {
      await dispatch(addPost(newPost)).unwrap();
      setNewPost({ title: '', body: '' });
    } catch (err) {
      console.error('Failed to add post:', err);
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditPost({ title: post.title, body: post.body });
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!editPost.title.trim() || !editPost.body.trim()) return;
    try {
      await dispatch(updatePost({ id: editingId, ...editPost })).unwrap();
      setEditingId(null);
      setEditPost({ title: '', body: '' });
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus post ini?')) {
      try {
        await dispatch(deletePost(id)).unwrap();
      } catch (err) {
        console.error('Failed to delete post:', err);
      }
    }
  };

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  return (
    <div>
      <section className="card">
        <h2>Tambah Post Baru</h2>
        <form onSubmit={handleAddPost} className="post-form">
          <input
            type="text"
            placeholder="Judul post"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Isi post"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            rows="3"
            required
          />
          <button type="submit" className="btn-primary">Tambah Post</button>
        </form>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>Daftar Posts</h2>
          <button onClick={handleRefresh} className="btn-secondary">Refresh</button>
        </div>
        {status === 'loading' && <p>Memuat data...</p>}
        {status === 'failed' && (
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={() => dispatch(clearError())}>Tutup</button>
          </div>
        )}
        {status === 'succeeded' && (
          <ul className="post-list">
            {posts.map(post => (
              <li key={post.id} className="post-item">
                {editingId === post.id ? (
                  <form onSubmit={handleUpdatePost} className="edit-form">
                    <input
                      type="text"
                      value={editPost.title}
                      onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                      required
                    />
                    <textarea
                      value={editPost.body}
                      onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                      rows="3"
                      required
                    />
                    <div className="form-actions">
                      <button type="submit" className="btn-primary">Simpan</button>
                      <button type="button" onClick={() => setEditingId(null)} className="btn-secondary">Batal</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <strong>{post.title}</strong>
                    <p>{post.body}</p>
                    <div className="post-actions">
                      <button onClick={() => handleEdit(post)} className="btn-edit">Edit</button>
                      <button onClick={() => handleDelete(post.id)} className="btn-delete">Hapus</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
