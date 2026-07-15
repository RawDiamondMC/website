<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { categories } from "virtual:blog-posts";

const sorted = computed(() => {
  const entries = Object.entries(categories);
  // "未分类" always last
  entries.sort(([a], [b]) => {
    if (a === "未分类") return 1;
    if (b === "未分类") return -1;
    return a.localeCompare(b, "zh-CN");
  });
  return entries;
});
</script>

<template>
  <div class="categories-page">
    <h1>分类</h1>
    <template v-if="sorted.length">
      <section v-for="[cat, posts] in sorted" :key="cat" :id="cat">
        <h2>{{ cat }}</h2>
        <p v-for="p in posts" :key="p.slug">
          <RouterLink :to="`/blog/${p.slug}`">{{ p.title }}</RouterLink>
          <span class="cat-post-date">{{ p.date }}</span>
        </p>
      </section>
    </template>
    <p v-else class="empty">暂无文章</p>
  </div>
</template>

<style scoped>
.categories-page {
  padding: 2rem;
  max-width: 700px;
  line-height: 1.75;
  color: var(--color-text);
}

h1 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 1.5rem;
}

section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--color-border);
}

p {
  padding: 0.3rem 0;
}

a {
  color: var(--vt-c-green);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.cat-post-date {
  font-size: 0.8rem;
  opacity: 0.45;
  margin-left: 0.75rem;
}

.empty {
  opacity: 0.5;
}

@media (max-width: 768px) {
  .categories-page {
    padding: 1.5rem 1rem;
  }
}
</style>
