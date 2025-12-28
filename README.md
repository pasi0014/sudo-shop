# Terminal Theme - Shopify Theme

A Linux-inspired terminal/CLI theme for Shopify stores selling tech products. Features dark theme, monospace fonts, and terminal-style animations perfect for tech enthusiasts.

## Features

- **Terminal UI/UX**: Authentic Linux terminal aesthetic with command-line vibes
- **Dark Theme**: Eye-friendly dark color scheme with green terminal text
- **Monospace Fonts**: Courier New and other monospace fonts for that authentic terminal feel
- **Animations**:
  - Typewriter effect for headings
  - Blinking cursor
  - Scanlines overlay
  - Matrix rain background (optional)
  - Boot sequence animation
  - Hover effects on products and buttons
- **Interactive Terminal**: Command-line interface in hero section
- **Responsive Design**: Fully responsive across all devices
- **Product Grid**: Terminal-style product cards with hover effects
- **Customizable**: Extensive theme settings via Shopify theme editor

## Installation

1. Create a new Shopify theme or use an existing one
2. Copy all files to your theme directory
3. In Shopify Admin, go to Online Store > Themes
4. Upload the theme or use Shopify CLI to push changes

## File Structure

```
sudo-shop/
├── assets/
│   ├── base.css              # Base styles
│   ├── terminal.css           # Terminal-specific styles
│   ├── terminal.js            # Terminal animations and interactions
│   └── global.js              # Global JavaScript
├── config/
│   └── settings_schema.json  # Theme settings configuration
├── layout/
│   └── theme.liquid          # Main theme layout
├── sections/
│   ├── header.liquid          # Header section
│   ├── footer.liquid          # Footer section
│   ├── hero.liquid            # Hero section with terminal
│   ├── featured-collection.liquid # Product grid section
│   └── main-product.liquid    # Product page section
├── snippets/
│   └── header.liquid          # Header snippet
└── templates/
    ├── index.json            # Homepage template
    └── product.json           # Product page template
```

## Theme Settings

### Colors
- Terminal background color
- Terminal text color
- Terminal accent color
- Terminal border color
- Standard Shopify color scheme

### Typography
- Body font (defaults to monospace)
- Heading font (defaults to monospace)
- Font scale settings

### Terminal Settings
- Enable/disable typewriter effect
- Enable/disable cursor blink
- Enable/disable scanlines
- Enable/disable Matrix rain background
- Enable/disable sound effects

### Layout
- Page width
- Header position (top/fixed)
- Sticky header toggle
- Footer visibility

## Sections

### Hero Section
- Terminal-style welcome screen
- Boot sequence animation
- Interactive command line
- Statistics display
- Customizable buttons

### Featured Collection
- Terminal-style product cards
- Grid layout (responsive)
- Add to cart functionality
- Hover animations

### Product Page
- Product media gallery
- Variant selector
- Quantity selector
- Add to cart button
- Product metadata (SKU, type, tags)

### Footer
- Social media links
- Newsletter signup
- Payment icons
- Customizable content blocks

## Customization

### CSS Variables
Override these CSS variables in `terminal.css`:

```css
:root {
  --terminal-bg: #0d0d0d;
  --terminal-text: #00ff00;
  --terminal-text-dim: #008800;
  --terminal-border: #333;
  --terminal-cursor: #00ff00;
  --terminal-accent: #00ff00;
  --terminal-warning: #ffff00;
  --terminal-error: #ff0000;
  --terminal-info: #00ffff;
}
```

### JavaScript Classes

#### TerminalEffect
Main class for terminal animations:
- Typewriter effect
- Cursor blinking
- Scanlines
- Matrix rain
- Boot sequence

#### TerminalCommand
Interactive command line:
- Command parsing
- Help system
- Navigation commands

#### TerminalProductCard
Product card interactions:
- Hover effects
- Animation triggers

### Available Commands (in hero terminal)
- `help` - Show available commands
- `ls` - List products
- `about` - About information
- `contact` - Contact details
- `clear` - Clear terminal

## Development

### Shopify CLI
```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Start development server
shopify theme dev

# Push changes to theme
shopify theme push

# Watch for changes
shopify theme dev --theme <theme-id>
```

### Local Development
1. Clone the repository
2. Make your changes
3. Test with Shopify Theme Kit or Shopify CLI
4. Push to your Shopify store

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Performance

- Optimized CSS animations using transforms and opacity
- Lazy loading for images
- Minimal JavaScript footprint
- No external dependencies (except Shopify Liquid)

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use and modify for your projects.

## Support

For issues and questions:
- GitHub Issues: [https://github.com/sudoshop/terminal-theme/issues](https://github.com/sudoshop/terminal-theme/issues)
- Email: support@sudoshop.dev

## Credits

- Designed for developers and tech enthusiasts
- Inspired by Linux terminal aesthetics
- Built with Shopify Liquid, CSS3, and vanilla JavaScript

## Changelog

### Version 1.0.0
- Initial release
- Terminal UI/UX
- Dark theme with green accents
- Typewriter animations
- Interactive command line
- Responsive product grid
- Customizable theme settings
