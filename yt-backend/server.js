import express from "express";
import cors from "cors";
import { spawn } from "child_process";

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing YouTube URL" });
  }

  try {
    // Run yt-dlp and pipe stdout to response
    const ytdlp = spawn("yt-dlp", [
      url,
      "-f",
      "bestvideo+bestaudio/best",
      "-o",
      "-",
    ]);

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="video.mp4"'
    );
    res.setHeader("Content-Type", "video/mp4");

    ytdlp.stdout.pipe(res);

    ytdlp.stderr.on("data", (data) => {
      console.error(`yt-dlp error: ${data}`);
    });

    ytdlp.on("close", (code) => {
      if (code !== 0) {
        console.error(`yt-dlp exited with code ${code}`);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to download video" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
