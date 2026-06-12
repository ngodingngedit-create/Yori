<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
import { currentArtist } from '../routerState.js';
import { artistData } from '../artistData.js';

// ================= 90 HORSEPOWER ALBUMS DATA CONFIG ================= //
const albums = computed(() => artistData[currentArtist.value].albums);

const activeAlbum = ref(null);
const isPlayerVisible = ref(false);
const currentPlayingTrack = ref(null);
const isMediaPlaying = ref(false);

const playAlbum = (album) => {
  activeAlbum.value = album;
  isPlayerVisible.value = true;
  currentPlayingTrack.value = album.tracks[0];
  isMediaPlaying.value = false;
};

const closePlayer = () => {
  isPlayerVisible.value = false;
};

const playTrack = (track) => {
  currentPlayingTrack.value = track;
  isMediaPlaying.value = true;
};

const playPreviousTrack = () => {
  if (!activeAlbum.value || !activeAlbum.value.tracks.length) return;
  const currentIndex = activeAlbum.value.tracks.findIndex(
    t => t.title === currentPlayingTrack.value?.title
  );
  if (currentIndex > 0) {
    currentPlayingTrack.value = activeAlbum.value.tracks[currentIndex - 1];
  } else {
    currentPlayingTrack.value = activeAlbum.value.tracks[activeAlbum.value.tracks.length - 1];
  }
  isMediaPlaying.value = true;
};

const playNextTrack = () => {
  if (!activeAlbum.value || !activeAlbum.value.tracks.length) return;
  const currentIndex = activeAlbum.value.tracks.findIndex(
    t => t.title === currentPlayingTrack.value?.title
  );
  if (currentIndex < activeAlbum.value.tracks.length - 1) {
    currentPlayingTrack.value = activeAlbum.value.tracks[currentIndex + 1];
  } else {
    currentPlayingTrack.value = activeAlbum.value.tracks[0];
  }
  isMediaPlaying.value = true;
};

const toggleSaved = () => {
  if (activeAlbum.value) {
    activeAlbum.value.isSaved = !activeAlbum.value.isSaved;
  }
};

watch(isPlayerVisible, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <!-- ================= 90 HORSEPOWER ALBUMS SECTION ================= -->
  <section id="albums" class="albums-section section">
    <div class="albums-container container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">ALBUMS</h2>
      </div>

      <!-- Album Grid (5 columns on desktop) -->
      <div class="album-grid">
        <div 
          v-for="album in albums" 
          :key="album.id" 
          class="album-card"
          @click="playAlbum(album)"
        >
          <!-- Cover Artwork -->
          <div class="album-cover-wrapper">
            <img :src="album.image" :alt="album.title" class="album-cover-img" />
            <!-- Hover Overlay -->
            <div class="album-card-overlay">
              <div class="play-indicator">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <polygon points="8 5 19 12 8 19 8 5"></polygon>
                </svg>
              </div>
            </div>
          </div>

          <!-- Title & Metadata -->
          <div class="album-meta">
            <span class="album-type-year">{{ album.type }} &bull; {{ album.year }}</span>
            <h3 class="album-title">{{ album.title }}</h3>
            <p class="album-artist">{{ album.artist }}</p>
          </div>
        </div>
      </div>

      <!-- Custom Modal Overlay for Album Detail Player -->
      <Teleport to="body">
        <Transition name="fade-scale">
          <div v-if="isPlayerVisible" class="player-modal-overlay" @click.self="closePlayer">
            <div class="player-modal-content" :style="{ '--album-glow': activeAlbum?.glow, '--album-color': activeAlbum?.color }">
              <!-- Close Button -->
              <button class="modal-close-btn" @click="closePlayer" aria-label="Close Player">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <!-- Player Grid (Side-by-side on desktop, stacked on mobile) -->
              <div class="modal-grid">
                <!-- Left side: Album Detail & Info -->
                <div class="modal-player-col">
                  <div class="detail-artwork-wrapper">
                    <img :src="activeAlbum?.image" :alt="activeAlbum?.title" class="detail-artwork-img" />
                  </div>
                  
                  <div class="detail-album-capsules">
                    <span class="detail-capsule">{{ activeAlbum?.type }}</span>
                    <span class="detail-capsule">{{ activeAlbum?.year }}</span>
                  </div>

                  <h3 class="detail-album-title">{{ activeAlbum?.title }}</h3>
                  <p class="detail-album-artist">{{ activeAlbum?.artist }}</p>

                  <!-- Spotify CTA Play button -->
                  <a 
                    :href="activeAlbum?.spotifyUrl" 
                    target="_blank" 
                    class="spotify-cta-btn"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <polygon points="8 5 19 12 8 19 8 5"></polygon>
                    </svg>
                    <span>PLAY ON SPOTIFY</span>
                  </a>

                  <!-- Player mini controls -->
                  <div class="mini-controls-row">
                    <button 
                      class="mini-control-btn" 
                      @click="playPreviousTrack"
                      aria-label="Previous Track"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
                        <polygon points="19 20 9 12 19 4 19 20" fill="currentColor"></polygon>
                        <line x1="5" y1="4" x2="5" y2="20"></line>
                      </svg>
                    </button>

                    <button 
                      class="mini-control-btn" 
                      @click="playNextTrack"
                      aria-label="Next Track"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
                        <polygon points="5 4 15 12 5 20 5 4" fill="currentColor"></polygon>
                        <line x1="19" y1="4" x2="19" y2="20"></line>
                      </svg>
                    </button>

                    <button 
                      class="mini-control-btn" 
                      :class="{ 'is-saved': activeAlbum?.isSaved }"
                      @click="toggleSaved"
                      aria-label="Save to Library"
                    >
                      <svg v-if="activeAlbum?.isSaved" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <svg v-else viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Right side: Tracklist/Spotify Embed, Listen On, Stay Connected -->
                <div class="modal-info-col">
                  <!-- Tracklist Scroll Area (YoRI only) -->
                  <div v-if="currentArtist === 'yori'" class="modal-section tracklist-section">
                    <h4 class="modal-section-title">TRACKLIST</h4>
                    
                    <div class="tracklist-container">
                      <div 
                        v-for="(track, idx) in activeAlbum?.tracks" 
                        :key="idx" 
                        class="track-row"
                        :class="{ 'is-playing-row': currentPlayingTrack?.title === track.title }"
                        @click="playTrack(track)"
                      >
                        <span class="track-num">{{ track.num }}</span>
                        <div class="track-info-body">
                          <span class="track-title-text">{{ track.title }}</span>
                          <span class="track-artist-text">{{ track.artist }}</span>
                        </div>
                        <div class="track-actions">
                          <span class="track-duration-text">{{ track.duration }}</span>
                          <div class="row-play-icon">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                              <polygon points="8 5 19 12 8 19 8 5"></polygon>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Spotify Player Embed (90HP only) -->
                  <div v-else class="modal-section spotify-modal-section">
                    <h4 class="modal-section-title">STREAM ARTIST ON SPOTIFY</h4>
                    <div class="spotify-embed-container">
                      <iframe 
                        data-testid="embed-iframe" 
                        style="border-radius:12px" 
                        src="https://open.spotify.com/embed/artist/0Dgmxi8oh7NaL332kwpo3a?utm_source=generator&si=d262de95c75e48fb" 
                        width="100%" 
                        height="352" 
                        frameBorder="0" 
                        allowfullscreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>

                  <!-- Listen On streaming buttons -->
                  <div class="modal-section">
                    <h4 class="modal-section-title">LISTEN ON</h4>
                    <div class="listen-buttons">
                      <a 
                        :href="activeAlbum?.spotifyUrl" 
                        target="_blank" 
                        class="listen-btn spotify-btn"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.076-.67-.135-.747-.472-.077-.336.136-.67.472-.747 3.844-.877 7.14-.5 9.82 1.14.296.18.387.563.207.86zm1.226-2.723c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.078-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.665-1.112 8.232-.572 11.347 1.343.367.227.487.708.26 1.074zm.106-2.833C14.444 8.766 8.7 8.577 5.372 9.587c-.53.16-1.09-.142-1.25-.672-.16-.53.142-1.09.672-1.25 3.818-1.16 10.15-.94 14.164 1.442.477.285.632.9.347 1.378-.285.477-.9.632-1.378.347z"/>
                        </svg>
                        <span>Spotify</span>
                      </a>

                      <a 
                        :href="activeAlbum?.appleMusicUrl" 
                        target="_blank" 
                        class="listen-btn apple-btn"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.5-.63.73-1.18 1.87-1.03 2.98 1.12.09 2.25-.61 2.96-1.42z"/>
                        </svg>
                        <span>Apple</span>
                      </a>
                    </div>
                  </div>

                  <!-- Stay Connected Follow Icons -->
                  <div class="modal-section">
                    <h4 class="modal-section-title">STAY CONNECTED</h4>
                    <div class="social-icons">
                      <a href="https://instagram.com" target="_blank" class="social-icon-btn" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>

                      <a href="https://x.com" target="_blank" class="social-icon-btn" aria-label="X">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>

                      <a href="https://youtube.com" target="_blank" class="social-icon-btn" aria-label="YouTube">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </section>
</template>

<style scoped>
.albums-section {
  background-color: var(--bg-dark);
  position: relative;
  z-index: 10;
}

.spotify-embed-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 12px;
  border-radius: 12px;
  background: rgba(30, 30, 32, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.section-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

/* 5 columns album cards grid on desktop */
.album-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
}

.album-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.album-cover-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.album-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1);
}

.album-card-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(15, 17, 26, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: 2;
  transition: opacity 0.3s ease;
}

.play-indicator {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  transform: scale(0.85);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.play-indicator svg {
  transform: translateX(1px);
}

/* Card hover reactions */
.album-card:hover .album-cover-img {
  transform: scale(1.05);
}

.album-card:hover .album-card-overlay {
  opacity: 1;
}

.album-card:hover .play-indicator {
  transform: scale(1);
}

.album-card:hover .album-cover-wrapper {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 15px var(--accent-glow, rgba(0, 245, 153, 0.25));
}

/* Metadata formatting */
.album-meta {
  margin-top: 14px;
}

.album-type-year {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 4px;
}

.album-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 3px 0;
  line-height: 1.25;
  letter-spacing: -0.2px;
}

.album-artist {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 500;
  margin: 0;
}

/* Modal overlay styling */
.player-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(5, 6, 8, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 999999;
  padding: 40px 24px;
  overflow-y: auto;
}

.player-modal-content {
  margin: auto;
  background: rgba(18, 16, 22, 0.85); /* Dark clean carbon base */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  width: 100%;
  max-width: 960px; /* Wider card */
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), 0 0 50px var(--album-glow, rgba(0, 245, 153, 0.2));
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}

.modal-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  z-index: 10;
}

.modal-close-btn:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.08);
}

/* Modal Grid split layout */
.modal-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: stretch;
}

/* Left side columns */
.modal-player-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.25); /* Dark split section */
  padding: 48px 48px 40px 48px;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  box-sizing: border-box;
}

.detail-artwork-wrapper {
  width: 260px;
  height: 260px;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
  transition: transform 0.3s ease;
}

.detail-artwork-wrapper:hover {
  transform: scale(1.02);
}

.detail-artwork-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-album-capsules {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: center;
}

.detail-capsule {
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 999px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.detail-album-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 900;
  font-style: italic; /* Bold slanted styling */
  color: #ffffff;
  margin: 0 0 6px 0;
  letter-spacing: -0.5px;
  line-height: 1.1;
  text-transform: capitalize;
}

.detail-album-artist {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  margin: 0 0 28px 0;
  letter-spacing: 0.5px;
}

/* Play Spotify Button CTA */
.spotify-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 999px;
  padding: 12px 32px;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
  width: fit-content;
  border: none;
  cursor: pointer;
}

.spotify-cta-btn svg {
  fill: #000000;
  transition: transform 0.3s ease;
}

.spotify-cta-btn:hover {
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0 0 25px var(--album-color, rgba(0, 245, 153, 0.6));
  transform: translateY(-2px) scale(1.02);
}

.spotify-cta-btn:hover svg {
  transform: scale(1.1);
}

/* Mini controller row */
.mini-controls-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.mini-control-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mini-control-btn svg {
  transition: transform 0.3s ease;
}

.mini-control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
  transform: scale(1.08);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.mini-control-btn:hover svg {
  transform: scale(1.05);
}

.mini-control-btn.is-saved {
  background: var(--album-color, var(--accent-cyan));
  border-color: var(--album-color, var(--accent-cyan));
  color: #000000;
}

.mini-control-btn.is-saved:hover {
  box-shadow: 0 0 15px var(--album-color, var(--accent-cyan));
}

/* Right side details */
.modal-info-col {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 48px 48px 40px 48px;
  box-sizing: border-box;
  justify-content: space-between;
}

.modal-section {
  display: flex;
  flex-direction: column;
}

.modal-section-title {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  margin: 0 0 16px 0;
  border: none;
  padding-bottom: 0;
}

/* Tracklist scrolling container */
.tracklist-container {
  max-height: 270px;
  overflow-y: auto;
  padding-right: 12px;
  display: flex;
  flex-direction: column;
}

/* Custom scrollbar */
.tracklist-container::-webkit-scrollbar {
  width: 4px;
}
.tracklist-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 2px;
}
.tracklist-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
.tracklist-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* Track row styling */
.track-row {
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.25s ease;
  cursor: pointer;
  background: transparent;
}

.track-row:hover .track-title-text {
  color: var(--album-color, var(--accent-cyan));
}

.track-row:hover .track-num {
  color: var(--album-color, var(--accent-cyan));
}

.track-row:hover .row-play-icon {
  opacity: 1;
  transform: scale(1);
}

.track-row:hover .track-duration-text {
  opacity: 0;
}

.track-num {
  font-family: monospace;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.3);
  width: 32px;
  font-weight: 600;
  transition: color 0.2s ease;
}

.track-info-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 3px;
}

.track-title-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  transition: color 0.2s ease;
  line-height: 1.2;
}

.track-artist-text {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
}

.track-actions {
  position: relative;
  width: 44px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.track-duration-text {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.4);
  transition: opacity 0.2s ease;
  font-family: monospace;
}

.row-play-icon {
  position: absolute;
  right: 0;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.2s ease, transform 0.2s ease;
  color: var(--album-color, var(--accent-cyan));
  display: flex;
  align-items: center;
}

.is-playing-row {
  border-bottom-color: rgba(255, 255, 255, 0.12);
}

.is-playing-row .track-title-text {
  color: var(--album-color, var(--accent-cyan)) !important;
}

.is-playing-row .track-num {
  color: var(--album-color, var(--accent-cyan)) !important;
}

/* Listen On streaming buttons */
.listen-buttons {
  display: flex;
  gap: 16px;
}

.listen-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 12px;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  cursor: pointer;
}

.spotify-btn:hover {
  background: rgba(30, 215, 96, 0.06);
  border-color: #1ed760;
  color: #1ed760;
  box-shadow: 0 0 20px rgba(30, 215, 96, 0.15);
  transform: translateY(-2px);
}

.apple-btn:hover {
  background: rgba(252, 60, 68, 0.06);
  border-color: #fc3c44;
  color: #fc3c44;
  box-shadow: 0 0 20px rgba(252, 60, 68, 0.15);
  transform: translateY(-2px);
}

/* Stay Connected Follow Icons */
.social-icons {
  display: flex;
  gap: 12px;
}

.social-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  cursor: pointer;
}

.social-icon-btn:hover {
  color: var(--album-color, var(--accent-cyan));
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--album-color, var(--accent-cyan));
  box-shadow: 0 0 15px var(--album-color, rgba(0, 245, 153, 0.25));
  transform: translateY(-3px);
}

/* Modal Slide & Fade Transitions */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Responsive Grid Adjustments */
@media (max-width: 1200px) {
  .album-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}

@media (max-width: 992px) {
  .album-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {

  .album-grid {
    gap: 16px;
  }

  .album-title {
    font-size: 1rem;
  }

  .player-modal-content {
    max-width: 480px;
    border-radius: 20px;
  }

  .modal-grid {
    grid-template-columns: 1fr;
  }

  .modal-player-col {
    padding: 32px 24px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .modal-info-col {
    padding: 32px 24px;
    gap: 24px;
  }

  .detail-artwork-wrapper {
    width: 200px;
    height: 200px;
    margin-bottom: 16px;
  }

  .detail-album-title {
    font-size: 1.8rem;
  }

  .spotify-cta-btn {
    width: 100%;
    margin-bottom: 20px;
  }

  .tracklist-container {
    max-height: 220px;
  }

  .listen-buttons {
    flex-direction: row;
  }
}

@media (max-width: 576px) {

  .album-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .album-cover-wrapper {
    border-radius: 12px;
  }

  .album-meta {
    margin-top: 10px;
  }

  .album-title {
    font-size: 0.95rem;
  }

  .album-type-year {
    font-size: 0.65rem;
  }

  .album-artist {
    font-size: 0.78rem;
  }
}

@media (max-width: 480px) {
  .listen-buttons {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
