import { defineConfig, fontProviders } from "astro/config";

// GitHub Pages deployment settings.
//
// Project site (default): served from https://<user>.github.io/<repo>/
//   - site: your GitHub Pages origin, e.g. "https://your-user.github.io"
//   - base: "/" + the repository name, e.g. "/webring"
//
// User/org site or custom domain:
//   - site: the full domain, e.g. "https://ring.example"
//   - base: "/"
//
// The same base path must appear in src/data/ring.json (the "url" field) so
// the embed snippet and hop links resolve correctly.
export default defineConfig({
  site: "https://offeringofpie.github.io",
  base: "/anel-da-web-lusofona",
  trailingSlash: "always",
  compressHTML: false,
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Bazar",
      cssVariable: "--font-bazar",
      fallbacks: ["sans-serif"],
      options: {
        variants: [{ src: ["./src/assets/fonts/bazar/Bazar.ttf"], weight: 400, style: "normal" }],
      },
    },
    {
      provider: fontProviders.google(),
      name: "Literata",
      cssVariable: "--font-literata",
      weights: ["400 700"],
      fallbacks: ["Georgia", "serif"],
    },
  ],
});
