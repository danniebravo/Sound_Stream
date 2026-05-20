import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
    },
    coverage: {
        enabled: true,
        all: true,
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        reporter: ['text', 'html'],
        exclude: [
            '**/node_modules/**',
            '**/*.test.jsx',
            '**/*.css',
            'src/assets/**',
        ],
    },
});
