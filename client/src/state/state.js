// state.js (Redux slice or actions file)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous action to fetch posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ token }) => {
    const response = await fetch('http://localhost:3001/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setPost(state, action) {
      const index = state.posts.findIndex(post => post._id === action.payload.post._id);
      if (index !== -1) {
        state.posts[index] = action.payload.post;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
        
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPost } = postsSlice.actions;

export default postsSlice.reducer;
