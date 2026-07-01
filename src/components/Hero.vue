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
          <h1 class="hero-title">
            <span class="yo">{{ activeArtist.titleYo }}</span><span class="ri">{{ activeArtist.titleRi }}</span>
          </h1>

          <!-- Mobile portrait/logo — replaces the title on small screens -->
          <!-- 90 HORSEPOWER MOBILE PORTRAIT & LOGO -->
          <div class="hero-mobile-portrait">
            <div class="hero-mobile-glow"></div>
            <!-- Double orbit rings -->
            <svg class="hero-mobile-ring" viewBox="0 0 500 500" fill="none">
              <ellipse cx="250" cy="250" rx="220" ry="70" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" transform="rotate(-20 250 250)" />
              <ellipse cx="250" cy="250" rx="180" ry="50" stroke="rgba(255, 42, 109, 0.15)" stroke-width="1" transform="rotate(-10 250 250)" />
            </svg>
            <!-- Sparks / Stars -->
            <svg class="mobile-spark spark-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" />
            </svg>
            <svg class="mobile-spark spark-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" />
            </svg>
            <span class="mobile-cross mcross-1">+</span>
            <span class="mobile-cross mcross-2">+</span>

            <img :src="activeArtist.heroImage" :alt="activeArtist.name + ' Portrait'" class="hero-mobile-img" :class="{ 'is-logo': currentArtist === '90hp' }" />
            <div class="hero-mobile-signature">{{ activeArtist.signature }}</div>
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
          <div class="hero-image-area">
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
            <img :src="activeArtist.heroImage" :alt="activeArtist.name + ' Portrait'" class="hero-portrait-img" :class="{ 'is-logo': currentArtist === '90hp' }" />

            <!-- Handwritten signature overlay on the right -->
            <div class="handdrawn-signature">{{ activeArtist.signature }}</div>
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
                <!-- Spotify -->
                <svg v-else-if="key === 'spotify'" viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.076-.67-.135-.747-.472-.077-.336.136-.67.472-.747 3.844-.877 7.14-.5 9.82 1.14.296.18.387.563.207.86zm1.226-2.723c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.078-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.665-1.112 8.232-.572 11.347 1.343.367.227.487.708.26 1.074zm.106-2.833C14.444 8.766 8.7 8.577 5.372 9.587c-.53.16-1.09-.142-1.25-.672-.16-.53.142-1.09.672-1.25 3.818-1.16 10.15-.94 14.164 1.442.477.285.632.9.347 1.378-.285.477-.9.632-1.378.347z"/>
                </svg>
              </div>
              <div class="metric-count">{{ social.count }}</div>
              <div class="metric-label">{{ key === 'youtube' ? 'SUBSCRIBERS' : (key === 'spotify' ? 'SPOTIFY' : 'FOLLOWERS') }}</div>
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

@media (max-width: 1200px) {
  .hero-title {
    font-size: 6rem;
    letter-spacing: -3px;
  }
}

/* Hide the text title on mobile — replaced by portrait image */
@media (max-width: 768px) {
  .hero-title {
    display: none;
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
    font-size: 2.1rem;
  }
}

@media (max-width: 380px) {
  .hero-tagline {
    font-size: 1.8rem;
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
    height: 340px;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 20px;
    overflow: visible;
  }
}

@media (max-width: 576px) {
  .hero-mobile-portrait {
    height: 300px;
    margin-bottom: 16px;
  }
}

@media (max-width: 380px) {
  .hero-mobile-portrait {
    height: 260px;
    margin-bottom: 12px;
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

/* Handwritten signature overlay */
.hero-mobile-signature {
  position: absolute;
  bottom: 14%;
  right: 8%;
  font-family: var(--font-tagline);
  font-size: 2.4rem;
  color: var(--accent-cyan);
  transform: rotate(-8deg);
  z-index: 3;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(255, 42, 109, 0.4);
}

@media (max-width: 576px) {
  .hero-mobile-signature {
    font-size: 2rem;
    right: 6%;
  }
}

@media (max-width: 380px) {
  .hero-mobile-signature {
    font-size: 1.7rem;
    bottom: 10%;
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

/* Handwritten signature script overlay */
.handdrawn-signature {
  position: absolute;
  bottom: 22%;
  right: -5%;
  font-family: var(--font-tagline);
  font-size: 3.5rem;
  color: var(--accent-cyan);
  transform: rotate(-8deg);
  z-index: 3;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(255, 42, 109, 0.4);
}

@media (max-width: 992px) {
  .handdrawn-signature {
    font-size: 2.8rem;
    bottom: 15%;
    right: -2%;
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
    flex: 0 0 95px !important;
    min-width: 95px !important;
  }
  .social-card:not(.last-social-card) {
    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
  }
  .metric-count {
    font-size: 1.15rem !important;
  }
  .metric-label {
    font-size: 0.48rem !important;
    letter-spacing: 0.5px !important;
  }
  .metric-handle {
    font-size: 0.6rem !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 85px;
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

.social-card:hover {
  /* No vertical card movement */
}

.icon-wrapper {
  color: var(--accent-cyan);
  margin-bottom: 8px;
  opacity: 0.85;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-card:hover .icon-wrapper {
  opacity: 1;
  filter: drop-shadow(0 0 8px rgba(255, 42, 109, 0.6));
  transform: scale(1.15);
}

.metric-count {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--accent-cyan);
  line-height: 1.1;
  margin-bottom: 2px;
  text-shadow: 0 0 15px rgba(255, 42, 109, 0.2);
  transition: var(--transition-smooth);
}

.social-card:hover .metric-count {
  text-shadow: 0 0 20px rgba(255, 42, 109, 0.5);
}

.metric-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.metric-handle {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .icon-wrapper svg {
    width: 20px;
    height: 20px;
  }
  .metric-count {
    font-size: 1.25rem;
  }
  .metric-label {
    font-size: 0.5rem;
    letter-spacing: 0.8px;
    margin-bottom: 2px;
  }
  .metric-handle {
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .icon-wrapper svg {
    width: 18px;
    height: 18px;
  }
  .metric-count {
    font-size: 1.15rem;
  }
  .metric-label {
    font-size: 0.45rem;
    letter-spacing: 0.5px;
  }
  .metric-handle {
    font-size: 0.58rem;
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
</style>
