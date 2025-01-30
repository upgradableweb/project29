import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Books from "../../assets/books.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import Toast from '../../components/Toast';
import { Admin_Dashboard } from '../../v2/api';

const AdminHomePage = () => {

    const [data,setData] = useState({
        teachers: 0,
        students: 0
    })
    const [branches, setBranhes] = useState(0)
    const [subjects, setSubjects] = useState(0)


    const getStudentTeacherCount = async ()=>{
        try {
            const res = await Admin_Dashboard.getStudentTeacherCount()
            setData(res)
            const res2 = await Admin_Dashboard.getBranchesCount()
            setBranhes(res2.count)
            const res3 = await Admin_Dashboard.getSubjectsCount()
            setSubjects(res3.count)
        } catch (error) {
            Toast.error(error.message)
        }
    }
    useEffect(()=>{
        getStudentTeacherCount()
    },[])

    const { students, teachers } = data

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Students} alt="Students" />
                            <Title>
                                Total Students
                            </Title>
                            <Data start={0} end={students} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Teachers} alt="Teachers" />
                            <Title>
                                Total Teachers
                            </Title>
                            <Data start={0} end={teachers} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Classes} alt="Classes" />
                            <Title>
                                Total Branches
                            </Title>
                            <Data start={0} end={branches} duration={5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Books} width={60} alt="Subjects" />
                            <Title>
                                Total Subjects
                            </Title>
                            <Data start={0} end={subjects} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};


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

export default AdminHomePage