import React, { useEffect, useState } from 'react'
import SerchBar from '../Components/SerchBar'
import PropertyContainer from '../Components/PropertyContainer'
import Axios from 'axios'
import Style from './Style/PropertiesPage.module.css'
import Filter from '../Components/Filter'
import { useLocation } from 'react-router-dom'


const PropertiesPage = () => {
    const [properties, setProperties] = useState('')
    const [originalProperties, setOriginalProperties] = useState([]);


    const location = useLocation();

    const handleFilter = async (filter) => {

        // filtering on the server side is a lot harder than this
        // const response = await Axios.post('http://localhost:3000/property/filter', filter);
        // setProperties(response.data); 
        let filteredProperties = [...originalProperties];

        if (filter.priceMin) {
            filteredProperties = filteredProperties.filter(p => p.price >= filter.priceMin);
        }
        if (filter.priceMax) {
            filteredProperties = filteredProperties.filter(p => p.price <= filter.priceMax);
        }
        if (filter.bedrooms) {
            filteredProperties = filteredProperties.filter(p => p.bedrooms === filter.bedrooms);
        }
        if (filter.surface) {
            filteredProperties = filteredProperties.filter(p => p.surface >= filter.surface);
        }

        setProperties(filteredProperties);
    };
    const handleSearch = async (searchParams) => {
        const response = await Axios.post('http://localhost:3000/property/search', searchParams);
        setOriginalProperties(response.data);
        setProperties(response.data);
    };

    const fetchAllProperties = async () => {
        try {
            const response = await Axios.get('http://localhost:3000/property');
            setOriginalProperties(response.data);
            setProperties(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // for coming from the homepage
                if (location.state) {
                    handleSearch(location.state);
                } else {
                    const response = await Axios.get('http://localhost:3000/property')
                    setOriginalProperties(response.data);
                    setProperties(response.data)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchProperties()
    }, [location.state])
    return (
        <div className={Style.page}>
            <div className={Style.divCon}>
                <SerchBar styleType="properties" onSearch={handleSearch} />
                <Filter onFilter={handleFilter} />
                <button className={Style.fetchButton} onClick={fetchAllProperties}>Fetch All Properties</button>

                <PropertyContainer properties={properties} />
            </div>
        </div>
    )
}

export default PropertiesPage