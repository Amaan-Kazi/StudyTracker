import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

import design_system from "@/design-system"
import App from '@/pages/App'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ChakraProvider value={design_system}>
      <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="system">

        <App />

      </ThemeProvider>
    </ChakraProvider>

  </StrictMode>,
)
