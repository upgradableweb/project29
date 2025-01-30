import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography, Divider } from '@mui/material';
import styled from 'styled-components';
import { LightPurpleButton, LightPurpleButtonRounded } from '../components/buttonStyles';

const Homepage = () => {
  return (
    <StyledContainer>
      <br />
      <br />
      <br />
      <Grid container>
        <Grid item xs={12} md={5} sx={{ placeContent: "center" }}>
          <img src={'/hero-1.jpg'} alt="students" style={{ width: 550, marginLeft: -100 }} />
        </Grid>
        <Grid item xs={12} md={7}>
          <StyledPaper elevation={3}>
            <StyledTitle>Welcome to Project - 29</StyledTitle>
            <br />
            <Divider>Project Title</Divider>
            <br />
            <Typography variant='h3' fontWeight={500} >
              Secure User Verification And Credential Tokenization For Modern Applications
            </Typography>
            <br />
            <br />
            <StyledBox>
              <StyledLink to="/choose">
                <LightPurpleButton variant="contained">
                  Start Project Here
                </LightPurpleButton>
              </StyledLink>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
