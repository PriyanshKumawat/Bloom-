/**
 * BLOOM — Product Page Script
 * Handles: filter tabs, Add to Cart, wishlist toggle, cart badge
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Product data (matches the HTML cards) ---- */
  const products = [
    { id: 'roses',        name: 'Roses',                price: 499, img: '/image/producte/roses.png',                       tags: ['roses','bouquets'] },
    { id: 'sunflower',    name: 'Sunflower',             price: 499, img: '/image/producte/sunflowers.png',                  tags: ['bouquets'] },
    { id: 'gerberas',     name: 'Gerberas',              price: 499, img: '/image/producte/gerberas.png',                    tags: ['bouquets'] },
    { id: 'carnations',   name: 'Carnations',            price: 499, img: '/image/producte/carnations.png',                  tags: ['bouquets'] },
    { id: 'luxe',         name: 'Luxe Collection',       price: 499, img: '/image/producte/Flowers_Luxe.webp',               tags: ['exotic'] },
    { id: 'bridal',       name: 'Watercolor Bridal',     price: 499, img: '/image/producte/Watercolor Bridal.jpg',           tags: ['bridal'] },
    { id: 'exotic-mix',   name: 'Exotic Mix Flower Bunch', price: 499, img: '/image/producte/Exotic Mix Flower Bunch.jpg',   tags: ['exotic','bouquets'] },
    { id: 'mix-rose',     name: 'Bunch of Mix Rose',     price: 499, img: '/image/producte/Bunch of mix Rose.jpeg',          tags: ['roses','bouquets'] },
    { id: 'red-pink',     name: 'Red & Pink',            price: 499, img: '/image/producte/Red & Pink.jpg',                  tags: ['roses','bouquets'] },
    { id: 'ferrero',      name: 'Ferrero Rocher Bunch',  price: 499, img: '/image/producte/Ferrero Rocher Bunch.jpg',        tags: ['exotic'] },
  ];

  /* ---- Filter Buttons ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.id.replace('filter-', '');

      cards.forEach((card, idx) => {
        if (filter === 'all') {
          card.style.display = '';
          card.style.animation = `fadeUp 0.3s ease ${idx * 0.05}s both`;
        } else {
          const tags = products[idx] ? products[idx].tags : [];
          if (tags.includes(filter)) {
            card.style.display = '';
            card.style.animation = `fadeUp 0.3s ease ${idx * 0.05}s both`;
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  /* ---- Add to Cart buttons ---- */
  document.querySelectorAll('.btn').forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = products[idx];
      if (product) BloomCart.add(product);
    });
  });

  /* ---- Wishlist heart toggle ---- */
  document.querySelectorAll('.wishlist').forEach(heart => {
    heart.addEventListener('click', () => {
      const isWished = heart.style.color === 'rgb(232, 67, 147)';
      heart.style.color = isWished ? '' : '#e84393';
      heart.style.background = isWished ? '' : '#fce7f3';
      BloomCart.showToast(isWished ? 'Removed from wishlist' : 'Added to wishlist 💖');
    });
  });

  /* ---- Inject @keyframes fadeUp into document if not present ---- */
  if (!document.getElementById('bloom-fadeup')) {
    const style = document.createElement('style');
    style.id = 'bloom-fadeup';
    style.textContent = `@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`;
    document.head.appendChild(style);
  }

});
