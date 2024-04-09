import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Style from './Style/DetailsPge.module.css'

const DetailsPage = () => {
    const id = useParams()
    const [property, setProperty] = useState(null)
    const [mainImage, setMainImage] = useState()


    useEffect(() => {
        const getProperty = async () => {
            console.log(id)
            try {
                console.log(id)
                const response = await axios.get(`http://localhost:3000/property/${id.id}`);
                setProperty(response.data);
                setMainImage(response.data.images[0].url)
            } catch (error) {
                console.log(error);
            }
        }
        getProperty()
    }, [id])

    console.log(property)
    if (!property) {
        return <div>Loading...</div>
    }
    return (
        <div className={Style.detailsPage}>
            <div className={Style.addressInfo}>
                <h3>{property.street} - {property.houseNumber} {property.commune}, {property.postalCode}</h3>
            </div>
            <div className={Style.imagesSection}>
                <img src={mainImage} alt="Main" className={Style.mainImage} />
                <div className={Style.otherImages}>
                    {property.images.map((img, index) =>
                        <img
                            key={index}
                            src={img.url}
                            alt={`Property ${index + 1}`}
                            onClick={() => setMainImage(img.url)}
                        />
                    )}
                </div>
            </div>
            <h3>Property Information: </h3>
            <div className={Style.infoSection}>
                <p className={Style.description}><span className={Style.infoTitle}>Description:</span> <span className={Style.infoText}>{property.description}</span></p>
                <p><span className={Style.infoTitle}>Price:</span> €{property.price.toLocaleString()}</p>
                <p><span className={Style.infoTitle}>Bedrooms:</span> {property.bedrooms}</p>
                <p><span className={Style.infoTitle}>Bathrooms:</span> {property.bathrooms}</p>
                <p><span className={Style.infoTitle}>Surface:</span> {property.surface} sq. ft.</p>
                <p><span className={Style.infoTitle}>Building Condition:</span> {property.buildingCondition}</p>
                <p><span className={Style.infoTitle}>Available At:</span> {property.availableAt}</p>
                <p><span className={Style.infoTitle}>Construction Year:</span> {property.constructionYear}</p>
                <p><span className={Style.infoTitle}>Type:</span> {property.typeProperty.name}</p>
            </div>


        </div>
    )

}

export default DetailsPage