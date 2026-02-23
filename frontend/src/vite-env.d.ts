/// <reference types="vite/client" />
// Ambient module declarations to satisfy TS resolution for router/react-query and CSS
declare module 'react-router-dom';
declare module '@tanstack/react-query-devtools';

// Allow importing CSS files (side-effect or as module)
declare module '*.css';
