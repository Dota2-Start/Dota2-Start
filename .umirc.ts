import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index", layout: true },
    { path: "/about", component: "about" },
    { path: "/hud", component: "hud" },
    { path: "/option", component: "option" },
    { path: "/*", component: "@/pages/404.tsx" },
  ],
  npmClient: 'cnpm',
  mfsu: {
    strategy: 'normal',
    include: ['lodash'],
    esbuild: true,
  },
  define: {
    APP_ENV: process.env.APP_ENV,
  },
  esbuildMinifyIIFE: true,
  // plugins: ['@umijs/plugin-esbuild'],
});
