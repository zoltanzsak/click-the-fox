import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

const config: UserConfig = {
    plugins: [react(), tailwindcss()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.ts',
    },
};

export default defineConfig(config);
