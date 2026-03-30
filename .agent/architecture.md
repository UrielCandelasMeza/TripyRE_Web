# Client Architecture

## Structural Overview
The React application is structured fundamentally around specialized directories inside `/src`:

- **`/src/api`**: Contains Axios instances and endpoint definitions (e.g., `auth.js`) for communicating with the external backend server.
- **`/src/context`**: Houses global state providers, such as `AuthContext`, responsible for user sessions and authorization.
- **`/src/pages`**: Contains the main routing views (e.g., `Login.jsx`).
- **`/src/components`**: Reusable UI elements independent of the specific page layout.

## Data Flow
- User interactions trigger actions in pages/components.
- If data is involved, requests are dispatched via `axios` from the `/api` layer.
- Map data is managed using MapLibre GL and potentially animated using OGL.
- Authentication JWTs or session identifiers are likely intercepted in the Axios configuration and stored conceptually within the context or local storage.
