import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        // Raise the warning threshold slightly; chunks are split below so any
        // remaining warning is informational rather than actionable.
        chunkSizeWarningLimit: 900,
        rollupOptions: {
            output: {
                // Split heavy third-party libraries into separate, long-term
                // cacheable chunks. This shrinks the main entry bundle and lets
                // the browser cache vendor code across deploys — important for a
                // content-heavy real estate site where Core Web Vitals affect
                // SEO ranking and conversion.
                manualChunks(id) {
                    if (!id.includes('node_modules')) return undefined;
                    if (id.includes('firebase') || id.includes('@firebase')) return 'vendor-firebase';
                    if (id.includes('@aws-sdk') || id.includes('@smithy')) return 'vendor-aws';
                    if (id.includes('react-pdf') || id.includes('pdfjs-dist')) return 'vendor-pdf';
                    if (id.includes('bootstrap') || id.includes('react-bootstrap') || id.includes('@popperjs')) return 'vendor-bootstrap';
                    if (id.includes('react-router')) return 'vendor-router';
                    if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) return 'vendor-react';
                    return 'vendor';
                },
            },
        },
    },
});

