import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, toggleCompleted, deleteTodo } from './todosSlice';

export default function TodoList() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.todos.items);
  const status = useSelector(state => state.todos.status);
  const error = useSelector(state => state.todos.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const content = () => {
    if (status === 'loading') {
      return <p>Memuat todos...</p>;
    }

    if (status === 'failed') {
      return <p className="error">Error: {error}</p>;
    }

    if (items.length === 0) {
      return <p>Belum ada todo. Tambahkan satu dulu.</p>;
    }

    return (
      <ul className="todo-list">
        {items.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <button onClick={() => dispatch(toggleCompleted(todo.id))}>
              {todo.completed ? '⟲' : '✔'}
            </button>
            <span>{todo.title}</span>
            <button className="delete" onClick={() => dispatch(deleteTodo(todo.id))}>
              Hapus
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="card">
      <h2>Daftar Todo</h2>
      {content()}
    </section>
  );
}
