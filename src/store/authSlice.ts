import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../api/authService';
import { AxiosError } from 'axios';
import { tokenService } from '../api/tokenService';
import { AuthInitialState, UserLogin } from '../types/types';

const initialState: AuthInitialState = {
  loginStatus: 'idle',
  registerStatus: 'idle',
};

export const login = createAsyncThunk(
  'auth/login',
  async (userData: UserLogin, { rejectWithValue }) => {
    try {
      const signInResponse = await authService.loginUser(userData);
      console.log('signInResponse:', signInResponse);
      tokenService.setToken(signInResponse.data.access_token);
    } catch (e) {
      const error = e as AxiosError;
      const errorData = error.response?.data as AxiosError;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(login.fulfilled, (state) => {
        state.loginStatus = 'succeeded';
      })
      .addCase(login.rejected, (state) => {
        state.loginStatus = 'failed';
      });
  },
});

export const authReducer = authSlice.reducer;
