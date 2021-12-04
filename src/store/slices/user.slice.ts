import axios from "axios";
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {LoginProps, RegisterProps, UserState} from "@/interfaces/user.interface";
import {message} from "antd";

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

// 登录逻辑
export const login = createAsyncThunk(
  "user/login",
  async (parameters: LoginProps) => {
    const params: LoginProps = {
      username: parameters.username,
      password: parameters.password,
    };
    const {data} = await axios.post(`http://localhost:8090/users/login`, params);
    if (data.code === 200) {
      message.success('登陆成功');
      return data.data;
    } else {
      message.info(data.msg)
    }
  }
);

// 注册逻辑
export const register = createAsyncThunk(
  "user/register",
  async (parameters: RegisterProps) => {
    const params: RegisterProps = {
      username: parameters.username,
      password: parameters.password
    };
    if (parameters.phoneNo) params.phoneNo = parameters.phoneNo;
    if (parameters.email) params.email = parameters.email;
    const {data} = await axios.post(`http://localhost:8090/users/register`, params);
    if (data.code === 200) {
      message.success('注册成功');
    } else {
      message.info(data.msg)
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.loading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    [login.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [register.pending.type]: (state) => {
      state.loading = true;
    },
    [register.fulfilled.type]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [register.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
