<script setup>
import { navigateTo } from '../routerState.js';
</script>

<template>
  <footer class="footer">
    <div class="footer-container container">
      <!-- Top Section -->
      <div class="footer-top">
        <!-- Logo -->
        <a href="#" @click.prevent="navigateTo('home')" class="logo">
          <img src="/logo/logo.png" class="logo-img" alt="YoRI Logo" />
        </a>

        <!-- Social Icons Group -->
        <div class="footer-socials">
          <!-- Instagram -->
          <a href="#" class="social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          <!-- TikTok -->
          <a href="#" class="social-icon" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </a>

          <!-- X -->
          <a href="#" class="social-icon" aria-label="X">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          <!-- YouTube -->
          <a href="#" class="social-icon" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>

          <!-- Spotify -->
          <a href="#" class="social-icon" aria-label="Spotify">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.377-1.454-5.37-1.783-8.894-1.007-.336.08-.668-.135-.75-.47-.08-.335.136-.667.472-.75 3.858-.875 7.158-.497 9.822 1.134.293.18.388.563.207.856zm1.224-2.724c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.847-.107-.972-.52-.125-.413.108-.847.52-.972 3.676-1.115 8.243-.57 11.35 1.343.366.226.486.707.26 1.073zm.105-2.833C14.707 8.747 9.4 8.57 6.326 9.502c-.477.145-.975-.125-1.12-.602-.145-.477.125-.975.602-1.12C9.336 6.706 15.19 6.9 18.9 9.102c.428.254.57.81.315 1.238-.255.428-.81.57-1.238.315z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Divider line -->
      <div class="footer-divider"></div>

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <p class="copyright">&copy; 2026 YoRi. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--bg-dark);
  border-top: 1px solid var(--border-card);
  padding: 40px 0 25px;
  position: relative;
  z-index: 10;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    text-align: center;
    gap: 24px;
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

@media (max-width: 768px) {
  .logo-img {
    height: 100px;
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
  margin-bottom: 25px;
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
