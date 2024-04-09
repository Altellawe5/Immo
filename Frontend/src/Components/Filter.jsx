import React, { useState } from 'react';
import Style from './Filter.module.css'

const Filter = ({ onFilter }) => {
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [surface, setSurface] = useState('');

    const handleSubmit = (event) => {
        let filter = {};

        event.preventDefault();
        if (priceMin) filter.priceMin = priceMin
        if (priceMax) filter.priceMax = priceMax
        if (bedrooms) filter.bedrooms = bedrooms
        if (surface) filter.surface = surface
        onFilter(filter);
    };

    return (
        <form onSubmit={handleSubmit} className={Style.filterContainer}>
            <input type="number" placeholder="Min Price" value={priceMin} onChange={(e) => setPriceMin(parseInt(e.target.value))} />
            <input type="number" placeholder="Max Price" value={priceMax} onChange={(e) => setPriceMax(parseInt(e.target.value))} />
            <input type="number" placeholder="Bedrooms" value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} />
            <input type="number" placeholder="Surface" value={surface} onChange={(e) => setSurface(parseInt(e.target.value))} />
            <button type="submit">Filter</button>
        </form>
    );
};

export default Filter;
