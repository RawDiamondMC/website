<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { posts } from "virtual:blog-posts";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const post = computed(() => posts.find((p) => p.slug === slug.value));
</script>

<template>
  <div class="post-page" v-if="post">
    <p class="post-date">发布于 {{ post.date }}</p>
    <h1 class="post-title">{{ post.title }}</h1>
    <p class="post-author">by {{ post.author }}</p>

    <div v-if="post.categories.length" class="post-cats">
      <RouterLink
        v-for="cat in post.categories"
        :key="cat"
        :to="`/categories#${cat}`"
        class="post-cat"
        >{{ cat }}</RouterLink
      >
    </div>

    <div v-if="post.tags.length" class="post-tags">
      <span v-for="tag in post.tags" :key="tag" class="post-tag">#{{ tag }}</span>
    </div>

    <img v-if="post.cover" :src="post.cover" :alt="post.title" class="post-cover" />

    <article class="post-body" v-html="post.html" />
  </div>

  <div v-else class="post-not-found">
    <p>文章未找到。</p>
    <RouterLink to="/">← 返回主页</RouterLink>
  </div>
</template>

<style scoped>
.post-page {
  padding: 2rem;
  max-width: 750px;
  line-height: 1.8;
  color: var(--color-text);
}

.post-date {
  font-size: 0.85rem;
  opacity: 0.5;
  margin-bottom: 0.25rem;
}

.post-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.3rem;
}

.post-author {
  font-size: 0.95rem;
  opacity: 0.5;
  margin-bottom: 0.75rem;
}

.post-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.post-cat {
  font-size: 0.8rem;
  padding: 0.15rem 0.6rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--vt-c-green) 12%, transparent);
  color: var(--vt-c-green);
  text-decoration: none;
}

.post-cat:hover {
  background: color-mix(in srgb, var(--vt-c-green) 20%, transparent);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.post-tag {
  font-size: 0.8rem;
  opacity: 0.5;
}

.post-cover {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.post-not-found {
  padding: 3rem 2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .post-page {
    padding: 1.5rem 1rem;
  }

  .post-title {
    font-size: 1.5rem;
  }
}
</style>

<style>
/* v-html content — must be global (non-scoped) */
.post-body h1,
.post-body h2,
.post-body h3 {
  color: var(--color-heading);
  margin: 1.5rem 0 0.5rem;
}

.post-body p {
  margin-bottom: 0.75rem;
}

.post-body code {
  background: var(--color-background-soft);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}

.post-body pre {
  background: var(--color-background-soft);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.post-body pre code {
  background: none;
  padding: 0;
}

.post-body a {
  color: var(--vt-c-green);
}

.post-body blockquote {
  border-left: 3px solid var(--vt-c-green);
  margin-left: 0;
  padding-left: 1rem;
  opacity: 0.8;
}

.post-body img {
  max-width: 100%;
  border-radius: 8px;
}
</style>
