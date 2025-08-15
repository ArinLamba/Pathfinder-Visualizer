/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        Visit: {
          "0%": { backgroundColor: "#1e293b", transform: "scale(1)" },
          "33%": { backgroundColor: "#4f46e5", transform: "scale(0.9)" },
          "67%": { backgroundColor: "#4f46e5", transform: "scale(1.1)" },
          "100%": { backgroundColor: "#4f46e5", transform: "scale(1)" },
        },
        pathHighlight: {
          "0%": { backgroundColor: "#836d0c", transform: "scale(1.3)" },
          "32%": { backgroundColor: "#dfa400", transform: "scale(1.2)" },
          "50%": { backgroundColor: "#f3d500", transform: "scale(1.1)" },
          "100%": { backgroundColor: "#facc15", transform: "scale(1)"},
        },
        wallBuild: {
          "0%": { backgroundColor: "#581c87", transform: "scale(0.4)",}, // grid bg
          "33%": { backgroundColor: "#581c87", transform: "scale(0.8)" }, // grid bg
          "67%": { backgroundColor: "#581c87", transform: "scale(1.2)" }, // grid bg
          "100%": { backgroundColor: "#581c87", transform: "scale(1)" },  // wall color
        },
      },
      animation: {
        Visit: "Visit 0.3s ease-out forwards",
        pathHighlight: "pathHighlight 0.5s ease-out forwards",
        wallBuild: "wallBuild 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
}

