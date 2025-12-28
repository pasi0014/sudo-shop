# Terminal CLI Design System - Implementation Guide

## Overview

This implementation brings a sophisticated terminal/CLI-inspired design system to your Shopify Liquid theme, appealing to tech enthusiasts and developers with a dark mode, monospace typography, and retro computing vibes.

## File Structure

```
assets/
├── terminal.css          # Core design system CSS (NEW)
├── terminal-v2.css       # Additional utilities and components
├── terminal.js           # JavaScript for terminal effects
└── global.js             # Global theme JavaScript

snippets/
├── terminal-window.liquid    # Reusable terminal window component (NEW)
├── command-prompt.liquid     # Command prompt component (NEW)
├── terminal-button.liquid     # Button component (NEW)
└── header.liquid             # Header with terminal styling (UPDATED)

sections/
├── hero.liquid               # Hero section with terminal effects (UPDATED)
├── featured-collection.liquid # Product grid with terminal styling (UPDATED)
└── footer.liquid             # Footer with terminal styling (UPDATED)

layout/
└── theme.liquid              # Main theme layout (UPDATED)
```

## Design System Colors

### Primary Colors
- `--bg-primary`: `#0a0e14` - Deep dark blue-black background
- `--bg-surface`: `#151b26` - Slightly lighter panels
- `--border-color`: `#1e2936` - Subtle borders

### Accent Colors
- `--accent-primary`: `#00ff88` - Bright terminal green
- `--accent-secondary`: `#00d9ff` - Cyan
- `--accent-warning`: `#ffaa00` - Amber
- `--accent-error`: `#ff4444` - Red

### Text Colors
- `--text-primary`: `#e6e6e6` - Off-white
- `--text-secondary`: `#8b949e` - Muted gray
- `--text-muted`: `#4d5763` - Darker gray
- `--text-accent`: `#00ff88` - Terminal green

### Prompt Colors
- `--prompt-user`: `#00ff88` - Green
- `--prompt-directory`: `#00d9ff` - Cyan
- `--prompt-command`: `#e6e6e6` - White

## Typography

### Font Stack
Primary: `'JetBrains Mono', 'Fira Code', 'Courier New', monospace`

### Type Scale
- **H1**: 2.5rem (40px), 700 weight
- **H2**: 2rem (32px), 700 weight
- **H3**: 1.5rem (24px), 600 weight
- **Body**: 1rem (16px), 400 weight, 1.6 line-height
- **Small**: 0.875rem (14px), 1.5 line-height
- **Code**: Inline with green background

## Spacing Scale

Uses multiples of 4px:
- `--spacing-4`: 4px
- `--spacing-8`: 8px
- `--spacing-16`: 16px
- `--spacing-24`: 24px
- `--spacing-32`: 32px
- `--spacing-48`: 48px
- `--spacing-64`: 64px

## Component Usage

### Terminal Window

```liquid
{% render 'terminal-window', title: 'filename.ext' %}
  Your content here
{% endrender %}
```

**Example:**
```liquid
{% render 'terminal-window', title: '~/products' %}
  <h2>Featured Products</h2>
  <p>Explore our collection</p>
{% endrender %}
```

### Command Prompt

```liquid
{% render 'command-prompt', user: 'user', directory: '~', command: 'npm start' %}
```

**Output:**
```
user@terminal:~/directory$ npm [cursor]
```

### Buttons

```liquid
{# Primary button with link #}
{% render 'terminal-button', 
  text: 'Shop Now', 
  type: 'primary', 
  url: '/collections/all' 
%}

{# Secondary button #}
{% render 'terminal-button', 
  text: 'Learn More', 
  type: 'secondary', 
  url: '/pages/about' 
%}

{# CTA button with cyan accent #}
{% render 'terminal-button', 
  text: 'Subscribe', 
  type: 'cta', 
  url: '#' 
%}

{# Button element (not link) #}
{% render 'terminal-button', 
  text: 'Add to Cart', 
  type: 'secondary',
  type_attr: 'button',
  onclick: 'addToCart(123456)'
%}
```

### Input Fields

```liquid
<div class="input-wrapper">
  <input 
    type="email" 
    class="input-field" 
    placeholder="Enter your email"
  >
</div>
```

### Product Cards

```liquid
<li class="product-card">
  <div class="product-card-inner">
    <div class="product-card-image-wrapper">
      <a href="{{ product.url }}" class="product-card-link">
        <img src="{{ product.featured_media | image_url: width: 600 }}" 
             alt="{{ product.title }}" 
             class="product-card-img">
      </a>
      {% if product.compare_at_price > product.price %}
        <span class="badge badge-warning">ON SALE</span>
      {% endif %}
    </div>
    <div class="product-card-content">
      <h3 class="product-card-title">
        <a href="{{ product.url }}" class="link">{{ product.title }}</a>
      </h3>
      <div class="product-card-price">
        <span class="price">{{ product.price | money }}</span>
      </div>
      <div class="product-card-actions">
        {% render 'terminal-button', text: 'Add to Cart', type: 'secondary' %}
      </div>
    </div>
  </div>
</li>
```

## Utility Classes

### Grid System

```liquid
<div class="grid grid-2">
  <!-- 2 columns -->
</div>

<div class="grid grid-3">
  <!-- 3 columns -->
</div>

<div class="grid grid-4">
  <!-- 4 columns -->
</div>
```

### Badges

```liquid
<span class="badge">Default</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
```

### Text Styling

```liquid
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-muted">Muted text</p>
<small class="small">Small text</small>
```

### Effects

```liquid
<h1 class="glitch">Glitch effect on hover</h1>
<h2 class="glow">Glowing text</h2>
<div class="fade-in">Fade in animation</div>
```

## Animations

### Typing Effect

```liquid
<h1 class="typing-text">
  This text will type out character by character
</h1>
```

### Cursor Blink

```liquid
<span class="cursor"></span>
```

### Fade In

```liquid
<div class="fade-in">
  Content fades in with slight upward movement
</div>
```

### Glitch Effect

```liquid
<h1 class="glitch">
  Text glitches on hover with cyan/red offset
</h1>
```

## JavaScript Features

### Terminal Effects (terminal.js)

The terminal.js file includes several interactive features:

1. **Boot Sequence**: Simulated system boot on page load
2. **Typewriter Effect**: Character-by-character text animation
3. **Cursor Blink**: Blinking cursor for command prompts
4. **Scanlines**: CRT-like scanline overlay
5. **Matrix Rain**: Optional Matrix-style falling characters
6. **Command Line**: Interactive command input in hero section

### Command Line Usage

In the hero section, users can type commands:
- `help` - Show available commands
- `shop` - Navigate to shop
- `about` - Navigate to about page
- `contact` - Navigate to contact page
- `clear` - Clear terminal output

## Customization

### Modifying Colors

Edit CSS custom properties in `assets/terminal.css`:

```css
:root {
  --bg-primary: #0a0e14;
  --accent-primary: #00ff88;
  /* ... other colors */
}
```

### Changing Font Stack

Update in `assets/terminal.css`:

```css
:root {
  --font-mono: 'Your Font', 'Fallback Font', monospace;
}
```

### Adjusting Spacing

Modify spacing scale variables:

```css
:root {
  --spacing-16: 16px;
  --spacing-24: 24px;
  /* ... other spacing values */
}
```

## Accessibility Features

1. **Color Contrast**: All text meets 4.5:1 contrast ratio
2. **Skip Links**: Included for keyboard navigation
3. **ARIA Labels**: Proper labels for interactive elements
4. **Reduced Motion**: Respects `prefers-reduced-motion` preference
5. **Keyboard Navigation**: All interactive elements accessible via keyboard

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Stacked layouts
- Simplified navigation with hamburger menu
- Touch-friendly button sizes
- Optimized font sizes

## Performance Considerations

1. **Font Loading**: JetBrains Mono loaded from Google Fonts with `display: swap`
2. **Lazy Loading**: Images use lazy loading
3. **Animation Performance**: Uses `transform` and `opacity` for 60fps animations
4. **Reduced Motion**: Animations respect user preferences
5. **CSS Optimization**: Minimal repaints and reflows

## Theme Customizer Integration

All major components support Shopify Theme Customizer:

- **Hero Section**: Heading, subheading, buttons, images, statistics
- **Featured Collection**: Collection selection, product count, columns
- **Footer**: Social links, menus, newsletter signup
- **Header**: Logo, navigation menu

## Best Practices

### DO:
- Use monospace typography consistently
- Maintain 4px spacing grid
- Use terminal window components for content containers
- Include command prompts for interactive elements
- Use accent colors sparingly for emphasis
- Implement progressive enhancement (works without JS)

### DON'T:
- Use rounded "bubble" buttons
- Use gradient backgrounds
- Add drop shadows (only use glow effects)
- Break monospace typography
- Use bright white (`#ffffff`) - use off-white instead
- Use colorful icons - stick to monochrome or accent colors

## Troubleshooting

### Fonts not loading
Check that Google Fonts link is in `layout/theme.liquid`

### Colors not applying
Clear CSS cache and verify CSS variable names match

### Animations not working
Ensure JavaScript is enabled and terminal.js is loaded

### Command line not responding
Check browser console for JavaScript errors

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Mobile

## Future Enhancements

Consider adding:
- Dark/light mode toggle
- Custom color schemes
- Additional terminal themes (retro, modern, hacker)
- More command line integrations
- Sound effects for interactions
- Advanced animations (particle effects, 3D transforms)

## Credits

Design System inspired by:
- Terminal interfaces (Linux/Unix)
- CLI aesthetics
- Retro computing
- Developer tooling

---

**Version**: 1.0.0  
**Last Updated**: 2025-12-28  
**Theme**: Sudo Shop Terminal CLI
