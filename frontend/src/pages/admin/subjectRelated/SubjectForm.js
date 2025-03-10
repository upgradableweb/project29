import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, Stack, Paper, FormControlLabel, Checkbox, Switch } from "@mui/material";
import Input from "../../../components/Input";
import useForm from "../../../components/useForm";
import { Branch, Subject, Teacher } from "../../../v2/api";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../../components/Toast";
import ApiSelect from "../../../v2/ApiSelect";


const schema = [
    {
        name: 'branch',
        label: "Select Branch",
        error: { required: true }
    },
    {
        name: 'semister',
        label: "Select semister",
        error: { required: true }
    },
    {
        name: 'teacher',
        label: "Select teacher",
        error: { required: true }
    },
    {
        name: 'subject_name',
        label: "Subject name",
        placeholder: "SQL, Python",
        error: { required: true }
    },
    {
        name: 'subject_code',
        label: "Subject code",
        placeholder: "22IS93R",
        error: { required: true, maxlength: 15 }
    },
    {
        name: 'subject_status',
        label: "Subject status",
        type: "checkbox"
    }
]

const branchSchema = schema.find(d => d.name == 'branch')
const semSchema = schema.find(d => d.name == 'semister')
const teacher = schema.find(d => d.name == 'teacher')


const SemOptions = (da) => {
    return da && da.semisters && da.semisters.map(d => <option value={d._id}>{d.name}</option>)
}


const TeacherOptions = (da) => {
    return da && da.results?.map(d => <option value={d._id}>{d.name}</option>)
}

const SubjectForm = () => {

    const [prev, setPrev] = useState(null)
    const { data, values, isError, inputProps, setTouchId, setData } = useForm(schema, prev)
    const { branch, subject_status } = values
    const navigate = useNavigate()
    const { id } = useParams()


    const getSubject = async () => {
        try {
            const res = await Subject.getById({ id })
            setPrev(res)
        } catch (error) {
            Toast.error(error.message)
        }
    }

    useEffect(() => {
        if (id != 'new') {
            getSubject()
        } else {
            setData({ subject_status: true })
        }
    }, [])


    const getSemister = () => {
        return Branch.getByIdWithSemisters({ id: branch })
    }

    const getTeacher = () => {
        return Teacher.getMany({ branch })
    }

    const onSubmit = async (isNew) => {
        if (isError()) {
            setTouchId(2)
            return
        }
        try {
            const res = await Subject.putById({ id, payload: data })
            if (isNew) {
                window.location.replace("/Admin/subjects/new")
            } else {
                navigate(-1)
            }
        } catch (error) {
            Toast.error(error.message)
        }
    }



    return (
        <Box>
            <br />
            <br />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Paper sx={{ p: 4, maxWidth: 600, width: "100%" }}>
                    <Box mb={2}>
                        <Typography variant="h6" >Add Subjects</Typography>
                    </Box>

                    <Stack spacing={3}>
                        {schema.slice(3, 5).map(d => <Input key={d.name} {...inputProps(d)} />)}
                        <ApiSelect
                            dep={true}
                            api={Branch.getMany}
                            Options={da => da.map(d => <option key={d._id} value={d._id}>{d.branch_name}</option>)}
                            {...inputProps(branchSchema)}
                        />
                        <ApiSelect
                            dep={branch}
                            api={getSemister}
                            Options={SemOptions}
                            {...inputProps(semSchema)}
                        />
                        <ApiSelect
                            dep={branch}
                            api={getTeacher}
                            Options={TeacherOptions}
                            {...inputProps(teacher)}
                        />
                        <FormControlLabel
                            label={subject_status ? "Active" : "In Active"}
                            {...inputProps({ name: "subject_status" })}
                            checked={Boolean(subject_status)}
                            control={<Switch color="success" />}
                        />
                    </Stack>
                    <br />
                    <br />
                    <Stack flexDirection={'row'} justifyContent={"space-between"}>
                        <Button variant="outlined" onClick={() => navigate(-1)}>BACk</Button>
                        <Stack direction={"row"} gap={4}>
                            <Button variant="contained" onClick={() => onSubmit("new")}>Save & Add New</Button>
                            <Button variant="contained" onClick={() => onSubmit()}>SUBMIT</Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
            <br />
            <br />
        </Box>
    );
}

export default SubjectForm
