import axios from "axios";
import { userActions } from "../reducers/user-slice";

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

export const register = (userData) => {
  return async(dispatch) => {
    try {
      dispatch(userActions.registerRequest());

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        `/api/v1/register`,
        userData,
        config
      );

      dispatch(userActions.registerSuccess(data))
    }
    catch (error) {
      dispatch(
        userActions.registerFail({
          error: error.response.data.message,
        })
      );
    }
  }
}

export const loadUser = () => {
  return async(dispatch) => {
    try {
      dispatch(userActions.loadUserRequest());

      const { data } = await axios.get(`api/v1/me`);
      dispatch(userActions.loadUserSuccess({ user: data.user }));
    } catch (error) {
      dispatch(userActions.loadUserFail({ error: error.response.data.message }))
    }
  }
}

export const clearErrors = () => {
  return async (dispatch) => {
    dispatch(userActions.clearErrors());
  };
};
