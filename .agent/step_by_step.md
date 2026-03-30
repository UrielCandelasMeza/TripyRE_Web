# Step-by-Step AI Agent Guidelines (Client)

If you are an AI model acting upon this frontend codebase, follow these rules carefully:

1. **Focus on the Client**: Restrict operations and logical planning to the `/client` directory. Do not alter backend logic unless explicitly required.
2. **React 19 & Vite Standards**: Use modern React idioms (Hooks, Context). Ensure imports match Vite's structure.
3. **Tailwind CSS v4**: When styling new components, use Tailwind utility classes.
   - For custom colors, reference CSS variables from `index.css` via Tailwind v4 syntax or inline variables (e.g., `text-[var(--color-morado)]` or strictly defined custom utilities).
4. **API Integration**: Any new endpoint calls must be added in the `/src/api` folder using the existing Axios setup.
5. **Contexts**: If managing visual state across pages, investigate the current providers in `/src/context` before creating a new one.
