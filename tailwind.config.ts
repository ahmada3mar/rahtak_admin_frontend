
import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        hyperpay:{
          DEFAULT: '#ff6c0a',
          '50': '#fff7ed',
          '100': '#ffedd4',
          '200': '#ffd6a8',
          '300': '#ffb970',
          '400': '#ff8f37',
          '500': '#ff6c0a',
          '600': '#f05406',
          '700': '#c73d07',
          '800': '#9e310e',
          '900': '#7f2b0f',
          '950': '#451205',
        } 

      },
    },
    fontFamily: {
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
}
