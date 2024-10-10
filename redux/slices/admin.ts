import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '@/api/auth'; 

const initialState = {
  user: null,
//   token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'admin/loginUser', 
  async ({ email, password }: { email: string; password: string; }) => {
    const response = await login(email, password);
    return response; 
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; 
        // state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const adminReducer = adminSlice.reducer;
