import React, { useEffect, useState } from 'react'
import Select from '../../components/Select'


export default function ApiSelect({ api, dep, Options, ...props }) {

    const [data, setData] = useState([])
    const [message, setMessage] = useState('')

    const getBranch = async () => {
        setMessage('')
        try {
            const res = await api()
            setData(res)
        } catch (error) {
            setMessage(error.message)
        }
    }
    useEffect(() => {
        if (dep) {
            getBranch()
        }
    }, [dep])


    if (message) {
        return <div>
            <p>{message}</p>
            <button onClick={getBranch}>Retry</button>
        </div>
    }

    return (
        <Select {...props}>
            <option disabled selected>Select one</option>
            {Options(data)}
        </Select>
    )
}
