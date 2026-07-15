<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";

const drinks = ["一瓶雪碧", "一瓶可乐", "一份冰激凌"];
const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];

type Theme = "auto" | "light" | "dark";
const STORAGE_KEY = "theme";

const theme = ref<Theme>((localStorage.getItem(STORAGE_KEY) as Theme) || "auto");

const media = window.matchMedia("(prefers-color-scheme: dark)");

function apply(choice: Theme) {
  const isDark = choice === "dark" || (choice === "auto" && media.matches);
  document.documentElement.classList.toggle("dark", isDark);
}

function setTheme(choice: Theme) {
  theme.value = choice;
  localStorage.setItem(STORAGE_KEY, choice);
  apply(choice);
}

media.addEventListener("change", () => {
  if (theme.value === "auto") apply("auto");
});

onMounted(() => apply(theme.value));
</script>

<template>
  <div class="app-layout">
    <!-- Left Sidebar -->
    <aside class="sidebar">
      <!-- Avatar -->
      <div class="sidebar-avatar">
        <img src="https://github.com/RawDiamondMC.png" alt="RawDiamondMC" decoding="async" />
      </div>

      <!-- Vertical Navigation -->
      <nav class="sidebar-nav">
        <RouterLink to="/">
          <i-mdi:home-outline class="nav-icon" />
          主页
        </RouterLink>
        <RouterLink to="/categories">
          <i-mdi:shape-outline class="nav-icon" />
          分类
        </RouterLink>
        <RouterLink to="/tools">
          <i-mdi:tools class="nav-icon" />
          工具
        </RouterLink>
        <RouterLink to="/about">
          <i-mdi:information-outline class="nav-icon" />
          关于
        </RouterLink>
        <RouterLink to="/friend">
          <i-mdi:account-group-outline class="nav-icon" />
          友链
        </RouterLink>
        <a
          href="https://afdian.com/a/RawDiamondMC"
          target="_blank"
          rel="noopener"
          class="sponsor-link"
        >
          <i-mdi:coffee-outline class="nav-icon" />
          请我{{ randomDrink }}
        </a>
      </nav>

      <!-- Theme Toggle -->
      <div class="theme-toggle">
        <button :class="{ active: theme === 'light' }" @click="setTheme('light')" title="亮色">
          <i-mdi:white-balance-sunny />
        </button>
        <button :class="{ active: theme === 'auto' }" @click="setTheme('auto')" title="自动">
          <i-mdi:theme-light-dark />
        </button>
        <button :class="{ active: theme === 'dark' }" @click="setTheme('dark')" title="暗色">
          <i-mdi:weather-night />
        </button>
      </div>

      <!-- Social Icons (desktop only) -->
      <div class="sidebar-social desktop-only">
        <a href="https://github.com/RawDiamondMC" target="_blank" rel="noopener" title="GitHub">
          <i-mdi:github />
        </a>
        <a
          href="https://bsky.app/profile/rawdiamondmc.bsky.social"
          target="_blank"
          rel="noopener"
          title="Bluesky"
        >
          <i-mdi:butterfly-outline />
        </a>
        <a href="mailto:rawdiamondmc@outlook.com" title="Email">
          <i-mdi:email-outline />
        </a>
      </div>

      <!-- Copyright (desktop only) -->
      <div class="sidebar-footer desktop-only">
        <p class="copyright">© 2026 RawDiamondMC</p>
        <p class="built-with">
          Build with
          <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
        </p>
        <p class="built-with">
          Powered by
          <a target="_blank" rel="noopener" href="https://wolf.snowlyicewolf.club/">AmarokIce</a> &
          <a target="_blank" rel="noopener" href="https://github.com/HO-Artisan/">HO-Artisan</a>
        </p>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- Mobile Bottom: Social + Footer -->
    <div class="mobile-bottom">
      <div class="mobile-social">
        <a href="https://github.com/RawDiamondMC" target="_blank" rel="noopener" title="GitHub">
          <i-mdi:github />
        </a>
        <a
          href="https://bsky.app/profile/rawdiamondmc.bsky.social"
          target="_blank"
          rel="noopener"
          title="Bluesky"
        >
          <i-mdi:butterfly-outline />
        </a>
        <a href="mailto:rawdiamondmc@outlook.com" title="Email">
          <i-mdi:email-outline />
        </a>
      </div>
      <div class="mobile-footer">
        <p class="copyright">© 2026 RawDiamondMC</p>
        <p class="built-with">
          Build with
          <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
        </p>
        <p class="built-with">
          Powered by
          <a target="_blank" rel="noopener" href="https://wolf.snowlyicewolf.club/">AmarokIce</a> &
          <a target="_blank" rel="noopener" href="https://github.com/HO-Artisan/">HO-Artisan</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== Sidebar Layout ===== */
.app-layout {
  display: flex;
  min-height: 100vh;
}

/* ===== Sidebar ===== */
.sidebar {
  width: 330px;
  min-width: 330px;
  display: flex;
  flex-direction: column;
  background: var(--color-background-soft);
  border-right: 1px solid var(--color-border);
  padding: 2rem 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 10;
}

/* ===== Avatar ===== */
.sidebar-avatar {
  text-align: center;
  margin-bottom: 2rem;
}

.sidebar-avatar img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-border);
  transition: border-color 0.3s;
}

.sidebar-avatar img:hover {
  border-color: var(--vt-c-green);
}

/* ===== Theme Toggle ===== */
.theme-toggle {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.75rem 0;
  margin-top: 0.5rem;
  border-top: 1px solid var(--color-border);
}

.theme-toggle button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle button:hover {
  background: color-mix(in srgb, var(--vt-c-green) 12%, transparent);
  color: var(--vt-c-green);
}

.theme-toggle button.active {
  background: color-mix(in srgb, var(--vt-c-green) 15%, transparent);
  color: var(--vt-c-green);
}

.theme-toggle :deep(svg) {
  width: 18px;
  height: 18px;
}

/* ===== Navigation ===== */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.sidebar-nav a:hover {
  background: color-mix(in srgb, var(--vt-c-green) 12%, transparent);
  color: var(--vt-c-green);
}

.sidebar-nav a.router-link-exact-active {
  background: color-mix(in srgb, var(--vt-c-green) 15%, transparent);
  color: var(--vt-c-green);
  font-weight: 600;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* ===== Social Icons ===== */
.sidebar-social {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.sidebar-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.sidebar-social a:hover {
  background: color-mix(in srgb, var(--vt-c-green) 12%, transparent);
  color: var(--vt-c-green);
}

.sidebar-social :deep(svg) {
  width: 22px;
  height: 22px;
}

/* ===== Footer ===== */
.sidebar-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.copyright {
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 0.3rem;
}

.built-with {
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.7;
}

.built-with a {
  color: var(--vt-c-green);
  text-decoration: none;
  font-weight: 500;
}

.built-with a:hover {
  text-decoration: underline;
}

/* ===== Main Content ===== */
.main-content {
  margin-left: 330px;
  flex: 1;
  padding: 2rem;
  min-height: 100vh;
}

/* Desktop-only: hide on mobile */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
}

/* Mobile Bottom: Social + Footer (hidden on desktop) */
.mobile-bottom {
  display: none;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }

  .sidebar {
    position: relative;
    width: 100%;
    min-width: unset;
    flex-direction: column;
    padding: 1.5rem 1rem;
  }

  .sidebar-avatar img {
    width: 72px;
    height: 72px;
  }

  .sidebar-nav {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25rem;
  }

  .sidebar-nav a {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }

  .main-content {
    margin-left: 0;
    padding: 1.5rem;
  }

  /* Show mobile bottom section */
  .mobile-bottom {
    display: block;
    text-align: center;
    padding: 1.5rem 1rem;
    background: var(--color-background-soft);
    border-top: 1px solid var(--color-border);
  }

  .mobile-social {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  .mobile-social a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: var(--color-text);
    transition: all 0.2s ease;
  }

  .mobile-social a:hover {
    background: color-mix(in srgb, var(--vt-c-green) 12%, transparent);
    color: var(--vt-c-green);
  }

  .mobile-social :deep(svg) {
    width: 22px;
    height: 22px;
  }

  .mobile-footer {
    text-align: center;
  }
}
</style>
