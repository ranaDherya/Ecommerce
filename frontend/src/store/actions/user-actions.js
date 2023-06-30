import axios from "axios";
import { forgotPasswordActions, userActions } from "../reducers/user-slice";

// Login User
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.loginRequest());

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );

      dispatch(userActions.loginSuccess({ user: data.user }));
    } catch (error) {
      dispatch(
        userActions.loginFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

// Register User
export const register = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.registerRequest());

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(`/api/v1/register`, userData, config);

      dispatch(userActions.registerSuccess(data));
    } catch (error) {
      dispatch(
        userActions.registerFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

// Load User
export const loadUser = () => {
  return async (dispatch) => {
    try {
      dispatch(userActions.loadUserRequest());

      const { data } = await axios.get(`api/v1/me`);
      dispatch(userActions.loadUserSuccess({ user: data.user }));
    } catch (error) {
      dispatch(
        userActions.loadUserFail({ error: error.response.data.message })
      );
    }
  };
};

// Logout User
export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.get(`api/v1/logout`);
      dispatch(userActions.logoutUserSuccess());
    } catch (error) {
      dispatch(
        userActions.logoutUserFail({ error: error.response.data.message })
      );
    }
  };
};

// Update User Profile
export const updateProfile = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.updateProfileRequest());

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const { data } = await axios.put(`/api/v1/me/update`, userData, config);

      dispatch(
        userActions.updateProfileSuccess({
          isUpdated: data.success,
          user: data.user,
        })
      );
    } catch (error) {
      dispatch(
        userActions.updateProfileFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

// Update User Password
export const updatePassword = (password) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.updatePasswordRequest());

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.put(
        `/api/v1/password/update`,
        password,
        config
      );

      dispatch(userActions.updatePasswordSuccess({ isUpdated: data.success }));
    } catch (error) {
      dispatch(
        userActions.updatePasswordFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

// Forgot Password
export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordActions.forgotPasswordRequest());

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        `/api/v1/password/forgot`,
        email,
        config
      );

      dispatch(
        forgotPasswordActions.forgotPasswordSuccess({ message: data.message })
      );
    } catch (error) {
      dispatch(
        forgotPasswordActions.forgotPasswordFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

//Reset Password
export const resetPassword = (token, passwords) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordActions.resetPasswordRequest());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `api/v1/password/reset/${token}`,
        passwords,
        config
      );

      dispatch(
        forgotPasswordActions.resetPasswordSuccess({ success: data.success })
      );
    } catch (error) {
      dispatch(
        forgotPasswordActions.resetPasswordFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

// Clear Errors
export const clearErrors = () => {
  return async (dispatch) => {
    dispatch(userActions.clearErrors());
  };
};
