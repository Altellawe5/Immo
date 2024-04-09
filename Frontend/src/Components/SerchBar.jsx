import React, { useState } from 'react'
import Style from "./SearchBar.module.css"
import { useNavigate } from 'react-router-dom'

const SerchBar = ({ styleType, onSearch }) => {

    const className = styleType === 'home' ? Style.searchBarHome : Style.searchBarProperties;

    const [postalCode, setPostalCode] = useState('')
    const [region, setRegion] = useState('')
    const [isForSell, setIsForSell] = useState('')

    const navigate = useNavigate()

    const handleInputChange = (event, setState) => {
        setState(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(postalCode, region, isForSell)

        const parameters = {
            postalCode: postalCode,
            region: region,
        }

        if (isForSell !== '') {
            parameters.isForSell = isForSell === 'true';
        }
        console.log(parameters)
        onSearch(parameters)
        // navigate('/properties', { state: parameters })

    }
    return (
        <>
            <form onSubmit={handleSubmit} className={className}>
                <div className={Style.inputGroup}>
                    <label className={Style.label}>
                        Postal Code:
                        <input type="text" value={postalCode} onChange={(event) => handleInputChange(event, setPostalCode)} className={Style.input} />
                    </label>
                </div>

                <div className={Style.inputGroup}>
                    <label className={Style.label}>
                        Region:
                        <select value={region} onChange={(event) => handleInputChange(event, setRegion)} className={Style.select}>
                            <option value="">Select a region</option>
                            <option value="flemish">Flemish</option>
                            <option value="brussels">Brussels</option>
                            <option value="walloon">Walloon</option>
                        </select>
                    </label>
                </div>

                <div className={Style.inputGroup}>
                    <label className={Style.label}>
                        Type:
                        <select value={isForSell} onChange={(event) => handleInputChange(event, setIsForSell)} className={Style.select}>
                            <option value=''>Select type</option>
                            <option value={true}>Buy</option>
                            <option value={false}>Rent</option>
                        </select>
                    </label>
                </div>

                <button type="submit" className={Style.button}>Search</button>
            </form>
        </>
    )
}

export default SerchBar