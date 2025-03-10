import { useNavigate, useParams } from 'react-router-dom';
import { Button, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import Input from '../../../components/Input';
import useForm from '../../../components/useForm';
import ApiSelect from '../../../v2/ApiSelect';
import { Branch, Semister, Student, Teacher } from '../../../v2/api';
import Toast from '../../../components/Toast';
import { useEffect, useState } from 'react';

const schema = [
    {
        name: "name",
        label: "Student name",
        placeholder: "Full Name",
        error: { required: true, maxlength: 100 }
    },
    {
        name: "email",
        label: "Student email",
        placeholder: "example@email.com",
        error: { required: true, maxlength: 100 }
    },
    {
        name: "mobile",
        label: "Student mobile number",
        placeholder: "Eg: 9876543210",
        error: { required: true, maxlength: 100 }
    },
    {
        name: "password",
        label: "Student login password",
        placeholder: "Min 4 Char",
        error: { required: true, maxlength: 100 }
    },
    {
        name: "usn",
        label: "USN",
        placeholder: "Enter USN",
        error: { required: true, maxlength: 100 }
    },
    {
        label: "Branch",
        name: 'branch',
        error: { required: true }
    },
    {
        name: 'semister',
        label: "Select semister",
        error: { required: true }
    },
]

const branchSchema = schema.find(d => d.name == "branch")
const semSchema = schema.find(d => d.name == "semister")


const AddStudent = () => {

    const [loading, setLoading] = useState(false)
    const [perv, setPrev] = useState(null)
    const { user_id: id } = useParams()
    const navigate = useNavigate()
    const { data, isError, setTouchId, inputProps, values } = useForm(schema, perv)
    const { branch } = values

    const getTeacher = async () => {
        try {
            const res = await Teacher.getById({ id })
            setPrev(res)
        } catch (error) {
            Toast.error(error.message)
        }
    }
    useEffect(() => {
        if (id != "new") {
            getTeacher()
        }
    }, [])

    const getSemister = () => {
        return Branch.getByIdWithSemisters({ id: branch })
    }
    const SemOptions = (da) => {
        return da && da.semisters && da.semisters.map(d => <option value={d._id}>{d.name}</option>)
    }

    const onSubmit = async (isNew) => {
        if (isError()) {
            setTouchId(2)
            return
        }

        try {
            setLoading(true)
            await Student.putById({ id, payload: data })
            if (isNew) {
                window.location.replace("/Admin/student/new")
            } else {
                navigate(-1)
            }
        } catch (error) {
            Toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const Options = (da) => da.map(d => <option value={d._id}>{d.branch_name}</option>)



    return (
        <Stack alignItems={'center'}>
            <br />
            <br />
            <Paper sx={{ width: "100%", maxWidth: 600, p: 4 }}>
                {loading && <LinearProgress />}
                <Stack spacing={3}>
                    <Typography variant='h5'>{id == "new" ? "Student Admission" : "Edit Student Details"}</Typography>
                    {schema.slice(0, -2).map(d => <Input {...inputProps(d)} />)}
                    <ApiSelect
                        Options={Options}
                        api={Branch.getMany}
                        dep={true}
                        {...inputProps(branchSchema)}
                    />
                    <ApiSelect
                        dep={branch}
                        api={getSemister}
                        Options={SemOptions}
                        {...inputProps(semSchema)}
                    />
                    <br />
                    <Stack flexDirection={"row"} justifyContent={"space-between"} >
                        <Button variant='outlined' onClick={() => navigate(-1)}>BACK</Button>
                        <Stack direction={"row"} gap={4}>
                            <Button variant="contained" onClick={() => onSubmit("new")}>Save & Add New</Button>
                            <Button variant="contained" onClick={() => onSubmit()}>SUBMIT</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
            <br />
            <br />
        </Stack>
    )
}

export default AddStudent