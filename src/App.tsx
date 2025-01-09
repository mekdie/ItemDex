import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import {
    Button,
    Box,
    Typography,
    Container,
    Switch,
    CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const App: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [showWebcam, setShowWebcam] = useState(false);
    const [darkMode, setDarkMode] = useState(false); // State for dark mode
    const webcamRef = useRef<any>(null);

    // Create a theme with dark or light mode based on the `darkMode` state
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light", // Toggle between dark and light mode
            background: {
                default: darkMode ? "#121212" : "#fafafa", // Dark background for dark mode and light for light mode
                paper: darkMode ? "#1d1d1d" : "#ffffff", // Paper background for card-like components
            },
        },
    });

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        setImageSrc(imageSrc);
    };

    const toggleWebcam = () => {
        setShowWebcam((prev) => !prev); // Toggle the webcam display
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // Toggle dark mode state
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Add CssBaseline here */}
            <Container
                maxWidth="sm"
                sx={{
                    textAlign: "center",
                    paddingTop: 5,
                    minHeight: "100vh",
                    position: "relative",
                }}
            >
                {/* Dark Mode Toggle on top-right corner */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        display: "flex",
                        alignItems: "center",
                        zIndex: 10,
                    }}
                >
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{ marginRight: 1 }}
                    >
                        Dark Mode
                    </Typography>
                    <Switch checked={darkMode} onChange={toggleDarkMode} />
                </Box>

                {/* Title with margin bottom for spacing */}
                <Typography
                    variant="h3"
                    color="primary"
                    gutterBottom
                    sx={{ marginBottom: 3 }} // Add margin to separate the title and other elements
                >
                    Pokedex-like Image Capture
                </Typography>

                {/* Start/Stop Webcam Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleWebcam}
                    sx={{
                        marginBottom: 2,
                        padding: "10px 20px",
                        fontSize: "1.2em",
                    }}
                >
                    {showWebcam ? "Stop Camera" : "Start Camera"}
                </Button>

                {/* Display webcam only if showWebcam is true */}
                {showWebcam && (
                    <Box
                        sx={{
                            marginBottom: 2,
                            borderRadius: 2,
                            overflow: "hidden",
                        }}
                    >
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="100%"
                            videoConstraints={{
                                facingMode: "environment", // Use back camera on mobile
                            }}
                        />
                    </Box>
                )}

                {/* Capture button */}
                <Button
                    variant="contained"
                    color="success"
                    onClick={capture}
                    sx={{
                        marginBottom: 2,
                        padding: "10px 20px",
                        fontSize: "1.2em",
                    }}
                >
                    Capture Image
                </Button>

                {/* Display captured image */}
                {imageSrc && (
                    <Box sx={{ marginTop: 2 }}>
                        <Typography
                            variant="h5"
                            color="textSecondary"
                            gutterBottom
                        >
                            Captured Image:
                        </Typography>
                        <img
                            src={imageSrc}
                            alt="Captured"
                            style={{
                                width: "100%",
                                borderRadius: "8px",
                                border: "2px solid #ddd",
                            }}
                        />
                    </Box>
                )}
            </Container>
        </ThemeProvider>
    );
};

export default App;
