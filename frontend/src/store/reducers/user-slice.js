import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
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
      state.user = {};
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
      state.user = {};
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
      state.user = {};
      state.error = action.payload.error;
    },

    logoutUserSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
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

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: false,
    success: false,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },

    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },

    forgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    forgotPasswordReset(state) {
      state.message = "";
      state.success = false;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },

    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
    },

    resetPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    allUsersRequest(state) {
      state.loading = true;
    },
    allUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload.users;
    },
    allUsersFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    userDetailsRequest(state) {
      state.loading = true;
    },
    userDetailsSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
    },
    userDetailsFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const updateDeleteUserSlice = createSlice({
  name: "updateDeleteUser",
  initialState: {
    loading: false,
    isUpdated: false,
    isDeleted: false,
  },
  reducers: {
    updateDeleteUserRequest(state) {
      state.loading = true;
    },
    updateDeleteUserFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload.success;
    },
    deleteUserSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },
    updateUserReset(state) {
      state.loading = false;
      state.isUpdated = false;
    },
    deleteUserReset(state) {
      state.loading = false;
      state.message = null;
      state.isDeleted = false;
    },
  },
});

export const userActions = userSlice.actions;
export const forgotPasswordActions = forgotPasswordSlice.actions;
export const allUsersActions = allUsersSlice.actions;
export const updateDeleteUserActions = updateDeleteUserSlice.actions;
export const userDetailsActions = userDetailsSlice.actions;
