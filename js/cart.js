/**
 * BLOOM — Cart Page Script
 * Renders cart items from localStorage, handles qty update, remove, promo codes.
 */

document.addEventListener('DOMContentLoaded', () => {

  const PROMO_CODES = {
    'BLOOM10': 10,
    'FRESH20': 20,
    'PETALS15': 15,
  };

  let promoDiscount = 0;

  /* ---- Render ---- */
  function render() {
    const items     = BloomCart.getAll();
    const listEl    = document.getElementById('cart-items-list');
    const layoutEl  = document.getElementById('cart-layout');
    const emptyEl   = document.getElementById('empty-cart');

    if (!listEl) return;

    if (items.length === 0) {
      if (layoutEl) layoutEl.style.display = 'none';
      if (emptyEl)  emptyEl.style.display  = 'flex';
      return;
    }

    if (layoutEl) layoutEl.style.display  = '';
    if (emptyEl)  emptyEl.style.display   = 'none';

    listEl.innerHTML = items.map((item, i) => `
      <div class="cart-item" id="item-${item.id}" style="animation-delay:${i * 0.06}s">
        <img class="cart-item-img"
             src="${item.img}"
             alt="${item.name}"
             onerror="this.src='https://via.placeholder.com/90x90/fce7f3/e84393?text=🌸'">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>Fresh bouquet · Same-day delivery</p>
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        </div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Decrease">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" data-id="${item.id}" data-delta="1" aria-label="Increase">+</button>
          </div>
          <button class="remove-btn" data-id="${item.id}" aria-label="Remove item">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `).join('');

    updateSummary();
    attachListeners();
  }

  function updateSummary() {
    const subtotal = BloomCart.totalPrice();
    const discount = Math.round(subtotal * promoDiscount / 100);
    const total    = subtotal - discount;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    set('summary-subtotal', `₹${subtotal.toLocaleString('en-IN')}`);
    set('summary-discount', `-₹${discount.toLocaleString('en-IN')}`);
    set('summary-total',    `₹${total.toLocaleString('en-IN')}`);

    const discRow = document.getElementById('discount-row');
    if (discRow) discRow.style.display = promoDiscount > 0 ? '' : 'none';
  }

  function attachListeners() {
    // Qty buttons
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id    = btn.dataset.id;
        const delta = parseInt(btn.dataset.delta, 10);
        BloomCart.updateQty(id, delta);
        render();
      });
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        BloomCart.remove(btn.dataset.id);
        render();
      });
    });
  }

  /* ---- Clear all ---- */
  const clearBtn = document.getElementById('clear-cart-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Remove all items from cart?')) {
        BloomCart.clear();
        render();
      }
    });
  }

  /* ---- Promo code ---- */
  const applyBtn = document.getElementById('apply-promo-btn');
  const promoMsg = document.getElementById('promo-msg');

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const code = (document.getElementById('promo-input').value || '').trim().toUpperCase();
      if (PROMO_CODES[code]) {
        promoDiscount = PROMO_CODES[code];
        promoMsg.className = 'promo-msg';
        promoMsg.textContent = `✅ Promo "${code}" applied — ${promoDiscount}% off!`;
        updateSummary();
      } else {
        promoMsg.className = 'promo-msg error';
        promoMsg.textContent = '❌ Invalid promo code. Try BLOOM10, FRESH20 or PETALS15.';
      }
    });

    // Also apply on Enter key
    document.getElementById('promo-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') applyBtn.click();
    });
  }

  /* ---- Initial render ---- */
  render();
});
