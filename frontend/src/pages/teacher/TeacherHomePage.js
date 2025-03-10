import { Box, Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png";
import Books from "../../assets/books.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { useEffect, useState } from 'react';
import FetchIt from '../../v2/api/FetchIt';
import Toast from '../../components/Toast';
import userData from './userData';


const { _id } = userData() 

export const TeacherData = ({ teacher = _id }) => {



    const [data, setData] = useState({
        subjects: 0,
        sessions: 0,
        duration: 0,
        today: 0
    });

    const getData = async () => {
        try {
            const teacher_dash = new FetchIt('/v2/teacher-api/dashboard')
            const res = await teacher_dash.post({ body: { teacher } })
            setData(res)
        } catch (error) {
            Toast.error(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const {
        subjects,
        sessions,
        duration,
        today } = data

    return <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
                <img src={Books} width={52} alt="Students" />
                <Title>
                    Assigned Subjects
                </Title>
                <Data start={0} end={subjects} duration={2.5} />
            </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
                <img src={Lessons} alt="Lessons" />
                <Title>
                    Total Lessons
                </Title>
                <Data start={0} end={sessions} duration={5} />
            </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
                <img src={Tests} alt="Tests" />
                <Title>
                    Today Lesson(s)
                </Title>
                <Data start={0} end={today} duration={4} />
            </StyledPaper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
                <img src={Time} alt="Time" />
                <Title>
                    Total Hours
                </Title>
                <Data start={0} end={duration} duration={4} suffix="hrs" />                        </StyledPaper>
        </Grid>
    </Grid>
}
const TeacherHomePage = () => {



    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <TeacherData />
                <br />
                <br />
                <Box>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <SeeNotice />
                    </Paper>
                </Box>

            </Container>
        </>
    )
}

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

export default TeacherHomePage  