import React, { useEffect, useState } from 'react'
import AddProperty from '../Components/Admin/AddProperty'
import Style from './Style/AdminPage.module.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PropertyCard from '../Components/PropertyCard'
import { toast } from 'react-toastify'

const AdminPage = () => {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await axios.get('http://localhost:3000/property/');
            setProperties(response.data);
        }

        fetchProperties();
    }, []);
    const deleteProperty = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/property/${id}`);
            toast.success('property Deleted succesfully')

            setProperties(properties.filter(property => property.id !== id));
        } catch (error) {
            console.log('Error deleting property: ', error);
            toast.error("somthing went wrong")
        }
    };
    const startEditing = (id) => {
        navigate(`/admin/edit/${id}`);
    };

    const auth = useSelector((state) => state.auth)

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/login')
        }
    }, [auth, navigate])
    return (
        <div className={Style.main}>
            <AddProperty />

            <div className={Style.mainContainer}>
                <h2>Your Properties</h2>
                <div className={Style.propertyContainer}>

                    {properties.map(property => (
                        <div key={property.id}>
                            <PropertyCard property={property} />
                            <button className={Style.editButton} onClick={() => startEditing(property.id)}>
                                Edit
                            </button>
                            <button className={Style.deleteButton} onClick={() => deleteProperty(property.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AdminPage