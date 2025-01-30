import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import Student from '../../v2/api/Student';
import usePaginate from '../../components/usePaginate';
import userData from '../teacher/userData';
import { useEffect, useState } from 'react';
import FetchIt from '../../v2/api/FetchIt';
import Toast from '../../components/Toast';


const { _id } = userData()


export const StudentDash = ({ student = _id }) => {

    const [data, setData] = useState({
        subjects: 0
    })

    const getData = async () => {
        try {
            const student_dash = new FetchIt('/v2/student-api/dashboard')
            const res = await student_dash.post({ body: { student } })
            setData(res)
        } catch (error) {
            Toast.error(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const { subjects, backlogs, passed, attendance } = data

    return <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
                <img src={Subject} alt="Subjects" />
                <Title>
                    Total Subjects
                </Title>
                <Data start={0} end={subjects} duration={2.5} />
            </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
                <img src={Assignment} alt="Assignments" />
                <Title>
                    Total Attendance
                </Title>
                <Data start={0} end={attendance} duration={4} />
            </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
                <img src={Subject} alt="Subjects" />
                <Title>
                    Passed Subjects
                </Title>
                <Data start={0} end={passed} duration={2.5} />
            </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
                <img src={Assignment} alt="Assignments" />
                <Title>
                    Total Backlogs
                </Title>
                <Data start={0} end={backlogs} duration={4} />
            </StyledPaper>
        </Grid>
    </Grid>
}

const StudentHomePage = () => {

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <StudentDash />
                <br/>
                <br/>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <SeeNotice />
                </Paper>

            </Container>
        </>
    )
}

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;



export default StudentHomePage