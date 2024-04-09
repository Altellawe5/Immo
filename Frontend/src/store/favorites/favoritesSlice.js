// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        addFavorite: (state, action) => {
            if (!state.find(item => item.id === action.payload.id)) {
                state.push(action.payload);
                toast.success("Added to favorites!");
            }
            else {
                toast.error("Already in favorites!");
            }
        },
        removeFavorite: (state, action) => {
            toast.success("Removed from favorites!");
            return state.filter(property => property.id !== action.payload.id);
        }
    }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
