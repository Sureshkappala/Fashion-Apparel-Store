/**
 * VÉRITÉ ATELIER - Central State & E-Commerce Store Engine
 * Pure Vanilla JavaScript LocalStorage State Management
 */

const STORE_KEYS = {
  CART: "VA_CART_ITEMS",
  WISHLIST: "VA_WISHLIST_ITEMS",
  PROMO: "VA_APPLIED_PROMO",
  USER: "VA_CURRENT_USER",
  ORDERS: "VA_USER_ORDERS"
};

// Initial Demo State Initialization
const Store = {
  // Cart Methods
  getCart() {
    try {
      const items = localStorage.getItem(STORE_KEYS.CART);
      return items ? JSON.parse(items) : [
        {
          id: "VA-101",
          name: "Architectural Wool Trench Coat",
          price: 385,
          color: "Camel",
          size: "S",
          quantity: 1,
          image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=500&q=65&fm=webp"
        },
        {
          id: "VA-104",
          name: "Minimalist Cashmere Crewneck",
          price: 295,
          color: "Oatmeal",
          size: "M",
          quantity: 1,
          image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=65&fm=webp"
        }
      ];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(STORE_KEYS.CART, JSON.stringify(cart));
    this.updateBadges();
  },

  addToCart(product, selectedColor, selectedSize, quantity = 1) {
    const cart = this.getCart();
    const color = selectedColor || (product.colors && product.colors[0] ? product.colors[0].name : "Standard");
    const size = selectedSize || (product.sizes && product.sizes[0] ? product.sizes[0] : "Standard");
    
    const existingIndex = cart.findIndex(item => item.id === product.id && item.color === color && item.size === size);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += Number(quantity);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        color: color,
        size: size,
        quantity: Number(quantity),
        image: product.image
      });
    }

    this.saveCart(cart);
    this.showToast(`“${product.name}” added to your Shopping Bag.`);
  },

  updateCartQty(index, qty) {
    const cart = this.getCart();
    if (cart[index]) {
      if (qty <= 0) {
        cart.splice(index, 1);
        this.showToast("Item removed from bag.");
      } else {
        cart[index].quantity = qty;
      }
      this.saveCart(cart);
    }
  },

  removeFromCart(index) {
    const cart = this.getCart();
    if (cart[index]) {
      const removed = cart.splice(index, 1);
      this.saveCart(cart);
      this.showToast(`Removed “${removed[0].name}” from bag.`);
    }
  },

  clearCart() {
    localStorage.removeItem(STORE_KEYS.CART);
    this.updateBadges();
  },

  getCartTotals() {
    const cart = this.getCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const promo = this.getPromo();
    
    let discount = 0;
    if (promo && promo.percent) {
      discount = (subtotal * promo.percent) / 100;
    }

    const freeShippingThreshold = 300;
    const shipping = subtotal > freeShippingThreshold || subtotal === 0 ? 0 : 25;
    const estimatedTax = (subtotal - discount) * 0.08; // 8% tax
    const total = Math.max(0, subtotal - discount + shipping + estimatedTax);

    return {
      subtotal,
      discount,
      shipping,
      tax: estimatedTax,
      total,
      freeShippingThreshold,
      progressPercent: Math.min(100, (subtotal / freeShippingThreshold) * 100),
      remainingForFreeShipping: Math.max(0, freeShippingThreshold - subtotal)
    };
  },

  // Wishlist Methods
  getWishlist() {
    try {
      const items = localStorage.getItem(STORE_KEYS.WISHLIST);
      return items ? JSON.parse(items) : ["VA-102", "VA-105", "VA-108"];
    } catch (e) {
      return [];
    }
  },

  saveWishlist(wishlist) {
    localStorage.setItem(STORE_KEYS.WISHLIST, JSON.stringify(wishlist));
    this.updateBadges();
  },

  toggleWishlist(productId) {
    let wishlist = this.getWishlist();
    const index = wishlist.indexOf(productId);
    let added = false;

    if (index > -1) {
      wishlist.splice(index, 1);
      this.showToast("Item removed from your Wishlist.");
    } else {
      wishlist.push(productId);
      added = true;
      this.showToast("Item saved to your Wishlist.");
    }

    this.saveWishlist(wishlist);
    return added;
  },

  isInWishlist(productId) {
    return this.getWishlist().includes(productId);
  },

  // Promo Code Methods
  getPromo() {
    try {
      const p = localStorage.getItem(STORE_KEYS.PROMO);
      return p ? JSON.parse(p) : null;
    } catch (e) {
      return null;
    }
  },

  applyPromo(code) {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "STYLE10") {
      const promo = { code: "STYLE10", percent: 10, label: "10% Welcome Discount" };
      localStorage.setItem(STORE_KEYS.PROMO, JSON.stringify(promo));
      this.showToast("Promo code STYLE10 applied! 10% discount.");
      return { success: true, promo };
    } else if (cleanCode === "AUTUMN20") {
      const promo = { code: "AUTUMN20", percent: 20, label: "20% Autumn Seasonal Offer" };
      localStorage.setItem(STORE_KEYS.PROMO, JSON.stringify(promo));
      this.showToast("Promo code AUTUMN20 applied! 20% discount.");
      return { success: true, promo };
    } else {
      return { success: false, message: "Invalid promo code. Try 'STYLE10' or 'AUTUMN20'." };
    }
  },

  removePromo() {
    localStorage.removeItem(STORE_KEYS.PROMO);
  },

  // Order Placement & Syncing
  getOrders() {
    try {
      const orders = localStorage.getItem(STORE_KEYS.ORDERS);
      return orders ? JSON.parse(orders) : [
        {
          id: "ORD-84920",
          date: "Oct 24, 2026",
          status: "Delivered",
          itemsCount: 2,
          total: 680,
          trackingNumber: "VA-FEDEX-9921448",
          items: [
            { name: "Architectural Wool Trench Coat", qty: 1, price: 385 },
            { name: "Minimalist Cashmere Crewneck", qty: 1, price: 295 }
          ]
        },
        {
          id: "ORD-84905",
          date: "Nov 02, 2026",
          status: "In Transit",
          itemsCount: 1,
          total: 240,
          trackingNumber: "VA-DHL-443901",
          items: [
            { name: "Silk Satin Bias Slip Dress", qty: 1, price: 240 }
          ]
        }
      ];
    } catch (e) {
      return [];
    }
  },

  createOrder(customerDetails) {
    const cart = this.getCart();
    const totals = this.getCartTotals();
    const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Processing",
      itemsCount: cart.reduce((acc, item) => acc + item.quantity, 0),
      total: Math.round(totals.total),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      trackingNumber: "VA-TRK-" + Math.floor(100000 + Math.random() * 900000),
      customer: customerDetails,
      items: cart
    };

    const orders = this.getOrders();
    orders.unshift(newOrder);
    localStorage.setItem(STORE_KEYS.ORDERS, JSON.stringify(orders));
    this.clearCart();
    this.removePromo();
    return newOrder;
  },

  // Badge Counters
  updateBadges() {
    const cart = this.getCart();
    const wishlist = this.getWishlist();
    const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

    document.querySelectorAll(".cart-count-badge").forEach(el => {
      el.textContent = totalCartCount;
      el.style.display = totalCartCount > 0 ? "flex" : "none";
    });

    document.querySelectorAll(".wishlist-count-badge").forEach(el => {
      el.textContent = wishlist.length;
      el.style.display = wishlist.length > 0 ? "flex" : "none";
    });
  },

  // Toast Notification System
  showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
};

// Initialize badges on load
document.addEventListener("DOMContentLoaded", () => {
  Store.updateBadges();
});
