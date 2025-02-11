export default {
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "fade-in": "fade ease 1s",
        "dynamic-gradient": "grad ease 3s infinite",
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        grad: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
    },
  },
}
