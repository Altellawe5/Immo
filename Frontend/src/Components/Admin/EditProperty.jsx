import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Styles from './EditProperty.module.css'



const fetchPropertyData = async (id) => {

    const propertyResponse = await axios.get(`http://localhost:3000/property/${id}`);
    const propertyTypesResponse = await axios.get('http://localhost:3000/property/propertyTypes');
    const regionsResponse = await axios.get('http://localhost:3000/property/regions');

    return {
        property: propertyResponse.data,
        propertyTypes: propertyTypesResponse.data,
        regions: regionsResponse.data
    };
}

const EditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [propertyData, setPropertyData] = useState({ property: null, propertyTypes: [], regions: [] });

    useEffect(() => {
        fetchPropertyData(id).then(setPropertyData);
        console.log(propertyData)
    }, [id]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            values.regionIds = values.regionIds.map(id => parseInt(id));

            values.typePropertyId = parseInt(values.typePropertyId);

            await axios.put(`http://localhost:3000/property/${id}`, values);

            toast.success('Property updated successfully');
            navigate('/admin');
        } catch (error) {
            toast.error('Error updating property: ' + error.message);
        }

        setSubmitting(false);
    };

    if (!propertyData.property) {
        return <div>Loading...</div>;
    }

    const { street, houseNumber, floor, postalCode, commune, city, price, bedrooms, bathrooms, surface, description, buildingCondition, availableAt, constructionYear, typePropertyId, isForSale, isSoldRent, regionIds } = propertyData.property;

    console.log(bedrooms)
    return (
        <div className={Styles.addProperty}>
            <Formik
                initialValues={{
                    street: street,
                    houseNumber: houseNumber,
                    floor: floor,
                    postalCode: postalCode,
                    commune: commune,
                    city: city,
                    price: price,
                    bedrooms: bedrooms,
                    bathrooms: bathrooms,
                    surface: surface,
                    description: description,
                    buildingCondition: buildingCondition,
                    availableAt: availableAt,
                    constructionYear: constructionYear,
                    typePropertyId: typePropertyId,
                    isForSale: isForSale,
                    isSoldRent: isSoldRent,
                    regionIds: regionIds,
                }}
                validationSchema={Yup.object({
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
                })}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className={Styles.formField}>
                        <label>Street</label>
                        <Field name="street" type="text" />
                        <ErrorMessage name="street" />
                    </div>
                    <div className={Styles.formField}>
                        <label>House Number</label>
                        <Field name="houseNumber" type="text" />
                        <ErrorMessage name="houseNumber" />
                    </div>
                    <div className={Styles.formField}>
                        <label>Floor</label>
                        <Field name="floor" type="text" />
                        <ErrorMessage name="floor" />
                    </div>
                    <div className={Styles.formField}>
                        <label>Postal Code</label>
                        <Field name="postalCode" type="text" />
                        <ErrorMessage name="postalCode" />
                    </div>
                    <div className={Styles.formField}>
                        <label>Commune</label>
                        <Field name="commune" type="text" />
                        <ErrorMessage name="commune" />
                    </div>
                    <div className={Styles.formField}>
                        <label>City</label>
                        <Field name="city" type="text" />
                        <ErrorMessage name="city" />
                    </div>
                    <div className={Styles.formField}>
                        <label>Price</label>
                        <Field name="price" type="number" />
                        <ErrorMessage name="price" />
                    </div>
                    <div className={Styles.formField}>
                        <label>bedrooms</label>
                        <Field name="bedrooms" type="number" />
                        <ErrorMessage name="bedrooms" />
                    </div>
                    <div className={Styles.formField}>
                        <label>bathrooms</label>
                        <Field name="bathrooms" type="number" />
                        <ErrorMessage name="bathrooms" />
                    </div>
                    <div className={Styles.formField}>
                        <label>surface</label>
                        <Field name="surface" type="number" />
                        <ErrorMessage name="surface" />
                    </div>
                    <div className={Styles.formField}>
                        <label>Description</label>
                        <Field name="description" type="text" />
                        <ErrorMessage name="description" />
                    </div>
                    <div className={Styles.formField}>
                        <label>Building Condition</label>
                        <Field name="buildingCondition" type="text" />
                        <ErrorMessage name="buildingCondition" />
                    </div>
                    <div className={Styles.formField}>
                        <label>Available At</label>
                        <Field name="availableAt" type="text" />
                        <ErrorMessage name="availableAt" />
                    </div>
                    <div className={Styles.formField}>
                        <label>Construction Year</label>
                        <Field name="constructionYear" type="number" />
                        <ErrorMessage name="constructionYear" />
                    </div>
                    <div className={Styles.formField}>
                        <label>Type of Property</label>
                        <Field as="select" name="typePropertyId">
                            <option value="">Select</option>
                            {propertyData.propertyTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="typePropertyId" />
                    </div>
                    <div className={Styles.formField}>
                        <label className={Styles.label}>Is For Sale?</label>
                        <Field className={Styles.checkbox} name="isForSale" type="checkbox" />
                        <ErrorMessage className={Styles.error} name="isForSale" />
                    </div>
                    <div className={Styles.formField}>
                        <label className={Styles.label}>Is Sold/Rent?</label>
                        <Field className={Styles.checkbox} name="isSoldRent" type="checkbox" />
                        <ErrorMessage className={Styles.error} name="isSoldRent" />
                    </div>
                    <div className={Styles.formField}>
                        <label className={Styles.label}>Property Region</label>
                        <Field className={Styles.input} as="select" name="regionIds" multiple>
                            {propertyData.regions.map(region => (
                                <option key={region.id} value={region.id}>{region.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage className={Styles.error} name="regionIds" />
                    </div>
                    <button type="submit" className={Styles.submitButton}>Update Property</button>
                </Form>
            </Formik>
        </div>
    )
}

export default EditProperty;