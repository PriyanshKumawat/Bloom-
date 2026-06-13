/**
 * BLOOM — Shared Cart Store (localStorage-backed)
 * Include this file BEFORE page-specific scripts on any page that needs cart.
 */

const BloomCart = (() => {
  const KEY = 'bloom_cart';

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateCartBadges();
  }

  function add(product) {
    const items = getAll();
    const idx = items.findIndex(i => i.id === product.id);
    if (idx > -1) {
      items[idx].qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }
    save(items);
    showToast(`${product.name} added to cart 🌸`);
  }

  function remove(id) {
    save(getAll().filter(i => i.id !== id));
  }

  function updateQty(id, delta) {
    const items = getAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return;
    items[idx].qty = Math.max(1, items[idx].qty + delta);
    save(items);
  }

  function clear() {
    save([]);
  }

  function totalCount() {
    return getAll().reduce((sum, i) => sum + i.qty, 0);
  }

  function totalPrice() {
    return getAll().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function updateCartBadges() {
    const count = totalCount();
    document.querySelectorAll('.cart-count').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  /** Toast notification */
  function showToast(msg) {
    let toast = document.getElementById('bloom-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'bloom-toast';
      toast.style.cssText = `
        position:fixed; bottom:28px; right:28px; z-index:99999;
        background: linear-gradient(135deg,#e84393,#c72d78);
        color:#fff; font-family:'Inter',sans-serif; font-size:14px; font-weight:500;
        padding:14px 24px; border-radius:50px;
        box-shadow:0 8px 32px rgba(232,67,147,0.4);
        transform:translateY(80px); opacity:0;
        transition:all 0.4s cubic-bezier(0.4,0,0.2,1);
        pointer-events:none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.transform = 'translateY(80px)';
      toast.style.opacity = '0';
    }, 2600);
  }

  // Initialise badges on load
  document.addEventListener('DOMContentLoaded', updateCartBadges);

  return { add, remove, updateQty, clear, getAll, totalCount, totalPrice, updateCartBadges, showToast };
})();
