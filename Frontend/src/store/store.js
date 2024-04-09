import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import favoritesReducer from './favorites/favoritesSlice';

const preloadedState = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};
const store = configureStore({
    reducer: {
        auth: authReducer,
        favorites: favoritesReducer,
    },
    preloadedState,
});
store.subscribe(() => {
    localStorage.setItem('favorites', JSON.stringify(store.getState().favorites));
});

export default store;
