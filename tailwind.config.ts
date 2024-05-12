export default {
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "fade-in": "fade ease 1s",
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
}
