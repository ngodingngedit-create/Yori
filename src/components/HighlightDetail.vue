<script setup>
import { ref, computed } from 'vue';
import { selectedHighlight, navigateTo } from '../routerState.js';

// Full highlights data (same as Highlights.vue — single source of truth in a real app)
const allHighlights = [
  {
    id: 1,
    year: '2024',
    type: 'Netflix Original Film',
    title: 'LUPA DARATAN',
    role: "as 'Dina'",
    media: '/highlight/lupadarat.webp',
    mediaType: 'image',
    category: 'Film',
    platform: 'Netflix',
    description: 'Membawakan peran Dina dalam film orisinal Netflix bertajuk "Lupa Daratan" — sebuah kisah tentang identitas, kerinduan, dan pencarian jati diri di tengah dua budaya yang berbeda.',
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
    category: 'Film',
    platform: 'Bioskop',
    description: 'Berperan sebagai Jennie dalam film komedi drama "Kaka Boss" — karakter yang penuh semangat, tegar, dan menghadirkan nuansa segar di tengah dinamika persahabatan dan karier.',
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
    category: 'Gaming',
    platform: 'PC, Mobile',
    description: 'Bergabung sebagai voice actress untuk karakter di game Lokapala, membawa karakter dengan suara yang penuh semangat dan emosi.',
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
    category: 'Series',
    platform: 'Streaming',
    description: 'Tampil sebagai salah satu karakter utama dalam serial superhero "Bardion" — sebuah kisah fiksi ilmiah yang memadukan aksi, emosi, dan identitas heroik.',
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
    category: 'Music',
    platform: 'Streaming, Live',
    description: 'Album perdana bertajuk "21 Grams — The Anti Climax Act I" hadir sebagai pernyataan artistik yang jujur, mengeksplorasi tema kehilangan, pertumbuhan, dan penerimaan.',
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
    category: 'Music',
    platform: 'Live Event',
    description: 'Sesi akustik intim yang menghadirkan YoRi dalam format stripped-down — menyajikan lagu-lagu dengan kedalaman emosi dan keintiman yang jarang terasa di panggung besar.',
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
    category: 'Festival',
    platform: 'Jakarta',
    description: 'Penampilan perdana di panggung utama Pestapora — salah satu festival musik terbesar Indonesia — yang memperkenalkan YoRi kepada ribuan penonton baru.',
    icon: 'music'
  }
];

// Active highlight — fall back to first if none selected
const highlight = computed(() => {
  const h = selectedHighlight.value;
  if (!h) return allHighlights[2]; // default: Lokapala
  return allHighlights.find(i => i.id === h.id) || allHighlights[2];
});

// Other highlights for the "MORE HIGHLIGHTS" carousel
const otherHighlights = computed(() =>
  allHighlights.filter(h => h.id !== highlight.value.id)
);

const isPlaying = ref(false);
const videoRef = ref(null);

const togglePlay = () => {
  if (!videoRef.value) return;
  if (isPlaying.value) {
    videoRef.value.pause();
    isPlaying.value = false;
  } else {
    videoRef.value.play();
    isPlaying.value = true;
  }
};

const openHighlight = (item) => {
  navigateTo('highlight-detail', null, null, item);
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
  } catch {}
};

// Tint palette per index
const tintColors = [
  'rgba(0,180,216,0.45)',
  'rgba(255,42,109,0.45)',
  'rgba(0,245,153,0.4)',
  'rgba(255,154,60,0.45)',
  'rgba(138,43,226,0.45)',
  'rgba(255,220,0,0.38)',
  'rgba(0,200,255,0.38)'
];
const getTint = (index) => tintColors[index % tintColors.length];

// Meta fields
const metaFields = computed(() => [
  { icon: 'calendar', label: 'TAHUN',    value: highlight.value.year },
  { icon: 'user',     label: 'PERAN',    value: highlight.value.role.replace(/^"|"$/g, '').replace(/^as '|'$/g, '') },
  { icon: 'tag',      label: 'KATEGORI', value: highlight.value.category },
  { icon: 'link',     label: 'PLATFORM', value: highlight.value.platform }
]);
</script>

<template>
  <section class="hd-section">
    <div class="hd-container container">

      <!-- Breadcrumbs -->
      <nav class="hd-breadcrumbs" aria-label="breadcrumb">
        <button class="bc-link" @click="navigateTo('home')">ARTIST</button>
        <span class="bc-sep">›</span>
        <button class="bc-link" @click="navigateTo('home', '#highlights')">HIGHLIGHTS</button>
        <span class="bc-sep">›</span>
        <span class="bc-active">{{ highlight.title }}</span>
      </nav>

      <!-- Main two-column grid -->
      <div class="hd-grid">

        <!-- ── Left: media card ── -->
        <div class="hd-media-col">
          <div class="hd-media-frame">
            <!-- Video -->
            <video
              v-if="highlight.mediaType === 'video'"
              ref="videoRef"
              :src="highlight.media"
              class="hd-media"
              muted
              loop
              playsinline
              preload="metadata"
              @click="togglePlay"
            ></video>
            <!-- Image -->
            <img
              v-else
              :src="highlight.media"
              :alt="highlight.title"
              class="hd-media"
            />

            <!-- Vignette -->
            <div class="hd-vignette"></div>

            <!-- Play button (shown always for video, on hover for image) -->
            <button
              v-if="highlight.mediaType === 'video'"
              class="hd-play-btn"
              :class="{ 'is-playing': isPlaying }"
              @click="togglePlay"
              aria-label="Play / Pause"
            >
              <svg v-if="!isPlaying" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <polygon points="7 4 21 12 7 20 7 4"></polygon>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
              <span>{{ isPlaying ? 'PAUSE' : 'PLAY VIDEO' }}</span>
            </button>
            <div v-else class="hd-play-btn hd-play-img">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <polygon points="7 4 21 12 7 20 7 4"></polygon>
              </svg>
              <span>PLAY VIDEO</span>
            </div>

            <!-- Tag pill -->
            <span class="hd-tag-pill">{{ highlight.role }}</span>
          </div>
        </div>

        <!-- ── Right: info panel ── -->
        <div class="hd-info-col">
          <h1 class="hd-title">{{ highlight.title }}</h1>
          <p class="hd-type">{{ highlight.type }}</p>
          <p class="hd-desc">{{ highlight.description }}</p>

          <!-- Divider -->
          <div class="hd-divider"></div>

          <!-- Meta list -->
          <ul class="hd-meta-list">
            <li v-for="f in metaFields" :key="f.label" class="hd-meta-item">
              <!-- Icon -->
              <span class="hd-meta-icon">
                <svg v-if="f.icon === 'calendar'" viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <svg v-else-if="f.icon === 'user'" viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <svg v-else-if="f.icon === 'tag'" viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <svg v-else viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </span>
              <span class="hd-meta-label">{{ f.label }}</span>
              <span class="hd-meta-value">{{ f.value }}</span>
            </li>
          </ul>

          <!-- Divider -->
          <div class="hd-divider"></div>

          <!-- Share row -->
          <div class="hd-share-row">
            <span class="hd-share-label">SHARE</span>
            <!-- Facebook -->
            <a
              :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`"
              target="_blank" rel="noopener"
              class="hd-share-btn" aria-label="Share on Facebook"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <!-- X / Twitter -->
            <a
              :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(highlight.title)}`"
              target="_blank" rel="noopener"
              class="hd-share-btn" aria-label="Share on X"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>
              </svg>
            </a>
            <!-- Copy link -->
            <button class="hd-share-btn" @click="copyLink" aria-label="Copy link">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- ── MORE HIGHLIGHTS carousel ── -->
      <div class="more-section">
        <div class="more-header">
          <h2 class="more-title">
            MORE HIGHLIGHTS
            <span class="more-plus">+</span>
          </h2>
          <div class="more-nav">
            <button class="more-nav-btn" @click="$refs.moreTrack.scrollBy({ left: -296, behavior: 'smooth' })" aria-label="Previous">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button class="more-nav-btn" @click="$refs.moreTrack.scrollBy({ left: 296, behavior: 'smooth' })" aria-label="Next">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div class="more-track" ref="moreTrack">
          <div
            v-for="(item, idx) in otherHighlights"
            :key="item.id"
            class="more-card"
            @click="openHighlight(item)"
            :style="{ '--tint': getTint(idx) }"
          >
            <!-- media -->
            <div class="more-card-media">
              <video
                v-if="item.mediaType === 'video'"
                :src="item.media"
                class="more-card-img"
                muted autoplay loop playsinline preload="metadata"
              ></video>
              <img
                v-else
                :src="item.media"
                :alt="item.title"
                class="more-card-img"
              />
              <div class="more-card-tint"></div>
              <div class="more-card-vignette"></div>
            </div>
            <!-- caption -->
            <div class="more-card-caption">
              <p class="more-card-title">{{ item.title }}</p>
              <p class="more-card-sub">{{ item.type }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Section wrapper ─────────────────────────────── */
.hd-section {
  background-color: var(--bg-dark);
  padding: 120px 0 80px;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .hd-section {
    padding: 100px 0 60px;
  }
}

/* ── Breadcrumbs ─────────────────────────────────── */
.hd-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-heading);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.bc-link {
  background: none;
  border: none;
  padding: 0;
  color: var(--accent-cyan);
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  transition: opacity 0.2s;
}
.bc-link:hover { opacity: 0.75; }

.bc-sep {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.bc-active {
  color: var(--text-secondary);
}

/* ── Two-column grid ─────────────────────────────── */
.hd-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 48px;
  align-items: start;
  margin-bottom: 64px;
}

@media (max-width: 992px) {
  .hd-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 48px;
  }
}

/* ── Media column ────────────────────────────────── */
.hd-media-col {
  width: 100%;
}

.hd-media-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  border-radius: 20px;
  overflow: hidden;
  background: #0d0e14;
  border: 1px solid rgba(255,255,255,0.07);
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
}

@media (max-width: 576px) {
  .hd-media-frame {
    aspect-ratio: 4/3;
    border-radius: 14px;
  }
}

.hd-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hd-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(10,11,17,0.85) 100%
  );
  z-index: 2;
  pointer-events: none;
}

/* Play button */
.hd-play-btn {
  position: absolute;
  bottom: 18px;
  left: 18px;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 999px;
  background: rgba(255,255,255,0.14);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.22);
  color: #fff;
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.hd-play-btn.hd-play-img {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.hd-media-frame:hover .hd-play-img {
  opacity: 1;
}

.hd-play-btn:hover,
.hd-play-btn.is-playing {
  background: rgba(255,42,109,0.28);
  border-color: rgba(255,42,109,0.5);
  box-shadow: 0 0 18px rgba(255,42,109,0.25);
}

/* Tag pill */
.hd-tag-pill {
  position: absolute;
  bottom: 18px;
  right: 18px;
  z-index: 4;
  background: rgba(255,255,255,0.10);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 999px;
  padding: 5px 14px;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.5px;
}

/* ── Info column ─────────────────────────────────── */
.hd-info-col {
  display: flex;
  flex-direction: column;
}

.hd-title {
  font-family: var(--font-heading);
  font-size: 2.6rem;
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1.15;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
}

@media (max-width: 576px) {
  .hd-title { font-size: 2rem; }
}

.hd-type {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent-cyan);
  margin: 0 0 18px;
  letter-spacing: 0.3px;
}

.hd-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0 0 4px;
}

/* Divider */
.hd-divider {
  width: 100%;
  height: 1px;
  background: var(--border-card);
  margin: 22px 0;
}

/* Meta list */
.hd-meta-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.hd-meta-item {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.88rem;
}

.hd-meta-icon {
  color: var(--accent-cyan);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 18px;
}

.hd-meta-label {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: var(--text-muted);
  min-width: 84px;
}

.hd-meta-value {
  color: var(--text-primary);
  font-weight: 500;
}

/* Share row */
.hd-share-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hd-share-label {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: var(--text-muted);
  margin-right: 4px;
}

.hd-share-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--border-card);
  background: transparent;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.22s ease;
}

.hd-share-btn:hover {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  background: rgba(255,42,109,0.06);
  box-shadow: 0 0 12px rgba(255,42,109,0.18);
  transform: translateY(-1px);
}

/* ── More Highlights section ─────────────────────── */
.more-section {
  border-top: 1px solid var(--border-card);
  padding-top: 40px;
}

@media (max-width: 576px) {
  .more-section { padding-top: 28px; }
}

.more-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.more-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: 1px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.more-plus {
  color: var(--accent-cyan);
  font-size: 1.3rem;
  line-height: 1;
}

.more-nav {
  display: flex;
  gap: 8px;
}

.more-nav-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--border-card);
  background: transparent;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.22s ease;
}

.more-nav-btn:hover {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  background: rgba(255,42,109,0.06);
}

/* Scrollable track */
.more-track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;
}

.more-track::-webkit-scrollbar { display: none; }

/* Cards */
.more-card {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.22s ease;
}

.more-card:hover {
  transform: translateY(-4px);
}

@media (max-width: 576px) {
  .more-card { flex: 0 0 160px; }
}

.more-card-media {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 12px;
  overflow: hidden;
  background: #0d0e14;
  border: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 10px;
}

.more-card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.more-card-tint {
  position: absolute;
  inset: 0;
  background-color: var(--tint);
  mix-blend-mode: color-burn;
  z-index: 2;
  pointer-events: none;
}

.more-card-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 30%,
    rgba(10,11,17,0.6) 100%
  );
  z-index: 3;
  pointer-events: none;
}

.more-card:hover .more-card-media {
  box-shadow: 0 8px 24px rgba(0,0,0,0.5), 0 0 16px rgba(255,42,109,0.12);
}

.more-card-caption {
  padding: 0 2px;
}

.more-card-title {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.more-card-sub {
  font-size: 0.73rem;
  color: var(--text-muted);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
