/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#4C00C2',
        'darkBlue': '#32007E',
        'blue': '#3B058E',
        'white': '#FFFFFF',
        'red': '#FC484C',
        'green': '#19AC51',
        'darkGrey': '#444E5D',
        'black': '#1A212C',
        'lightGrey': '#D3D8E1',
        'grey': '#798291',
        'whiteGrey': '#D3D8E1',
        'smoke': '#E5E5E5', 
      },
      fontFamily: {
        circularPro: ['Circular Pro', 'sans'],
      },
    },
  },
  plugins: [],
}

