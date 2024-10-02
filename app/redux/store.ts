import { configureStore } from '@reduxjs/toolkit';

import { shazamCoreApi } from './services/shazamCore';
import playerReducer from './features/playerSlice';

export const store = () => {
  return configureStore({
    reducer: {
      [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
      player: playerReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(shazamCoreApi.middleware),
  })
};

/**
 * Creates a type for the store itself, so that it can be used later on.
 * The return type of the `store` function is the `AppStore` type.
 */
export type AppStore = ReturnType<typeof store>;

/**
 * Creates a type for the root state of the application, which is the type
 * of the state that the store will return when calling `getState()`.
 * This type is the same as the type of the state that the store will have
 * after calling `dispatch()`.
 */
export type RootState = ReturnType<AppStore['getState']>

/**
 * Creates a type for the dispatch function of the store, which is the function
 * that dispatches the actions to the reducers.
 * This type is the same as the type of the dispatch function that the store will
 * have after calling `dispatch()`.
 */
export type AppDispatch = AppStore['dispatch'];
