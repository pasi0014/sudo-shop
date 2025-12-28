class TerminalEffect {
  constructor() {
    this.cursorVisible = true;
    this.init();
  }

  init() {
    this.bootSequence();
    this.initTypewriter();
    this.initCursorBlink();
    this.initScanlines();
    this.initMatrixRain();
  }

  bootSequence() {
    const bootElement = document.querySelector('.boot-sequence');
    if (!bootElement) return;

    const commands = [
      '> Initializing kernel...',
      '> Loading modules...',
      '> Mounting filesystems...',
      '> Starting services...',
      '> System ready.'
    ];

    let delay = 0;
    commands.forEach((cmd, index) => {
      setTimeout(() => {
        const output = document.createElement('div');
        output.className = 'terminal-output';
        output.textContent = cmd;
        bootElement.appendChild(output);
      }, delay);
      delay += 500;
    });

    setTimeout(() => {
      bootElement.classList.remove('boot-sequence');
    }, delay);
  }

  initTypewriter() {
    const elements = document.querySelectorAll('.typewriter');
    elements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      this.typeWriter(element, text, 0);
    });
  }

  typeWriter(element, text, index) {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      const speed = Math.random() * 50 + 30;
      setTimeout(() => this.typeWriter(element, text, index + 1), speed);
    }
  }

  initCursorBlink() {
    const cursors = document.querySelectorAll('.terminal-cursor-block');
    cursors.forEach(cursor => {
      setInterval(() => {
        cursor.style.opacity = this.cursorVisible ? '1' : '0';
        this.cursorVisible = !this.cursorVisible;
      }, 500);
    });
  }

  initScanlines() {
    if (document.querySelector('.scanlines')) return;

    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    document.body.appendChild(scanlines);
  }

  initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01IOZ<>[]{};:';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 255, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
}

class TerminalCommand {
  constructor() {
    this.init();
  }

  init() {
    const terminalWindow = document.querySelector('.terminal-interactive');
    if (!terminalWindow) return;

    this.setupPrompt(terminalWindow);
  }

  setupPrompt(terminal) {
    const body = terminal.querySelector('.terminal-body');
    const prompt = this.createPrompt();
    body.appendChild(prompt);

    prompt.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.executeCommand(prompt.input.value, body);
        prompt.input.value = '';
      }
    });

    prompt.input.focus();
  }

  createPrompt() {
    const div = document.createElement('div');
    div.className = 'terminal-prompt-line';

    const promptText = document.createElement('span');
    promptText.className = 'terminal-prompt';
    promptText.textContent = 'user@sudo-shop:~$ ';

    const input = document.createElement('input');
    input.className = 'terminal-input';
    input.type = 'text';
    input.autocomplete = 'off';

    div.appendChild(promptText);
    div.appendChild(input);

    return { div, input };
  }

  executeCommand(command, body) {
    const output = document.createElement('div');
    output.className = 'terminal-output';

    const cmdLower = command.toLowerCase().trim();

    switch (cmdLower) {
      case 'help':
        output.innerHTML = `
          Available commands:<br>
          help - Show this help message<br>
          ls - List products<br>
          about - About us<br>
          contact - Contact information<br>
          clear - Clear terminal
        `;
        break;
      case 'ls':
        output.innerHTML = `
          Products:<br>
          > mechanical-keyboard<br>
          > rgb-mouse<br>
          > ultrawide-monitor<br>
          > noise-canceling-headphones<br>
          > gaming-laptop<br>
          > smartwatch
        `;
        break;
      case 'about':
        output.textContent = 'Sudo Shop - Premium tech products for developers and sysadmins.';
        break;
      case 'contact':
        output.innerHTML = `
          Contact:<br>
          Email: root@sudoshop.dev<br>
          GitHub: @sudoshop<br>
          Discord: sudo-shop-community
        `;
        break;
      case 'clear':
        const outputs = body.querySelectorAll('.terminal-output');
        outputs.forEach(o => o.remove());
        return;
      case '':
        break;
      default:
        output.className = 'terminal-output error';
        output.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    if (cmdLower !== '' && cmdLower !== 'clear') {
      body.appendChild(output);
      body.scrollTop = body.scrollHeight;
    }
  }
}

class TerminalProductCard {
  constructor() {
    this.init();
  }

  init() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => this.animateCard(card));
  }

  animateCard(card) {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.borderColor = 'var(--terminal-accent)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.borderColor = 'var(--terminal-border)';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TerminalEffect();
  new TerminalCommand();
  new TerminalProductCard();
});

// Add to cart animation
function addToCart(productId) {
  const output = document.createElement('div');
  output.className = 'terminal-output success';
  output.innerHTML = `[SUCCESS] Product ${productId} added to cart`;
  
  const terminal = document.querySelector('.terminal-window .terminal-body');
  if (terminal) {
    terminal.appendChild(output);
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Trigger fetch to Shopify cart
  fetch(`${window.routes.cart_add_url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      items: [{
        id: productId,
        quantity: 1
      }]
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status) {
      output.className = 'terminal-output error';
      output.textContent = `[ERROR] ${data.description}`;
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Format price with terminal style
function formatPrice(price) {
  return `$${(price / 100).toFixed(2)}`;
}

// Animate product loading
function animateProducts() {
  const products = document.querySelectorAll('.product-card');
  products.forEach((product, index) => {
    product.style.opacity = '0';
    product.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      product.style.transition = 'all 0.5s ease';
      product.style.opacity = '1';
      product.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Initialize on page load
window.addEventListener('load', () => {
  animateProducts();
});

// Export functions for use in templates
window.TerminalTheme = {
  addToCart,
  formatPrice,
  animateProducts
};
