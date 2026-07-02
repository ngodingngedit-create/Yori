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
          <img v-else-if="currentArtist === 'yori'" src="/logo/YoriLogo.png" class="logo-img" alt="YoRI Logo" />
          <!-- 90 HORSEPOWER LOGO -->
          <img v-else src="/90horsepower/logo90.png" class="logo-img logo-img-90hp" alt="Ninety Horsepower Logo" />
        </a>

        <!-- Social Icons Group -->
        <div class="footer-socials">
          <template v-for="(social, key) in activeArtist.socials" :key="key">
            <a :href="social.url" target="_blank" class="social-icon" :aria-label="key">
              <!-- Instagram -->
              <svg v-if="key === 'instagram'" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>

              <!-- TikTok -->
              <svg v-else-if="key === 'tiktok'" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>

              <!-- YouTube -->
              <svg v-else-if="key === 'youtube'" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>

              <!-- X / Twitter -->
              <svg v-else-if="key === 'x'" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>

              <!-- Spotify -->
              <svg v-else-if="key === 'spotify'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.076-.67-.135-.747-.472-.077-.336.136-.67.472-.747 3.844-.877 7.14-.5 9.82 1.14.296.18.387.563.207.86zm1.226-2.723c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.078-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.665-1.112 8.232-.572 11.347 1.343.367.227.487.708.26 1.074zm.106-2.833C14.444 8.766 8.7 8.577 5.372 9.587c-.53.16-1.09-.142-1.25-.672-.16-.53.142-1.09.672-1.25 3.818-1.16 10.15-.94 14.164 1.442.477.285.632.9.347 1.378-.285.477-.9.632-1.378.347z"/>
              </svg>
            </a>
          </template>
        </div>
      </div>

      <!-- Divider line -->
      <div class="footer-divider"></div>

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <p class="copyright">&copy; 2026 Indonesia's Alternative Sound Inspired by Japan</p>
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
  height: 48px;
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
    height: 36px;
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
