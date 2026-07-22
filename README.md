# Omar Dev Portfolio

My personal portfolio built with React + TypeScript + Vite + Tailwind CSS.

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Motion, GSAP
- **Backend:** Express.js (API proxy)
- **Deployment:** Render.com (Web Service)

## Features

- Cyberpunk theme with Matrix-style background
- Arabic/English language support
- YouTube stats and latest videos integration
- itch.io games showcase
- Dark/Light mode
- Smooth animations with Motion and GSAP

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deployment (Render)

1. Push to GitHub
2. Render → New Web Service → Connect repo
3. Build: `npm install && npm run build`
4. Start: `npm start`
5. Add environment variables:
   - `YOUTUBE_API_KEY` - Google YouTube Data API v3 key
   - `YOUTUBE_CHANNEL_ID` - YouTube channel ID (optional)
   - `ITCH_API_KEY` - itch.io API key

## Project Structure

```
├── index.html            # Entry point
├── vite.config.ts        # Vite configuration
├── server.js             # Express server (API proxy + static host)
├── package.json
├── src/
│   ├── main.tsx          # React entry
│   ├── App.tsx           # Main app component
│   ├── index.css         # Tailwind + custom styles
│   ├── translations.ts   # EN/AR translations
│   ├── lib/              # Utilities
│   └── components/       # React components
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Games.tsx
│       ├── Projects.tsx
│       ├── YoutubeSection.tsx
│       ├── Footer.tsx
│       ├── LoadingScreen.tsx
│       └── MatrixBackground.tsx
└── public/               # Static assets
```
