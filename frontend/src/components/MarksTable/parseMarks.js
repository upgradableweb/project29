import React from 'react'

export default function parseMarks(marks) {

    return marks.map(d => {
        let subject_name = <span style={{ textTransform: "uppercase" }}>{d.subject.subject_name}</span>
        let subject_code = d.subject.subject_code
        let { internal, external } = d
        internal = parseInt(internal)
        external = parseInt(external)
        let total = internal + external
        let result = (internal < 18 || external < 18) ? "F" : "P"
        return { result, subject_code, internal, external, subject_name, total }
    })
}
