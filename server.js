import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCVeavz43aNPpYfmeIqct1DA";
const ITCH_API_KEY = process.env.ITCH_API_KEY;

app.get("/api/youtube/stats", async (_req, res) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    if (!data.items?.length) {
      return res.status(404).json({ error: "Channel not found" });
    }
    res.json(data.items[0].statistics);
  } catch (err) {
    console.error("YouTube stats error:", err);
    res.status(500).json({ error: "Failed to fetch YouTube stats" });
  }
});

app.get("/api/youtube/videos", async (_req, res) => {
  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
    );
    const playlistData = await playlistRes.json();

    const videoIds = playlistData.items.map((item) => item.contentDetails.videoId).join(",");
    const videoDetailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    const videoDetailsData = await videoDetailsRes.json();

    res.json(videoDetailsData.items);
  } catch (err) {
    console.error("YouTube videos error:", err);
    res.status(500).json({ error: "Failed to fetch YouTube videos" });
  }
});

app.get("/api/get-games", async (_req, res) => {
  try {
    const response = await fetch(`https://itch.io/api/1/${ITCH_API_KEY}/my-games`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("itch.io error:", err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

const DIST_DIR = path.join(__dirname, "dist");
app.use(express.static(DIST_DIR));

app.get("*", (_req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
