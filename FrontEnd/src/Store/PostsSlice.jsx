import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initState = { records: [], loading: false, error: null, record: null };

export const setPosts = createAsyncThunk(
  "posts/setposts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePosts = createAsyncThunk(
  "posts/deleteposts",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertPosts = createAsyncThunk(
  "posts/insertposts",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPost = createAsyncThunk(
  "posts/fetchpost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/posts/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const PostsSlice = createSlice({
  name: "Posts",
  initialState: initState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: (builder) => {
    // get post
    builder.addCase(fetchPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.loading = false;
      state.record = action.payload;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //  get posts
    builder.addCase(setPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(setPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.records = action.payload;
    });
    builder.addCase(setPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete posts
    builder.addCase(deletePosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePosts.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.records.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) state.records.splice(index, 1);
    });
    builder.addCase(deletePosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // add posts
    builder.addCase(insertPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(insertPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.records.push(action.payload);
    });
    builder.addCase(insertPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // edit post
    builder.addCase(editPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.loading = false;
      state.record = action.payload;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default PostsSlice.reducer;
