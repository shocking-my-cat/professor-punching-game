---
name: Raucous Arcade
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#5b403d'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#8f6f6c'
  outline-variant: '#e4beb9'
  surface-tint: '#b91c1c'
  primary: '#93000b'
  on-primary: '#ffffff'
  primary-container: '#b91c1c'
  on-primary-container: '#ffcdc7'
  inverse-primary: '#ffb4ab'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#454747'
  on-tertiary: '#ffffff'
  tertiary-container: '#5d5e5f'
  on-tertiary-container: '#d7d8d8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Anton
    fontSize: 84px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 32px
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 36px
  body-lg:
    fontFamily: Space Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Space Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 16px
  code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  border-width: 4px
  shadow-offset: 8px
---

## Brand & Style

This design system is built on a foundation of **Neo-Brutalism** fused with a **Retro-Arcade** aesthetic. It is designed to feel loud, unapologetic, and slightly chaotic—reminiscent of B-grade comedy posters and late-night gaming dens. 

The personality is aggressive and high-energy. It rejects the "softness" of modern SaaS interfaces in favor of raw, structural honesty and high visual impact. Every element is designed to feel physical, like a heavy plastic button or a printed pulp magazine. White space is used not for "breathing room," but as a high-contrast separator to make the deep reds and blacks pop.

## Colors

The palette is intentionally restricted to create a jarring, high-impact visual hierarchy. 

*   **Primary (Deep Red):** Used for critical calls to action, urgent alerts, and decorative accents that need to "scream."
*   **Secondary (Stark Black):** The structural backbone. Used for all borders, shadows, and heavy text.
*   **Tertiary (Bold White):** The primary surface color for cards and input fields to ensure maximum legibility against the heavy black shadows.
*   **Background:** Use a slightly off-white or light gray to prevent extreme eye strain while maintaining the brutalist edge.

Hover states must involve an "Invert" logic: backgrounds become black and text becomes white/red, or backgrounds shift to primary red.

## Typography

Typography is a tool for impact here. 

*   **Headlines:** Use **Anton** for all display and heading levels. It should almost always be uppercase. The tight tracking and verticality mimic vintage cinema billing and arcade marquees.
*   **Body & UI:** Use **Space Mono** for body copy. The monospaced nature reinforces the technical, retro-computer aesthetic.
*   **Labels:** **JetBrains Mono** provides high legibility for small UI elements, buttons, and data-heavy labels.

Never use italics. If emphasis is needed, use bolding or color fills behind the text.

## Layout & Spacing

The layout follows a **Rigid Grid** philosophy. Elements should feel "locked" into place.

*   **Grid:** A 12-column system for desktop with 0px or very small gutters to allow elements to touch, creating a "blocked-in" look.
*   **Gutters & Margins:** Use 24px margins for mobile and 48px for desktop.
*   **Rhythm:** All spacing must be multiples of 4px. Use heavy padding (24px+) inside cards to balance the thick 4px borders.
*   **Stacking:** Elements should often overlap their shadows, creating a sense of physical layers on a flat surface.

## Elevation & Depth

This design system rejects shadows with blurs. Depth is communicated exclusively through **Hard Drop Shadows** and **Bold Outlines**.

*   **The "Hard Shadow":** Every interactive or elevated element must have a solid black shadow offset by 8px (bottom and right). 
*   **Borders:** A universal 4px black border is required for all containers, buttons, and inputs.
*   **State Changes:** On "Active" or "Pressed" states, the element should translate 4px or 8px towards the shadow, effectively "pushing" the button into the page and hiding the shadow.
*   **Layering:** High-priority modals or pop-ups use a thicker shadow (12px or 16px) to indicate they are further from the "ground."

## Shapes

The shape language is **Strictly Geometric and Sharp**. 

All corners must be 0px (Sharp). This reinforces the brutalist architecture and the pixel-perfect nature of retro arcade interfaces. Circular elements are permitted only for specific iconography or "Coin" style badges, but even then, they must maintain the 4px black stroke and 8px hard shadow.

## Components

*   **Buttons:** Must have a 4px black border and an 8px hard black shadow. Text is uppercase Anton. Hover state: Background color changes to Primary Red, shadow stays black. Active state: Element translates +4px down and right.
*   **Cards:** White background, 4px border, 8px shadow. Header sections of cards should have a 4px bottom border separating them from the content.
*   **Input Fields:** Rectangular, white background, 4px black border. Focus state: Border color changes to Primary Red, or gains a "halo" of a secondary 4px border.
*   **Chips/Tags:** Small rectangles with 2px or 4px borders. No shadows for non-interactive tags.
*   **Checkboxes/Radios:** Large 24px squares. Checkmarks should be thick, "X" shaped marks rather than traditional ticks to maintain the aggressive aesthetic.
*   **Lists:** Items separated by 4px horizontal lines. Each list item should have a high-contrast hover fill (Black background with Red text).
*   **Progress Bars:** Blocky, segmented bars. Each segment should be a hard rectangle, looking like a volume meter on a 90s stereo.