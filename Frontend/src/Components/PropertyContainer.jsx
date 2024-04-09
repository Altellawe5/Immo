import React from 'react'
import PropertyCard from './PropertyCard'
import Style from './ProductContainer.module.css'

const PropertyContainer = ({ properties }) => {
    const checkIfEmpty = () => {
        if (properties.length !== 0) {
            return (
                <div className={Style.propertyContainer}>
                    {properties.map((property) =>
                        <PropertyCard key={property.id} property={property} />
                    )}
                </div>
            )
        }
        else {
            return (
                <div className={Style.notFound}>
                    <p>No properties found, please adjust your search</p>
                </div>
            )
        }
    }
    return (
        <div className={Style.mainContainer}>
            <p className={Style.head}> Our Properties : </p>
            {checkIfEmpty()}
        </div>
    )
}

export default PropertyContainer