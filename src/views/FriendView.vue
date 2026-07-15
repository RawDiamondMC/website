<script setup lang="ts">
interface Friend {
  name: string;
  url: string;
  avatar: string;
  bio?: string;
}

const friends: Friend[] = [
  // Add more friends here:
  // { name: "...", url: "...", avatar: "...", bio: "..." },
];
</script>

<template>
  <div class="friend-page">
    <h1 class="page-title">我的朋友们</h1>
    <p class="page-desc">完成成就：串门！</p>

    <div v-if="friends.length" class="friend-grid">
      <a
        v-for="f in friends"
        :key="f.url"
        :href="f.url"
        target="_blank"
        rel="noopener"
        class="friend-card"
      >
        <!-- Avatar (left) -->
        <img :src="f.avatar" :alt="f.name" class="card-avatar" />

        <!-- Text area (right) -->
        <div class="card-body">
          <span class="card-name">{{ f.name }}</span>
          <span v-if="f.bio" class="card-bio">{{ f.bio }}</span>
        </div>

        <!-- External link indicator -->
        <i-mdi:open-in-new class="card-link-icon" />
      </a>
    </div>

    <p v-else class="empty-hint">
      <i-mdi:account-group-outline class="card-link-icon" />
      还没有友链...来交个朋友吧！
    </p>
  </div>
</template>

<style scoped>
.friend-page {
  padding: 2rem;
  max-width: 900px;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.page-desc {
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 2rem;
}

/* ===== Card Grid ===== */
.friend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

/* ===== Card ===== */
.friend-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 12px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  text-decoration: none;
  color: var(--color-text);
  transition: all 0.2s ease;
  position: relative;
}

.friend-card:hover {
  border-color: color-mix(in srgb, var(--vt-c-green) 40%, transparent);
  background: color-mix(in srgb, var(--vt-c-green) 6%, transparent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* ===== Avatar (left) ===== */
.card-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--color-border);
  transition: border-color 0.2s;
}

.friend-card:hover .card-avatar {
  border-color: color-mix(in srgb, var(--vt-c-green) 50%, transparent);
}

/* ===== Text body (right) ===== */
.card-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.card-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-bio {
  font-size: 0.85rem;
  color: var(--color-text);
  opacity: 0.65;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

/* ===== External link icon ===== */
.card-link-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.35;
  transition: opacity 0.2s;
}

.friend-card:hover .card-link-icon {
  opacity: 0.7;
  color: var(--vt-c-green);
}

/* ===== Empty state ===== */
.empty-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
  opacity: 0.45;
  font-size: 1.1rem;
  padding: 3rem 0;
}

.empty-icon {
  width: 24px;
  height: 24px;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .friend-page {
    padding: 1.5rem 1rem;
  }

  .friend-grid {
    grid-template-columns: 1fr;
  }
}
</style>
