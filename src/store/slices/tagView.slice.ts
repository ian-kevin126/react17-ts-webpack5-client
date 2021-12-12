import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TagItem, TagState} from "@/interfaces/user.interface";

const initialState: TagState = {
  activeTagId: '',
  tags: [],
};

const tagsViewSlice = createSlice({
  name: 'tagsView',
  initialState,
  reducers: {
    // 设置当前tabView
    setActiveTag(state, action: PayloadAction<string>) {
      state.activeTagId = action.payload;
    },

    //增加新的tab
    addTag(state, action: PayloadAction<TagItem>) {
      if (!state.tags.find(tag => tag.id === action.payload.id)) {
        state.tags.push(action.payload);
      }

      state.activeTagId = action.payload.id;
    },
    //删除tab
    removeTag(state, action: PayloadAction<string>) {
      const targetKey = action.payload;
      // dashboard cloud't be closed
      if (targetKey === state.tags[0].id) {
        return;
      }

      const activeTagId = state.activeTagId;
      let lastIndex = 0;

      state.tags.forEach((tag, i) => {
        if (tag.id === targetKey) {
          state.tags.splice(i, 1);
          lastIndex = i - 1;
        }
      });
      const tagList = state.tags.filter(tag => tag.id !== targetKey);
      if (tagList.length && activeTagId === targetKey) {
        if (lastIndex >= 0) {
          state.activeTagId = tagList[lastIndex].id;
        } else {
          state.activeTagId = tagList[0].id;
        }
      }
    },
    //移除所有的tab
    removeAllTag(state) {
      state.activeTagId = state.tags[0].id;
      state.tags = [state.tags[0]];
    },
    //移除其他的tabs
    removeOtherTag(state) {
      const activeTag = state.tags.find(tag => tag.id === state.activeTagId);
      const activeIsDashboard = activeTag!.id === state.tags[0].id;

      state.tags = activeIsDashboard ? [state.tags[0]] : [state.tags[0], activeTag!];
    },
  },
});

export const { setActiveTag, addTag, removeTag, removeAllTag, removeOtherTag } = tagsViewSlice.actions;

export default tagsViewSlice;
