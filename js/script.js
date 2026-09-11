/**
 * VÉRITÉ ATELIER - Main Global Interactive UI Script
 * Sticky Header, Responsive Drawer, Search Overlay, Sliders, Modals & Forms
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNavigation();
  initSearchOverlay();
  initSliders();
  initNewsletterForm();
  initLookbookInteractions();
  initQuickViewModal();
  initSizeGuideModal();
  initFaqAccordions();
});

/* --------------------------------------------------------------------------
   1. STICKY NAVBAR & SCROLL BEHAVIOR
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const mobileDrawer = document.querySelector(".mobile-nav-drawer");
  const closeBtn = document.querySelector(".mobile-nav-close");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!hamburgerBtn || !mobileDrawer) return;

  // Ensure current active page is properly highlighted
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else if (href && !href.startsWith("#") && !href.startsWith("http")) {
      // Remove active from non-matching pages
      if (href !== currentPage) {
        link.classList.remove("active");
      }
    }
  });

  function openDrawer() {
    mobileDrawer.classList.add("open");
    hamburgerBtn.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function closeDrawer() {
    mobileDrawer.classList.remove("open");
    hamburgerBtn.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (mobileDrawer.classList.contains("open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
  }

  // Close when clicking a link inside
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  // Close when clicking outside drawer panel
  mobileDrawer.addEventListener("click", (e) => {
    if (e.target === mobileDrawer) {
      closeDrawer();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. SEARCH OVERLAY WITH AUTOCOMPLETE
   -------------------------------------------------------------------------- */
function initSearchOverlay() {
  const searchTriggers = document.querySelectorAll(".search-trigger-btn");
  const searchModal = document.querySelector(".search-modal");
  const searchClose = document.querySelector(".search-modal-close");
  const searchInput = document.querySelector(".search-input-field");
  const searchResultsBox = document.querySelector(".search-results-preview");

  if (!searchModal) return;

  function openSearch() {
    searchModal.classList.add("open");
    document.body.classList.add("no-scroll");
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 150);
    }
  }

  function closeSearch() {
    searchModal.classList.remove("open");
    document.body.classList.remove("no-scroll");
    if (searchInput) searchInput.value = "";
    if (searchResultsBox) searchResultsBox.innerHTML = "";
  }

  searchTriggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openSearch();
    });
  });

  if (searchClose) searchClose.addEventListener("click", closeSearch);

  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) closeSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchModal.classList.contains("open")) {
      closeSearch();
    }
  });

  // Live typing search
  if (searchInput && searchResultsBox) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        searchResultsBox.innerHTML = "";
        return;
      }

      if (typeof PRODUCTS_DATA !== "undefined") {
        const matches = PRODUCTS_DATA.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.category.toLowerCase().includes(q) || 
          p.collection.toLowerCase().includes(q)
        ).slice(0, 5);

        if (matches.length === 0) {
          searchResultsBox.innerHTML = `
            <div style="padding: 1.5rem 0; text-align: center; color: var(--text-muted);">
              <p>No products found matching “${q}”.</p>
            </div>
          `;
        } else {
          searchResultsBox.innerHTML = `
            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-light); margin-bottom: 0.75rem;">
              Suggested Products (${matches.length})
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${matches.map(p => `
                <a href="product-details.html?id=${p.id}" style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem; border-radius: 4px; background: var(--bg-secondary); text-decoration: none;">
                  <img src="${p.image}" alt="${p.name}" style="width: 48px; height: 58px; object-fit: cover; border-radius: 2px;">
                  <div style="flex: 1;">
                    <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-main);">${p.name}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${p.category} &bull; $${p.price}</div>
                  </div>
                  <span style="font-size: 0.75rem; color: var(--accent); font-weight: 600;">View &rarr;</span>
                </a>
              `).join('')}
            </div>
          `;
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. SLIDERS (TRENDING & REVIEWS)
   -------------------------------------------------------------------------- */
function initSliders() {
  // Trending Slider
  const trendingSlider = document.querySelector(".trending-slider");
  const trendingPrev = document.querySelector(".trending-slider-prev");
  const trendingNext = document.querySelector(".trending-slider-next");

  if (trendingSlider && trendingPrev && trendingNext) {
    trendingNext.addEventListener("click", () => {
      trendingSlider.scrollBy({ left: 320, behavior: "smooth" });
    });
    trendingPrev.addEventListener("click", () => {
      trendingSlider.scrollBy({ left: -320, behavior: "smooth" });
    });
  }

  // Reviews Slider
  const reviewsSlider = document.querySelector(".reviews-slider");
  const reviewsPrev = document.querySelector(".reviews-slider-prev");
  const reviewsNext = document.querySelector(".reviews-slider-next");

  if (reviewsSlider && reviewsPrev && reviewsNext) {
    reviewsNext.addEventListener("click", () => {
      reviewsSlider.scrollBy({ left: 400, behavior: "smooth" });
    });
    reviewsPrev.addEventListener("click", () => {
      reviewsSlider.scrollBy({ left: -400, behavior: "smooth" });
    });
  }
}

/* --------------------------------------------------------------------------
   5. NEWSLETTER FORM VALIDATION
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const forms = document.querySelectorAll(".newsletter-form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector(".newsletter-input");
      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        if (typeof Store !== "undefined") {
          Store.showToast("Please enter a valid email address.");
        } else {
          alert("Please enter a valid email address.");
        }
        input.focus();
        return;
      }

      if (typeof Store !== "undefined") {
        Store.showToast("Thank you for subscribing to Vérité Atelier.");
      } else {
        alert("Thank you for subscribing!");
      }
      input.value = "";
    });
  });
}

/* --------------------------------------------------------------------------
   6. LOOKBOOK MODAL / COLLECTION PREVIEW
   -------------------------------------------------------------------------- */
function initLookbookInteractions() {
  const lookItems = document.querySelectorAll(".lookbook-item");
  lookItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      window.location.href = "404.html";
    });
  });
}

/* --------------------------------------------------------------------------
   7. QUICK VIEW MODAL
   -------------------------------------------------------------------------- */
function initQuickViewModal() {
  const quickViewModal = document.getElementById("quickViewModal");
  if (!quickViewModal) return;

  const closeBtn = quickViewModal.querySelector(".modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      quickViewModal.classList.remove("open");
    });
  }

  quickViewModal.addEventListener("click", (e) => {
    if (e.target === quickViewModal) {
      quickViewModal.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && quickViewModal.classList.contains("open")) {
      quickViewModal.classList.remove("open");
    }
  });
}

window.openQuickView = function(productId) {
  if (typeof getProductById !== "function") return;
  const product = getProductById(productId);
  const modal = document.getElementById("quickViewModal");
  const modalBody = document.getElementById("quickViewContent");

  if (!modal || !modalBody || !product) return;

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
      <div style="aspect-ratio: 3/4; overflow: hidden; border-radius: 2px;">
        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div>
        <span class="eyebrow">${product.category}</span>
        <h2 style="font-size: 1.6rem; margin-bottom: 0.5rem;">${product.name}</h2>
        <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-main);">$${product.price}</div>
        <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${product.description}</p>
        
        <div style="margin-bottom: 1.25rem;">
          <label style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; display: block; margin-bottom: 0.4rem;">Select Size</label>
          <div style="display: flex; gap: 0.5rem;" id="quickViewSizes">
            ${product.sizes.map((s, i) => `
              <button type="button" class="size-chip ${i === 0 ? 'active' : ''}" style="padding: 0.4rem 0.75rem;">${s}</button>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 1.75rem;">
          <button class="btn btn-primary" style="flex: 1;" onclick="Store.addToCart(getProductById('${product.id}'), '${product.colors[0].name}', document.querySelector('#quickViewSizes .size-chip.active')?.textContent || '${product.sizes[0]}'); document.getElementById('quickViewModal').classList.remove('open');">
            Add to Bag
          </button>
          <a href="product-details.html?id=${product.id}" class="btn btn-secondary">
            Full Details
          </a>
        </div>
      </div>
    </div>
  `;

  // Add click listener for size chips in modal
  modalBody.querySelectorAll("#quickViewSizes .size-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      modalBody.querySelectorAll("#quickViewSizes .size-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });

  modal.classList.add("open");
};

/* --------------------------------------------------------------------------
   8. SIZE GUIDE MODAL
   -------------------------------------------------------------------------- */
function initSizeGuideModal() {
  const sizeGuideModal = document.getElementById("sizeGuideModal");
  if (!sizeGuideModal) return;

  const closeBtn = sizeGuideModal.querySelector(".modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      sizeGuideModal.classList.remove("open");
    });
  }

  sizeGuideModal.addEventListener("click", (e) => {
    if (e.target === sizeGuideModal) {
      sizeGuideModal.classList.remove("open");
    }
  });

  const unitBtns = sizeGuideModal.querySelectorAll(".unit-btn");
  unitBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      unitBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const unit = btn.dataset.unit;
      updateSizeGuideUnits(unit);
    });
  });
}

function updateSizeGuideUnits(unit) {
  const cmData = [
    { size: "XS", chest: "82-86 cm", waist: "64-68 cm", hip: "90-94 cm", length: "105 cm" },
    { size: "S", chest: "86-90 cm", waist: "68-72 cm", hip: "94-98 cm", length: "107 cm" },
    { size: "M", chest: "90-96 cm", waist: "72-78 cm", hip: "98-104 cm", length: "109 cm" },
    { size: "L", chest: "96-102 cm", waist: "78-84 cm", hip: "104-110 cm", length: "111 cm" },
    { size: "XL", chest: "102-108 cm", waist: "84-90 cm", hip: "110-116 cm", length: "113 cm" },
    { size: "XXL", chest: "108-114 cm", waist: "90-96 cm", hip: "116-122 cm", length: "115 cm" }
  ];

  const inchData = [
    { size: "XS", chest: "32-34 in", waist: "25-27 in", hip: "35-37 in", length: "41.3 in" },
    { size: "S", chest: "34-35.5 in", waist: "27-28.5 in", hip: "37-38.5 in", length: "42.1 in" },
    { size: "M", chest: "35.5-38 in", waist: "28.5-31 in", hip: "38.5-41 in", length: "42.9 in" },
    { size: "L", chest: "38-40 in", waist: "31-33 in", hip: "41-43 in", length: "43.7 in" },
    { size: "XL", chest: "40-42.5 in", waist: "33-35.5 in", hip: "43-45.5 in", length: "44.5 in" },
    { size: "XXL", chest: "42.5-45 in", waist: "35.5-38 in", hip: "45.5-48 in", length: "45.3 in" }
  ];

  const activeData = unit === "in" ? inchData : cmData;
  const tbody = document.getElementById("sizeGuideTableBody");
  if (tbody) {
    tbody.innerHTML = activeData.map(row => `
      <tr>
        <td><strong>${row.size}</strong></td>
        <td>${row.chest}</td>
        <td>${row.waist}</td>
        <td>${row.hip}</td>
        <td>${row.length}</td>
      </tr>
    `).join('');
  }
}

window.openSizeGuideModal = function() {
  const modal = document.getElementById("sizeGuideModal");
  if (modal) modal.classList.add("open");
};

/* --------------------------------------------------------------------------
   9. FAQ ACCORDION INTERACTION
   -------------------------------------------------------------------------- */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  function updateFaqSymbols() {
    faqItems.forEach(i => {
      const sym = i.querySelector(".faq-toggle-symbol");
      if (sym) {
        sym.innerHTML = i.classList.contains("active") ? "&minus;" : "&#43;";
      }
    });
  }

  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");
        faqItems.forEach(i => i.classList.remove("active"));
        if (!isOpen) {
          item.classList.add("active");
        }
        updateFaqSymbols();
      });
    }
  });

  updateFaqSymbols();
}

