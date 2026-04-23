# Smart mirror frontend app

Designed as a kiosk-like display app for a large surface, connected to a PC/Raspberry/etc (with a camera feed and internet access).

# Made with:

- Tauri (Rust)
- Vite / React / Typescript (on Node.js v24)

# Development

Develop the desktop app locally by running:

to develop the desktop app, run: 
```
npm run tauri dev
```

To only develop the frontend web app, run:
```
npm run web:dev
```

# Bundling

Build the desktop app for Windows and Linux with:

```
npm run desktop:build
```
