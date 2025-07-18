"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleDownload = () => {
    if (!url) {
      setError("Please enter a valid YouTube URL.");
      return;
    }
    setError("");
  
    const link = document.createElement("a");
    link.href = `https://yt-downloader-octx.onrender.com/download?url=${encodeURIComponent(
      url
    )}`;
    link.download = "video.mp4";
    link.click();
  };
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        p: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "white",
          borderRadius: "16px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
          p: 5,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            textAlign: "center",
            background: "linear-gradient(45deg, #1e3c72, #2a5298)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          YouTube Downloader
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          Paste a YouTube URL below to download the video in MP4 format.
        </Typography>

        <TextField
          fullWidth
          label="YouTube URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleDownload}
          sx={{
            bgcolor: "#1e3c72",
            "&:hover": { bgcolor: "#2a5298" },
            borderRadius: "12px",
            fontSize: "1.1rem",
            fontWeight: 600,
            py: 1.5,
          }}
        >
          Download Video
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
      </Container>
    </Box>
  );
}
