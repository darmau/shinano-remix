import type { Config } from "tailwindcss";
import forms from '@tailwindcss/forms';

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1440px'
      }
    },
  },
  plugins: [
    forms,
  ],
} satisfies Config;
