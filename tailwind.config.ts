import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0b0b0f",
          800: "#151521",
          700: "#1f1f2e"
        },
        haze: "#f2f2f4"
      }
    }
  },
  plugins: []
};

export default config;
