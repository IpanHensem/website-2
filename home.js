let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));
      const qtyId = this.getAttribute('data-qty-id');
      const qtyInput = document.getElementById(qtyId);
      const quantity = parseInt(qtyInput.value, 10) || 1;

      
      const existing = cart.find(item => item.name === name);
      if(existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ name, price, quantity });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(quantity + " " + name + "(s) ordered!");
    });
  });

  
  document.getElementById('cart-btn').onclick = function() {
    
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const items = document.getElementById('cart-items');
    const total = document.getElementById('cart-total');
    items.innerHTML = '';
    let sum = 0;
    cart.forEach((item, idx) => {
      const li = document.createElement('li');
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.innerHTML = `<span>${item.name} x${item.quantity} - RM${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-item-btn" data-index="${idx}" style="margin-left:12px; background:red; color:white; border:none; border-radius:50%; width:24px; height:24px; cursor:pointer;">&times;</button>`;
      items.appendChild(li);
      sum += item.price * item.quantity;
    });
    total.textContent = "Total: RM" + sum.toFixed(2);
    document.getElementById('pay-btn').style.display = cart.length ? '' : 'none';
    document.getElementById('cart-modal').style.display = 'block';
    if(cart.length === 0) {
      items.innerHTML = "<li>Your cart is empty.</li>";
    }

    
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.onclick = function() {
        const idx = parseInt(this.getAttribute('data-index'), 10);
        cart.splice(idx, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart-btn').click(); 
      }
    });
  };

  
  document.getElementById('pay-btn').onclick = function() {
    if(cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Your order is prepared!");
    cart = [];
    localStorage.removeItem('cart');
    document.getElementById('cart-modal').style.display = 'none';
  };