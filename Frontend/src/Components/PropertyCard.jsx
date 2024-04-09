import React from 'react'
import Style from './PropertyCard.module.css'
import { useDispatch } from 'react-redux'
import { addFavorite } from '../store/favorites/favoritesSlice'
import { Link, useNavigate } from 'react-router-dom'


const PropertyCard = ({ property }) => {

    const dispatch = useDispatch()

    const handleFavoriteClick = (event) => {
        event.preventDefault();
        dispatch(addFavorite(property));
    };
    return (

        <div className={Style.card}>
            <Link to={`/details/${property.id}`}>
                <div className={Style.imgBx}>
                    <img src={property.images[0].url} alt="" />
                    <span className={Style.status}>{property.isForSell ? "Buy" : "Rent"}</span>
                    <input type="checkbox" />
                    <div className={Style.heart}>
                        <button onClick={handleFavoriteClick}>
                            <svg className={Style.heartIcon} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                        </button>
                    </div>
                </div>
                <div className={Style.priceSection}>
                    <h2>{property.street} - {property.houseNumber}</h2>
                    <h2 className={Style.price}>€{property.price.toLocaleString()}</h2>
                    <h3>{property.postalCode} {property.city}</h3>
                </div>
                <div className={Style.infoSection}>
                    <div className={Style.beds}>
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" /></svg>
                            <span> {property.bedrooms}</span> Bedrooms
                        </h3>
                    </div>
                    <div className={Style.baths}>
                        <h3><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z" /></svg>
                            <span> {property.bathrooms}</span> Bathrooms</h3>
                    </div>
                </div>

            </Link>
        </div>

    )

}

export default PropertyCard