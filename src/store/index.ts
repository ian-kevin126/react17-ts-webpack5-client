import {actionLog} from "./middlewares/actionLog";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./slices";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {useDispatch, useSelector} from "react-redux";
import tagsViewSlice from "@/store/slices/tagView.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  tagsView: tagsViewSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
  devTools: true,
});

const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;

// store.getState
type AppState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

// 二次封装dispatch hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 二次封装useSelector
export const useAppState = <T extends (state: AppState) => any>(
  selector: T,
): ReturnType<T> => useSelector(selector);

export default {store, persistor};
