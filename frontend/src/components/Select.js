import React from 'react'

export default function Select({ error, label, helperText, children, name, ...props }) {
    return (
        <div className={error ? "error" : ""}>
            <label htmlFor={name} style={{ color: "gray" }}>{label}</label>
            <select style={{ padding: 8, width: "100%", fontSize: 16, borderColor: error && "red" }} id={name} name={name} {...props}>
                {children}
            </select>
            <div style={{ fontSize: 12, paddingLeft: 12, color: error ? "red" : "" }}>{helperText}</div>
        </div>
    )
}
