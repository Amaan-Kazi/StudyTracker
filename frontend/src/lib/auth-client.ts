import { createAuthClient } from "better-auth/react"

console.log("BACKEND URL", import.meta.env.VITE_BACKEND_URL);

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_BACKEND_URL,
})
