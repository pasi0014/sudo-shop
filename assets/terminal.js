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
  }

  bootSequence() {
    const bootElement = document.querySelector('.hero-boot-output');
    if (!bootElement) return;

    const commands = [
      '[INFO] Initializing kernel...',
      '[INFO] Loading modules...',
      '[INFO] Mounting filesystems...',
      '[SUCCESS] System ready.'
    ];

    let delay = 0;
    commands.forEach((cmd, index) => {
      setTimeout(() => {
        const output = document.createElement('p');
        output.className = 'terminal-output-text success';
        output.textContent = cmd;
        bootElement.appendChild(output);
      }, delay);
      delay += 500;
    });
  }

  initTypewriter() {
    const elements = document.querySelectorAll('.typing-text');
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
    const cursors = document.querySelectorAll('.cursor');
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
    const body = terminal.querySelector('.terminal-window-content');
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
    div.className = 'hero-command-line';

    const promptWrapper = document.createElement('div');
    promptWrapper.className = 'command-prompt';
    promptWrapper.innerHTML = `
      <span class="user">user</span>
      <span class="directory">@terminal</span>
      <span class="prompt-symbol">:</span>
      <span class="directory">~</span>
      <span class="prompt-symbol">$</span>
    `;

    const input = document.createElement('input');
    input.className = 'hero-command-input input-field';
    input.type = 'text';
    input.autocomplete = 'off';
    input.placeholder = 'Type \'help\' for commands...';

    div.appendChild(promptWrapper);
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
          <p class="terminal-output-text">Available commands:</p>
          <ul style="list-style: none; padding: 0;">
            <li class="terminal-output-text">help - Show this help message</li>
            <li class="terminal-output-text">shop - Browse products</li>
            <li class="terminal-output-text">about - About us</li>
            <li class="terminal-output-text">contact - Contact information</li>
            <li class="terminal-output-text">clear - Clear terminal</li>
          </ul>
        `;
        break;
      case 'shop':
        output.innerHTML = `
          <p class="terminal-output-text success">[SUCCESS] Redirecting to shop...</p>
        `;
        setTimeout(() => {
          window.location.href = '/collections/all';
        }, 1000);
        break;
      case 'about':
        output.innerHTML = `
          <p class="terminal-output-text success">[SUCCESS] Redirecting to about...</p>
        `;
        setTimeout(() => {
          window.location.href = '/pages/about';
        }, 1000);
        break;
      case 'contact':
        output.innerHTML = `
          <p class="terminal-output-text success">[SUCCESS] Redirecting to contact...</p>
        `;
        setTimeout(() => {
          window.location.href = '/pages/contact';
        }, 1000);
        break;
      case 'clear':
        const outputs = body.querySelectorAll('.terminal-output');
        outputs.forEach(o => o.remove());
        return;
      case '':
        break;
      default:
        output.innerHTML = `
          <p class="terminal-output-text error">[ERROR] Command not found: ${command}. Type 'help' for available commands.</p>
        `;
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
      card.style.borderColor = 'var(--accent-primary)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--border-color)';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    new TerminalEffect();
  }
  new TerminalCommand();
  new TerminalProductCard();
});

function addToCart(productId) {
  const output = document.createElement('div');
  output.className = 'terminal-output';
  output.innerHTML = `<p class="terminal-output-text success">[SUCCESS] Product added to cart</p>`;
  
  const heroTerminal = document.querySelector('.hero-boot-output');
  if (heroTerminal) {
    heroTerminal.appendChild(output);
    heroTerminal.scrollTop = heroTerminal.scrollHeight;
  }

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
      const errorOutput = document.createElement('div');
      errorOutput.className = 'terminal-output';
      errorOutput.innerHTML = `<p class="terminal-output-text error">[ERROR] ${data.description}</p>`;
      
      if (heroTerminal) {
        heroTerminal.appendChild(errorOutput);
        heroTerminal.scrollTop = heroTerminal.scrollHeight;
      }
    } else {
      const cartCount = document.querySelector('.cart-count');
      if (cartCount) {
        const currentCount = parseInt(cartCount.textContent.replace(/\D/g, ''));
        cartCount.textContent = `[${currentCount + 1}]`;
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function formatPrice(price) {
  return `$${(price / 100).toFixed(2)}`;
}

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

window.addEventListener('load', () => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animateProducts();
  }
});

window.TerminalTheme = {
  addToCart,
  formatPrice,
  animateProducts
};
