<script setup>
import { computed } from 'vue';
import { currentArtist } from '../routerState.js';
import { artistData } from '../artistData.js';

const activeArtist = computed(() => artistData[currentArtist.value]);
</script>

<template>
  <!-- ================= 90 HORSEPOWER HERO SECTION ================= -->
  <header id="hero" class="hero-section">
    <!-- Background vertical stripes pattern -->
    <div class="hero-stripes-bg"></div>

    <div class="hero-wrapper container">
      <!-- Main Content Area: Left Text, Right Portrait -->
      <div class="hero-main-grid">
        <!-- Left side: Bio and details -->
        <div class="hero-text-column">

          <!-- Title (desktop only) -->
          <h1 class="hero-title" :class="{ 'has-logo': currentArtist === 'yori' }">
            <template v-if="currentArtist === 'yori'">
              <img src="/logo/YoriLogo.png" class="hero-logo-title" alt="YoRI Logo" />
            </template>
            <template v-else>
              <span class="yo">{{ activeArtist.titleYo }}</span><span class="ri">{{ activeArtist.titleRi }}</span>
            </template>
          </h1>

          <!-- Mobile portrait/logo — replaces the title on small screens -->
          <!-- 90 HORSEPOWER MOBILE PORTRAIT & LOGO -->
          <div class="hero-mobile-portrait" :class="{ 'is-90hp': currentArtist === '90hp' }">
            <div class="hero-mobile-glow"></div>
            <!-- Double orbit rings -->
            <svg class="hero-mobile-ring" viewBox="0 0 500 500" fill="none">
              <ellipse cx="250" cy="250" rx="220" ry="70" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" transform="rotate(-20 250 250)" />
              <ellipse cx="250" cy="250" rx="180" ry="50" stroke="rgba(255, 42, 109, 0.15)" stroke-width="1" transform="rotate(-10 250 250)" />
            </svg>
            <!-- Sparks / Stars -->
            <!-- <svg class="mobile-spark spark-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" />
            </svg> -->
            <svg class="mobile-spark spark-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" />
            </svg>
            <span class="mobile-cross mcross-1">+</span>
            <span class="mobile-cross mcross-2">+</span>

            <img :src="activeArtist.heroImage" :alt="activeArtist.name + ' Portrait'" class="hero-mobile-img" :class="{ 'hp-mobile-img': currentArtist === '90hp', 'yori-mobile-img': currentArtist === 'yori' }" />
            <div v-if="currentArtist === 'yori'" class="hero-mobile-signature-logo-container">
              <img src="/logo/YoriLogo.png" class="hero-mobile-signature-logo" alt="YoRI Logo" />
            </div>
            <div v-else class="hero-mobile-signature">{{ activeArtist.signature }}</div>
          </div>

          <div class="hero-tagline-container">
            <!-- 90 HORSEPOWER TAGLINE -->
            <p class="hero-tagline">{{ activeArtist.tagline }}</p>
            <svg class="sketchy-underline" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none">
              <path d="M5 15 C 80 5, 220 5, 295 12 M 20 18 C 100 12, 210 12, 280 16" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round" />
            </svg>
          </div>

          <!-- 90 HORSEPOWER BIO -->
          <p class="hero-bio">
            {{ activeArtist.bio }}
          </p>

          <div class="hero-actions-container">
            <a href="#listen" class="btn btn-cyan btn-listen-now">
              <span>LISTEN NOW</span>
              <svg class="play-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </a>
            <a href="#artist" class="btn btn-more-about btn-about-yori">
              <span>ABOUT {{ activeArtist.name }}</span>
            </a>
          </div>
        </div>

        <!-- Right side: Portrait with planet rings and doodles -->
        <div class="hero-image-column">
          <div class="hero-image-area" :class="{ 'yori-image-area': currentArtist === 'yori', 'hp-image-area': currentArtist === '90hp' }">
            <!-- Planet Background elements -->
            <div class="planet-container">
              <!-- Dark abstract planet circle -->
              <div class="planet-circle"></div>
              <!-- Planet tilted ring -->
              <svg class="planet-ring" viewBox="0 0 500 500" fill="none">
                <ellipse cx="250" cy="250" rx="220" ry="70" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.5" transform="rotate(-20 250 250)" />
              </svg>
            </div>

            <!-- Hand-drawn star doodles -->
            <svg class="star-doodle star-top" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" />
            </svg>
            <svg class="star-doodle star-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" />
            </svg>

            <!-- Decorative pluses / crosses -->
            <span class="doodle-cross cross-1">+</span>
            <span class="doodle-cross cross-2">+</span>
            <span class="doodle-cross cross-3">+</span>

            <!-- Centered portrait/logo image -->
            <!-- 90 HORSEPOWER HERO LOGO IMAGE -->
            <img :src="activeArtist.heroImage" :alt="activeArtist.name + ' Portrait'" class="hero-portrait-img" :class="{ 'hp-portrait': currentArtist === '90hp', 'yori-portrait': currentArtist === 'yori' }" />

            <!-- Handwritten signature or logo overlay on the right -->
            <div v-if="currentArtist === 'yori'" class="hero-signature-logo-container">
              <img src="/logo/YoriLogo.png" class="hero-signature-logo" alt="YoRI Logo" />
            </div>
            <div v-else class="handdrawn-signature">{{ activeArtist.signature }}</div>
          </div>
        </div>
      </div>

      <!-- Bottom Area: Social Media Metrics Box -->
      <!-- ================= DYNAMIC SOCIAL MEDIA CARDS ================= -->
      <div class="hero-social-metrics-row">
        <div class="social-metrics-container" :style="{ '--num-socials': Object.keys(activeArtist.socials).length }">
          <template v-for="(social, key, index) in activeArtist.socials" :key="key">
            <a :href="social.url" target="_blank" class="social-card" :class="{ 'last-social-card': index === Object.keys(activeArtist.socials).length - 1 }" style="text-decoration: none;">
              <div class="icon-wrapper" :class="key">
                <!-- Instagram -->
                <svg v-if="key === 'instagram'" viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <!-- TikTok -->
                <svg v-else-if="key === 'tiktok'" viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
                <!-- YouTube -->
                <svg v-else-if="key === 'youtube'" viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
                <!-- X / Twitter -->
                <svg v-else-if="key === 'x'" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <!-- Spotify -->
                <svg v-else-if="key === 'spotify'" viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.076-.67-.135-.747-.472-.077-.336.136-.67.472-.747 3.844-.877 7.14-.5 9.82 1.14.296.18.387.563.207.86zm1.226-2.723c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.078-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.665-1.112 8.232-.572 11.347 1.343.367.227.487.708.26 1.074zm.106-2.833C14.444 8.766 8.7 8.577 5.372 9.587c-.53.16-1.09-.142-1.25-.672-.16-.53.142-1.09.672-1.25 3.818-1.16 10.15-.94 14.164 1.442.477.285.632.9.347 1.378-.285.477-.9.632-1.378.347z"/>
                </svg>
              </div>
              <div class="metric-handle">{{ social.handle }}</div>
            </a>
            
            <div v-if="index < Object.keys(activeArtist.socials).length - 1" class="social-divider"></div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  padding-top: 130px;
  background-color: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 10px;
  margin-bottom: -105px; /* Offset the translateY(-170px) content shift */
}

@media (max-width: 992px) {
  .hero-section {
    padding-top: 80px;
    padding-bottom: 10px;
    min-height: auto;
    margin-bottom: 0;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding-top: 70px;
  }
}

/* Background vertical stripes pattern */
.hero-stripes-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    90deg,
    rgba(139, 92, 246, 0.04) 0px,
    rgba(139, 92, 246, 0.04) 1px,
    transparent 1px,
    transparent 80px
  );
  mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
}

.hero-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  max-width: 1300px;
  position: relative;
  z-index: 10;
  transform: translateY(-170px); /* Shift container slightly upwards on desktop */
}

@media (max-width: 992px) {
  .hero-wrapper {
    transform: translateY(0); /* Reset on mobile */
  }
}

.hero-main-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 60px;
  align-items: center;
  width: 100%;
}

@media (max-width: 1024px) {
  .hero-main-grid {
    gap: 30px;
  }
}

@media (max-width: 992px) {
  .hero-main-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
}

/* Left Column Styling */
.hero-text-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 3;
}

@media (max-width: 992px) {
  .hero-text-column {
    align-items: center;
    order: 1;
  }
}

.hero-subtitle {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent-cyan);
  letter-spacing: 2px;
  margin-bottom: 12px;
  text-transform: uppercase;
  text-shadow: 0 0 8px rgba(255, 42, 109, 0.3);
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 7.5rem;
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -4px;
  margin-bottom: 10px;
}

.hero-title.has-logo {
  font-size: 0;
  line-height: 0;
  letter-spacing: 0;
}

.hero-logo-title {
  max-width: 180px;
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 15px rgba(255, 42, 109, 0.25));
}

@media (max-width: 1200px) {
  .hero-title {
    font-size: 6rem;
    letter-spacing: -3px;
  }
  .hero-logo-title {
    max-width: 155px;
  }
}

@media (max-width: 992px) {
  .hero-logo-title {
    max-width: 140px;
    margin: 0 auto 15px auto;
  }
}

/* Hide the text title on mobile — replaced by portrait image. For logo title, adjust layout */
@media (max-width: 768px) {
  .hero-title:not(.has-logo) {
    display: none;
  }
  .hero-title.has-logo {
    display: none !important;
  }
  .hero-logo-title {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .hero-logo-title {
    max-width: 90px;
  }
}

.hero-title .yo {
  color: var(--text-primary);
}

.hero-title .ri {
  color: var(--accent-cyan);
  background: linear-gradient(135deg, var(--accent-cyan) 40%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 30px rgba(255, 42, 109, 0.35));
}

.hero-tagline-container {
  position: relative;
  display: inline-block;
  margin-bottom: 25px;
}

@media (max-width: 992px) {
  .hero-tagline-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.hero-tagline {
  font-family: var(--font-tagline);
  font-size: 2.6rem;
  color: var(--text-primary);
  margin-bottom: 0px;
  opacity: 0.95;
  letter-spacing: 0.5px;
  text-align: center;
}

@media (max-width: 576px) {
  .hero-tagline {
    font-size: 1.8rem;
    white-space: nowrap;
  }
}

@media (max-width: 380px) {
  .hero-tagline {
    font-size: 1.45rem;
    white-space: nowrap;
  }
}

.sketchy-underline {
  width: 90%;
  max-width: 280px;
  height: 12px;
  margin-top: 4px;
  opacity: 0.95;
}

.hero-bio {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 35px;
  max-width: 500px;
}

@media (max-width: 992px) {
  .hero-bio {
    max-width: 650px;
    margin-bottom: 30px;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .hero-bio {
    font-size: 0.95rem;
    line-height: 1.7;
  }
}

.hero-actions-container {
  display: flex;
  gap: 16px;
  width: 100%;
}

@media (max-width: 768px) {
  .hero-actions-container {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    max-width: 420px;
    margin: 0 auto;
  }
}

.btn-listen-now {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 32px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 999px;
  letter-spacing: 1px;
  box-shadow: 0 0 20px rgba(255, 42, 109, 0.4);
  background-color: var(--accent-cyan);
  color: var(--bg-dark) !important;
  border: none;
  width: auto;
}

.btn-listen-now:hover {
  background-color: #ffffff;
  color: var(--bg-dark) !important;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
}

.btn-about-yori {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-primary);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  text-decoration: none;
  background: transparent;
  transition: var(--transition-smooth);
  width: auto;
}

.btn-about-yori:hover {
  border-color: #ffffff;
  color: #ffffff;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .btn-listen-now,
  .btn-about-yori {
    width: 100%;
    box-sizing: border-box;
    padding: 16px 20px;
  }
}

/* Right Column: Portrait & Planet Rings & Star Doodles */
.hero-image-column {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  width: 100%;
}

@media (max-width: 992px) {
  .hero-image-column {
    order: 2;
    margin: 10px 0;
    align-items: center;
  }
}

/* Hide the desktop portrait column on mobile — portrait shown inline above */
@media (max-width: 768px) {
  .hero-image-column {
    display: none;
  }
}

/* ── Mobile Portrait Block ──────────────────────── */
/* Hidden on desktop, shown only on mobile */
.hero-mobile-portrait {
  display: none;
}

@media (max-width: 768px) {
  .hero-mobile-portrait {
    display: flex;
    position: relative;
    width: 100%;
    height: 300px;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 5px !important;
    overflow: visible;
  }
}

@media (max-width: 576px) {
  .hero-mobile-portrait {
    height: 260px;
    margin-bottom: 4px !important;
  }
}

@media (max-width: 380px) {
  .hero-mobile-portrait {
    height: 220px;
    margin-bottom: 2px !important;
  }
}

/* Radial glow behind mobile portrait */
.hero-mobile-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 65% at 50% 60%,
    rgba(255, 42, 109, 0.14) 0%,
    rgba(139, 92, 246, 0.08) 50%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 0;
}

/* Tilted orbit ring behind portrait */
.hero-mobile-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.7;
}

/* Portrait image */
.hero-mobile-img {
  position: relative;
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  object-position: bottom center;
  z-index: 2;
  pointer-events: none;
  filter: drop-shadow(0 -8px 30px rgba(255, 42, 109, 0.18));
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 98%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 98%);
}

.hp-mobile-img {
  width: auto !important;
  height: 100% !important;
  max-width: 100% !important;
  object-fit: contain !important;
  object-position: bottom center !important;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 98%) !important;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 98%) !important;
  filter: drop-shadow(0 -8px 30px rgba(139, 92, 246, 0.2)) !important;
  transform: translateY(5px) scale(0.95) !important;
  transform-origin: bottom center;
}

/* Make mobile portrait container for 90HP significantly taller */
.hero-mobile-portrait.is-90hp {
  height: 300px !important;
  margin-bottom: 5px !important;
}

@media (max-width: 576px) {
  .hero-mobile-portrait.is-90hp {
    height: 260px !important;
    margin-bottom: 4px !important;
  }
}

@media (max-width: 380px) {
  .hero-mobile-portrait.is-90hp {
    height: 220px !important;
    margin-bottom: 2px !important;
  }
}

/* Handwritten signature overlay */
.hero-mobile-signature {
  position: absolute;
  bottom: 20%;
  right: 18%;
  font-family: var(--font-tagline);
  font-size: 2.4rem;
  color: var(--accent-cyan);
  transform: rotate(-8deg);
  z-index: 3;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(255, 42, 109, 0.4);
}

.hero-mobile-signature-logo-container {
  position: absolute;
  bottom: 20%;
  right: 18%;
  z-index: 3;
  pointer-events: none;
  width: 100px;
  transform: rotate(-8deg);
}

.hero-mobile-signature-logo {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 8px rgba(255, 42, 109, 0.5));
}

@media (max-width: 576px) {
  .hero-mobile-signature {
    font-size: 2rem;
    right: 15%;
  }
  .hero-mobile-signature-logo-container {
    width: 85px;
    right: 15%;
  }
}

@media (max-width: 380px) {
  .hero-mobile-signature {
    font-size: 1.7rem;
    bottom: 16%;
  }
  .hero-mobile-signature-logo-container {
    width: 70px;
    bottom: 16%;
  }
}

/* Mobile Sparks & Crosses */
.mobile-spark {
  position: absolute;
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.4);
  z-index: 2;
  pointer-events: none;
  filter: drop-shadow(0 0 4px rgba(255, 42, 109, 0.4));
}

.spark-1 {
  top: 15%;
  right: 15%;
}

.spark-2 {
  top: 45%;
  left: 10%;
}

.mobile-cross {
  position: absolute;
  font-family: monospace;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.25);
  z-index: 2;
  pointer-events: none;
}

.mcross-1 {
  top: 25%;
  left: 20%;
}

.mcross-2 {
  bottom: 30%;
  right: 18%;
}

.hero-image-area {
  position: relative;
  width: 100%;
  max-width: 720px;
  height: 780px; /* Taller height to render silhouette even larger */
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transform: translateY(40px); /* Shift it slightly downwards */
}

@media (max-width: 992px) {
  .hero-image-area {
    max-width: 320px;
    height: 360px;
    transform: translateY(0);
  }
}

@media (max-width: 576px) {
  .hero-image-area {
    max-width: 260px;
    height: 300px;
  }
}

/* Planet representation in background */
.planet-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: none;
}

.planet-circle {
  position: absolute;
  width: 520px; /* Increased from 480px */
  height: 520px; /* Increased from 480px */
  background: radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, rgba(255, 42, 109, 0.02) 60%, transparent 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.02);
  border-radius: 50%;
  box-shadow: inset 0 0 30px rgba(139, 92, 246, 0.1), 0 0 40px rgba(255, 42, 109, 0.05);
}

@media (max-width: 992px) {
  .planet-circle {
    width: 280px;
    height: 280px;
  }
}

.planet-ring {
  position: absolute;
  width: 740px; /* Increased from 680px */
  height: 740px; /* Increased from 680px */
  opacity: 0.85;
}

@media (max-width: 992px) {
  .planet-ring {
    width: 400px;
    height: 400px;
  }
}

/* Star doodles */
.star-doodle {
  position: absolute;
  width: 26px;
  height: 26px;
  color: rgba(255, 255, 255, 0.35);
  z-index: 2;
  pointer-events: none;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.15));
}

.star-top {
  top: 6%;
  left: 28%;
}

.star-right {
  top: 38%;
  right: -5%;
}

/* Decorative Crosses */
.doodle-cross {
  position: absolute;
  font-family: monospace;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.2);
  z-index: 2;
  pointer-events: none;
}

.cross-1 {
  top: 18%;
  left: 5%;
}

.cross-2 {
  top: 25%;
  left: -2%;
}

.cross-3 {
  top: 32%;
  left: 8%;
}

.hero-portrait-img {
  width: 100%;
  height: 100%; /* Spans full height of the tall container */
  object-fit: contain;
  object-position: bottom center;
  z-index: 2;
  position: relative;
  pointer-events: none;
}

.hero-portrait-img.hp-portrait {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom center;
  z-index: 2;
  position: relative;
  pointer-events: none;
  filter: drop-shadow(0 -10px 40px rgba(139, 92, 246, 0.2));
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 98%) !important;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 98%) !important;
}

/* Handwritten signature script overlay */
.handdrawn-signature {
  position: absolute;
  bottom: 30%;
  right: 12%;
  font-family: var(--font-tagline);
  font-size: 3.5rem;
  color: var(--accent-cyan);
  transform: rotate(-8deg);
  z-index: 3;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(255, 42, 109, 0.4);
}

.handdrawn-signature {
  position: absolute;
  bottom: 30%;
  right: 12%;
  font-family: var(--font-tagline);
  font-size: 3.5rem;
  color: var(--accent-cyan);
  transform: rotate(-8deg);
  z-index: 3;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(255, 42, 109, 0.4);
}

.hero-signature-logo-container {
  position: absolute;
  bottom: 30%;
  right: 12%;
  z-index: 3;
  pointer-events: none;
  width: 140px;
  transform: rotate(-8deg);
}

.hero-signature-logo {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 12px rgba(255, 42, 109, 0.5));
}

@media (max-width: 992px) {
  .handdrawn-signature {
    font-size: 2.8rem;
    bottom: 22%;
    right: 10%;
  }
  .hero-signature-logo-container {
    width: 110px;
    bottom: 22%;
    right: 10%;
  }
}

/* Bottom Row: Social metrics horizontal card */
.hero-social-metrics-row {
  margin-top: -80px; /* Pull it up on desktop to overlay in front of the silhouette's bottom edge */
  width: 100%;
  z-index: 10;
  position: relative;
}

@media (max-width: 992px) {
  .hero-social-metrics-row {
    order: 4;
    margin-top: 30px;
  }
}

.social-metrics-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(22, 25, 38, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 25px 40px;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  max-width: calc(var(--num-socials) * 280px);
  margin: 0 auto;
  width: 100%;
}

.social-metrics-container::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(to bottom, rgba(255, 42, 109, 0.1), transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

@media (max-width: 768px) {
  .social-metrics-container {
    display: grid;
    grid-template-columns: repeat(var(--num-socials), 1fr);
    padding: 16px 8px;
    gap: 0;
    max-width: 100%;
  }
  .social-card:not(.last-social-card) {
    border-right: 1px solid rgba(255, 255, 255, 0.05);
  }
}

@media (max-width: 576px) {
  .social-metrics-container {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
    padding: 16px 12px !important;
    gap: 0 !important;
    max-width: 100%;
    scrollbar-width: none; /* Hide scrollbar Firefox */
  }
  .social-metrics-container::-webkit-scrollbar {
    display: none; /* Hide scrollbar Chrome/Safari */
  }
  .social-card {
    flex: 0 0 115px !important;
    min-width: 115px !important;
  }
  .social-card:not(.last-social-card) {
    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
  }
  .metric-handle {
    font-size: 0.8rem !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
  }
}

.social-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: var(--transition-smooth);
}



.icon-wrapper {
  color: var(--accent-cyan);
  margin-bottom: 10px;
  opacity: 0.85;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper svg {
  width: 38px !important;
  height: 38px !important;
}

.social-card:hover .icon-wrapper {
  opacity: 1;
  filter: drop-shadow(0 0 8px rgba(255, 42, 109, 0.6));
  transform: scale(1.15);
}

.metric-handle {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: var(--transition-smooth);
}

.social-card:hover .metric-handle {
  color: var(--accent-cyan);
  text-shadow: 0 0 10px rgba(255, 42, 109, 0.4);
}

@media (max-width: 768px) {
  .icon-wrapper svg {
    width: 28px !important;
    height: 28px !important;
  }
  .metric-handle {
    font-size: 0.9rem !important;
  }
}

@media (max-width: 480px) {
  .icon-wrapper svg {
    width: 22px !important;
    height: 22px !important;
  }
  .metric-handle {
    font-size: 0.75rem !important;
  }
}

.social-divider {
  width: 1px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .social-divider {
    display: none;
  }
}

/* Yori Specific Hero Image and Area Adjustments */
.yori-image-area {
  transform: translateY(15px) scale(0.95) !important;
}

.yori-portrait {
  filter: drop-shadow(0 -10px 40px rgba(255, 42, 109, 0.25));
}

.yori-mobile-img {
  transform: translateY(5px) scale(0.95) !important;
  transform-origin: bottom center;
}

/* 90HP Specific Hero Image and Area Adjustments */
.hp-image-area {
  transform: translateY(15px) scale(0.95) !important;
}

@media (max-width: 992px) {
  .yori-image-area,
  .hp-image-area {
    transform: translateY(5px) scale(0.85) !important;
  }
}
</style>
