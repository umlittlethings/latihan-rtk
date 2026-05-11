import Posts from './features/posts/Posts';

export default function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>Latihan RTK</h1>
        <p>Praktik fetch API sederhana dengan Redux Toolkit</p>
      </header>

      <main>
        <Posts />
      </main>
    </div>
  );
}
