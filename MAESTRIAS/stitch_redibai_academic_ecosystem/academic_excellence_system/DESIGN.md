---
name: Academic Excellence System
colors:
  surface: '#111415'
  surface-dim: '#111415'
  surface-bright: '#373a3b'
  surface-container-lowest: '#0c0f10'
  surface-container-low: '#191c1d'
  surface-container: '#1d2021'
  surface-container-high: '#282a2b'
  surface-container-highest: '#323536'
  on-surface: '#e1e3e4'
  on-surface-variant: '#c5c6cd'
  inverse-surface: '#e1e3e4'
  inverse-on-surface: '#2e3132'
  outline: '#8f9097'
  outline-variant: '#44474d'
  surface-tint: '#b9c7e4'
  primary: '#b9c7e4'
  on-primary: '#233148'
  primary-container: '#0a192f'
  on-primary-container: '#74829d'
  inverse-primary: '#515f78'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#bcc7dc'
  on-tertiary: '#263141'
  tertiary-container: '#0e1929'
  on-tertiary-container: '#778296'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#d7e3f9'
  tertiary-fixed-dim: '#bcc7dc'
  on-tertiary-fixed: '#111c2c'
  on-tertiary-fixed-variant: '#3c4759'
  background: '#111415'
  on-background: '#e1e3e4'
  surface-variant: '#323536'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-desktop: 40px
  container-padding-mobile: 20px
  gutter: 24px
  section-gap: 80px
  card-gap: 24px
---

## Brand & Style

This design system embodies the prestige of a world-class educational institution while maintaining the frictionless efficiency of modern digital platforms. It is designed to evoke feelings of ambition, intellectual rigor, and premium exclusivity.

The aesthetic is a sophisticated blend of **Corporate Modern** and **Glassmorphism**, characterized by:
- **Institutional Authority:** Heavy reliance on structured grids and high-contrast editorial typography.
- **Digital Sophistication:** Subtle translucent layers and background blurs that suggest depth and modernity.
- **Cinematic Atmosphere:** Rich, immersive environments in dark mode that prioritize focus and long-form engagement.
- **Intellectual Clarity:** Generous whitespace and a curated information hierarchy inspired by high-end editorial design.

The target audience consists of students, researchers, and administrators who expect a digital environment as refined as a physical campus gallery or a modern executive suite.

## Colors

The palette is anchored in traditional academic power colors, reimagined for high-fidelity digital displays.

- **Primary & Deep Neutrals:** Deep Navy and Midnight Blue form the foundation. In dark mode, these create an "infinite depth" effect. In light mode, they are used sparingly for typography and structural borders to maintain authority.
- **The Golden Thread:** Premium Gold is used as a functional accent, signifying achievement, interaction, and progress. It should be used with restraint to maintain its "premium" status.
- **Glassmorphism:** Both modes utilize translucent surfaces. Dark mode uses a tinted Navy blur, while light mode uses a soft White frost. 
- **Functional Gradients:** Subtle radial gradients (from #0A192F to #020C1B) should be used behind high-level dashboards to create a cinematic focal point.

## Typography

The typography system follows an editorial "High-Low" philosophy:
- **The High:** Libre Caslon Text brings historical weight and academic elegance. Use it for page titles, section headings, and impactful pull-quotes.
- **The Low:** Inter provides a clean, neutral balance, ensuring complex data and long-form instructional text remain highly legible across all devices.

**Hierarchy Rules:**
- Use `label-caps` for eyebrows and small metadata to create a "monograph" feel.
- Ensure large display titles have enough breathing room (top/bottom margins) to stand as design elements themselves.
- In Dark Mode, reduce the weight of Inter body text slightly or use a softer gray to prevent visual "vibration" against the navy background.

## Layout & Spacing

This design system employs a **Fluid Grid** model with high-margin "safe zones" to mimic the layout of a premium magazine or textbook.

- **Desktop (1440px+):** 12-column grid. Sidebars are fixed at 280px to maintain a steady navigation anchor. Content uses a wide center-gutter.
- **Tablet (768px - 1024px):** 8-column grid. Margins shrink to 32px. Sidebars collapse into a persistent glassmorphic bottom bar or "hamburger" menu.
- **Mobile (Up to 767px):** 4-column grid. Vertical stacking is mandatory. Emphasis shifts to card-based layouts with 20px edge padding.

**Spacing Rhythm:**
Use an 8px linear scale. Large-scale components (sections) should be separated by 80px (`section-gap`) to allow the design to "breathe" and signal a shift in intellectual context.

## Elevation & Depth

Depth is signaled through **Backdrop Blurs** rather than traditional heavy shadows.

1.  **Level 0 (Base):** The primary background color. In dark mode, this is a midnight gradient; in light mode, a soft white.
2.  **Level 1 (Cards):** Subtly lighter/darker than the base with a thin 1px border (`rgba(white, 0.1)` in dark mode).
3.  **Level 2 (Glass Overlays):** Used for navigation bars and modals. High blur (20px - 40px) with 70% opacity.
4.  **The "Gold Glow":** Floating action elements or active states use a soft, diffused gold outer glow (`drop-shadow: 0 4px 20px rgba(212, 175, 55, 0.15)`) instead of black shadows.

## Shapes

The shape language is **Refined and Intentional**. 

- **Standard Elements:** Buttons and small input fields use a `0.5rem` (8px) radius to feel modern but structured.
- **Container Elements:** Large cards and dashboard modules use `1rem` (16px) to soften the institutional feel.
- **Interactive Triggers:** Select active states or "pill" badges use a full radius for immediate recognition as a clickable/removable element.

Avoid sharp 0px corners, as they feel too utilitarian. Avoid 32px+ "bubbly" corners, as they undermine the premium, serious nature of the educational content.

## Components

- **Buttons:** 
  - *Primary:* Solid Gold background with Navy text. No border.
  - *Secondary:* Transparent with a 1px Navy or White border (based on mode).
  - *Tertiary:* Ghost style with Gold text and a 2px underline on hover.
- **Elegant Cards:** Cards must have a subtle internal gradient. Header areas within cards should use `label-caps` for titles.
- **Input Fields:** Use "Material-style" floating labels but with Inter typography. Understated borders that highlight in Gold upon focus.
- **Chips/Badges:** Small, low-saturation backgrounds with high-contrast text. Used for status (e.g., "En curso", "Completado").
- **Progress Indicators:** Linear, thin bars using a Gold-to-Navy gradient to represent the journey of learning.
- **Icons:** Custom line icons with a consistent 1.5px stroke width. Key active icons can feature a small "Gold Dot" notification or highlight.