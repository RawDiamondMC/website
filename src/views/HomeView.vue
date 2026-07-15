<script setup lang="ts">
import { RouterLink } from "vue-router";
import { posts } from "virtual:blog-posts";
</script>

<template>
  <div class="home-page">
    <!-- ===== Blog Posts ===== -->
    <section v-if="posts.length" class="posts-section">
      <h2>最新文章</h2>
      <div class="post-list">
        <RouterLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="post-card"
        >
          <!-- 标题 -->
          <h3 class="card-title">{{ post.title }}</h3>

          <!-- 描述 -->
          <p v-if="post.description" class="card-desc">{{ post.description }}</p>

          <!-- 分类 + 标签 -->
          <div class="card-meta">
            <span v-if="post.categories.length" class="card-cats">
              <span v-for="cat in post.categories" :key="cat" class="card-cat">{{ cat }}</span>
            </span>
            <span v-if="post.tags.length" class="card-tags">
              <span v-for="tag in post.tags" :key="tag" class="card-tag">#{{ tag }}</span>
            </span>
          </div>

          <!-- 封面 -->
          <img v-if="post.cover" :src="post.cover" :alt="post.title" class="card-cover" />

          <!-- 日期 -->
          <span class="card-date">{{ post.date }}</span>
        </RouterLink>
      </div>
    </section>

    <p v-else class="no-posts">暂无文章。</p>
  </div>
</template>

<style scoped>
.home-page {
  padding: 2rem;
  max-width: 750px;
}

h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--color-border);
}

/* ===== Vertical card list ===== */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ===== Card ===== */
.post-card {
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.35rem;
  border-radius: 10px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  text-decoration: none;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.post-card:hover {
  border-color: color-mix(in srgb, var(--vt-c-green) 40%, transparent);
  background: color-mix(in srgb, var(--vt-c-green) 4%, transparent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

/* — Title — */
.card-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.35rem;
}

/* — Description — */
.card-desc {
  font-size: 0.9rem;
  opacity: 0.65;
  margin-bottom: 0.6rem;
  line-height: 1.55;
}

/* — Categories + Tags — */
.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.card-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.card-cat {
  font-size: 0.75rem;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--vt-c-green) 12%, transparent);
  color: var(--vt-c-green);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.card-tag {
  font-size: 0.78rem;
  opacity: 0.45;
}

/* — Cover — */
.card-cover {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.6rem;
}

/* — Date — */
.card-date {
  font-size: 0.78rem;
  opacity: 0.35;
  text-align: right;
}

.no-posts {
  opacity: 0.5;
}

@media (max-width: 768px) {
  .home-page {
    padding: 1.5rem 1rem;
  }
}
</style>
