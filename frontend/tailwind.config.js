/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-kongtext)"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        hop: {
          "0%, 100%": { transform: "translateY(-1.5%)" },
          "50%": { transform: "translateY(1.5%)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.75s linear infinite",
        hop: "hop 0.55s ease-in infinite",
      },
    },
  },
  plugins: [],
};
