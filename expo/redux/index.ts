import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistReducer, persistStore } from "redux-persist"
import { apiSlice } from "./apis"

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
}

const persistadeAuthReducer = persistReducer(persistConfig, authReducer)

const rootReducer = combineReducers({
	auth: persistadeAuthReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
})

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(apiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export default store
