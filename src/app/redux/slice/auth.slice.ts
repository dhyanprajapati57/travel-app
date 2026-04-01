//  imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { loginService, registerService } from "@/app/lib/service/auth.service";

//  types
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

//  initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  message: null,
};

//  slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.message = "Login successful";

      //  Save to localStorage
    },
    registerSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = action.payload;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

//  export actions
export const { authStart, loginSuccess, registerSuccess, authFailure, logout } =
  authSlice.actions;

//  export reducer
export default authSlice.reducer;

// LOGIN
export const loginUser =
  (data: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(authStart());

    try {
      const res = await loginService(data);
      dispatch(loginSuccess(res.data));
      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(authFailure(error?.response?.data?.message || "Login failed"));
      return error;
    }
  };

// REGISTER
export const registerUser =
  (data: { name: string; email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(authStart());

    try {
      const res = await registerService(data);
      dispatch(registerSuccess(res.data.message));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        authFailure(error?.response?.data?.message || "Register failed"),
      );
    }
  };
