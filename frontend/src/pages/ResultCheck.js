import React, { useState } from 'react'
import { Button, TextField, Typography, Box, Stack, Paper } from "@mui/material";
import { Refresh } from '@mui/icons-material';


export default function ResultCheck() {

    const [captcha, setCaptcha] = useState("");
    const [input, setInput] = useState("");
    const [isVerified, setIsVerified] = useState(false);


    const generateCaptcha = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(captcha);
        setInput("");
        setIsVerified(false);
    };

    const handleVerify = () => {
        if (input === captcha) {
            setIsVerified(true);
            alert("Captcha verified!");
        } else {
            setIsVerified(false);
            alert("Captcha incorrect. Please try again.");
        }
    };

    return (
        <Stack height={"100vh"} alignItems={'center'} justifyContent={"center"}>
            <Paper sx={{ width: "100%", maxWidth: 400, p: 4 }}>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                >
                    <Typography variant='h6'>Student Results</Typography>

                    <TextField
                        label="Enter Student USN"
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        fullWidth
                        margin="normal"
                        autoComplete='off'
                    />
                    <TextField
                        label="Enter CAPTCHA"
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        fullWidth
                        margin="normal"
                        autoComplete='off'
                    />

                    <Box display="flex" alignItems="center" gap={2} mt={2}>
                        <Typography
                            variant="h6"
                            sx={{
                                backgroundColor: "#f0f0f0",
                                padding: "8px 16px",
                                borderRadius: "4px",
                                fontFamily: "monospace",
                            }}
                            width={"100%"}
                        >
                            {captcha || "Generate CAPTCHA"}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={generateCaptcha}
                        >
                            <Refresh />
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        color={captcha ? "success" : "inherit"}
                        onClick={handleVerify}
                        disabled={!captcha}
                        sx={{ mt: 2 }}
                        fullWidth
                    >
                        Submit
                    </Button>

                    {isVerified && (
                        <Typography variant="body1" color="green" mt={2}>
                            Verified!
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Stack>
    )
}
