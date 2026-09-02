import {
  defineConfig,
  defaultConfig,
  createSystem,
} from "@chakra-ui/react"

const config = defineConfig({
  strictTokens: true,

  theme: {
    tokens: {
      colors: {
      },
    },
  },

  globalCss: {
    html: {
      // set default palette for all components that dont specify one
      // colorPalette: "cyan",
    }
  }
})

const design_system = createSystem(defaultConfig, config)

export default design_system;
