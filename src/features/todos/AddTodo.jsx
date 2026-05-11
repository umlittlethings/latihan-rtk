import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './todosSlice';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    dispatch(addTodo(trimmed));
    setTitle('');
  };

  return (
    <section className="card">
      <h2>Tambah Todo</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Masukkan tugas baru"
        />
        <button type="submit">Tambah</button>
      </form>
    </section>
  );
}
