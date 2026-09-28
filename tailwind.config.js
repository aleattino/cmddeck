/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0D1117',
        surface: {
          DEFAULT: '#161B22',
          raised: '#1F2630',
          sunken: '#010409',
        },
        line: {
          DEFAULT: '#30363D',
          muted: '#21262D',
        },
        fg: {
          DEFAULT: '#E6EDF3',
          muted: '#9DA7B3',
          subtle: '#848D97',
        },
        accent: {
          DEFAULT: '#4ADE80',
          strong: '#22C55E',
        },
        danger: '#F87171',
        caution: '#FBBF24',
        distro: {
          ubuntu: '#F58A5C',
          fedora: '#79B8F0',
          arch: '#4FB6EA',
        },
      },
      fontFamily: {
        sans: [
          '"Atkinson Hyperlegible Next Variable"',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"Atkinson Hyperlegible Mono Variable"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
