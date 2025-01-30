import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Stack, TextField } from "@mui/material";
import { BlueButton } from "../../../components/buttonStyles";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../../components/useToast";
import { Branch, Semister } from "../../../v2/api";
import useForm from "../../../components/useForm";
import Input from "../../../components/Input";

const schema = [
    {
        name: 'semister',
        label: "Select Semister",
        placeholder: "Semister 1",
        // error: { required: true }
    },
    {
        name: 'branch_name',
        label: "Branch name",
        placeholder: "Computer Science",
        error: { required: true }
    },
    {
        name: 'branch_code',
        label: "Branch Code",
        placeholder: "IS,CS,ECE",
        error: { required: true }
    }
]


const AddClass = () => {

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState('')
    const [prev, setPrev] = useState('')
    const [sems, setSems] = useState([])
    const [semisters, setSemisters] = useState([])
    const { data, isError, setData, inputProps, setTouchId } = useForm(schema, prev)
    const navigate = useNavigate()
    const { ToastContainer, ToastMessage } = useToast()
    const { id } = useParams()

    const getSems = async () => {
        try {
            let res = await Semister.findMany({})
            setSems(res)
        } catch (error) {
            alert(error.message)
        }
    }

    const getBranch = async () => {
        try {
            let res = await Branch.getById({ id })
            setPrev(res)
            setSemisters(res.semisters)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getSems()
        if (id != 'new') {
            getBranch()
        }

    }, [])

    const onSubmit = async () => {
        if (isError()) {
            setTouchId(2)
            ToastMessage("Please check the form")
            return
        } else {
            setTouchId(0)
        }
        try {
            const payload = { ...data, semisters }
            await Branch.putById({ id, payload })
            navigate(-1)
        } catch (error) {
            setMessage(error.message)
            ToastMessage(error.message)
        }
    }

    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <Stack sx={{
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <img
                            src={Classroom}
                            alt="classroom"
                            style={{ width: '80%' }}
                        />
                    </Stack>
                    <Stack spacing={3}>
                        {schema.slice(1, 3).map(d => {
                            return <Input
                                {...inputProps(d)}
                            />
                        })}

                        <Box>
                            <div>Select Semisters</div>
                            {sems.map(d => <FormControlLabel
                                key={d._id}
                                onChange={e => {
                                    let { checked } = e.target
                                    if (checked) {
                                        setSemisters([...semisters, d._id])
                                    } else {
                                        let f = semisters.filter(da => da != d._id)
                                        setSemisters(f)
                                    }
                                }}
                                label={d.name}
                                checked={semisters.includes(d._id)}
                                control={<Checkbox />} value={d._id} />)}
                        </Box>

                        <BlueButton
                            fullWidth
                            size="large"
                            sx={{ mt: 3 }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                            onClick={onSubmit}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Create"}
                        </BlueButton>
                        <Button variant="outlined" onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                    </Stack>
                </StyledBox>
            </StyledContainer>
            <br />
            <br />
            {ToastContainer}
        </>
    )
}

export default AddClass

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;