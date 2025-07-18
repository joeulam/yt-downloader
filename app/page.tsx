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
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [format, setFormat] = useState<"mp4" | "mp3">("mp4"); // Format selection
  const [loading, setLoading] = useState(false); // For loading state

  const handleDownload = async () => {
    if (!url) {
      setError("请输入有效的 YouTube 链接 (Please enter a valid YouTube URL)");
      return;
    }

    try {
      setError("");
      setLoading(true); // Start loading

      // Simulate API latency (remove in production)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const link = document.createElement("a");
      // link.href = `https://yt-backend-81363540056.europe-west1.run.app/download?url=${encodeURIComponent(
      //   url
      // )}&format=${format}`;
      link.href = `http://localhost:8080/download?url=${encodeURIComponent(
        url
      )}&format=${format}`;
      link.download = `video.${format}`;
      link.click();
    } catch (err) {
      setError("下载失败，请重试 (Download failed, please try again)");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleFormatChange = (
    event: React.MouseEvent<HTMLElement>,
    newFormat: "mp4" | "mp3" | null
  ) => {
    if (newFormat) setFormat(newFormat);
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
      {/* Fullscreen loading overlay */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} color="primary" />
          <Typography
            variant="h6"
            sx={{ mt: 2, color: "#1e88e5", fontWeight: "bold" }}
          >
            正在下载，请稍候... (Downloading, please wait...)
          </Typography>
        </Box>
      )}

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
            输入视频链接，选择格式后下载
            <br />
            (Enter the video link, choose format and download)
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

          {/* Format Toggle */}
          <ToggleButtonGroup
            color="primary"
            value={format}
            exclusive
            onChange={handleFormatChange}
            sx={{ mt: 1 }}
          >
            <ToggleButton value="mp4" sx={{ fontSize: "1rem", px: 3 }}>
              MP4 视频
            </ToggleButton>
            <ToggleButton value="mp3" sx={{ fontSize: "1rem", px: 3 }}>
              MP3 音频
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Download Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleDownload}
            disabled={loading}
            sx={{
              bgcolor: "#1e88e5",
              "&:hover": { bgcolor: "#1565c0" },
              borderRadius: "10px",
              fontSize: "1.3rem",
              py: 1.5,
              fontWeight: 600,
            }}
          >
            下载 {format === "mp4" ? "视频" : "音频"}
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
            * 支持 MP4 视频 和 MP3 音频格式
            <br />
            (Supports MP4 video and MP3 audio formats)
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
