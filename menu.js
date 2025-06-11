let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let allItems = [];

function renderMenu(data) {
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = '';

  if (data.length === 0) {
    menuList.innerHTML = '<p>No items found.</p>';
    return;
  }

  data.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    // ✅ FIXED: Don't use replace — just use item.price directly
    const cleanPrice = typeof item.price === 'number'
      ? item.price
      : parseFloat(item.price); // Fallback if it's a string

    card.innerHTML = `
      <a href="${item.links || '#'}">
        <img src="${item.image}" alt="${item.name}" style="width:150px;">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>RM${cleanPrice.toFixed(2)}</strong></p>
      </a>
      <div class="order-controls">
        <label for="qty-${index}">Qty:</label>
        <input id="qty-${index}" type="number" min="1" value="1" style="width:50px;">
        <button class="add-to-cart-btn"
                data-name="${item.name}"
                data-price="${cleanPrice}"
                data-qty-id="qty-${index}">Order</button>
      </div>
    `;

    menuList.appendChild(card);
  });
}

// Fetch JSON and render all
fetch('menu.json')
  .then(res => res.json())
  .then(data => {
    allItems = data;
    renderMenu(allItems);
  })
  .catch(err => console.error('Failed to load menu data:', err));

// Search feature
document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();

  const filtered = allItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );

  renderMenu(filtered);
});

// Add to cart
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const name = e.target.getAttribute('data-name');
    const price = parseFloat(e.target.getAttribute('data-price'));
    const qtyId = e.target.getAttribute('data-qty-id');
    const qty = parseInt(document.getElementById(qtyId).value, 10) || 1;

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.push({ name, price, quantity: qty });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${qty} ${name}(s) ordered!`);
  }
});


// Order button
document.getElementById('pay-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Order placed successfully!');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cart-modal').style.display = 'none';
});
