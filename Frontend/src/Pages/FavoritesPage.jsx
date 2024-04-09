import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFavorite } from '../store/favorites/favoritesSlice';
import PropertyCard from '../Components/PropertyCard';
import Style from './Style/FavoritesPage.module.css'


const FavoritesPage = () => {
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const handleRemoveClick = (property) => {
        dispatch(removeFavorite(property));
    }
    return (
        <div className={Style.mainContainer}>
            <h1>Your Favorite Properties</h1>
            <div className={Style.propertyContainer}>
                {favorites.map(property => (
                    <div key={property.id}>
                        <PropertyCard property={property} />
                        <button className={Style.buttonRemove} onClick={() => handleRemoveClick(property)}>
                            Remove from Favorites
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage