import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import getConfig from 'next/config';

import { User, UserResponse } from '@/types';

const { publicRuntimeConfig: config } = getConfig();

function postUser({ username, password }: User) {
  const http = axios.create({
    baseURL: config.API_URL,
  });
  return http.post<UserResponse>('/auth/login', {
    username: username,
    password: password,
  });
}

export const userLogin = createAsyncThunk(
  'user',
  async ({ username, password }: User) => {
    try {
      const res = await postUser({ username, password });
      return res;
    } catch (err) {
      return err;
    }
  }
);

type UserState = {
  user: UserResponse;
  loading: boolean;
  error?: AxiosError;
};

const initialState = {
  user: {},
  loading: false,
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      return { ...state, user: { token: null, admin: false } };
    },
    adminLogin: (state) => {
      return { ...state, user: { token: null, admin: true } };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      const { data } = action.payload as { data: UserResponse };
      return { ...state, loading: false, user: data };
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error as AxiosError };
    });
  },
});

export default userSlice.reducer;
export const { logout, adminLogin } = userSlice.actions;
