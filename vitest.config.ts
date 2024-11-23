import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		environment: "jsdom",
	},
});

// export default defineConfig({
//   plugins: [react()],
//   test: {
//     browser: {
//       enabled: true,
//       name: 'chromium',
//       provider: 'playwright',
//       // https://playwright.dev
//       providerOptions: {},
//     },
//   },
// })
