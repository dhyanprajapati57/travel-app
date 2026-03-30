import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../lib/axios";

//  Define User type (better than unknown)
interface User {
  id: number;
  name: string;
  email: string;
}

//  LOGIN 
export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/login", data);
      return res?.data; //  optional chaining
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Login failed" //  correct use
      );
    }
  }
);

//  REGISTER 
export const registerUser = createAsyncThunk<
  { message: string },
  { name: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/register", data);
      return res?.data; //  optional chaining
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Register failed"
      );
    }
  }
);

//  STATE 
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

//  SLICE 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action?.payload; 
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload ?? "Login failed"; 
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload ?? "Register failed";
      });
  },
});

export default authSlice.reducer;