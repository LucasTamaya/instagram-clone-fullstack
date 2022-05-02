module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        authTransitionInSm: {
          "0%": { left: "-20px" },
          "90%": { left: "55%" },
          "100%": { left: "50%", transform: "translateX(-50%)" },
        },
        authTransitionInMd: {
          "0%": { left: "-20px" },
          "90%": { left: "55px" },
          "100%": { left: "50px" },
        },
      },
      animation: {
        authTransitionInSm: "authTransitionInSm .7s forwards",
        authTransitionInMd: "authTransitionInMd .7s forwards",
        pingSlow: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
      },
    },
  },
  plugins: [],
};
