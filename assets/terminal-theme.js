/**
 * Terminal Theme JavaScript
 * Handles boot animation, cart functionality, and interactive elements
 */

// ==================== Boot Screen ====================
;(function initBootScreen() {
  // Check if boot screen is enabled and hasn't been shown this session
  if (!document.getElementById("boot-screen")) return
  if (sessionStorage.getItem("hasBooted")) {
    document.getElementById("boot-screen").style.display = "none"
    return
  }

  const bootMessages = [
    { text: "[ OK ] Starting TECH_STORE.SH...", delay: 100 },
    { text: "[ OK ] Initializing terminal interface", delay: 200 },
    { text: "[ OK ] Loading product database", delay: 300 },
    { text: "[ OK ] Mounting file system", delay: 400 },
    { text: "[ OK ] Starting network services", delay: 500 },
    { text: "[ OK ] Checking cart integrity", delay: 600 },
    { text: "[ OK ] Loading graphics engine", delay: 700 },
    { text: "[ OK ] System ready", delay: 800 },
  ]

  const bootScreen = document.getElementById("boot-screen")
  const bootContent = document.createElement("div")
  bootContent.innerHTML = `
    <div style="position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: var(--color-background);">
      <div style="width: 100%; max-width: 800px; padding: 0 16px;">
        <div class="terminal-window">
          <div class="terminal-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="terminal-controls">
                <span class="terminal-control red"></span>
                <span class="terminal-control yellow"></span>
                <span class="terminal-control green"></span>
              </div>
              <span class="terminal-title">boot.log</span>
            </div>
            <span class="terminal-path">/var/log/system</span>
          </div>
          <div class="terminal-content" style="min-height: 400px;">
            <div style="margin-bottom: 24px;">
              <div style="color: var(--color-primary); margin-bottom: 4px;">TECH_STORE.SH Boot Sequence v1.0</div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Copyright (c) ${new Date().getFullYear()} - All rights reserved</div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 8px;">Booting system...</div>
            </div>
            <div id="boot-messages"></div>
            <div id="boot-cursor" class="cursor-blink" style="display: none;"></div>
            <div id="boot-progress" style="display: none; margin-top: 32px; padding-top: 16px; border-top: 1px solid var(--color-border);">
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 8px;">
                <span>Loading system components...</span>
                <span id="boot-percent">0%</span>
              </div>
              <div style="width: 100%; height: 8px; background: var(--color-background); border-radius: 4px; overflow: hidden; border: 1px solid var(--color-border);">
                <div id="boot-bar" style="height: 100%; background: linear-gradient(to right, var(--color-primary), var(--color-secondary)); width: 0%; transition: width 0.3s;"></div>
              </div>
            </div>
            <div id="boot-complete" style="display: none; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border);">
              <div style="color: var(--color-primary);">
                <span style="margin-right: 8px;">✓</span>System boot complete. Welcome to TECH_STORE.SH
              </div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 8px;">
                Redirecting to main interface...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  bootScreen.appendChild(bootContent)
  const messagesContainer = document.getElementById("boot-messages")
  const cursor = document.getElementById("boot-cursor")
  const progress = document.getElementById("boot-progress")
  const progressBar = document.getElementById("boot-bar")
  const progressPercent = document.getElementById("boot-percent")
  const complete = document.getElementById("boot-complete")

  let currentIndex = 0

  function showNextMessage() {
    if (currentIndex < bootMessages.length) {
      const messageDiv = document.createElement("div")
      messageDiv.textContent = bootMessages[currentIndex].text
      messageDiv.style.cssText =
        "color: var(--color-text-primary); margin-bottom: 8px; opacity: 0; animation: fade-in 0.2s forwards;"
      messagesContainer.appendChild(messageDiv)

      // Update progress
      const percent = Math.round(((currentIndex + 1) / bootMessages.length) * 100)
      progress.style.display = "block"
      progressBar.style.width = percent + "%"
      progressPercent.textContent = percent + "%"

      currentIndex++
      cursor.style.display = "inline-block"
      setTimeout(showNextMessage, bootMessages[currentIndex - 1].delay)
    } else {
      cursor.style.display = "none"
      complete.style.display = "block"

      setTimeout(() => {
        bootScreen.style.opacity = "0"
        bootScreen.style.transition = "opacity 0.5s"
        setTimeout(() => {
          bootScreen.style.display = "none"
          sessionStorage.setItem("hasBooted", "true")
        }, 500)
      }, 1000)
    }
  }

  setTimeout(showNextMessage, 300)
})()

// ==================== Cart Management ====================
const Cart = {
  // Get cart data from Shopify
  async get() {
    const response = await fetch("/cart.js")
    return response.json()
  },

  // Add item to cart
  async add(variantId, quantity = 1) {
    const formData = new FormData()
    formData.append("id", variantId)
    formData.append("quantity", quantity)

    const response = await fetch("/cart/add.js", {
      method: "POST",
      body: formData,
    })
    return response.json()
  },

  // Update cart item quantity
  async update(variantId, quantity) {
    const response = await fetch("/cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: variantId, quantity }),
    })
    return response.json()
  },

  // Remove item from cart
  async remove(variantId) {
    return this.update(variantId, 0)
  },

  // Clear entire cart
  async clear() {
    const response = await fetch("/cart/clear.js", { method: "POST" })
    return response.json()
  },
}

// Update cart count in header
async function updateCartCount() {
  try {
    const cart = await Cart.get()
    const countElement = document.getElementById("cart-count")
    if (countElement) {
      const totalItems = cart.item_count
      if (totalItems > 0) {
        countElement.textContent = totalItems
        countElement.style.display = "block"
      } else {
        countElement.style.display = "none"
      }
    }
  } catch (error) {
    console.error("Error updating cart count:", error)
  }
}

// Render cart items in drawer
async function renderCart() {
  try {
    const cart = await Cart.get()
    const cartItems = document.getElementById("cart-items")
    if (!cartItems) return

    if (cart.items.length === 0) {
      cartItems.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; text-align: center;">
          <div style="font-size: 4rem; color: var(--color-text-muted); margin-bottom: 16px;">🛒</div>
          <div class="command-prompt" style="margin-bottom: 16px; justify-content: center;">
            <span class="prompt-symbol">$</span> echo 'Cart is empty'
          </div>
          <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 24px;">No items in cart</p>
          <a href="/collections/all" class="btn btn-primary">./browse-products</a>
        </div>
      `
      return
    }

    let itemsHtml = ""
    cart.items.forEach((item) => {
      itemsHtml += `
        <div class="terminal-window" style="padding: 16px; margin-bottom: 16px;" data-variant-id="${item.variant_id}">
          <div style="display: flex; gap: 12px;">
            <div style="width: 80px; height: 80px; background: var(--color-surface); border: 1px solid var(--color-border); flex-shrink: 0;">
              ${item.image ? `<img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">` : '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-center; color: var(--color-text-muted);">◼</div>'}
            </div>
            <div style="flex: 1; min-width: 0;">
              <a href="${item.url}" style="font-size: 0.875rem; color: var(--color-text-primary);">${item.product_title}</a>
              ${item.variant_title !== "Default Title" ? `<p style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px;">${item.variant_title}</p>` : ""}
              <p style="font-size: 0.875rem; font-weight: 600; color: var(--color-primary); margin-top: 4px;">
                ${formatMoney(item.price)}
              </p>
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
                <button onclick="updateCartItem(${item.variant_id}, ${item.quantity - 1})" class="btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;">-</button>
                <span style="font-size: 0.875rem; min-width: 32px; text-align: center;">${item.quantity}</span>
                <button onclick="updateCartItem(${item.variant_id}, ${item.quantity + 1})" class="btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;">+</button>
                <button onclick="removeCartItem(${item.variant_id})" style="margin-left: auto; padding: 4px 8px; font-size: 0.75rem; color: var(--color-error); background: none; border: none; cursor: pointer;">Remove</button>
              </div>
            </div>
          </div>
        </div>
      `
    })

    // Add clear cart button if multiple items
    if (cart.items.length > 1) {
      itemsHtml += `
        <button onclick="clearCart()" class="btn-secondary" style="width: 100%; margin-top: 16px; color: var(--color-error);">
          ./clear-cart
        </button>
      `
    }

    // Add totals
    itemsHtml += `
      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.875rem;">
          <span style="color: var(--color-text-secondary);">Subtotal:</span>
          <span>${formatMoney(cart.total_price)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.875rem;">
          <span style="color: var(--color-text-secondary);">Shipping:</span>
          <span style="color: var(--color-secondary);">Calculated at checkout</span>
        </div>
        <div style="height: 1px; background: var(--color-border); margin: 16px 0;"></div>
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>Total:</span>
          <span style="color: var(--color-primary); font-size: 1.25rem;">${formatMoney(cart.total_price)}</span>
        </div>
        <a href="/checkout" class="btn btn-primary" style="width: 100%; margin-top: 24px; text-align: center; display: block;">
          ./checkout
        </a>
      </div>
    `

    cartItems.innerHTML = itemsHtml
  } catch (error) {
    console.error("Error rendering cart:", error)
  }
}

// Format money (simple version)
function formatMoney(cents) {
  return "$" + (cents / 100).toFixed(2)
}

// Cart item actions
async function updateCartItem(variantId, quantity) {
  try {
    await Cart.update(variantId, quantity)
    await renderCart()
    await updateCartCount()
  } catch (error) {
    console.error("Error updating cart:", error)
  }
}

async function removeCartItem(variantId) {
  try {
    await Cart.remove(variantId)
    await renderCart()
    await updateCartCount()
  } catch (error) {
    console.error("Error removing from cart:", error)
  }
}

async function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    try {
      await Cart.clear()
      await renderCart()
      await updateCartCount()
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }
}
// ==================== Cart Drawer ====================
;(function initCartDrawer() {
  const cartToggle = document.getElementById("cart-toggle")
  const cartDrawer = document.getElementById("cart-drawer")
  const cartOverlay = document.getElementById("cart-overlay")
  const cartClose = document.getElementById("cart-close")

  if (!cartToggle || !cartDrawer || !cartOverlay) return

  function openCart() {
    cartDrawer.classList.add("is-open")
    cartOverlay.classList.add("is-open")
    document.body.style.overflow = "hidden"
    renderCart()
  }

  function closeCart() {
    cartDrawer.classList.remove("is-open")
    cartOverlay.classList.remove("is-open")
    document.body.style.overflow = ""
  }

  cartToggle.addEventListener("click", openCart)
  cartOverlay.addEventListener("click", closeCart)
  if (cartClose) cartClose.addEventListener("click", closeCart)

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartDrawer.classList.contains("is-open")) {
      closeCart()
    }
  })
})()

// ==================== Initialize ====================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
})

