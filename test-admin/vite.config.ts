import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        basicSsl()  // Add the basic SSL plugin
    ],
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
    },
    base: './',
});
