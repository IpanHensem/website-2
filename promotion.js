let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('add-to-cart-btn')) {
        const card = e.target.closest('.card');
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        const qty = parseInt(card.querySelector('.promo-qty').value, 10) || 1;

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

    document.getElementById('cart-btn').addEventListener('click', () => {
      const cartItemsList = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');
      cartItemsList.innerHTML = '';

      let total = 0;
      cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.quantity} = RM${(item.price * item.quantity).toFixed(2)}`;
        cartItemsList.appendChild(li);
        total += item.price * item.quantity;
      });

      cartTotal.textContent = `Total: RM${total.toFixed(2)}`;
      document.getElementById('cart-modal').style.display = 'block';
    });

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