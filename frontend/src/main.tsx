import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router";

import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

import design_system from "@/design-system"
import App from '@/pages/app'
import Login from '@/pages/login'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ChakraProvider value={design_system}>
      <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="system">

        <BrowserRouter>
          <Routes>

            <Route path='/' element={<App />} />
            <Route path='/login' element={<Login />} />

          </Routes>
        </BrowserRouter>

      </ThemeProvider>
    </ChakraProvider>

  </StrictMode>,
)
