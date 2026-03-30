# Project Context (Client)

## Overview
This is a Single Page Application (SPA) built for a web environment. It features interactive map visualizations and dynamic UI elements.

## Tech Stack & Libraries
- **Framework**: React 19 & Vite
- **Routing**: React Router 7
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **HTTP Client**: Axios
- **Maps & 3D**: MapLibre GL, OGL
- **Icons**: React Icons

## Design System & Styles
- **Framework**: Tailwind CSS (v4 configuration via `index.css`).
- **Typography**: Principal font is **Roboto** (sans-serif).
- **Color Palette** (defined in `index.css`):
  - `Oscuro` (Dark): `#242038`
  - `Morado` (Purple): `#725AC1`
  - `Morado Intermedio` (Intermediate Purple): `#9D8DD4`
  - `Morado Claro` (Light Purple): `#B8A8E8`
  - `Neutro` (Neutral): `#E5E5E5`

## Development Guidelines
- Follow Tailwind CSS v4 conventions (e.g., using `@theme` block).
- All requests to the backend must use the configured Axios instances in `src/api/`.
- Manage authentication state through `AuthContext`.
