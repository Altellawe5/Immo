import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Style from './Style/LoginPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice';
import { toast } from 'react-toastify'



const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

});
const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    firstName: Yup.string()
        .required('Required'),
    lastName: Yup.string()
        .required('Required'),
});
const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => {
        return state.auth.isAuthenticated;
    })
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/admin");
        }
    }, [isAuthenticated, navigate]);



    const [isLoginForm, setIsLoginForm] = useState('')

    const handleSwitchForm = () => setIsLoginForm(!isLoginForm)


    const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
        const url = isLoginForm ? 'http://localhost:3000/users/login' : 'http://localhost:3000/users/register'
        try {
            const response = await axios.post(url, values)

            if (response.data.token) {

                dispatch(login(response.data.token))
                navigate("/admin");
            }
            else {
                toast.success('Registration successful!')
                resetForm();
                handleSwitchForm();
            }
        } catch (error) {
            console.log("Error loging in ", error)
            setErrors({ email: 'Failed to authenticate', password: 'Failed to authenticate' });
            toast.error('Authentication failed. Please try again.');
        }
        setSubmitting(false);
    }
    return (
        <div className={Style.main}>
            <div className={Style.loginPage}>
                <h2>{isLoginForm ? 'Login' : 'Register'}</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={isLoginForm ? LoginSchema : RegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div>
                                <label htmlFor="email">Email</label>
                                <Field type="email" name="email" />
                                <ErrorMessage name="email" component="div" />
                            </div>

                            {!isLoginForm && (
                                <div>
                                    <label htmlFor="firstName">FirstName</label>
                                    <Field type="text" name="firstName" />
                                    <ErrorMessage name="firstName" component="div" />
                                </div>
                            )}
                            {!isLoginForm && (
                                <div>
                                    <label htmlFor="lastName">LastName</label>
                                    <Field type="text" name="lastName" />
                                    <ErrorMessage name="lastName" component="div" />
                                </div>
                            )}
                            <div>
                                <label htmlFor="password">Password</label>
                                <Field type="password" name="password" />
                                <ErrorMessage name="password" component="div" />
                            </div>
                            {!isLoginForm && (
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field type="password" name="confirmPassword" />
                                    <ErrorMessage name="confirmPassword" component="div" />
                                </div>
                            )}
                            <button type="submit" disabled={isSubmitting}>
                                {isLoginForm ? 'Login' : 'Register'}
                            </button>
                        </Form>
                    )}
                </Formik>
                <button onClick={handleSwitchForm}>
                    {isLoginForm ? 'Need to register?' : 'Already have an account?'}
                </button>
            </div>
        </div>
    );

}
export default LoginPage