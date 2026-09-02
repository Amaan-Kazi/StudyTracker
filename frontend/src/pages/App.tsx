import { IconButton } from '@chakra-ui/react'
import { LuMoon, LuSun } from "react-icons/lu"

import { useTheme } from "next-themes"


export default function App() {
  const { resolvedTheme, setTheme } = useTheme()

  return <>
    <IconButton
      variant={'ghost'}
      onClick={() => resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")}
    >
      {resolvedTheme === "dark"
        ? <LuSun />
        : <LuMoon />}
    </IconButton>
  </>
}
