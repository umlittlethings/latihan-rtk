import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  if (!response.ok) {
    throw new Error('Gagal mengambil todos');
  }
  const data = await response.json();
  return data.map(todo => ({
    id: todo.id.toString(),
    title: todo.title,
    completed: todo.completed
  }));
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false
          }
        };
      }
    },
    toggleCompleted(state, action) {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addTodo, toggleCompleted, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
