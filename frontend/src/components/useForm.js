import React, { useState } from 'react'

const errorText = msg => {
    throw new Error(msg)
}
const string = ({ minlength, maxlength, required, value = '' }) => {
    value = value.toString()
    let len = value.length
    if (required && !len) {
        errorText('this is required field')
    } else if (minlength && len < minlength) {
        errorText(`min required is ${minlength}/${len}`)
    } else if (maxlength && len > maxlength) {
        errorText(`max required is ${minlength}/${len}`)
    }
    return value
}


const number = ({ min, max, required, value }) => {
    value = parseInt(value)
    if (required && isNaN(value)) {
        errorText('this is required field')
    } else if (min && value < min) {
        errorText(`min is ${min}`)
    } else if (max && value > max) {
        errorText(`max is ${max}`)
    }
    return value
}


export default function useForm(schema = [], payload = {}) {

    const [data, setData] = useState({})
    const [touchId, setTouchId] = useState(0)

    let errors = {}, values = {}

    for (const { name, error } of schema) {
        let value = data[name]
        if (value == undefined && payload) {
            value = payload[name]
        }

        if (error) {
            const { type = "string", ...props } = error
            const types = { string, number }
            const fn = types[type]
            try {
                props.value = value
                values[name] = fn(props)
            } catch (error) {
                errors[name] = error.message
            }
        } else {
            values[name] = value
        }


    }

    const isError = () => {
        const f1 = Object.keys(errors)[0]
        document.getElementsByName(f1).forEach(d => d.focus())
        return f1
    }

    const inputProps = ({ name, error, ...props }) => {
        let value = values[name],
            helperText = errors[name],
            onChange = (e) => {
                let { name, value, type, checked } = e.target
                if (type == "checkbox") {
                    value = checked
                }
                setData({ ...data, [name]: value })
            }

        error = touchId && Boolean(helperText)
        return { ...props, name, value, helperText, error, onChange }
    }

    return { data, setData, values, errors, inputProps, isError, touchId, setTouchId }
}


