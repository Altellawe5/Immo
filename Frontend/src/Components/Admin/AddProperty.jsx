import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Style from './AddProperty.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const PropertySchema = Yup.object().shape({
    street: Yup.string().required('Required'),
    houseNumber: Yup.string().required('Required'),
    floor: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    commune: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    bedrooms: Yup.number().required('Required'),
    bathrooms: Yup.number().required('Required'),
    surface: Yup.number().required('Required'),
    description: Yup.string().required('Required'),
    buildingCondition: Yup.string().required('Required'),
    isSoldRent: Yup.boolean(),
    isForSell: Yup.boolean(),
    availableAt: Yup.string().required('Required'),
    constructionYear: Yup.number().required('Required'),
    //typePropertyId: Yup.number().required('Required'),
    regionIds: Yup.array()
        .of(Yup.number().required('Each region ID is required'))
        .required('At least one region ID is required'),

});
const fetchPropertyData = async () => {
    const propertyTypesResponse = await axios.get('http://localhost:3000/property/propertyTypes');
    const regionsResponse = await axios.get('http://localhost:3000/property/regions');

    return {
        propertyTypes: propertyTypesResponse.data,
        regions: regionsResponse.data
    };
}
const AddProperty = () => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            values.regionIds = values.regionIds.map(id => parseInt(id));
            values.typePropertyId = parseInt(values.typePropertyId)
            const response = await axios.post('http://localhost:3000/property/', values);
            toast.success('Property added successfully')
            resetForm({ values: '' });
            //console.log(response.data);
        } catch (error) {
            toast.error('Error adding property: ' + error.message)
            console.log('Error adding property: ', error);
        }
        setSubmitting(false);
    };
    const [propertyData, setPropertyData] = useState({ propertyTypes: [], regions: [] });

    useEffect(() => {
        fetchPropertyData().then(setPropertyData);
    }, []);

    return (
        <div className={Style.addProperty}>
            <ToastContainer />
            <h2>Add Property</h2>
            <Formik
                initialValues={{
                    street: '',
                    houseNumber: '',
                    floor: '',
                    postalCode: '',
                    commune: '',
                    city: '',
                    price: '',
                    bedrooms: '',
                    bathrooms: '',
                    surface: '',
                    description: '',
                    buildingCondition: '',
                    isSoldRent: false,
                    isForSell: false,
                    availableAt: '',
                    constructionYear: '',
                    typePropertyId: '',
                    regionIds: []
                }}
                validationSchema={PropertySchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="street">Street</label>
                            <Field type="text" name="street" />
                            <ErrorMessage name="street" component="div" />
                        </div>
                        <div>
                            <label htmlFor="houseNumber">House Number</label>
                            <Field type="text" name="houseNumber" />
                            <ErrorMessage name="houseNumber" component="div" />
                        </div>
                        <div>
                            <label htmlFor="floor">Floor</label>
                            <Field type="text" name="floor" />
                            <ErrorMessage name="floor" component="div" />
                        </div>
                        <div>
                            <label htmlFor="postalCode">Postal Code</label>
                            <Field type="text" name="postalCode" />
                            <ErrorMessage name="postalCode" component="div" />
                        </div>
                        <div>
                            <label htmlFor="commune">Commune</label>
                            <Field type="text" name="commune" />
                            <ErrorMessage name="commune" component="div" />
                        </div>
                        <div>
                            <label htmlFor="city">City</label>
                            <Field type="text" name="city" />
                            <ErrorMessage name="city" component="div" />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <Field type="number" name="price" />
                            <ErrorMessage name="price" component="div" />
                        </div>
                        <div>
                            <label htmlFor="bedrooms">Bedrooms</label>
                            <Field type="number" name="bedrooms" />
                            <ErrorMessage name="bedrooms" component="div" />
                        </div>
                        <div>
                            <label htmlFor="bathrooms">Bathrooms</label>
                            <Field type="number" name="bathrooms" />
                            <ErrorMessage name="bathrooms" component="div" />
                        </div>
                        <div>
                            <label htmlFor="surface">Surface</label>
                            <Field type="number" name="surface" />
                            <ErrorMessage name="surface" component="div" />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <Field type="text" name="description" />
                            <ErrorMessage name="description" component="div" />
                        </div>
                        <div>
                            <label htmlFor="buildingCondition">Building Condition</label>
                            <Field type="text" name="buildingCondition" />
                            <ErrorMessage name="buildingCondition" component="div" />
                        </div>

                        <div>
                            <label htmlFor="availableAt">Available At</label>
                            <Field type="text" name="availableAt" />
                            <ErrorMessage name="availableAt" component="div" />
                        </div>
                        <div>
                            <label htmlFor="constructionYear">Construction Year</label>
                            <Field type="number" name="constructionYear" />
                            <ErrorMessage name="constructionYear" component="div" />
                        </div>
                        <div>
                            <label htmlFor="typePropertyId">Type of Property</label>
                            <Field as="select" name="typePropertyId">
                                <option value="">Select</option>
                                {propertyData.propertyTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="typePropertyId" component="div" />
                        </div>
                        <div>
                            <label htmlFor="regionIds">Property Region</label>
                            <Field as="select" name="regionIds" multiple>

                                {propertyData.regions.map(region => (
                                    <option key={region.id} value={region.id}>{region.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="regionIds" component="div" />
                        </div>
                        <div className={Style.checkboxWrapper}>
                            <label htmlFor="isSoldRent" className={Style.checkboxLabel}>Is Sold/Rented ?</label>
                            <Field type="checkbox" name="isSoldRent" className={Style.checkboxInput} />
                            <ErrorMessage name="isSoldRent" component="div" />
                        </div>
                        <div className={Style.checkboxWrapper}>
                            <label htmlFor="isForSell" className={Style.checkboxLabel}>Is For Sell?</label>
                            <Field type="checkbox" name="isForSell" className={Style.checkboxInput} />
                            <ErrorMessage name="isForSell" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Add Property
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddProperty