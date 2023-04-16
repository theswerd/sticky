// vite.config.ts
import { crx } from "file:///mnt/c/Users/sjdoe/hackathons/sticky/client/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import { svelte } from "file:///mnt/c/Users/sjdoe/hackathons/sticky/client/node_modules/@sveltejs/vite-plugin-svelte/dist/index.js";
import { resolve } from "node:path";
import { defineConfig } from "file:///mnt/c/Users/sjdoe/hackathons/sticky/client/node_modules/vite/dist/node/index.js";

// manifest.json
var manifest_default = {
  name: "svelte-ts-extension-boilerplate",
  description: "Boilerplate for Chrome Extension Svelte Typescript project",
  version: "1.0",
  manifest_version: 3,
  icons: {
    "16": "src/assets/icons/favicon-16x16.png",
    "32": "src/assets/icons/favicon-32x32.png"
  },
  content_scripts: [
    {
      matches: ["https://*/*"],
      js: ["src/content/index.ts"]
    }
  ],
  background: {
    service_worker: "src/background/index.ts"
  },
  options_ui: {
    page: "src/options/options.html",
    open_in_tab: false
  },
  action: {
    default_popup: "src/popup/popup.html",
    default_icon: {
      "16": "src/assets/icons/favicon-16x16.png",
      "32": "src/assets/icons/favicon-32x32.png"
    }
  },
  permissions: ["storage"]
};

// vite.config.ts
var __vite_injected_original_dirname = "/mnt/c/Users/sjdoe/hackathons/sticky/client";
var srcDir = resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig({
  plugins: [svelte(), crx({ manifest: manifest_default })],
  resolve: {
    alias: {
      src: srcDir
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvc2pkb2UvaGFja2F0aG9ucy9zdGlja3kvY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvVXNlcnMvc2pkb2UvaGFja2F0aG9ucy9zdGlja3kvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvYy9Vc2Vycy9zamRvZS9oYWNrYXRob25zL3N0aWNreS9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBjcnggfSBmcm9tIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI7XHJcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gXCJAc3ZlbHRlanMvdml0ZS1wbHVnaW4tc3ZlbHRlXCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSBcIi4vbWFuaWZlc3QuanNvblwiO1xyXG5cclxuY29uc3Qgc3JjRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6IFtzdmVsdGUoKSwgY3J4KHsgbWFuaWZlc3QgfSldLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgIHNyYzogc3JjRGlyLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUFTLFdBQVc7QUFDdlUsU0FBUyxjQUFjO0FBQ3ZCLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSDdCLElBQU0sbUNBQW1DO0FBTXpDLElBQU0sU0FBUyxRQUFRLGtDQUFXLEtBQUs7QUFHdkMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsMkJBQVMsQ0FBQyxDQUFDO0FBQUEsRUFDckMsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSztBQUFBLElBQ1Q7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
