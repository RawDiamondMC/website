import type { Plugin } from "vite";
import { readFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const BLOGS_DIR = "blogs";
const MODULE_ID = "virtual:blog-posts";
const RESOLVED_ID = "\0" + MODULE_ID;

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  categories: string[];
  tags: string[];
  cover: string | null;
  html: string;
}

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

function scanPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  try {
    const files = readdirSync(BLOGS_DIR);
    for (const file of files) {
      if (extname(file) !== ".md") continue;
      const raw = readFileSync(join(BLOGS_DIR, file), "utf-8");
      const { data, content } = matter(raw);

      const slug = file.replace(/\.md$/, "");
      const title = data.title || slug;
      const description = data.description || "";
      const author = data.author || "RawDiamondMC";
      let date = "";
      if (data.date) {
        try {
          date = new Date(data.date).toISOString().split("T")[0];
        } catch {
          date = String(data.date);
        }
      }

      // categories: string → [string]
      let categories: string[];
      const cat = data.categories;
      if (!cat) {
        categories = ["未分类"];
      } else if (Array.isArray(cat)) {
        categories = cat.map(String);
      } else {
        categories = [String(cat)];
      }

      // tags: string → [string]
      let tags: string[];
      const t = data.tags;
      if (!t) {
        tags = [];
      } else if (Array.isArray(t)) {
        tags = t.map(String);
      } else {
        tags = [String(t)];
      }

      const cover = data.cover || null;
      const html = md.render(content);

      posts.push({ slug, title, description, author, date, categories, tags, cover, html });
    }
  } catch {
    // blogs dir doesn't exist yet — return empty
  }

  // sort by date descending
  posts.sort((a, b) => b.date.localeCompare(a.date));

  return posts;
}

function buildCategories(posts: BlogPost[]): Record<string, BlogPost[]> {
  const map: Record<string, BlogPost[]> = {};
  for (const p of posts) {
    for (const cat of p.categories) {
      (map[cat] ??= []).push(p);
    }
  }
  return map;
}

export function blogPlugin(): Plugin {
  return {
    name: "vite-blog",
    resolveId(id) {
      if (id === MODULE_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;

      const posts = scanPosts();
      const categories = buildCategories(posts);

      return `
        export const posts = ${JSON.stringify(posts)};
        export const categories = ${JSON.stringify(categories)};
        export default { posts, categories };
      `;
    },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(join(process.cwd(), BLOGS_DIR))) {
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: "full-reload" });
        }
      }
    },
  };
}
