import React, { useEffect, useState } from 'react'
import Select from '../../../components/Select'

export default function SelelctBranch({ api, ...props }) {

    const [data, setData] = useState([])
    const [message, setMessage] = useState('')

    const getBranch = async () => {
        try {
            const res = await api()
            setData(res)
        } catch (error) {
            setMessage(error.message)
        }
    }
    useEffect(() => {
        if (api) {
            getBranch()
        }
    }, [api])


    if (message) {
        return <div>
            <p>{message}</p>
            <button onClick={getBranch}>Retry</button>
        </div>
    }

    return (
        <Select {...props}>
            <option disabled selected>Select one</option>
            {data.map(d => <option value={d._id}>{d.branch_name}</option>)}
        </Select>
    )
}
