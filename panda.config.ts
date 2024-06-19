import { semanticTokens } from "@/theme/semantic-tokens";
import { colors } from "@/theme/tokens/colors";
import { spacing } from "@/theme/tokens/spacing";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: colors,
        spacing: spacing,
      },
      semanticTokens: semanticTokens,
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
