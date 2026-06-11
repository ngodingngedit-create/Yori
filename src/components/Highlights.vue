<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { navigateTo } from '../routerState.js';

// Cards mapped 1-to-1 with files in /public/highlight/
const highlights = [
  {
    id: 1,
    year: '2024',
    type: 'Netflix Original Film',
    title: 'LUPA DARATAN',
    role: "as 'Dina'",
    media: '/highlight/lupadarat.webp',
    mediaType: 'image',
    icon: 'film'
  },
  {
    id: 2,
    year: '2024',
    type: 'Starring at Movie',
    title: 'KAKA BOSS',
    role: "Movies as 'Jennie'",
    media: '/highlight/kakabos.mp4',
    mediaType: 'video',
    icon: 'video'
  },
  {
    id: 3,
    year: '2023',
    type: 'Brand Ambassador',
    title: 'Lokapala',
    role: 'MOBA Games',
    media: '/highlight/lokapala.jpg',
    mediaType: 'image',
    icon: 'gamepad'
  },
  {
    id: 4,
    year: '2023',
    type: 'Starring at Series',
    title: 'Bardion',
    role: 'Superhero Series',
    media: '/highlight/bardion.jpg',
    mediaType: 'image',
    icon: 'tv'
  },
  {
    id: 5,
    year: '2025',
    type: '1st Album & Showcase',
    title: '21 GRAMS',
    role: '"The Anti Climax Act I"',
    media: '/highlight/21gram.jpg',
    mediaType: 'image',
    icon: 'music'
  },
  {
    id: 6,
    year: '2024',
    type: 'Live Session',
    title: 'SESI DENGAR',
    role: 'Intimate Acoustic Set',
    media: '/highlight/sesidengar.jpg',
    mediaType: 'image',
    icon: 'music'
  },
  {
    id: 7,
    year: '2024',
    type: 'Music Festival',
    title: 'PESTAPORA',
    role: 'Main Stage Performance',
    media: '/highlight/pestapora.webp',
    mediaType: 'image',
    icon: 'music'
  }
];

const carouselTrack = ref(null);

const handleTrackScroll = () => {
  if (!carouselTrack.value) return;
  const track = carouselTrack.value;
  const trackWidth = track.offsetWidth;
  const trackCenter = track.scrollLeft + trackWidth / 2;
  const cards = track.querySelectorAll('.highlight-card');

  cards.forEach((card) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(cardCenter - trackCenter);
    const referenceDistance = card.offsetWidth + 28;
    const ratio = Math.min(distance / referenceDistance, 1);
    const t = (1 + Math.cos(ratio * Math.PI)) / 2;
    const scale = 0.88 + t * (1.06 - 0.88);
    const opacity = 0.5 + t * (1 - 0.5);
    card.style.transform = `scale(${scale})`;
    card.style.opacity = opacity;
  });
};

const openHighlight = (item, index) => {
  navigateTo('highlight-detail', null, null, item);
};

const centerCard = (index) => {
  if (!carouselTrack.value) return;
  const track = carouselTrack.value;
  const cards = track.querySelectorAll('.highlight-card');
  const targetCard = cards[index];
  if (targetCard) {
    const scrollPosition = targetCard.offsetLeft - (track.offsetWidth - targetCard.offsetWidth) / 2;
    track.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }
};

let resizeTimeout = null;
const handleResize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleTrackScroll, 100);
};

onMounted(() => {
  if (carouselTrack.value) {
    const track = carouselTrack.value;
    const cards = track.querySelectorAll('.highlight-card');
    if (cards.length > 2) {
      setTimeout(() => {
        const targetCard = cards[Math.floor(cards.length / 2)];
        const scrollPosition = targetCard.offsetLeft - (track.offsetWidth - targetCard.offsetWidth) / 2;
        track.scrollLeft = scrollPosition;
        handleTrackScroll();
      }, 150);
    } else {
      setTimeout(handleTrackScroll, 150);
    }
  }
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  clearTimeout(resizeTimeout);
});
</script>

<template>
  <section id="highlights" class="highlights-section section">
    <div class="highlights-container container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">HIGHLIGHTS</h2>
      </div>

      <!-- Carousel Track -->
      <div class="carousel-viewport">
        <div class="carousel-track" ref="carouselTrack" @scroll="handleTrackScroll">
          <div
            v-for="(item, index) in highlights"
            :key="item.id"
            class="highlight-card"
            :class="'tint-' + (index % 7)"
            @click="openHighlight(item, index)"
          >
            <!-- Background: video or image -->
            <video
              v-if="item.mediaType === 'video'"
              :src="item.media"
              class="card-bg-media"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>
            <img
              v-else
              :src="item.media"
              :alt="item.title"
              class="card-bg-media"
            />

            <!-- Colored Tint Overlay -->
            <div class="card-tint-overlay"></div>

            <!-- Dark Vignette Overlay -->
            <div class="card-vignette-overlay"></div>

            <!-- Year Badge -->
            <div class="card-year-badge">{{ item.year }}</div>

            <!-- Center Play / View Button -->
            <div class="card-play-button">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <polygon points="7 4 21 12 7 20 7 4"></polygon>
              </svg>
            </div>

            <!-- Frosted Glass Bottom Banner -->
            <div class="card-glass-banner">
              <p class="card-banner-type">{{ item.type }}</p>
              <h3 class="card-banner-title">{{ item.title }}</h3>
              <p class="card-banner-subtitle">{{ item.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.highlights-section {
  background-color: var(--bg-dark);
  position: relative;
  z-index: 10;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.section-title {
  margin-bottom: 0 !important;
}

/* Carousel viewport + scrollable track */
.carousel-viewport {
  width: 100%;
  overflow: visible;
}

.carousel-track {
  --card-width: 300px;
  --card-gap: 24px;
  display: flex;
  gap: var(--card-gap);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-top: 30px;
  padding-bottom: 40px;
  padding-left: calc(50% - var(--card-width) / 2);
  padding-right: calc(50% - var(--card-width) / 2);
  align-items: center;
  -webkit-overflow-scrolling: touch;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

/* ─── Highlight Card ──────────────────────────────── */
.highlight-card {
  position: relative;
  flex: 0 0 var(--card-width);
  height: 440px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
  scroll-snap-align: center;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
              opacity 0.25s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  will-change: transform, opacity;
  cursor: pointer;
}

/* Per-card tint palettes (7 total) */
.highlight-card.tint-0 { --tint-color: rgba(0, 180, 216, 0.45); --glow-color: rgba(0, 180, 216, 0.6); }
.highlight-card.tint-1 { --tint-color: rgba(255, 42, 109, 0.45); --glow-color: rgba(255, 42, 109, 0.6); }
.highlight-card.tint-2 { --tint-color: rgba(0, 245, 153, 0.4);  --glow-color: rgba(0, 245, 153, 0.6); }
.highlight-card.tint-3 { --tint-color: rgba(255, 154, 60, 0.45); --glow-color: rgba(255, 154, 60, 0.6); }
.highlight-card.tint-4 { --tint-color: rgba(138, 43, 226, 0.45); --glow-color: rgba(138, 43, 226, 0.6); }
.highlight-card.tint-5 { --tint-color: rgba(255, 220, 0, 0.38);  --glow-color: rgba(255, 220, 0, 0.55); }
.highlight-card.tint-6 { --tint-color: rgba(0, 200, 255, 0.38);  --glow-color: rgba(0, 200, 255, 0.55); }

/* Background image / video (shared) */
.card-bg-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  pointer-events: none;
}

/* Tint overlay */
.card-tint-overlay {
  position: absolute;
  inset: 0;
  background-color: var(--tint-color);
  mix-blend-mode: color-burn;
  z-index: 2;
  pointer-events: none;
}

/* Vignette overlay */
.card-vignette-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(15, 17, 26, 0.15) 0%,
    rgba(15, 17, 26, 0.35) 45%,
    rgba(15, 17, 26, 0.94) 100%
  );
  z-index: 3;
  pointer-events: none;
}

/* Year badge */
.card-year-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 5;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 3px 12px;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
}

/* Play button */
.card-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  z-index: 4;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              opacity 0.3s ease,
              box-shadow 0.3s ease;
}

.card-play-button svg {
  transform: translateX(1.5px);
}

.highlight-card:hover .card-play-button {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) scale(1);
}

.card-play-button:hover {
  transform: translate(-50%, -50%) scale(1.15) !important;
  box-shadow: 0 0 28px var(--glow-color);
}

/* Glass bottom banner */
.card-glass-banner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  padding: 12px 14px 14px;
  border-bottom-left-radius: 23px;
  border-bottom-right-radius: 23px;
  text-align: center;
  box-sizing: border-box;
  gap: 2px;
}

.card-banner-type {
  font-size: 0.68rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.card-banner-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: -0.3px;
  line-height: 1.2;
}

.card-banner-subtitle {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.78);
  font-weight: 500;
  margin: 0;
}

/* ─── Responsive ─────────────────────────────────── */
@media (max-width: 1024px) {
  .carousel-track {
    --card-width: 280px;
    --card-gap: 22px;
  }
  .highlight-card {
    height: 420px;
  }
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: 28px;
  }
  .carousel-track {
    --card-width: 260px;
    --card-gap: 18px;
    padding-top: 18px;
    padding-bottom: 28px;
  }
  .highlight-card {
    height: 380px;
  }
  .card-banner-title {
    font-size: 1.18rem;
  }
}

@media (max-width: 576px) {
  .carousel-track {
    --card-width: 220px;
    --card-gap: 14px;
    padding-top: 14px;
    padding-bottom: 22px;
  }
  .highlight-card {
    height: 330px;
    border-radius: 18px;
  }
  .card-play-button {
    width: 44px;
    height: 44px;
  }
  .card-play-button svg {
    width: 14px;
    height: 14px;
  }
  .card-glass-banner {
    padding: 10px 12px;
    border-bottom-left-radius: 17px;
    border-bottom-right-radius: 17px;
  }
  .card-banner-title {
    font-size: 1.05rem;
  }
  .card-banner-subtitle {
    font-size: 0.75rem;
  }
  .card-year-badge {
    font-size: 0.65rem;
    padding: 2px 9px;
  }
}

@media (max-width: 380px) {
  .carousel-track {
    --card-width: 190px;
    --card-gap: 12px;
  }
  .highlight-card {
    height: 300px;
  }
  .card-banner-title {
    font-size: 0.95rem;
  }
}
</style>
