# Design System Specification: The Academic Edge

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Scholastic"**

This design system transcends the typical "institutional" aesthetic to create a high-end, editorial-grade experience for the CUNY AI Literacy and Professional Readiness Series. Rather than a static repository of information, the UI is envisioned as a **Digital Curator**. It balances the weight of academic authority with the fluid, forward-thinking nature of Artificial Intelligence.

We break the "template" look by utilizing **intentional asymmetry**—offsetting headings against dense body blocks and using aggressive whitespace as a structural element. The experience should feel like a premium digital journal: breathable, intellectually stimulating, and meticulously layered. We move away from rigid boxes and lines, favoring a "Tonal Architecture" where content is defined by light, shadow, and depth rather than borders.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the CUNY Navy, but expanded into a sophisticated range of tonal tiers to allow for nuanced layering.

*   **Primary Identity:** `primary` (#00216f) and `primary_container` (#0033a1) act as the anchor of authority.
*   **The Gold Accent:** `secondary_container` (#feb71a) is used sparingly for high-value interactions and intellectual highlights.
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be created through background shifts. For example, a `surface_container_low` (#eef4fc) card should sit on a `surface` (#f6f9ff) background to define its edges.
*   **Surface Hierarchy & Nesting:** Treat the UI as a physical stack of fine paper. 
    *   **Level 0 (Base):** `surface` (#f6f9ff)
    *   **Level 1 (Sections):** `surface_container` (#e8eff7)
    *   **Level 2 (Active Elements):** `surface_container_highest` (#dce3eb)
*   **The Glass & Gradient Rule:** For floating navigation or modal overlays, use `surface_container_lowest` (#ffffff) at 80% opacity with a `24px` backdrop-blur. Apply a subtle linear gradient (from `primary` to `primary_container`) on hero buttons to give them a "machined" professional finish.

---

## 3. Typography: The Editorial Voice
We utilize **Inter** for its mathematical precision and high-contrast readability.

*   **Display (Large/Medium):** These are your "Statement" styles. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create an authoritative, headline-driven look.
*   **Headline (Small/Medium):** Acts as the secondary narrative voice. Pair these with high whitespace to let the academic concepts breathe.
*   **Body (Large/Medium):** Set in `body-lg` (1rem) for maximum legibility. Line height should be generous (1.6) to prevent "text walls" and facilitate scanning.
*   **Labels:** Use `label-md` (0.75rem) in `on_surface_variant` (#444653) for metadata, ensuring a clear distinction between content and context.

The hierarchy is designed to guide the eye from "The Big Idea" (Display) to "The Supporting Evidence" (Body), mimicking the flow of a scholarly paper.

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, not structural lines.

*   **The Layering Principle:** To lift a card, place a `surface_container_lowest` (Pure White) object on top of a `surface_container` (Soft Blue-Gray) section. The contrast in value provides the "lift" naturally.
*   **Ambient Shadows:** For high-priority floating elements (like a "Join Series" FAB), use a shadow with a `32px` blur, 0 offset, and `6%` opacity using the `on_surface` color. It should feel like a soft glow, not a drop shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., in high-contrast mode), use `outline_variant` at 15% opacity. It should be felt, not seen.
*   **Glassmorphism:** Use semi-transparent layers for elements that overlap content. This maintains the "Modern" feel and ensures the layout feels like a cohesive ecosystem rather than a series of disconnected boxes.

---

## 5. Components

### Buttons
*   **Primary:** High-contrast `primary` background with `on_primary` text. `xl` (0.75rem) roundedness. Use a subtle gradient transition to `primary_container`.
*   **Secondary:** `surface_container_high` background with `primary` text. No border.
*   **Tertiary:** No background. `primary` text with a bold weight.

### Cards & Lists
*   **Cards:** Forbid divider lines. Separate card sections using a vertical spacing of `2rem`. Use `surface_container_low` for the card body to create a soft separation from the `surface` background.
*   **Lists:** Leading elements (icons/numbers) should use `primary_fixed` to highlight the "Steps" in the readiness series.

### Input Fields
*   **State Styling:** Use `surface_container_lowest` for the field background. The `outline` should only appear on focus, using `primary` at a 2px thickness to signal active engagement.
*   **Error States:** Use `error` (#ba1a1a) for helper text, paired with a `error_container` background shift for the entire field.

### AI Contextual Module (Signature Component)
*   **The "Insight" Chip:** A glassmorphic container with a `secondary_container` (#feb71a) left-accent bar. This is used for "AI Tips" or "Professional Readiness" callouts, breaking the grid to grab attention.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use asymmetrical margins (e.g., 10% left, 20% right) for long-form reading to create an editorial feel.
*   **Do** use `surface_tint` for subtle hover states to indicate interactivity.
*   **Do** prioritize `primary_fixed_dim` for background elements that need to feel "recessed."

### Don't:
*   **Don't** use black (#000000) for body text. Use `on_surface` (#151c22) to reduce eye strain and maintain a premium look.
*   **Don't** use standard 1px dividers. Use white space or a 4px `surface_variant` block if a hard break is required.
*   **Don't** use the `full` roundedness (pills) for primary cards; stick to `xl` (0.75rem) to maintain a modern, architectural structure.