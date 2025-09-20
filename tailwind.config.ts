import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                brand: ['"Goudy Bookletter 1911"', 'serif'],
            },
        },
    },
    plugins: [typography]
} satisfies Config
