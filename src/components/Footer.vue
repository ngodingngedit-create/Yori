<script setup>
import { computed } from 'vue';
import { navigateTo, currentArtist, currentPage } from '../routerState.js';
import { artistData } from '../artistData.js';

const activeArtist = computed(() => artistData[currentArtist.value]);
</script>

<template>
  <!-- ================= 90 HORSEPOWER FOOTER SECTION ================= -->
  <footer class="footer">
    <div class="footer-container container">
      <!-- Top Section -->
      <div class="footer-top">
        <!-- Logo -->
        <a href="#" @click.prevent="navigateTo('home')" class="logo">
          <img v-if="currentPage === 'burakku'" src="/logo/Burakku Logo black (1).png" class="logo-img logo-img-burakku" alt="Burakku Logo" />
          <img v-else-if="currentArtist === 'yori'" src="/logo/logo.png" class="logo-img" alt="YoRI Logo" />
          <!-- 90 HORSEPOWER LOGO -->
          <img v-else src="/90horsepower/logo90.png" class="logo-img logo-img-90hp" alt="Ninety Horsepower Logo" />
        </a>

        <!-- Social Icons Group -->
        <div class="footer-socials">
          <!-- Instagram -->
          <a :href="activeArtist.socials.instagram.url" target="_blank" class="social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          <!-- TikTok -->
          <a :href="activeArtist.socials.tiktok.url" target="_blank" class="social-icon" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </a>

          <!-- X -->
          <a :href="activeArtist.socials.x.url" target="_blank" class="social-icon" aria-label="X">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          <!-- YouTube -->
          <a :href="activeArtist.socials.youtube.url" target="_blank" class="social-icon" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
        </div>
      </div>

      <!-- Divider line -->
      <div class="footer-divider"></div>

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <p class="copyright">&copy; 2026 {{ activeArtist.name }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--bg-dark);
  border-top: 1px solid var(--border-card);
  padding: 20px 0 15px;
  position: relative;
  z-index: 10;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 80px;
  width: auto;
  object-fit: contain;
  display: block;
  transition: height var(--transition-smooth);
}

.logo-img.logo-img-90hp {
  height: 270px;
}

.logo-img.logo-img-burakku {
  height: 52px;
  padding: 7px 18px;
  transform: none;
}

@media (max-width: 768px) {
  .logo-img {
    height: 100px;
  }
  .logo-img.logo-img-90hp {
    height: 240px;
  }
  .logo-img.logo-img-burakku {
    height: 40px !important;
    padding: 5px 12px !important;
  }
}

.footer-links {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  font-family: var(--font-heading);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  transition: var(--transition-smooth);
}

.footer-link:hover {
  color: var(--accent-cyan);
  text-shadow: 0 0 8px rgba(255, 42, 109, 0.4);
}

.footer-socials {
  display: flex;
  gap: 20px;
  align-items: center;
}

.social-icon {
  color: var(--text-secondary);
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid transparent;
}

.social-icon:hover {
  color: var(--accent-cyan);
  background-color: rgba(255, 42, 109, 0.05);
  border-color: rgba(255, 42, 109, 0.3);
  filter: drop-shadow(0 0 8px rgba(255, 42, 109, 0.5));
}

.footer-divider {
  width: 100%;
  height: 1px;
  background-color: var(--border-card);
  margin-bottom: 12px;
}

.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}

.copyright {
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>
