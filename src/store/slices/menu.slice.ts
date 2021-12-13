import { cleanFalsyParams } from './../../utils/common';
import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { InitialStateProps, MenuItemProps, MenuListProps } from '@/interfaces/menu.interface';

const initialState: InitialStateProps = {
  loading: false,
  error: null,
  menuList: []
};

/**
 * 获取菜单列表
 */
export const getMenuList = createAsyncThunk(
  "menu/list",
  async (parameters: MenuListProps) => {
    const params: MenuListProps = {
      menuName: parameters.menuName,
      menuState: parameters.menuState,
    };
    const { data } = await axios.get(`http://localhost:8090/api/menu/list`, { params });
    if (data.code === 200) {
      return data.data;
    } else {
      message.info(data.msg)
    }
  }
);

/**
 * 新增、编辑、删除菜单
 */
export const operateMenuItem = createAsyncThunk(
  "menu/operate",
  async (parameters: MenuItemProps) => {
    const params: MenuItemProps = cleanFalsyParams({
      _id: parameters._id,
      action: parameters.action,
      menuType: parameters.menuType,
      menuName: parameters.menuName,
      parentId: parameters.parentId,
      menuCode: parameters.menuCode,
      path: parameters.path,
      icon: parameters.icon,
      component: parameters.component,
    }) as MenuItemProps;
    const { data } = await axios.post(`http://localhost:8090/api/menu/operate`, params);
    if (data.code === 200) {
      return data.data;
    } else {
      message.info(data.msg)
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    // logOut: (state) => {
    //   state.token = null;
    //   state.error = null;
    //   state.loading = false;
    //   state.userInfo = null;
    // },
    // setUserState(state, action: PayloadAction<Partial<UserState>>) {
    //   // const { username } = action.payload;
    //   //
    //   // if (username !== state.username) {
    //   //   localStorage.setItem('username', action.payload.username || '');
    //   // }

    //   Object.assign(state, action.payload);
    // }
  },
  extraReducers: {
    [getMenuList.pending.type]: (state) => {
      state.loading = true;
    },
    [getMenuList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.menuList = action.payload;
      state.error = null;
    },
    [getMenuList.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [operateMenuItem.pending.type]: (state) => {
      state.loading = true;
    },
    [operateMenuItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      console.log('action', action)
      // state.menuList = action.payload;
      // state.error = null;
    },
    [operateMenuItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      console.log('action.payload', action)
      // state.error = action.payload;
    },
  },
});

export default menuSlice;
