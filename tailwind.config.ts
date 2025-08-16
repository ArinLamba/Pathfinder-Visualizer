/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        Visit: {
          "0%": { backgroundColor: "#1e293b", transform: "scale(0.4)" },
          "33%": { backgroundColor: "#4f46e5", transform: "scale(0.8)" },
          "67%": { backgroundColor: "#4f46e5", transform: "scale(1.2)" },
          "100%": { backgroundColor: "#4f46e5", transform: "scale(1)" },
        },
        pathHighlight: {
          "0%": { backgroundColor: "#dfa400", transform: "scale(1)", },
          "32%": { backgroundColor: "#dfa400", transform: "scale(1.)" },
          "67%": { backgroundColor: "#f3d500", transform: "scale(1.2)" },
          "100%": { backgroundColor: "#facc15", transform: "scale(1)"},
        },
        wallBuild: {
          "0%": { backgroundColor: "#581c87", transform: "scale(0.4)",}, // grid bg
          "33%": { backgroundColor: "#581c87", transform: "scale(0.8)" }, // grid bg
          "67%": { backgroundColor: "#581c87", transform: "scale(1.2)" }, // grid bg
          "100%": { backgroundColor: "#581c87", transform: "scale(1)" },  // wall color
        },
        pulseScale: {
          "0%, 100%": {transform: "scale(1)"},
          "50%": {transform: "scale(0.9)"},
        },
      },
      animation: {
        Visit: "Visit 0.3s ease-out  forwards",
        pathHighlight: "pathHighlight 0.5s ease-out forwards",
        wallBuild: "wallBuild 0.3s ease-in-out forwards",
        pulseScale: "pulseScale 0.9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

