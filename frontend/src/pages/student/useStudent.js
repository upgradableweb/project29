import React, { useEffect, useState } from 'react'
import Student from '../../v2/api/Student'

export default function useStudent() {
    
    const [data, setData] = useState({})

    const getData = async () => {
      try {
        let res = await Student.getProfile()
        setData(res)
      } catch (error) {
        alert(error.message)
      }
    }
  
  
    useEffect(() => {
      getData()
    }, [])


    return data
}
