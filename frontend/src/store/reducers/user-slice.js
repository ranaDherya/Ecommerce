import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },

    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    loginFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.error;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const userActions = userSlice.actions;
