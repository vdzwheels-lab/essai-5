import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Déclaration pour que TypeScript reconnaisse process sans @types/node
declare const process: { cwd: () => string; env: Record<string, string> };

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement pour que process.env fonctionne
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill simple pour que 'process.env.API_KEY' fonctionne dans le navigateur
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});