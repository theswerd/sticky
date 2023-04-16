/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
        backgroundImage: {
            'banner':"url(../src/assets/banner.png)",
            'banner_icon' : "url(../src/assets/icons/banner_icon.png)"
        },
        colors: {
            'sky-blue-start' : '#53BDDE',
            'sky-blue-stop' : '#4288BF',
            'teal-start' : '#84C4A9',
            'teal-stop' : '#00A6AF',
            'button_blue' : '#4288BF'

        }

    },
  },
  plugins: [],
}

