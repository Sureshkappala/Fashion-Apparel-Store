/**
 * VÉRITÉ ATELIER - Shop Catalog, Filtering, Sorting & Product Details Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check if we are on a catalog page (shop, women, men, new-arrivals)
  if (document.getElementById("catalogProductGrid")) {
    initCatalogPage();
  }

  // Check if we are on the Product Details page
  if (document.getElementById("productDetailsContainer")) {
    initProductDetailsPage();
  }

  // Check if on Cart page
  if (document.getElementById("cartItemsContainer")) {
    initCartPage();
  }

  // Check if on Wishlist page
  if (document.getElementById("wishlistItemsContainer")) {
    initWishlistPage();
  }
});

/* --------------------------------------------------------------------------
   1. CATALOG FILTERING & SORTING ENGINE
   -------------------------------------------------------------------------- */
function initCatalogPage() {
  const grid = document.getElementById("catalogProductGrid");
  const countEl = document.getElementById("catalogCount");
  const sortSelect = document.getElementById("catalogSortSelect");
  const priceSlider = document.getElementById("priceRangeSlider");
  const priceDisplay = document.getElementById("priceRangeDisplay");
  const clearBtn = document.getElementById("clearFiltersBtn");
  const filterMobileTrigger = document.querySelector(".btn-filter-mobile-trigger");
  const sidebar = document.querySelector(".shop-sidebar");
  const closeSidebarBtn = document.querySelector(".shop-sidebar-close");

  // Determine initial filter constraints from page dataset or URL params
  const urlParams = new URLSearchParams(window.location.search);
  const pageGender = grid.dataset.gender || urlParams.get("gender") || "All";
  const pageCategory = grid.dataset.category || urlParams.get("category") || "All";
  const isNewArrivalsPage = grid.dataset.newOnly === "true";

  let activeFilters = {
    gender: pageGender,
    categories: pageCategory !== "All" ? [pageCategory] : [],
    sizes: [],
    colors: [],
    maxPrice: 600,
    minRating: 0
  };

  // Mobile drawer trigger
  if (filterMobileTrigger && sidebar) {
    filterMobileTrigger.addEventListener("click", () => {
      sidebar.classList.add("open");
    });
  }
  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  }

  // Price slider listener
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      const val = Number(e.target.value);
      priceDisplay.textContent = `$${val}`;
      activeFilters.maxPrice = val;
      renderFilteredProducts();
    });
  }

  // Category Checkbox Listeners
  document.querySelectorAll(".filter-category-checkbox").forEach(cb => {
    if (pageCategory !== "All" && cb.value.toLowerCase() === pageCategory.toLowerCase()) {
      cb.checked = true;
    }
    cb.addEventListener("change", () => {
      const checked = Array.from(document.querySelectorAll(".filter-category-checkbox:checked")).map(el => el.value);
      activeFilters.categories = checked;
      renderFilteredProducts();
    });
  });

  // Size Chip Listeners
  document.querySelectorAll(".filter-size-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
      const activeSizes = Array.from(document.querySelectorAll(".filter-size-chip.active")).map(el => el.dataset.size);
      activeFilters.sizes = activeSizes;
      renderFilteredProducts();
    });
  });

  // Color Swatch Listeners
  document.querySelectorAll(".filter-color-swatch").forEach(swatch => {
    swatch.addEventListener("click", () => {
      swatch.classList.toggle("active");
      const activeColors = Array.from(document.querySelectorAll(".filter-color-swatch.active")).map(el => el.dataset.color);
      activeFilters.colors = activeColors;
      renderFilteredProducts();
    });
  });

  // Sort listener
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      renderFilteredProducts();
    });
  }

  // Clear filters
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      document.querySelectorAll(".filter-category-checkbox").forEach(cb => cb.checked = false);
      document.querySelectorAll(".filter-size-chip").forEach(chip => chip.classList.remove("active"));
      document.querySelectorAll(".filter-color-swatch").forEach(swatch => swatch.classList.remove("active"));
      if (priceSlider) {
        priceSlider.value = 600;
        priceDisplay.textContent = "$600";
      }
      activeFilters = {
        gender: pageGender,
        categories: [],
        sizes: [],
        colors: [],
        maxPrice: 600,
        minRating: 0
      };
      renderFilteredProducts();
    });
  }

  function renderFilteredProducts() {
    let list = getAllProducts();

    // Gender filter
    if (activeFilters.gender !== "All") {
      list = list.filter(p => p.gender.toLowerCase() === activeFilters.gender.toLowerCase() || p.gender === "Unisex");
    }

    // New only filter (for new-arrivals.html)
    if (isNewArrivalsPage) {
      list = list.filter(p => p.isNew);
    }

    // Categories filter
    if (activeFilters.categories.length > 0) {
      list = list.filter(p => activeFilters.categories.some(cat => cat.toLowerCase() === p.category.toLowerCase()));
    }

    // Sizes filter
    if (activeFilters.sizes.length > 0) {
      list = list.filter(p => p.sizes.some(s => activeFilters.sizes.includes(s)));
    }

    // Colors filter
    if (activeFilters.colors.length > 0) {
      list = list.filter(p => p.colors.some(c => activeFilters.colors.some(ac => c.name.toLowerCase().includes(ac.toLowerCase()))));
    }

    // Price filter
    list = list.filter(p => p.price <= activeFilters.maxPrice);

    // Sorting
    const sortVal = sortSelect ? sortSelect.value : "featured";
    if (sortVal === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortVal === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortVal === "newest") {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    // Update count
    if (countEl) {
      countEl.textContent = `Showing ${list.length} ${list.length === 1 ? 'Product' : 'Products'}`;
    }

    // Render cards
    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 4px;">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No products match your criteria</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">Try adjusting your filters or price range to find what you're looking for.</p>
          <button class="btn btn-secondary" onclick="document.getElementById('clearFiltersBtn')?.click();">Clear All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(product => createProductCardHtml(product)).join('');
  }

  // Initial render
  renderFilteredProducts();
}

function createProductCardHtml(product) {
  const isWish = typeof Store !== "undefined" && Store.isInWishlist(product.id);
  const badgeClass = product.badge === 'Sale' ? 'badge-discount' : (product.badge === 'Trending' ? 'badge-trending' : 'badge-new');

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-image-box">
        ${product.badge ? `<span class="badge-tag ${badgeClass}">${product.badge}</span>` : ''}
        <button class="wishlist-toggle-btn ${isWish ? 'active' : ''}" onclick="toggleProductWishlist(event, '${product.id}')" aria-label="Add to Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <a href="product-details.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
        <div class="product-actions-bar">
          <button class="btn-quick-add" onclick="Store.addToCart(getProductById('${product.id}'), '${product.colors[0].name}', '${product.sizes[0]}');">
            Add to Bag
          </button>
          <button class="btn-quick-view" onclick="openQuickView('${product.id}')" title="Quick View">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <a href="product-details.html?id=${product.id}" class="product-title">${product.name}</a>
        <div class="product-price-row">
          <span class="current-price">$${product.price}</span>
          ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
        </div>
        <div class="product-rating">
          <span>★</span>
          <span>${product.rating}</span>
          <span style="color: var(--text-light); font-size: 0.7rem;">(${product.reviewsCount})</span>
        </div>
      </div>
    </article>
  `;
}

window.toggleProductWishlist = function(event, productId) {
  event.preventDefault();
  event.stopPropagation();
  if (typeof Store === "undefined") return;
  
  const added = Store.toggleWishlist(productId);
  const btn = event.currentTarget;
  if (added) {
    btn.classList.add("active");
  } else {
    btn.classList.remove("active");
  }
};

/* --------------------------------------------------------------------------
   2. PRODUCT DETAILS PAGE CONTROLLER
   -------------------------------------------------------------------------- */
function initProductDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "VA-101";
  const product = getProductById(productId);

  const container = document.getElementById("productDetailsContainer");
  if (!container || !product) return;

  // Selected State
  let activeColor = product.colors[0].name;
  let activeSize = product.sizes[0];
  let activeQuantity = 1;

  container.innerHTML = `
    <div class="product-details-grid">
      <!-- Gallery -->
      <div class="product-gallery-wrap">
        <div class="product-thumbnails">
          ${product.gallery.map((img, i) => `
            <div class="thumb-item ${i === 0 ? 'active' : ''}" onclick="switchDetailImage(this, '${img}')">
              <img src="${img}" alt="${product.name} View ${i + 1}">
            </div>
          `).join('')}
        </div>
        <div class="product-main-view" id="mainZoomView">
          <img id="mainDetailImg" src="${product.gallery[0]}" alt="${product.name}">
        </div>
      </div>

      <!-- Info & Buy Box -->
      <div class="product-details-info">
        <div class="product-meta-header">
          <span class="eyebrow">${product.category} &bull; ${product.collection}</span>
          <h1>${product.name}</h1>
          <div class="product-rating-reviews">
            <div class="product-rating">
              <span>★</span><span>${product.rating}</span>
            </div>
            <span style="color: var(--text-light);">&bull;</span>
            <a href="#reviews" style="color: var(--text-muted); text-decoration: underline;">${product.reviewsCount} verified reviews</a>
          </div>
        </div>

        <div class="product-price-large">
          <span class="price-main">$${product.price}</span>
          ${product.oldPrice ? `<span class="price-discounted">$${product.oldPrice}</span>` : ''}
          ${product.oldPrice ? `<span class="discount-badge-lg">Save $${product.oldPrice - product.price}</span>` : ''}
        </div>

        <div class="stock-indicator">
          In Stock &bull; Only ${product.stock} items left in atelier
        </div>

        <p class="product-short-desc">${product.description}</p>

        <!-- Color Selector -->
        <div class="option-section">
          <div class="option-header-row">
            <span class="form-label">Color: <strong id="selectedColorName">${activeColor}</strong></span>
          </div>
          <div class="color-swatches-grid" id="detailColorSwatches">
            ${product.colors.map((c, i) => `
              <button type="button" class="color-swatch-opt ${i === 0 ? 'active' : ''}" 
                style="background-color: ${c.hex};" 
                title="${c.name}" 
                onclick="selectDetailColor(this, '${c.name}')">
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Size Selector -->
        <div class="option-section">
          <div class="option-header-row">
            <span class="form-label">Size: <strong id="selectedSizeName">${activeSize}</strong></span>
            <button type="button" class="btn-size-guide-link" onclick="openSizeGuideModal()">Size Guide &amp; Fit</button>
          </div>
          <div class="size-chips-grid" id="detailSizeChips">
            ${product.sizes.map((s, i) => `
              <button type="button" class="size-chip ${i === 0 ? 'active' : ''}" onclick="selectDetailSize(this, '${s}')">
                ${s}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Quantity & Add To Bag -->
        <div class="option-section">
          <span class="form-label">Quantity</span>
          <div class="qty-control-box">
            <button type="button" class="qty-btn" onclick="updateDetailQty(-1)">-</button>
            <input type="text" class="qty-input" id="detailQtyInput" value="1" readonly>
            <button type="button" class="qty-btn" onclick="updateDetailQty(1)">+</button>
          </div>
        </div>

        <div class="details-action-group">
          <button class="btn btn-primary btn-add-bag-lg" id="detailAddBagBtn">
            Add to Shopping Bag &bull; $${product.price}
          </button>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <button class="btn btn-secondary" id="detailBuyNowBtn">
              Instant Checkout
            </button>
            <button class="btn btn-secondary" onclick="Store.toggleWishlist('${product.id}')">
              Save to Wishlist
            </button>
          </div>
        </div>

        <!-- Benefits Micro -->
        <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: 4px; display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.8125rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <span>Free express delivery on orders over $300</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>Complimentary 30-day returns &amp; exchanges</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Tabs -->
    <div class="product-tabs-nav">
      <button class="tab-btn active" onclick="switchProductTab(this, 'tab-fabric')">Fabric &amp; Atelier Craft</button>
      <button class="tab-btn" onclick="switchProductTab(this, 'tab-care')">Care Instructions</button>
      <button class="tab-btn" onclick="switchProductTab(this, 'tab-shipping')">Shipping &amp; Duties</button>
      <button class="tab-btn" onclick="switchProductTab(this, 'tab-reviews')">Customer Reviews (${product.reviewsCount})</button>
    </div>

    <div class="product-tabs-content">
      <div class="tab-pane active" id="tab-fabric">
        <p>${product.fabric}</p>
        <p style="margin-top: 0.5rem;">Every piece in our atelier is tailored with precision stitching, reinforced seams, and premium interlining for a flawless silhouette that withstands the test of time.</p>
      </div>
      <div class="tab-pane" id="tab-care">
        <p>${product.care}</p>
      </div>
      <div class="tab-pane" id="tab-shipping">
        <p>Standard delivery: 3–5 business days ($25 or FREE over $300).<br>Express delivery: 1–2 business days ($45). All orders ship carbon-neutral in our signature biodegradable luxury packaging.</p>
      </div>
      <div class="tab-pane" id="tab-reviews">
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="border-bottom: 1px solid var(--border-light); padding-bottom: 1rem;">
            <div style="color: #E6A23C; margin-bottom: 0.25rem;">★★★★★</div>
            <strong>Elena Vance</strong> &bull; <span style="color: var(--text-light); font-size: 0.75rem;">Verified Purchaser</span>
            <p style="margin-top: 0.4rem;">"The fabric texture and drape exceeded every expectation. An absolute masterpiece in my wardrobe."</p>
          </div>
          <div>
            <div style="color: #E6A23C; margin-bottom: 0.25rem;">★★★★★</div>
            <strong>Marcello Rossi</strong> &bull; <span style="color: var(--text-light); font-size: 0.75rem;">Verified Purchaser</span>
            <p style="margin-top: 0.4rem;">"Impeccable tailoring. Fits true to size and feels wonderfully luxurious."</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Image zoom handler
  const zoomBox = document.getElementById("mainZoomView");
  const zoomImg = document.getElementById("mainDetailImg");
  if (zoomBox && zoomImg) {
    zoomBox.addEventListener("mousemove", (e) => {
      const rect = zoomBox.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      zoomImg.style.transformOrigin = `${x}% ${y}%`;
      zoomImg.style.transform = "scale(1.65)";
    });
    zoomBox.addEventListener("mouseleave", () => {
      zoomImg.style.transform = "scale(1)";
    });
  }

  // Add to Bag Button
  document.getElementById("detailAddBagBtn")?.addEventListener("click", () => {
    Store.addToCart(product, activeColor, activeSize, activeQuantity);
  });

  // Buy Now Button
  document.getElementById("detailBuyNowBtn")?.addEventListener("click", () => {
    Store.addToCart(product, activeColor, activeSize, activeQuantity);
    window.location.href = "checkout.html";
  });

  // Global helper bindings for details page
  window.switchDetailImage = function(el, src) {
    document.querySelectorAll(".thumb-item").forEach(t => t.classList.remove("active"));
    el.classList.add("active");
    const mainImg = document.getElementById("mainDetailImg");
    if (mainImg) mainImg.src = src;
  };

  window.selectDetailColor = function(el, colorName) {
    document.querySelectorAll("#detailColorSwatches .color-swatch-opt").forEach(s => s.classList.remove("active"));
    el.classList.add("active");
    activeColor = colorName;
    const label = document.getElementById("selectedColorName");
    if (label) label.textContent = colorName;
  };

  window.selectDetailSize = function(el, sizeName) {
    document.querySelectorAll("#detailSizeChips .size-chip").forEach(s => s.classList.remove("active"));
    el.classList.add("active");
    activeSize = sizeName;
    const label = document.getElementById("selectedSizeName");
    if (label) label.textContent = sizeName;
  };

  window.updateDetailQty = function(delta) {
    activeQuantity = Math.max(1, activeQuantity + delta);
    const input = document.getElementById("detailQtyInput");
    if (input) input.value = activeQuantity;
  };

  window.switchProductTab = function(btn, paneId) {
    document.querySelectorAll(".product-tabs-nav .tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".product-tabs-content .tab-pane").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    const pane = document.getElementById(paneId);
    if (pane) pane.classList.add("active");
  };
}

/* --------------------------------------------------------------------------
   3. CART PAGE CONTROLLER
   -------------------------------------------------------------------------- */
function initCartPage() {
  const container = document.getElementById("cartItemsContainer");
  const summaryBox = document.getElementById("cartSummaryBox");
  if (!container) return;

  function renderCart() {
    const cart = Store.getCart();
    const totals = Store.getCartTotals();
    const promo = Store.getPromo();

    if (cart.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem;">
          <h2 style="font-size: 1.75rem; margin-bottom: 0.75rem;">Your Shopping Bag is Empty</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">Discover timeless luxury essentials from our new collections.</p>
          <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
        </div>
      `;
      if (summaryBox) summaryBox.style.display = "none";
      return;
    }

    if (summaryBox) summaryBox.style.display = "block";

    container.innerHTML = `
      <div class="cart-items-card">
        ${cart.map((item, index) => `
          <div class="cart-item-row">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div>
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-meta">Color: ${item.color} &bull; Size: ${item.size}</div>
              <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="qty-control-box">
              <button class="qty-btn" onclick="Store.updateCartQty(${index}, ${item.quantity - 1}); initCartPage();">-</button>
              <span class="qty-input" style="line-height: 40px;">${item.quantity}</span>
              <button class="qty-btn" onclick="Store.updateCartQty(${index}, ${item.quantity + 1}); initCartPage();">+</button>
            </div>
            <div class="cart-item-actions">
              <button class="cart-item-remove" onclick="Store.removeFromCart(${index}); initCartPage();" title="Remove Item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    if (summaryBox) {
      summaryBox.innerHTML = `
        <div class="order-summary-card">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;">Order Summary</h3>
          
          <div style="font-size: 0.8125rem; margin-bottom: 0.5rem; color: var(--text-muted);">
            ${totals.remainingForFreeShipping > 0 
              ? `Add <strong>$${totals.remainingForFreeShipping}</strong> more for complimentary delivery.` 
              : `You have qualified for <strong>FREE Complimentary Delivery</strong>!`}
          </div>
          <div class="free-shipping-progress">
            <div class="free-shipping-bar" style="width: ${totals.progressPercent}%;"></div>
          </div>

          <div class="summary-row">
            <span>Subtotal</span>
            <span>$${totals.subtotal.toFixed(2)}</span>
          </div>

          ${promo ? `
            <div class="summary-row" style="color: var(--accent);">
              <span>Promo (${promo.code})</span>
              <span>-$${totals.discount.toFixed(2)}</span>
            </div>
          ` : ''}

          <div class="summary-row">
            <span>Estimated Shipping</span>
            <span>${totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}</span>
          </div>

          <div class="summary-row">
            <span>Estimated Tax (8%)</span>
            <span>$${totals.tax.toFixed(2)}</span>
          </div>

          <div class="summary-row total">
            <span>Total</span>
            <span>$${totals.total.toFixed(2)}</span>
          </div>

          <!-- Coupon Input -->
          <div style="display: flex; gap: 0.5rem; margin: 1.5rem 0;">
            <input type="text" id="cartPromoInput" placeholder="Promo code (e.g. STYLE10)" style="flex: 1; padding: 0.75rem; border: 1px solid var(--border-light); font-size: 0.8125rem; border-radius: 2px;">
            <button class="btn btn-secondary" style="padding: 0.75rem 1rem;" onclick="applyCartPromo()">Apply</button>
          </div>

          <a href="checkout.html" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">
            Proceed to Checkout
          </a>
        </div>
      `;
    }
  }

  window.applyCartPromo = function() {
    const input = document.getElementById("cartPromoInput");
    if (!input || !input.value.trim()) return;
    const res = Store.applyPromo(input.value.trim());
    if (res.success) {
      renderCart();
    } else {
      Store.showToast(res.message);
    }
  };

  renderCart();
}

/* --------------------------------------------------------------------------
   4. WISHLIST PAGE CONTROLLER
   -------------------------------------------------------------------------- */
function initWishlistPage() {
  const container = document.getElementById("wishlistItemsContainer");
  if (!container) return;

  function renderWishlist() {
    const wishlistIds = Store.getWishlist();
    const products = wishlistIds.map(id => getProductById(id)).filter(Boolean);

    if (products.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 4px;">
          <h2 style="font-size: 1.75rem; margin-bottom: 0.75rem;">Your Wishlist is Empty</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">Save your favorite runway and editorial pieces to view them anytime.</p>
          <a href="shop.html" class="btn btn-primary">Explore Products</a>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(product => `
      <article class="product-card">
        <div class="product-image-box">
          <button class="wishlist-toggle-btn active" onclick="Store.toggleWishlist('${product.id}'); initWishlistPage();" title="Remove from Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--danger)" stroke="var(--danger)" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <a href="product-details.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}">
          </a>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <a href="product-details.html?id=${product.id}" class="product-title">${product.name}</a>
          <div class="product-price-row">
            <span class="current-price">$${product.price}</span>
            <span style="font-size: 0.75rem; color: var(--success); font-weight: 600;">In Stock</span>
          </div>
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button class="btn btn-primary" style="flex: 1; font-size: 0.75rem; padding: 0.65rem;" onclick="Store.addToCart(getProductById('${product.id}'), '${product.colors[0].name}', '${product.sizes[0]}');">
              Move to Bag
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  renderWishlist();
}
