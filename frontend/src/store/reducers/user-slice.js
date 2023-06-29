import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    isUpdated: false,
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

    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },

    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    registerFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.error;
    },

    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },

    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    loadUserFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.error;
    },

    logoutUserSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },

    logoutUserFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    updateProfileRequest(state) {
      state.loading = true;
    },

    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isUpdated = action.payload.isUpdated;
      state.user = action.payload.user;
    },

    updateProfileFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    updateProfileReset(state) {
      state.isUpdated = false;
    },

    updatePasswordRequest(state) {
      state.loading = true;
    },

    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isUpdated = action.payload.isUpdated;
    },

    updatePasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    updatePasswordReset(state) {
      state.isUpdated = false;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const userActions = userSlice.actions;
