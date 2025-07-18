"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from "@mui/material";

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleDownload = () => {
    if (!url) {
      setError("请输入有效的 YouTube 链接 (Please enter a valid YouTube URL)");
      return;
    }

    const link = document.createElement("a");
    link.href = `https://yt-backend-81363540056.europe-west1.run.app/download?url=${encodeURIComponent(url)}`;
    link.download = "video.mp4";
    link.click();
    setError(""); // Clear error after download
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f0f4f8",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: "#fffefc",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              textAlign: "center",
              background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            YouTube 视频下载器
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            输入视频链接，点击按钮下载
            <br />
            (Enter the video link and click the button to download)
          </Typography>

          {/* Input field */}
          <TextField
            fullWidth
            label="YouTube 视频链接 (Video Link)"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{
              "& input": { fontSize: "1.2rem", p: 2 },
              "& label": { fontSize: "1.1rem" },
            }}
          />

          {/* Download Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleDownload}
            sx={{
              bgcolor: "#1e88e5",
              "&:hover": { bgcolor: "#1565c0" },
              borderRadius: "10px",
              fontSize: "1.3rem",
              py: 1.5,
              fontWeight: 600,
            }}
          >
            下载视频 (Download Video)
          </Button>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                width: "100%",
                fontSize: "1.1rem",
                py: 1,
              }}
            >
              {error}
            </Alert>
          )}

          {/* Footer Note */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "gray",
              mt: 2,
              fontSize: "1.1rem",
            }}
          >
            * 支持 MP4 格式 (Supports MP4 format)
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
