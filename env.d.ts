/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, unknown>;
  export default component;
}

declare module "virtual:blog-posts" {
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
  export const posts: BlogPost[];
  export const categories: Record<string, BlogPost[]>;
}
