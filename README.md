# The Miskatonic Messenger

React + Vite frontend for consulting the Eldritch Oracle. Strict TypeScript, TailwindCSS, and pinned dependencies.

## Prerequisites
- You successfully completed the [Eldritch Oracle setup](https://github.com/jensawyer/eldritch-oracle).
- Node.js 18.18+ (recommended LTS).
- npm 9+.
- No fear of the insanity which you may encounter.

## Quickstart
- Copy `.env.example` to `.env.development` if needed and adjust values.
- Install deps: `make install` 
- Run dev: `make dev` 

The dev server proxies `/api` to `VITE_DEV_PROXY_TARGET` from `.env.development` (defaults to `http://localhost:8000`).
This should be where you are running the Eldritch Oracle.

## Scripts
- `make dev` — Start Vite dev server on port 5173 then open [http://localhost:5173](http://localhost:5173)
- `make build` — Production build.
- `make preview` — Preview production build locally.
- `make clean` — Remove `node_modules` and `dist`.

