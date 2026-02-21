/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        // 'geist' হলো আপনার ক্লাসের নাম যা আপনি HTML-এ ব্যবহার করবেন
        geist: ['"Geist"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}