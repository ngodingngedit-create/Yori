<template>
  <section id="about" class="about-social-section section">
    <div class="about-container container">
      <!-- Left side: Bio -->
      <div class="bio-column">
        <h2 class="section-title">ABOUT YoRI</h2>
        <p class="bio-text">
          YoRI (Aurel Mayori) memulai karier di dunia hiburan sejak usia 9 tahun sebagai aktris. Perjalanan panjangnya dari mantan member idol group hingga solo artist membentuk identitasnya sebagai penulis lagu dengan lirik puitis, penuh emosi, dan selalu bereksplorasi di berbagai genre musik.
        </p>
        <a href="#about-detail" class="btn btn-outline btn-more-about">
          <span>MORE ABOUT YoRI</span>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" class="arrow-icon">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>

      <!-- Right side: Social metrics row -->
      <div class="socials-column">
        <div class="social-metrics-container">
          <!-- Instagram -->
          <div class="social-card">
            <div class="icon-wrapper instagram">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div class="metric-count">238K</div>
            <div class="metric-label">FOLLOWERS</div>
            <div class="metric-handle">@yoribeneran</div>
          </div>

          <!-- Divider -->
          <div class="social-divider"></div>

          <!-- TikTok -->
          <div class="social-card">
            <div class="icon-wrapper tiktok">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </div>
            <div class="metric-count">535K</div>
            <div class="metric-label">FOLLOWERS</div>
            <div class="metric-handle">@yoribeneran</div>
          </div>

          <!-- Divider -->
          <div class="social-divider"></div>

          <!-- X -->
          <div class="social-card">
            <div class="icon-wrapper twitter-x">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <div class="metric-count">46.7K</div>
            <div class="metric-label">FOLLOWERS</div>
            <div class="metric-handle">@ItsYoRi</div>
          </div>

          <!-- Divider -->
          <div class="social-divider"></div>

          <!-- YouTube -->
          <div class="social-card">
            <div class="icon-wrapper youtube">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </div>
            <div class="metric-count">181K</div>
            <div class="metric-label">FOLLOWERS</div>
            <div class="metric-handle">YoRi</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-social-section {
  background-color: var(--bg-dark);
  border-top: 1px solid rgba(24, 28, 38, 0.4);
  position: relative;
  z-index: 10;
}

.about-container {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 80px;
  align-items: center;
}

@media (max-width: 1024px) {
  .about-container {
    grid-template-columns: 1fr;
    gap: 50px;
  }
}

/* Bio Column Styling */
.bio-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (max-width: 1024px) {
  .bio-column {
    align-items: center;
    text-align: center;
  }
}

.section-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent-cyan);
  text-shadow: 0 0 8px rgba(255, 42, 109, 0.3);
  margin-bottom: 20px;
  text-transform: uppercase;
}

.bio-text {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.75;
  margin-bottom: 30px;
}

.btn-more-about {
  padding: 10px 24px;
  font-size: 0.88rem;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border-radius: 9999px;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: var(--text-primary);
  text-decoration: none;
  font-family: var(--font-heading);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.btn-more-about:hover {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  box-shadow: 0 0 15px rgba(255, 42, 109, 0.25);
  transform: translateY(-2px);
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.btn-more-about:hover .arrow-icon {
  transform: translateX(4px);
}

/* Social Grid Metrics Styling */
.socials-column {
  width: 100%;
}

.social-metrics-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  padding: 40px 20px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.social-metrics-container::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(to bottom, rgba(255, 42, 109, 0.1), transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

@media (max-width: 768px) {
  .social-metrics-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px 10px;
    padding: 30px 10px;
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
  transform: translateY(-5px);
}

.icon-wrapper {
  color: var(--accent-cyan);
  margin-bottom: 15px;
  opacity: 0.85;
  transition: var(--transition-smooth);
}

.social-card:hover .icon-wrapper {
  opacity: 1;
  color: var(--accent-cyan);
  filter: drop-shadow(0 0 8px rgba(255, 42, 109, 0.6));
}

.instagram svg, .tiktok svg, .youtube svg {
  stroke-width: 1.75;
}

.metric-count {
  font-family: var(--font-heading);
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--accent-cyan);
  line-height: 1.1;
  margin-bottom: 4px;
  text-shadow: 0 0 15px rgba(255, 42, 109, 0.25);
  transition: var(--transition-smooth);
}

.social-card:hover .metric-count {
  text-shadow: 0 0 20px rgba(255, 42, 109, 0.6);
}

.metric-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.metric-handle {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-secondary);
}

/* Vertical Dividers */
.social-divider {
  width: 1px;
  height: 80px;
  background-color: var(--border-card);
}

@media (max-width: 768px) {
  .social-divider {
    display: none;
  }
}
</style>
