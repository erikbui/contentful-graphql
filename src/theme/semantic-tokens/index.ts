import { defineSemanticTokens } from "@pandacss/dev";

export const semanticTokens = defineSemanticTokens({
  colors: {
    foreground: {
      DEFAULT: {
        value: "{colors.grayscale.950}",
      },
    },
    border: {
      DEFAULT: {
        value: "{colors.grayscale.300}",
      },
    },
  },
});
