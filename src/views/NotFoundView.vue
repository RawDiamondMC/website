<template>
  <div class="not-found">
    <h1>404</h1>
    <p>{{ selected_sentence }}</p>
    <p>页面不存在</p>
    <RouterLink to="/" class="back-home">← Back to Home / 返回主页</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
const random_sentences = [
  "一定是喵呜机干的！",
  "NullPointerException",
  "segmentation fault",
  "libpage.so: cannot open shared object file: No such file or directory",
];
const selected_sentence = random_sentences[Math.floor(Math.random() * random_sentences.length)];
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  gap: 0.75rem;
}

.not-found h1 {
  font-size: 5rem;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1;
}

.not-found p {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.7;
}

.back-home {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  color: var(--vt-c-white);
  background: var(--vt-c-green);
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s ease;
}

.back-home:hover {
  background: var(--vt-c-green-dark);
}
</style>
