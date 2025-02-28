import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import astroI18next from "astro-i18next";
import sitemap from "@astrojs/sitemap";
import purgecss from "astro-purgecss";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { fromHtml } from 'hast-util-from-html';
import icon from "astro-icon"

import compress from "astro-compress";
import searchIndex from "./src/integration/search-index";

// https://astro.build/config
export default defineConfig({
  site: "https://quiltmc.org/",
  integrations: [
      mdx(),
    astroI18next(),
    sitemap(),
    purgecss({ safelist: ["has-background-info", "has-background-link"] }),
    compress({ SVG: false, }),
    searchIndex(),
    icon()
  ],
  markdown: {
    syntaxHighlight: "prism",
    rehypePlugins: [[rehypeAutolinkHeadings, {
      content: fromHtml('<span class="header-anchor-container icon pl-3"><i class="header-anchor fas fa-lg fa-link has-text-link is-size-5"></i></span>'),
      behavior: "append"
    }]]
  },
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});