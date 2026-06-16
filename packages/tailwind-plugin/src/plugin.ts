import plugin from "tailwindcss/plugin"

import { freitasBase, freitasUtilities } from "./base"
import { freitasTheme } from "./tokens"

const freitasPlugin = plugin(
  ({ addBase, addUtilities }) => {
    addBase(freitasBase)
    addUtilities(freitasUtilities)
  },
  {
    theme: {
      extend: freitasTheme
    }
  }
)

export default freitasPlugin
