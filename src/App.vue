<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import MerchCatalog from './components/MerchCatalog.vue';
import Highlights from './components/Highlights.vue';
import Albums from './components/Albums.vue';
import Footer from './components/Footer.vue';
import CartDrawer from './components/CartDrawer.vue';
import { currentPage, currentArtist } from './routerState.js';
import { artistData } from './artistData.js';
import ProductDetail from './components/ProductDetail.vue';
import HighlightDetail from './components/HighlightDetail.vue';
import Burakku from './components/Burakku.vue';

// Interactive Audio Player State
const isPlayerVisible = ref(false);
const isPlaying = ref(false);
const audioRef = ref(null);
const progress = ref(0);
const duration = ref(0);
const currentTime = ref(0);

const trackInfo = computed(() => artistData[currentArtist.value].trackInfo);

const formatTime = (secs) => {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const handleListen = () => {
  isPlayerVisible.value = true;
  if (!isPlaying.value) {
    playAudio();
  } else {
    pauseAudio();
  }
};

const playAudio = () => {
  if (audioRef.value) {
    audioRef.value.play().then(() => {
      isPlaying.value = true;
    }).catch(err => {
      console.warn("Audio autoplay blocked or failed:", err);
    });
  }
};

const pauseAudio = () => {
  if (audioRef.value) {
    audioRef.value.pause();
    isPlaying.value = false;
  }
};

const togglePlay = () => {
  if (isPlaying.value) {
    pauseAudio();
  } else {
    playAudio();
  }
};

const updateProgress = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime;
    duration.value = audioRef.value.duration || 0;
    progress.value = duration.value ? (currentTime.value / duration.value) * 100 : 0;
  }
};

const seekAudio = (event) => {
  if (audioRef.value && duration.value) {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    audioRef.value.currentTime = percentage * duration.value;
  }
};

// Global click event hook-up for internal links
onMounted(() => {
  document.querySelectorAll('a[href="#listen"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      handleListen();
    });
  });
});
</script>

<template>
  <div class="app-layout" :class="currentPage === 'burakku' ? 'theme-burakku' : 'theme-' + currentArtist">
    <!-- Navbar Navigation -->
    <Navbar />

    <!-- Page Sections -->
    <main class="main-content">
      <template v-if="currentPage === 'burakku'">
        <Burakku />
      </template>
      <template v-else-if="currentPage === 'home'">
        <Hero />
        <MerchCatalog />
        <Highlights v-if="false" />
        <Albums />
      </template>
      <template v-else-if="currentPage === 'store'">
        <MerchCatalog />
      </template>
      <template v-else-if="currentPage === 'product-detail'">
        <ProductDetail />
      </template>
      <template v-else-if="currentPage === 'highlight-detail'">
        <HighlightDetail />
      </template>
    </main>

    <!-- Footer Section -->
    <Footer />

    <!-- Shopping Cart Sidebar Drawer -->
    <CartDrawer />

    <!-- Audio Player (Global Overlay) -->
    <Transition name="slide-up">
      <div v-if="isPlayerVisible" class="music-player-overlay">
        <div class="player-container">
          <div class="player-left">
            <img :src="trackInfo.cover" alt="Track Cover" class="player-cover" />
            <div class="player-meta">
              <h4 class="player-title">{{ trackInfo.title }}</h4>
              <p class="player-artist">{{ trackInfo.artist }} &bull; {{ trackInfo.album }}</p>
            </div>
          </div>

          <div class="player-center">
            <!-- Controls -->
            <div class="player-controls">
              <!-- Play / Pause -->
              <button @click="togglePlay" class="play-pause-btn" aria-label="Toggle Play">
                <svg v-if="isPlaying" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.5" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
                <svg v-else viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.5" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
            </div>

            <!-- Progress Bar -->
            <div class="player-progress-container">
              <span class="player-time">{{ formatTime(currentTime) }}</span>
              <div class="progress-bar-wrapper" @click="seekAudio">
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
                </div>
              </div>
              <span class="player-time">{{ formatTime(duration) }}</span>
            </div>
          </div>

          <div class="player-right">
            <!-- Close button -->
            <button @click="isPlayerVisible = false; pauseAudio();" class="close-player-btn" aria-label="Close Player">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Hidden HTML5 Audio Element -->
    <audio 
      ref="audioRef" 
      :src="trackInfo.src" 
      @timeupdate="updateProgress" 
      @loadedmetadata="updateProgress"
      @ended="isPlaying = false; progress = 0; currentTime = 0;"
    ></audio>
  </div>
</template>

<style>
/* Global CSS variables & layout imports */
body {
  margin: 0;
  padding-top: 0;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-dark);
}

.main-content {
  flex: 1;
}

/* Floating Glass Music Player */
.music-player-overlay {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 760px;
  background: rgba(12, 14, 18, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 42, 109, 0.25);
  border-radius: 20px;
  padding: 16px 24px;
  z-index: 9999;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 42, 109, 0.15);
}

.player-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

@media (max-width: 576px) {
  .player-container {
    flex-direction: column;
    gap: 16px;
  }
}

.player-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 200px;
}

@media (max-width: 576px) {
  .player-left {
    min-width: 100%;
    justify-content: center;
  }
}

.player-cover {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.player-meta {
  display: flex;
  flex-direction: column;
}

.player-title {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.player-artist {
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin: 0;
}

.player-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.play-pause-btn {
  background: var(--accent-cyan);
  color: #ffffff;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-smooth);
  box-shadow: 0 4px 10px rgba(255, 42, 109, 0.3);
}

.play-pause-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(255, 42, 109, 0.5);
  background-color: var(--accent-cyan-hover);
}

.player-progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.player-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-family: monospace;
  min-width: 35px;
}

.progress-bar-wrapper {
  flex: 1;
  height: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.progress-bar-bg {
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  transition: var(--transition-smooth);
}

.progress-bar-wrapper:hover .progress-bar-bg {
  height: 6px;
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--accent-cyan);
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(255, 42, 109, 0.6);
  width: 0%;
}

.player-right {
  display: flex;
  align-items: center;
}

@media (max-width: 576px) {
  .player-right {
    position: absolute;
    top: 12px;
    right: 12px;
  }
}

.close-player-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.close-player-btn:hover {
  color: var(--text-primary);
  background-color: rgba(255, 255, 255, 0.05);
}

/* Slide Up Transition for Player Overlay */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translate(-50%, 100%) scale(0.9);
  opacity: 0;
}
</style>
