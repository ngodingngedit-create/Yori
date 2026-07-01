<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
import { cart, addToCart, updateQuantity } from '../cartState.js';
import { navigateTo, currentArtist } from '../routerState.js';
import { artistData } from '../artistData.js';

// ===== MERCH (COMBINED) =====
const allProducts = computed(() => {
  const yoriProducts = artistData.yori.products.map(p => ({ ...p, creator: 'YoRI' }));
  const hpProducts = artistData['90hp'].products.map(p => ({ ...p, creator: '90 Horsepower' }));
  return [...yoriProducts, ...hpProducts];
});

const activeCategory = ref('all');
const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') return allProducts.value;
  return allProducts.value.filter(p => p.category === activeCategory.value);
});

const selectedItem = ref(null);
const showSuccessModal = ref(false);

const getProductQuantity = (productId) => {
  const item = cart.value.find(item => item.id === productId);
  return item ? item.quantity : 0;
};

const handleIncrease = (product) => {
  selectedItem.value = product;
  if (getProductQuantity(product.id) === 0) {
    showSuccessModal.value = true;
    setTimeout(() => { showSuccessModal.value = false; }, 2500);
  }
  addToCart(product);
};

const handleDecrease = (product) => {
  updateQuantity(product.id, -1);
};

// ===== ALBUMS (COMBINED) =====
const allAlbums = computed(() => {
  return [
    ...artistData.yori.albums,
    ...artistData['90hp'].albums
  ];
});

const activeAlbum = ref(null);
const isPlayerVisible = ref(false);
const currentPlayingTrack = ref(null);

const playAlbum = (album) => {
  activeAlbum.value = album;
  isPlayerVisible.value = true;
  currentPlayingTrack.value = album.tracks[0];
};

const closePlayer = () => { isPlayerVisible.value = false; };

const playTrack = (track) => { currentPlayingTrack.value = track; };

const playPreviousTrack = () => {
  if (!activeAlbum.value?.tracks.length) return;
  const idx = activeAlbum.value.tracks.findIndex(t => t.title === currentPlayingTrack.value?.title);
  currentPlayingTrack.value = idx > 0
    ? activeAlbum.value.tracks[idx - 1]
    : activeAlbum.value.tracks[activeAlbum.value.tracks.length - 1];
};

const playNextTrack = () => {
  if (!activeAlbum.value?.tracks.length) return;
  const idx = activeAlbum.value.tracks.findIndex(t => t.title === currentPlayingTrack.value?.title);
  currentPlayingTrack.value = idx < activeAlbum.value.tracks.length - 1
    ? activeAlbum.value.tracks[idx + 1]
    : activeAlbum.value.tracks[0];
};

const toggleSaved = () => {
  if (activeAlbum.value) activeAlbum.value.isSaved = !activeAlbum.value.isSaved;
};

watch(isPlayerVisible, (val) => {
  document.body.style.overflow = val ? 'hidden' : '';
});

onUnmounted(() => { document.body.style.overflow = ''; });

// ===== ARTIST CARDS =====
const goToArtist = (artistKey) => {
  currentArtist.value = artistKey;
  navigateTo('home', '#hero');
};
</script>

<template>
  <!-- ===================== BURAKKU AGENCY PAGE ===================== -->
  <div class="burakku-page">

    <!-- ===== HERO SECTION ===== -->
    <section class="burakku-hero" id="burakku-hero">
      <!-- Animated grid background -->
      <div class="hero-grid-bg"></div>
      <div class="hero-noise"></div>

      <div class="burakku-hero-content container">


        <!-- Main title -->
        <h1 class="burakku-hero-title">
          <span class="title-line-1">Where</span>
          <span class="title-line-2">Sound Meets <em>Culture</em></span>
        </h1>

        <p class="burakku-hero-subtitle">
          Burakku is an independent music label from Indonesia.
We work with artists who believe melody can be loud, vulnerability can be powerful, and pop culture can cross borders. Inspired by the spirit of Japanese alternative music, we help artists create lasting works, memorable shows, and communities that grow together.
        </p>

        <div class="burakku-hero-actions">
          <a href="#burakku-artists" class="btn-burakku-primary">
            <span>TEMUKAN ARTIS</span>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="#burakku-merch" class="btn-burakku-ghost">
            <span>LIHAT MERCH</span>
          </a>
        </div>

      </div>
    </section>

    <!-- ===== ARTISTS SECTION ===== -->
    <section class="burakku-artists-section" id="burakku-artists">
      <div class="container">
        <div class="section-header-row">
          <div class="section-tag">OUR ARTISTS</div>
          <h2 class="section-title-burakku">Artis di Bawah Naungan<br><span>Burakku</span></h2>
        </div>

        <div class="artists-grid">
          <!-- YoRI Card -->
          <div class="artist-card artist-card-yori" @click="goToArtist('yori')">
            <div class="artist-card-glow"></div>
            <div class="artist-card-content">
              <div class="artist-logo-wrap">
                <img src="/logo/logo.png" alt="YoRI Logo" class="artist-logo artist-logo-yori" />
              </div>
              <div class="artist-info">
                <div class="artist-tag">SOLO ARTIST</div>
                <h3 class="artist-name-card">YoRI</h3>
                <p class="artist-bio-card">
                  Aurel Mayori — penulis lagu dengan lirik puitis & emosional. Dari idol group ke solo artist yang tak henti bereksplor.
                </p>
                <div class="artist-stats">
                  <div class="stat-item">
                    <span class="stat-num">238K</span>
                    <span class="stat-label">Instagram</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-num">535K</span>
                    <span class="stat-label">TikTok</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-num">181K</span>
                    <span class="stat-label">YouTube</span>
                  </div>
                </div>
              </div>
              <div class="artist-card-footer">
                <span class="artist-cta">Kunjungi Halaman</span>
              </div>
            </div>
          </div>

          <!-- 90 Horse Power Card -->
          <div class="artist-card artist-card-90hp" @click="goToArtist('90hp')">
            <div class="artist-card-glow glow-90hp"></div>
            <div class="artist-card-content">
              <div class="artist-logo-wrap">
                <img src="/90horsepower/logo90.png" alt="90 Horse Power Logo" class="artist-logo artist-logo-90hp" />
              </div>
              <div class="artist-info">
                <div class="artist-tag">INDIE BAND</div>
                <h3 class="artist-name-card">90 Horsepower</h3>
                <p class="artist-bio-card">
                  Band indie rock dari Jakarta sejak 2013. Distorsi gitar, lirik jujur, dan energi garage rock yang autentik.
                </p>
                <div class="artist-stats">
                  <div class="stat-item">
                    <span class="stat-num">3.5K</span>
                    <span class="stat-label">Instagram</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-num">2.6K</span>
                    <span class="stat-label">YouTube</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-num">2013</span>
                    <span class="stat-label">Berdiri</span>
                  </div>
                </div>
              </div>
              <div class="artist-card-footer">
                <span class="artist-cta">Kunjungi Halaman</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== MERCH CATALOG (COMBINED) ===== -->
    <section class="burakku-merch-section" id="burakku-merch">
      <div class="container">
        <div class="section-header-row">
          <div class="section-tag">EXCLUSIVE MERCHANDISE</div>
          <h2 class="section-title-burakku">Merch Catalog<br><span>Burakku Store</span></h2>
          <p class="section-desc">Temukan merchandise eksklusif dari seluruh artis Burakku dalam satu katalog.</p>
        </div>

        <!-- Filter Buttons -->
        <div class="merch-filter-row">
          <button @click="activeCategory = 'all'" class="merch-filter-btn" :class="{ 'active': activeCategory === 'all' }">ALL</button>
          <button @click="activeCategory = 'apparel'" class="merch-filter-btn" :class="{ 'active': activeCategory === 'apparel' }">APPAREL</button>
          <button @click="activeCategory = 'music'" class="merch-filter-btn" :class="{ 'active': activeCategory === 'music' }">MUSIC</button>
          <button @click="activeCategory = 'accessories'" class="merch-filter-btn" :class="{ 'active': activeCategory === 'accessories' }">ACCESSORIES</button>
          <button @click="activeCategory = 'bundles'" class="merch-filter-btn" :class="{ 'active': activeCategory === 'bundles' }">BUNDLES</button>
        </div>

        <!-- Merch Grid -->
        <div class="burakku-merch-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="burakku-product-card"
            :class="{ 'selected-card': getProductQuantity(product.id) > 0 }"
          >
            <!-- Badge -->
            <div v-if="product.tag" class="product-badge-wrap">
              <span class="product-badge">{{ product.tag }}</span>
            </div>

            <!-- Image -->
            <div class="burakku-product-img-wrap" @click="navigateTo('product-detail', null, product)" style="cursor:pointer;">
              <img :src="product.image" :alt="product.name" class="burakku-product-img primary-img" />
              <img v-if="product.hoverImage" :src="product.hoverImage" :alt="product.name" class="burakku-product-img hover-img" />
            </div>

            <!-- Info -->
            <div class="burakku-product-info">
              <div @click="navigateTo('product-detail', null, product)" style="cursor:pointer; width: 100%;">
                <h3 class="burakku-product-name">{{ product.name }}</h3>
                <p class="burakku-product-price">{{ product.price }}</p>
                
                <!-- Location Info -->
                <div class="burakku-product-location">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" class="burakku-location-icon">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{{ product.location || 'Jakarta' }}</span>
                </div>
              </div>

              <div class="burakku-qty-row">
                <button @click="handleDecrease(product)" class="qty-btn" :disabled="getProductQuantity(product.id) === 0">−</button>
                <span class="qty-num" :class="{ 'has-items': getProductQuantity(product.id) > 0 }">
                  {{ getProductQuantity(product.id) }}
                </span>
                <button @click="handleIncrease(product)" class="qty-btn qty-btn-add">+</button>
              </div>

              <!-- Creator Info Section -->
              <div class="burakku-product-creator-row">
                <div class="burakku-creator-circle-avatar" :class="product.creator === 'YoRI' ? 'avatar-yori' : 'avatar-90hp'">
                  <img :src="product.creator === 'YoRI' ? '/logo/logo.png' : '/90horsepower/logo90.png'" alt="Logo" class="burakku-creator-avatar-img" />
                </div>
                <div class="burakku-creator-meta">
                  <span class="burakku-creator-label">Disediakan oleh</span>
                  <span class="burakku-creator-name-bold">{{ product.creator }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast -->
      <Transition name="fade-in">
        <div v-if="showSuccessModal" class="burakku-toast">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <div>
            <h4>Added to Cart!</h4>
            <p>{{ selectedItem?.name }}</p>
          </div>
        </div>
      </Transition>
    </section>

    <!-- ===== ALBUMS SECTION (COMBINED) ===== -->
    <section class="burakku-albums-section" id="burakku-albums">
      <div class="container">
        <div class="section-header-row">
          <div class="section-tag">DISCOGRAPHY</div>
          <h2 class="section-title-burakku">Albums & Releases<br><span>Burakku Artists</span></h2>
        </div>

        <div class="burakku-album-grid">
          <div
            v-for="album in allAlbums"
            :key="album.id"
            class="burakku-album-card"
            @click="playAlbum(album)"
          >
            <div class="burakku-album-cover-wrap">
              <img :src="album.image" :alt="album.title" class="burakku-album-img" />
              <div class="burakku-album-overlay">
                <div class="burakku-play-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <polygon points="8 5 19 12 8 19 8 5"></polygon>
                  </svg>
                </div>
              </div>
            </div>
            <div class="burakku-album-meta">
              <span class="burakku-album-type">{{ album.type }} · {{ album.year }}</span>
              <h3 class="burakku-album-title">{{ album.title }}</h3>
              <p class="burakku-album-artist">{{ album.artist }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Album Modal -->
      <Teleport to="body">
        <Transition name="fade-scale">
          <div v-if="isPlayerVisible" class="burakku-modal-overlay" @click.self="closePlayer">
            <div class="burakku-modal" :style="{ '--album-glow': activeAlbum?.glow, '--album-color': activeAlbum?.color }">
              <button class="burakku-modal-close" @click="closePlayer" aria-label="Close">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div class="burakku-modal-grid">
                <!-- Left -->
                <div class="burakku-modal-left">
                  <div class="burakku-modal-artwork-wrap">
                    <img :src="activeAlbum?.image" :alt="activeAlbum?.title" class="burakku-modal-artwork" />
                  </div>
                  <div class="burakku-modal-capsules">
                    <span class="modal-capsule">{{ activeAlbum?.type }}</span>
                    <span class="modal-capsule">{{ activeAlbum?.year }}</span>
                  </div>
                  <h3 class="burakku-modal-title">{{ activeAlbum?.title }}</h3>
                  <p class="burakku-modal-artist">{{ activeAlbum?.artist }}</p>
                  <a :href="activeAlbum?.spotifyUrl" target="_blank" class="burakku-spotify-btn">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <polygon points="8 5 19 12 8 19 8 5"></polygon>
                    </svg>
                    PLAY ON SPOTIFY
                  </a>
                  <div class="burakku-modal-controls">
                    <button @click="playPreviousTrack" class="burakku-ctrl-btn" aria-label="Previous">
                      <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2.5" fill="none">
                        <polygon points="19 20 9 12 19 4 19 20" fill="currentColor"></polygon>
                        <line x1="5" y1="4" x2="5" y2="20"></line>
                      </svg>
                    </button>
                    <button @click="playNextTrack" class="burakku-ctrl-btn" aria-label="Next">
                      <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2.5" fill="none">
                        <polygon points="5 4 15 12 5 20 5 4" fill="currentColor"></polygon>
                        <line x1="19" y1="4" x2="19" y2="20"></line>
                      </svg>
                    </button>
                    <button @click="toggleSaved" class="burakku-ctrl-btn" :class="{ 'btn-saved': activeAlbum?.isSaved }" aria-label="Save">
                      <svg v-if="activeAlbum?.isSaved" viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="3" fill="none">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <svg v-else viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2.5" fill="none">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Right: Tracklist -->
                <div class="burakku-modal-right">
                  <h4 class="burakku-modal-section-label">TRACKLIST</h4>
                  <div class="burakku-tracklist">
                    <div
                      v-for="(track, idx) in activeAlbum?.tracks"
                      :key="idx"
                      class="burakku-track-row"
                      :class="{ 'is-active': currentPlayingTrack?.title === track.title }"
                      @click="playTrack(track)"
                    >
                      <span class="track-num">{{ track.num }}</span>
                      <div class="track-body">
                        <span class="track-title">{{ track.title }}</span>
                        <span class="track-artist-sub">{{ track.artist }}</span>
                      </div>
                      <span class="track-dur">{{ track.duration }}</span>
                    </div>
                  </div>

                  <div class="burakku-listen-section">
                    <h4 class="burakku-modal-section-label">LISTEN ON</h4>
                    <div class="burakku-listen-btns">
                      <a :href="activeAlbum?.spotifyUrl" target="_blank" class="listen-platform-btn spotify">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.076-.67-.135-.747-.472-.077-.336.136-.67.472-.747 3.844-.877 7.14-.5 9.82 1.14.296.18.387.563.207.86zm1.226-2.723c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.078-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.665-1.112 8.232-.572 11.347 1.343.367.227.487.708.26 1.074zm.106-2.833C14.444 8.766 8.7 8.577 5.372 9.587c-.53.16-1.09-.142-1.25-.672-.16-.53.142-1.09.672-1.25 3.818-1.16 10.15-.94 14.164 1.442.477.285.632.9.347 1.378-.285.477-.9.632-1.378.347z"/>
                        </svg>
                        Spotify
                      </a>
                      <a :href="activeAlbum?.appleMusicUrl" target="_blank" class="listen-platform-btn apple">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.5-.63.73-1.18 1.87-1.03 2.98 1.12.09 2.25-.61 2.96-1.42z"/>
                        </svg>
                        Apple Music
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </section>

  </div>
</template>

<style scoped>
/* ===================================================
   BURAKKU PAGE – Base Layout
=================================================== */
.burakku-page {
  background-color: var(--bg-dark);
  min-height: 100vh;
}

/* ===================================================
   HERO SECTION
=================================================== */
.burakku-hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 120px 0 30px;
}

/* Animated grid background */
.hero-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(var(--accent-cyan-rgb), 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(var(--accent-cyan-rgb), 0.06) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
  pointer-events: none;
  animation: gridPulse 8s ease-in-out infinite;
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.hero-noise {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(var(--accent-purple-rgb), 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.burakku-hero-content {
  position: relative;
  z-index: 5;
  text-align: center;
  max-width: 900px;
}

.agency-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--accent-cyan);
  text-transform: uppercase;
  margin-bottom: 28px;
  background: rgba(var(--accent-cyan-rgb), 0.08);
  border: 1px solid rgba(var(--accent-cyan-rgb), 0.2);
  padding: 8px 20px;
  border-radius: 999px;
}

.label-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 8px var(--accent-cyan);
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.burakku-hero-title {
  font-family: var(--font-heading);
  font-size: 6rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -3px;
  margin: 0 0 24px 0;
  color: #ffffff;
}

.title-line-1 {
  display: block;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.65em;
  letter-spacing: -1px;
  margin-bottom: 4px;
}

.title-line-2 {
  display: block;
  background: linear-gradient(135deg, #ffffff 30%, var(--accent-cyan) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 40px rgba(var(--accent-cyan-rgb), 0.3));
}

.title-line-2 em {
  font-style: italic;
}

.burakku-hero-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 40px;
}

.burakku-hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-burakku-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  background: var(--accent-cyan);
  color: var(--bg-dark);
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 1px;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 24px rgba(var(--accent-cyan-rgb), 0.4);
}

.btn-burakku-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 36px rgba(var(--accent-cyan-rgb), 0.6);
  background: #ffffff;
}

.btn-burakku-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 36px;
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-burakku-ghost:hover {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-3px);
}

.floating-chips {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 48px;
}

.chip {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  animation: chipFloat 4s ease-in-out infinite;
}

.chip-1 { animation-delay: 0s; }
.chip-2 { animation-delay: 0.5s; }
.chip-3 { animation-delay: 1s; }
.chip-4 { animation-delay: 1.5s; }

@keyframes chipFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.scroll-dot {
  width: 6px;
  height: 20px;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  position: relative;
  overflow: hidden;
}

.scroll-dot::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 5px;
  background: var(--accent-cyan);
  border-radius: 999px;
  animation: scrollAnim 2s ease-in-out infinite;
}

@keyframes scrollAnim {
  0% { top: 2px; opacity: 1; }
  100% { top: 12px; opacity: 0; }
}

/* Responsive Hero */
@media (max-width: 768px) {
  .burakku-hero {
    padding: 100px 0 20px;
    min-height: 60svh;
  }
  .burakku-hero-title {
    font-size: 3.5rem;
    letter-spacing: -2px;
  }
  .burakku-hero-subtitle {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .burakku-hero-title {
    font-size: 2.8rem;
    letter-spacing: -1.5px;
  }
  .btn-burakku-primary,
  .btn-burakku-ghost {
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
  }
  .burakku-hero-actions {
    flex-direction: column;
    align-items: center;
    padding: 0 24px;
    width: 100%;
  }
}

/* ===================================================
   SHARED SECTION STYLES
=================================================== */
.burakku-artists-section,
.burakku-merch-section,
.burakku-albums-section {
  padding: 48px 0;
  position: relative;
}

.burakku-artists-section {
  padding-top: 8px;
  background: linear-gradient(180deg, var(--bg-dark) 0%, rgba(15, 17, 26, 1) 100%);
}

.burakku-merch-section {
  background-color: var(--bg-dark);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.burakku-albums-section {
  background: rgba(10, 12, 18, 1);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-bottom: 80px;
}

@media (max-width: 768px) {
  .burakku-artists-section,
  .burakku-merch-section,
  .burakku-albums-section {
    padding: 36px 0;
  }
  .burakku-albums-section {
    padding-bottom: 70px;
  }
}

.section-header-row {
  text-align: center;
  margin-bottom: 36px;
}

.section-tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 3px;
  color: var(--accent-cyan);
  text-transform: uppercase;
  margin-bottom: 16px;
  background: rgba(var(--accent-cyan-rgb), 0.06);
  border: 1px solid rgba(var(--accent-cyan-rgb), 0.15);
  padding: 6px 18px;
  border-radius: 999px;
}

.section-title-burakku {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 16px 0;
  letter-spacing: -1.5px;
  line-height: 1.1;
}

.section-title-burakku span {
  color: var(--accent-cyan);
  background: linear-gradient(135deg, var(--accent-cyan), #ffffff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .section-header-row {
    margin-bottom: 24px;
  }
  .section-title-burakku {
    font-size: 2rem;
    letter-spacing: -1px;
  }
}

/* ===================================================
   ARTISTS SECTION
=================================================== */
.artists-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

@media (max-width: 900px) {
  .artists-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.artist-card {
  position: relative;
  background: rgba(18, 20, 30, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: stretch;
  min-height: 320px;
  backdrop-filter: blur(10px);
}

.artist-card:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--accent-cyan-rgb), 0.3);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(var(--accent-cyan-rgb), 0.1);
}

.artist-card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top left, rgba(var(--accent-cyan-rgb), 0.08) 0%, transparent 60%);
  pointer-events: none;
  transition: opacity 0.4s ease;
  opacity: 0;
}

.glow-90hp {
  background: radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.06) 0%, transparent 60%);
}

.artist-card:hover .artist-card-glow {
  opacity: 1;
}

.artist-card-content {
  display: flex;
  flex-direction: column;
  padding: 36px;
  flex: 1;
  z-index: 2;
  position: relative;
}

.artist-logo-wrap {
  margin-bottom: 0;
}

.artist-logo {
  object-fit: contain;
  display: block;
}
.artist-logo-yori {
  height: 110px;
  width: auto;
}

.artist-logo-90hp {
  height: 240px;
  width: auto;
}

.artist-card-yori .artist-logo-wrap {
  margin-bottom: -15px;
}

.artist-card-90hp .artist-logo-wrap {
  margin-top: -45px;
  margin-bottom: -95px;
}

.artist-info {
  flex: 1;
}

.artist-tag {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: var(--accent-cyan);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.artist-name-card {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

.artist-bio-card {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 24px 0;
  max-width: 100%;
}

.artist-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-num {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 900;
  color: #ffffff;
}

.stat-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.artist-card-footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
}

.artist-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 10px 24px;
  border-radius: 30px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.artist-card-yori .artist-cta {
  background: #ff2a6d;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(255, 42, 109, 0.2);
}

.artist-card-yori:hover .artist-cta {
  background: #ff4785;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 42, 109, 0.45);
}

.artist-card-90hp .artist-cta {
  background: var(--accent-cyan);
  color: #000000;
  box-shadow: 0 4px 12px rgba(0, 243, 255, 0.2);
}

.artist-card-90hp:hover .artist-cta {
  background: #33f5ff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 243, 255, 0.45);
}

.artist-card-image {
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.artist-card-yori .artist-card-image {
  width: 240px;
  background: radial-gradient(circle at center, rgba(255, 42, 109, 0.12) 0%, rgba(10, 12, 18, 0.5) 80%);
}

.artist-card-90hp .artist-card-image {
  width: 290px;
  background: radial-gradient(circle at center, rgba(0, 243, 255, 0.12) 0%, rgba(10, 12, 18, 0.5) 80%);
}

.artist-portrait-card {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  mask-image: none !important;
  -webkit-mask-image: none !important;
}

.artist-card-yori .artist-portrait-card {
  object-position: center 15%;
}

.artist-card-90hp .artist-portrait-card {
  object-fit: contain;
  object-position: center;
  padding: 8px;
}

.artist-card:hover .artist-portrait-card {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .artist-card-content {
    padding: 28px;
  }
  .artist-card-yori .artist-card-image {
    width: 180px;
  }
  .artist-card-90hp .artist-card-image {
    width: 210px;
  }
}

@media (max-width: 576px) {
  .artist-card {
    flex-direction: column;
    min-height: auto;
  }
  
  .artist-card-yori .artist-card-image,
  .artist-card-90hp .artist-card-image {
    width: 100%;
    height: 230px;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .artist-portrait-card {
    mask-image: none !important;
    -webkit-mask-image: none !important;
  }
  
  .artist-card-content {
    padding: 24px 24px 16px 24px;
  }
  
  .artist-logo-yori {
    height: 85px;
  }
  
  .artist-logo-90hp {
    height: 180px;
  }

  .artist-card-90hp .artist-logo-wrap {
    margin-top: -25px;
    margin-bottom: -62px;
  }
}
/* ===================================================
   MERCH CATALOG (COMBINED)
=================================================== */
.merch-filter-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.merch-filter-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 1.5px;
  padding: 9px 24px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.merch-filter-btn:hover {
  border-color: rgba(var(--accent-cyan-rgb), 0.35);
  color: var(--text-primary);
}

.merch-filter-btn.active {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  background: rgba(var(--accent-cyan-rgb), 0.05);
  box-shadow: 0 0 14px rgba(var(--accent-cyan-rgb), 0.2);
}

@media (max-width: 576px) {
  .merch-filter-row {
    overflow-x: auto;
    justify-content: flex-start;
    flex-wrap: nowrap;
    padding-bottom: 8px;
    -webkit-overflow-scrolling: touch;
  }
  .merch-filter-btn {
    flex-shrink: 0;
    padding: 8px 16px;
    font-size: 0.7rem;
  }
}

.burakku-merch-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px 20px;
}

@media (max-width: 1200px) {
  .burakku-merch-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 900px) {
  .burakku-merch-grid { grid-template-columns: repeat(2, 1fr); gap: 20px 14px; }
}

@media (max-width: 576px) {
  .burakku-merch-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 10px 16px;
  }
  .burakku-product-card {
    max-width: 340px !important; /* Slightly larger card size */
    margin: 0 auto;
    width: 100%;
  }
}

.burakku-product-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.burakku-product-card:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--accent-cyan-rgb), 0.25);
  box-shadow: 0 12px 32px rgba(var(--accent-cyan-rgb), 0.06);
}

.burakku-product-card.selected-card {
  border-color: rgba(var(--accent-cyan-rgb), 0.45);
  box-shadow: 0 12px 32px rgba(var(--accent-cyan-rgb), 0.15);
}

.product-badge-wrap {
  position: absolute;
  top: 0;
  left: 14px;
  z-index: 5;
}

.product-badge {
  display: block;
  background: linear-gradient(to bottom, var(--btn-cyan-grad-1), var(--btn-cyan-grad-2));
  color: #000000;
  font-family: var(--font-heading);
  font-size: 0.42rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  width: 36px;
  height: 44px;
  padding: 8px 2px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%);
}

/* Location & Creator info styling for Burakku catalog cards */
.burakku-product-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-top: 2px;
  align-self: flex-start;
}

.burakku-location-icon {
  color: var(--accent-cyan);
}

.burakku-product-creator-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  align-self: flex-start;
}

.burakku-creator-circle-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1.2px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s ease;
  flex-shrink: 0;
}

.burakku-creator-circle-avatar.avatar-yori {
  border-color: rgba(255, 42, 109, 0.2);
}

.burakku-creator-circle-avatar.avatar-90hp {
  border-color: rgba(0, 243, 255, 0.2);
}

.burakku-creator-avatar-img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.burakku-creator-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
}

.burakku-creator-label {
  font-size: 0.62rem;
  color: var(--text-muted);
  line-height: 1.1;
}

.burakku-creator-name-bold {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
}

.burakku-product-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: rgba(0,0,0,0.2);
  overflow: hidden;
  border-bottom: 1px solid var(--border-card);
}

.burakku-product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.5s ease;
}

.hover-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  z-index: 1;
}

.burakku-product-card:hover .burakku-product-img {
  transform: scale(1.05);
}

.burakku-product-card:hover .hover-img {
  opacity: 1;
}

/* Additional stock & PO info styles */
.burakku-product-detail-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 4px;
  font-size: 0.7rem;
  line-height: 1.3;
  width: 100%;
}

.burakku-detail-stock-info {
  color: var(--accent-cyan);
  font-weight: 600;
  text-transform: none;
}

.burakku-detail-po-period {
  color: var(--text-muted);
  font-size: 0.65rem;
  font-weight: 400;
}

.burakku-product-info {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.burakku-product-name {
  font-family: var(--font-heading);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
  line-height: 1.35;
}

.burakku-product-price {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--accent-cyan);
  margin: 4px 0 14px 0;
  text-shadow: 0 0 8px rgba(var(--accent-cyan-rgb), 0.2);
  text-align: right;
  width: 100%;
  display: block;
}

@media (max-width: 480px) {
  .burakku-product-name { font-size: 0.78rem; }
  .burakku-product-price { font-size: 0.82rem; }
  .burakku-product-info { padding: 10px 12px 12px; }
}

.burakku-qty-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  border: 1.5px solid var(--border-card);
  border-radius: 999px;
  padding: 2px 4px;
  width: fit-content;
  min-width: 90px;
  align-self: flex-end;
  margin-top: auto;
  transition: border-color 0.3s ease;
}

.burakku-product-card.selected-card .burakku-qty-row {
  border-color: rgba(var(--accent-cyan-rgb), 0.45);
}

.qty-btn {
  background: transparent;
  border: none;
  color: var(--text-primary);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.qty-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.05);
  color: var(--accent-cyan);
}

.qty-btn:disabled { opacity: 0.25; cursor: not-allowed; }

.qty-num {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-muted);
  min-width: 20px;
  text-align: center;
  transition: color 0.3s ease;
}

.qty-num.has-items {
  color: var(--accent-cyan);
  text-shadow: 0 0 8px rgba(var(--accent-cyan-rgb), 0.4);
}

/* Toast */
.burakku-toast {
  position: fixed;
  bottom: 120px;
  right: 28px;
  background: rgba(18, 20, 30, 0.92);
  border: 1px solid var(--accent-cyan);
  border-radius: 14px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 99999;
  backdrop-filter: blur(20px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.5), 0 0 20px rgba(var(--accent-cyan-rgb), 0.15);
}

.burakku-toast h4 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 2px;
}

.burakku-toast p {
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 576px) {
  .burakku-toast { right: 16px; left: 16px; bottom: 100px; }
}

/* ===================================================
   ALBUMS SECTION
=================================================== */
.burakku-album-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 28px;
}

@media (max-width: 1100px) {
  .burakku-album-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
}

@media (max-width: 850px) {
  .burakku-album-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }
}

@media (max-width: 576px) {
  .burakku-album-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
}

.burakku-album-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.burakku-album-card:hover { transform: translateY(-4px); }

.burakku-album-cover-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.07);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

.burakku-album-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.2, 1, 0.3, 1);
}

.burakku-album-card:hover .burakku-album-img { transform: scale(1.06); }

.burakku-album-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 15, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.burakku-album-card:hover .burakku-album-overlay { opacity: 1; }

.burakku-play-btn {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #ffffff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.8);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.burakku-play-btn svg { transform: translateX(1px); }

.burakku-album-card:hover .burakku-play-btn { transform: scale(1); }

.burakku-album-cover-wrap:hover .burakku-album-cover-wrap {
  border-color: var(--accent-cyan);
}

.burakku-album-meta { margin-top: 12px; }

.burakku-album-type {
  display: block;
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.burakku-album-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 2px;
  line-height: 1.2;
}

.burakku-album-artist {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin: 0;
}

/* Album Modal */
.burakku-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 6, 10, 0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 999999;
  padding: 40px 24px;
  overflow-y: auto;
}

.burakku-modal {
  margin: auto;
  background: rgba(16, 18, 28, 0.9);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 28px;
  width: 100%;
  max-width: 920px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 60px var(--album-glow, rgba(var(--accent-cyan-rgb), 0.15));
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}

.burakku-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.burakku-modal-close:hover {
  color: #fff;
  background: rgba(255,255,255,0.08);
}

.burakku-modal-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
}

@media (max-width: 700px) {
  .burakku-modal-grid { grid-template-columns: 1fr; }
}

.burakku-modal-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(0,0,0,0.2);
  padding: 48px 40px 40px;
  border-right: 1px solid rgba(255,255,255,0.05);
  box-sizing: border-box;
}

@media (max-width: 700px) {
  .burakku-modal-left {
    padding: 40px 28px 24px;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
}

.burakku-modal-artwork-wrap {
  width: 220px;
  height: 220px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 16px 40px rgba(0,0,0,0.5);
  margin-bottom: 20px;
}

.burakku-modal-artwork {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.burakku-modal-capsules {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 14px;
}

.modal-capsule {
  font-size: 0.62rem;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 4px 12px;
  border-radius: 999px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.burakku-modal-title {
  font-family: var(--font-heading);
  font-size: 1.9rem;
  font-weight: 900;
  font-style: italic;
  color: #fff;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.burakku-modal-artist {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.5);
  margin: 0 0 24px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.burakku-spotify-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #000;
  border-radius: 999px;
  padding: 10px 28px;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-decoration: none;
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.burakku-spotify-btn:hover {
  box-shadow: 0 0 20px var(--album-color, rgba(255,42,109,0.5));
  transform: translateY(-2px);
}

.burakku-modal-controls {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.burakku-ctrl-btn {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  color: #fff;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.burakku-ctrl-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: #fff;
  transform: scale(1.08);
}

.burakku-ctrl-btn.btn-saved {
  background: var(--album-color, var(--accent-cyan));
  border-color: var(--album-color, var(--accent-cyan));
  color: #000;
}

.burakku-modal-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 48px 40px 40px;
  box-sizing: border-box;
}

@media (max-width: 700px) {
  .burakku-modal-right { padding: 28px; }
}

.burakku-modal-section-label {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  margin: 0 0 14px;
}

.burakku-tracklist {
  max-height: 280px;
  overflow-y: auto;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
}

.burakku-tracklist::-webkit-scrollbar { width: 4px; }
.burakku-tracklist::-webkit-scrollbar-track { background: transparent; }
.burakku-tracklist::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

.burakku-track-row {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
  transition: all 0.2s ease;
}

.burakku-track-row:hover .track-title,
.burakku-track-row.is-active .track-title {
  color: var(--album-color, var(--accent-cyan));
}

.burakku-track-row:hover .track-num,
.burakku-track-row.is-active .track-num {
  color: var(--album-color, var(--accent-cyan));
}

.track-num {
  font-family: monospace;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.3);
  width: 28px;
  font-weight: 600;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.track-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2px;
}

.track-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  transition: color 0.2s ease;
  line-height: 1.2;
}

.track-artist-sub {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
}

.track-dur {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.35);
  font-family: monospace;
  flex-shrink: 0;
  margin-left: 12px;
}

.burakku-listen-section { margin-top: auto; }

.burakku-listen-btns {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.listen-platform-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 999px;
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 1px solid rgba(255,255,255,0.15);
  color: #fff;
  background: rgba(255,255,255,0.04);
}

.listen-platform-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.3);
  transform: translateY(-2px);
}

.listen-platform-btn.spotify { border-color: rgba(30,215,96,0.3); }
.listen-platform-btn.apple { border-color: rgba(252,60,68,0.3); }

/* Transition classes */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-enter-from,
.fade-in-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
