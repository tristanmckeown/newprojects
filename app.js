// TrendFlow Mart - E-commerce Application

// Data Store
const store = {
  products: [
    {
      id: 1,
      name: "Smart LED Color Changing Bulbs (4-Pack)",
      category: "Smart Home",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviews: 2847,
      description: "Control your home lighting with voice commands or smartphone app. 16 million colors, dimming, scheduling, and energy-efficient LED technology.",
      image: "Smart LED Bulbs",
      inStock: true,
      supplier: "AliExpress Partner",
      shippingTime: "7-14 days"
    },
    {
      id: 2,
      name: "GPS Pet Tracker Collar",
      category: "Pet Supplies",
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.9,
      reviews: 3241,
      description: "Real-time GPS tracking for your pet with geofencing alerts, activity monitoring, and long battery life. Works worldwide.",
      image: "Pet GPS Tracker",
      inStock: true,
      supplier: "Global Pet Tech",
      shippingTime: "5-10 days"
    },
    {
      id: 3,
      name: "Professional Massage Gun",
      category: "Health & Wellness",
      price: 89.99,
      originalPrice: 149.99,
      rating: 4.7,
      reviews: 5623,
      description: "Deep tissue percussion massager with 6 speed settings and 4 massage heads. Perfect for muscle recovery and pain relief.",
      image: "Massage Gun",
      inStock: true,
      supplier: "HealthTech Direct",
      shippingTime: "7-12 days"
    },
    {
      id: 4,
      name: "Bamboo Toothbrush Set (10-Pack)",
      category: "Eco-Friendly",
      price: 19.99,
      originalPrice: 34.99,
      rating: 4.6,
      reviews: 1892,
      description: "Biodegradable bamboo toothbrushes with BPA-free nylon bristles. Eco-friendly alternative to plastic toothbrushes.",
      image: "Bamboo Toothbrushes",
      inStock: true,
      supplier: "EcoLife Essentials",
      shippingTime: "8-15 days"
    },
    {
      id: 5,
      name: "Wireless Security Camera System",
      category: "Smart Home",
      price: 129.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 4156,
      description: "1080p HD cameras with night vision, motion detection, two-way audio, and cloud storage. Easy installation, no wiring required.",
      image: "Security Camera",
      inStock: true,
      supplier: "SmartHome Pro",
      shippingTime: "6-11 days"
    },
    {
      id: 6,
      name: "Automatic Pet Feeder with Timer",
      category: "Pet Supplies",
      price: 69.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 2934,
      description: "Schedule up to 6 meals per day with customizable portions. Built-in voice recorder and anti-jam design.",
      image: "Automatic Pet Feeder",
      inStock: true,
      supplier: "Pet Care Solutions",
      shippingTime: "7-14 days"
    },
    {
      id: 7,
      name: "Posture Corrector Back Brace",
      category: "Health & Wellness",
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.5,
      reviews: 7841,
      description: "Adjustable posture support for upper back and shoulders. Breathable, comfortable design for all-day wear.",
      image: "Posture Corrector",
      inStock: true,
      supplier: "Wellness Direct",
      shippingTime: "8-16 days"
    },
    {
      id: 8,
      name: "Stainless Steel Water Bottle 32oz",
      category: "Eco-Friendly",
      price: 24.99,
      originalPrice: 39.99,
      rating: 4.9,
      reviews: 6247,
      description: "Double-wall vacuum insulated bottle keeps drinks cold 24 hours or hot 12 hours. BPA-free, leak-proof, eco-friendly.",
      image: "Water Bottle",
      inStock: true,
      supplier: "EcoBottle Co",
      shippingTime: "5-12 days"
    },
    {
      id: 9,
      name: "Smart WiFi Thermostat",
      category: "Smart Home",
      price: 109.99,
      originalPrice: 169.99,
      rating: 4.8,
      reviews: 3678,
      description: "Energy-saving smart thermostat with app control, scheduling, and learning algorithms. Compatible with Alexa and Google Home.",
      image: "Smart Thermostat",
      inStock: true,
      supplier: "Home Automation Inc",
      shippingTime: "7-14 days"
    },
    {
      id: 10,
      name: "Pet Grooming Glove Brush",
      category: "Pet Supplies",
      price: 14.99,
      originalPrice: 24.99,
      rating: 4.6,
      reviews: 5129,
      description: "Gentle grooming mitt removes loose fur while massaging your pet. Works for dogs and cats, easy to clean.",
      image: "Grooming Glove",
      inStock: true,
      supplier: "Pet Essentials",
      shippingTime: "9-18 days"
    },
    {
      id: 11,
      name: "Digestive Health Probiotic Supplement",
      category: "Health & Wellness",
      price: 34.99,
      originalPrice: 54.99,
      rating: 4.7,
      reviews: 4892,
      description: "50 billion CFU probiotic with 10 strains for digestive health and immune support. 60-day supply.",
      image: "Probiotic Supplement",
      inStock: true,
      supplier: "NutriLife Labs",
      shippingTime: "5-10 days"
    },
    {
      id: 12,
      name: "Solar Power Bank 20000mAh",
      category: "Eco-Friendly",
      price: 44.99,
      originalPrice: 69.99,
      rating: 4.8,
      reviews: 3567,
      description: "High-capacity portable charger with solar panel. Charges multiple devices, waterproof, perfect for outdoor activities.",
      image: "Solar Power Bank",
      inStock: true,
      supplier: "GreenTech Power",
      shippingTime: "8-15 days"
    }
  ],
  categories: [
    {
      name: "Health & Wellness",
      icon: "💪",
      productCount: 156,
      description: "Trending health products for better living"
    },
    {
      name: "Pet Supplies",
      icon: "🐾",
      productCount: 243,
      description: "Smart solutions for your furry friends"
    },
    {
      name: "Smart Home",
      icon: "🏠",
      productCount: 189,
      description: "Automate and secure your home"
    },
    {
      name: "Eco-Friendly",
      icon: "🌱",
      productCount: 127,
      description: "Sustainable products for a better planet"
    }
  ],
  cart: [],
  checkoutStep: 1,
  shippingInfo: {},
  paymentMethod: 'Credit Card',
  currentProduct: null
};

// App Controller
const app = {
  init() {
    this.renderCategories();
    this.renderHomeProducts();
    this.renderShopProducts();
    this.updateCartCount();
    this.setupSearch();
    this.populateCategoryFilter();
  },

  showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    
    // Show selected view
    const viewMap = {
      'home': 'homeView',
      'shop': 'shopView',
      'product': 'productView',
      'cart': 'cartView',
      'checkout': 'checkoutView',
      'about': 'aboutView',
      'contact': 'contactView',
      'confirmation': 'confirmationView'
    };
    
    const viewId = viewMap[viewName];
    if (viewId) {
      document.getElementById(viewId).classList.add('active');
      window.scrollTo(0, 0);
      
      // Refresh cart and checkout views
      if (viewName === 'cart') {
        this.renderCart();
      } else if (viewName === 'checkout') {
        this.renderCheckoutSummary();
        this.resetCheckoutSteps();
      }
    }
  },

  renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = store.categories.map(cat => `
      <div class="category-card" onclick="app.filterByCategory('${cat.name}')">
        <div class="category-icon">${cat.icon}</div>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
        <div class="product-count">${cat.productCount} products</div>
        <button class="btn btn-primary" style="margin-top: 16px;">Shop Now</button>
      </div>
    `).join('');
  },

  renderHomeProducts() {
    const grid = document.getElementById('homeProductsGrid');
    // Show first 12 products on home page
    const products = store.products.slice(0, 12);
    grid.innerHTML = products.map(product => this.createProductCard(product)).join('');
  },

  renderShopProducts() {
    const grid = document.getElementById('shopProductsGrid');
    grid.innerHTML = store.products.map(product => this.createProductCard(product)).join('');
  },

  createProductCard(product) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    return `
      <div class="product-card" onclick="app.showProductDetail(${product.id})">
        <div class="product-image">${product.image}</div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-rating">
            <span class="stars">${this.renderStars(product.rating)}</span>
            <span class="review-count">(${product.reviews.toLocaleString()})</span>
          </div>
          <div class="product-pricing">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
          </div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); app.addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  },

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '☆';
    return stars;
  },

  showProductDetail(productId) {
    const product = store.products.find(p => p.id === productId);
    if (!product) return;
    
    store.currentProduct = product;
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    const detailHTML = `
      <div class="product-detail-image">${product.image}</div>
      <div class="product-detail-info">
        <h1>${product.name}</h1>
        <div class="detail-rating">
          <span class="stars" style="color: #FFB800; font-size: 18px;">${this.renderStars(product.rating)}</span>
          <span style="font-weight: 600;">${product.rating}</span>
          <span style="color: var(--color-text-secondary);">(${product.reviews.toLocaleString()} reviews)</span>
        </div>
        <div class="detail-pricing">
          <span class="detail-price">$${product.price.toFixed(2)}</span>
          <span class="detail-original-price">$${product.originalPrice.toFixed(2)}</span>
          <span class="savings-badge">Save ${discount}%</span>
        </div>
        <div class="product-description">
          <p>${product.description}</p>
        </div>
        <div class="product-meta">
          <div class="product-meta-item">
            <span style="font-weight: 600;">Category:</span>
            <span>${product.category}</span>
          </div>
          <div class="product-meta-item">
            <span style="font-weight: 600;">Supplier:</span>
            <span>${product.supplier}</span>
          </div>
          <div class="product-meta-item">
            <span style="font-weight: 600;">Shipping Time:</span>
            <span>${product.shippingTime}</span>
          </div>
          <div class="product-meta-item">
            <span style="font-weight: 600;">Availability:</span>
            <span style="color: var(--color-primary); font-weight: 600;">✓ In Stock</span>
          </div>
        </div>
        <div class="quantity-selector">
          <span style="font-weight: 600;">Quantity:</span>
          <button class="quantity-btn" onclick="app.decrementQuantity()">-</button>
          <span class="quantity-value" id="productQuantity">1</span>
          <button class="quantity-btn" onclick="app.incrementQuantity()">+</button>
        </div>
        <div class="detail-actions">
          <button class="btn btn-primary" onclick="app.addToCartFromDetail()">Add to Cart</button>
          <button class="btn btn-accent" onclick="app.buyNow()">Buy Now</button>
        </div>
        <div style="padding: 16px; background: var(--color-bg-1); border-radius: 8px; margin-top: 24px;">
          <div style="font-weight: 600; margin-bottom: 8px;">🚚 Fast & Free Shipping</div>
          <div style="font-size: 14px; color: var(--color-text-secondary);">Free shipping on orders over $50. Estimated delivery: ${product.shippingTime}</div>
        </div>
      </div>
    `;
    
    document.getElementById('productDetail').innerHTML = detailHTML;
    this.showView('product');
  },

  incrementQuantity() {
    const quantityEl = document.getElementById('productQuantity');
    let quantity = parseInt(quantityEl.textContent);
    if (quantity < 99) {
      quantityEl.textContent = quantity + 1;
    }
  },

  decrementQuantity() {
    const quantityEl = document.getElementById('productQuantity');
    let quantity = parseInt(quantityEl.textContent);
    if (quantity > 1) {
      quantityEl.textContent = quantity - 1;
    }
  },

  addToCart(productId, quantity = 1) {
    const product = store.products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = store.cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      store.cart.push({ ...product, quantity });
    }
    
    this.updateCartCount();
    this.showToast('Added to cart!', 'success');
  },

  addToCartFromDetail() {
    const quantity = parseInt(document.getElementById('productQuantity').textContent);
    this.addToCart(store.currentProduct.id, quantity);
  },

  buyNow() {
    const quantity = parseInt(document.getElementById('productQuantity').textContent);
    this.addToCart(store.currentProduct.id, quantity);
    this.showView('cart');
  },

  updateCartCount() {
    const count = store.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
  },

  renderCart() {
    const container = document.getElementById('cartContainer');
    
    if (store.cart.length === 0) {
      container.innerHTML = `
        <div class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some trending products to get started!</p>
          <button class="btn btn-primary" onclick="app.showView('shop')">Start Shopping</button>
        </div>
      `;
      return;
    }
    
    const subtotal = store.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + shipping;
    
    const cartItemsHTML = store.cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">${item.image}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-controls">
            <button class="quantity-btn" onclick="app.updateCartQuantity(${item.id}, -1)">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" onclick="app.updateCartQuantity(${item.id}, 1)">+</button>
            <button class="remove-btn" onclick="app.removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
        <div style="font-weight: 600; font-size: 18px;">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
    
    container.innerHTML = `
      <div class="cart-items">
        <h3 style="margin-bottom: 16px;">Cart Items (${store.cart.length})</h3>
        ${cartItemsHTML}
      </div>
      <div class="cart-summary">
        <h3 style="margin-bottom: 16px;">Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
        </div>
        ${shipping > 0 ? `<div style="font-size: 12px; color: var(--color-text-secondary); padding: 8px 0;">Add $${(50 - subtotal).toFixed(2)} more for free shipping!</div>` : ''}
        <div class="summary-row">
          <span>Total</span>
          <span>$${total.toFixed(2)}</span>
        </div>
        <button class="btn btn-accent" style="width: 100%; margin-top: 16px;" onclick="app.showView('checkout')">Proceed to Checkout</button>
        <button class="btn btn-secondary" style="width: 100%; margin-top: 8px;" onclick="app.showView('shop')">Continue Shopping</button>
      </div>
    `;
  },

  updateCartQuantity(productId, change) {
    const item = store.cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.updateCartCount();
      this.renderCart();
    }
  },

  removeFromCart(productId) {
    store.cart = store.cart.filter(item => item.id !== productId);
    this.updateCartCount();
    this.renderCart();
    this.showToast('Item removed from cart', 'error');
  },

  renderCheckoutSummary() {
    const subtotal = store.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + shipping;
    
    document.getElementById('checkoutSummary').innerHTML = `
      <h3 style="margin-bottom: 16px;">Order Summary</h3>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <div style="margin-top: 24px; padding: 16px; background: var(--color-bg-1); border-radius: 8px; font-size: 14px;">
        <div style="font-weight: 600; margin-bottom: 8px;">🔒 Secure Checkout</div>
        <div style="color: var(--color-text-secondary);">Your payment information is encrypted and secure.</div>
      </div>
    `;
  },

  resetCheckoutSteps() {
    store.checkoutStep = 1;
    document.getElementById('checkoutStep1').style.display = 'block';
    document.getElementById('checkoutStep2').style.display = 'none';
    document.getElementById('checkoutStep3').style.display = 'none';
    
    document.querySelectorAll('.step').forEach((step, index) => {
      step.classList.remove('active', 'completed');
      if (index === 0) step.classList.add('active');
    });
  },

  nextCheckoutStep() {
    if (store.checkoutStep === 1) {
      // Validate shipping info
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const address = document.getElementById('address').value.trim();
      const city = document.getElementById('city').value.trim();
      const postalCode = document.getElementById('postalCode').value.trim();
      const country = document.getElementById('country').value;
      
      if (!fullName || !email || !address || !city || !postalCode || !country) {
        this.showToast('Please fill in all shipping information', 'error');
        return;
      }
      
      store.shippingInfo = { fullName, email, address, city, postalCode, country };
      
      document.getElementById('checkoutStep1').style.display = 'none';
      document.getElementById('checkoutStep2').style.display = 'block';
      document.querySelectorAll('.step')[0].classList.remove('active');
      document.querySelectorAll('.step')[0].classList.add('completed');
      document.querySelectorAll('.step')[1].classList.add('active');
      store.checkoutStep = 2;
    } else if (store.checkoutStep === 2) {
      document.getElementById('checkoutStep2').style.display = 'none';
      document.getElementById('checkoutStep3').style.display = 'block';
      document.querySelectorAll('.step')[1].classList.remove('active');
      document.querySelectorAll('.step')[1].classList.add('completed');
      document.querySelectorAll('.step')[2].classList.add('active');
      store.checkoutStep = 3;
      this.renderOrderReview();
    }
  },

  prevCheckoutStep() {
    if (store.checkoutStep === 2) {
      document.getElementById('checkoutStep2').style.display = 'none';
      document.getElementById('checkoutStep1').style.display = 'block';
      document.querySelectorAll('.step')[1].classList.remove('active');
      document.querySelectorAll('.step')[0].classList.remove('completed');
      document.querySelectorAll('.step')[0].classList.add('active');
      store.checkoutStep = 1;
    } else if (store.checkoutStep === 3) {
      document.getElementById('checkoutStep3').style.display = 'none';
      document.getElementById('checkoutStep2').style.display = 'block';
      document.querySelectorAll('.step')[2].classList.remove('active');
      document.querySelectorAll('.step')[1].classList.remove('completed');
      document.querySelectorAll('.step')[1].classList.add('active');
      store.checkoutStep = 2;
    }
  },

  selectPayment(element) {
    document.querySelectorAll('.payment-method').forEach(el => {
      el.classList.remove('selected');
    });
    element.classList.add('selected');
    store.paymentMethod = element.textContent.trim();
  },

  renderOrderReview() {
    const subtotal = store.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + shipping;
    
    const itemsHTML = store.cart.map(item => `
      <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--color-card-border);">
        <div>
          <div style="font-weight: 600;">${item.name}</div>
          <div style="font-size: 14px; color: var(--color-text-secondary);">Qty: ${item.quantity} × $${item.price.toFixed(2)}</div>
        </div>
        <div style="font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
    
    document.getElementById('orderReview').innerHTML = `
      <div style="margin-bottom: 24px; padding: 16px; background: var(--color-background); border-radius: 8px;">
        <h4 style="margin-bottom: 12px;">Shipping Address</h4>
        <div style="line-height: 1.8;">
          ${store.shippingInfo.fullName}<br>
          ${store.shippingInfo.address}<br>
          ${store.shippingInfo.city}, ${store.shippingInfo.postalCode}<br>
          ${store.shippingInfo.country}
        </div>
      </div>
      <div style="margin-bottom: 24px; padding: 16px; background: var(--color-background); border-radius: 8px;">
        <h4 style="margin-bottom: 12px;">Payment Method</h4>
        <div>${store.paymentMethod}</div>
      </div>
      <div style="margin-bottom: 16px;">
        <h4 style="margin-bottom: 12px;">Order Items</h4>
        ${itemsHTML}
      </div>
      <div style="padding: 16px; background: var(--color-bg-1); border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span>Subtotal:</span>
          <span style="font-weight: 600;">$${subtotal.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span>Shipping:</span>
          <span style="font-weight: 600;">${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 600; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--color-card-border);">
          <span>Total:</span>
          <span style="color: var(--color-primary);">$${total.toFixed(2)}</span>
        </div>
      </div>
    `;
  },

  placeOrder() {
    const orderNumber = 'TFM' + Date.now().toString().slice(-8);
    
    // Clear cart
    store.cart = [];
    this.updateCartCount();
    
    // Show confirmation
    document.getElementById('orderNumberDisplay').innerHTML = `
      Order Number: <strong>${orderNumber}</strong>
    `;
    
    this.showView('confirmation');
    this.showToast('Order placed successfully!', 'success');
  },

  filterByCategory(categoryName) {
    // Set the filter and show shop view
    document.getElementById('categoryFilter').value = categoryName;
    this.filterProducts();
    this.showView('shop');
  },

  filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const sort = document.getElementById('sortFilter').value;
    
    let filtered = category === 'all' 
      ? [...store.products]
      : store.products.filter(p => p.category === category);
    
    // Apply sorting
    if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    const grid = document.getElementById('shopProductsGrid');
    grid.innerHTML = filtered.map(product => this.createProductCard(product)).join('');
  },

  populateCategoryFilter() {
    const select = document.getElementById('categoryFilter');
    store.categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.name;
      option.textContent = cat.name;
      select.appendChild(option);
    });
  },

  setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let debounceTimer;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchProducts(e.target.value);
      }, 300);
    });
  },

  searchProducts(query) {
    if (!query.trim()) {
      this.renderShopProducts();
      return;
    }
    
    const searchTerm = query.toLowerCase();
    const filtered = store.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
    
    const grid = document.getElementById('shopProductsGrid');
    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 48px;"><h3>No products found</h3><p>Try a different search term</p></div>';
    } else {
      grid.innerHTML = filtered.map(product => this.createProductCard(product)).join('');
    }
    
    this.showView('shop');
  },

  sendMessage() {
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    if (!name || !email || !subject || !message) {
      this.showToast('Please fill in all fields', 'error');
      return;
    }
    
    // Simulate sending message
    this.showToast('Message sent! We\'ll respond within 24-48 hours.', 'success');
    
    // Clear form
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMessage').value = '';
  },

  subscribe(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    this.showToast('Thanks for subscribing!', 'success');
    event.target.reset();
    return false;
  },

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}