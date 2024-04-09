import React, { useEffect, useState } from 'react'
import Style from "./Style/HomePage.module.css"
import { Link, useNavigate } from 'react-router-dom'
import SerchBar from '../Components/SerchBar'
import PropertyContainer from '../Components/PropertyContainer'
import Axios from 'axios'
import PropertiesPage from './PropertiesPage'
import AgentsContainer from '../Components/Agent/AgentsContainer'

const HomePage = () => {
    const [properties, setProperties] = useState('')
    const [agents, setAgents] = useState([])
    const navigate = useNavigate()

    const handleSearch = (searchParams) => {
        navigate('/properties', { state: searchParams })
    }
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/property')
                setProperties(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        const fetchAgents = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/agent');
                setAgents(response.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchAgents()
        fetchProperties()
    }, [])
    return (
        <>
            <div className={Style.intro}>
                <h1>Raising the bar on real estate.</h1>
                <SerchBar styleType="home" onSearch={handleSearch} />
            </div>
            <PropertyContainer properties={properties.slice(0, 6)} />
            <button onClick={() => {
                navigate('/properties')
            }} className={Style.btn}>See all properties</button>
            <AgentsContainer agents={agents} />
        </>
    )
}

export default HomePage