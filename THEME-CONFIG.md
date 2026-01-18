# Nuxt UI Theme Configuration

This document explains how the Nuxt UI theme is configured for the Mazdor project.

## Theme Structure

The theme is configured using three main files:

1. **`app/assets/css/main.css`** - Defines CSS variables and custom colors
2. **`app/app.config.ts`** - Configures semantic colors and runtime settings
3. **`nuxt.config.ts`** - Enables the Nuxt UI module

## Color System

### Custom Colors Defined
- **Primary**: Orange (`#f97316`) - Used for main CTAs and brand elements
- **Secondary**: Teal (`#14b8a6`) - Used for secondary actions
- **Neutral**: Gray scale - Used for text, backgrounds, borders

### Semantic Color Mapping
The theme maps semantic color names to actual color values:

```css
--ui-primary: var(--ui-color-primary-500);  /* Orange 500 in light mode */
--ui-primary: var(--ui-color-primary-400);  /* Orange 400 in dark mode */
--ui-secondary: var(--ui-color-secondary-500); /* Teal 500 in light mode */
--ui-secondary: var(--ui-color-secondary-400); /* Teal 400 in dark mode */
```

## Available Color Utilities

### Text Colors
- `text-default` - Main text color
- `text-muted` - Secondary text
- `text-dimmed` - Dimmed text
- `text-toned` - Toned text
- `text-highlighted` - Highlighted text
- `text-inverted` - Inverted text (white on dark backgrounds)

### Background Colors
- `bg-default` - Default background
- `bg-muted` - Slightly colored background
- `bg-elevated` - Elevated surfaces
- `bg-accented` - Accented backgrounds
- `bg-inverted` - Inverted background

### Border Colors
- `border-default` - Default borders
- `border-muted` - Muted borders
- `border-accented` - Accented borders
- `border-inverted` - Inverted borders

## Component Colors

All Nuxt UI components support the following color props:
- `primary` (orange)
- `secondary` (teal)
- `success` (green)
- `warning` (yellow)
- `error` (red)
- `info` (blue)
- `neutral` (gray)

Example usage:
```vue
<UButton color="primary">Primary Button</UButton>
<UInput color="success" placeholder="Success input" />
```

## Dark Mode Support

The theme automatically switches between light and dark modes:
- Light mode uses lighter shades for better readability
- Dark mode uses darker shades to reduce eye strain
- All components automatically adapt to the current color mode

## Testing the Theme

A `TestTheme.vue` component is included that demonstrates:
- All semantic color variations
- Text and background color utilities
- Component color props
- Dark mode toggle functionality

To test, visit the homepage where the test component is temporarily displayed.

## Customization

To modify the theme:

1. **Change colors**: Edit the color definitions in `main.css`
2. **Adjust shades**: Modify the light/dark mode variable mappings
3. **Add new colors**: Define new color scales in `@theme static`
4. **Component defaults**: Configure default variants in `app.config.ts`

## References

- [Nuxt UI CSS Variables Documentation](https://ui.nuxt.com/docs/getting-started/theme/css-variables)
- [Nuxt UI Design System](https://ui.nuxt.com/docs/getting-started/theme/design-system)
- [Nuxt UI Component Customization](https://ui.nuxt.com/docs/getting-started/theme/components)