# Arif Live TV

Premium emerald-glass streaming directory starter built with React and Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Current status and limitations

- Includes a responsive web UI, channel categories, search, and a browser-local channel manager.
- Channel records are saved in the current browser's localStorage only. They do **not** sync between devices.
- The player UI opens a supplied stream URL; actual playback depends on stream format, CORS, browser support, and rights to use the stream.
- No production admin authentication, shared database, backend API, or Android APK build is configured yet.
- Do not add private stream credentials or secrets to source control.

## Android

Capacitor dependencies are included as a starting point. Android project generation and APK compilation still need to be completed after the web app is tested.