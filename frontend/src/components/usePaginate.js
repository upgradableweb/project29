import React, { useEffect, useRef, useState } from 'react'
import Toast from './Toast'

export default function usePaginate(Fn) {

    const [data, setData] = useState([])
    const total = useRef(0)
    const [pagination, setPagination] = useState({ page: 1, page_size: 20, sortOrder: "", sortKey: "" })
    const { page, page_size, sortOrder, sortKey } = pagination
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    const isEmpty = loading != true && data.length == 0


    const getData = async () => {
        console.log('async: ');
        try {
            setLoading(true)
            const { total: t = 0, results: r } = await Fn({ page_size, page, sortOrder, sortKey })
            total.current = t
            if (Array.isArray(r)) {
                if (page > 1) {
                    setData([...data, ...r])
                } else {
                    setData(r)
                }
            }
        } catch (error) {
            Toast.error(error.message)
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        let t
        if (loading == "true") {
            t = setTimeout(() => getData(), 2000)
        } else {
            getData()
        }
        return () => clearTimeout(t)
    }, [pagination])


    const onPageChange = (e, page) => {
        setPagination({ ...pagination, page: page + 1 })
    }
    const onRowsPerPageChange = (e) => {
        setPagination({ ...pagination, page: 1, page_size: parseInt(e.target.value) })
    }

    return { data, page, isEmpty, page_size, message, total: total.current, loading, setData, onRowsPerPageChange, onPageChange, setPagination }
}
