/**
 * VÉRITÉ ATELIER - Customer & Admin Dashboard Controller
 * Pure Vanilla JS Tabs, Mobile Drawer, Charts & Management
 */

document.addEventListener("DOMContentLoaded", () => {
  initDashboardDrawer();
  
  if (document.getElementById("userDashboardShell")) {
    initUserDashboard();
  }

  if (document.getElementById("adminDashboardShell")) {
    initAdminDashboard();
  }
});

/* --------------------------------------------------------------------------
   1. DASHBOARD MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initDashboardDrawer() {
  const drawerBtn = document.querySelector(".btn-dashboard-drawer");
  const sidebar = document.querySelector(".dashboard-sidebar");
  const navItems = document.querySelectorAll(".dashboard-nav-item");

  if (!drawerBtn || !sidebar) return;

  let backdrop = document.querySelector(".dashboard-drawer-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "dashboard-drawer-backdrop";
    document.body.appendChild(backdrop);
  }

  function openSidebar() {
    sidebar.classList.add("open");
    backdrop.classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  drawerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains("open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  backdrop.addEventListener("click", closeSidebar);

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      closeSidebar();
    }
  });
}

/* --------------------------------------------------------------------------
   2. CUSTOMER USER DASHBOARD CONTROLLER
   -------------------------------------------------------------------------- */
function initUserDashboard() {
  const navItems = document.querySelectorAll("#userDashboardShell .dashboard-nav-item[data-tab]");
  const tabPanes = document.querySelectorAll("#userDashboardShell .dashboard-tab-pane");

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const tabTarget = item.dataset.tab;

      navItems.forEach(n => n.classList.remove("active"));
      tabPanes.forEach(p => p.style.display = "none");

      item.classList.add("active");
      const activePane = document.getElementById(tabTarget);
      if (activePane) activePane.style.display = "block";
    });
  });

  // Clicking logo in user dashboard resets view to overview tab
  const logoLink = document.getElementById("dashboardLogoLink");
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();
      const overviewBtn = document.querySelector("#userDashboardShell .dashboard-nav-item[data-tab='tab-overview']");
      if (overviewBtn) {
        overviewBtn.click();
      } else {
        navItems.forEach(n => n.classList.remove("active"));
        tabPanes.forEach(p => p.style.display = "none");
        const defaultPane = document.getElementById("tab-overview");
        if (defaultPane) defaultPane.style.display = "block";
      }
    });
  }

  // Load User Profile Name
  initUserProfile();

  // Render orders
  renderUserOrders();
  renderUserWishlist();
}

function initUserProfile() {
  let userName = "Eleanor Vance";
  let userEmail = "patron@veriteatelier.com";

  try {
    const raw = localStorage.getItem("verite_user") || localStorage.getItem("stackly_user");
    if (raw) {
      const u = JSON.parse(raw);
      if (u.name) userName = u.name;
      if (u.email) userEmail = u.email;
    }
  } catch (e) {}

  const greeting = document.getElementById("userGreetingTitle");
  if (greeting) greeting.textContent = `Bonjour, ${userName}`;

  const sidebarNameEls = document.querySelectorAll(".dashboard-user-name");
  sidebarNameEls.forEach(el => el.textContent = userName);

  const nameInput = document.querySelector("#tab-settings input[type='text']");
  if (nameInput) nameInput.value = userName;

  const emailInput = document.querySelector("#tab-settings input[type='email']");
  if (emailInput) emailInput.value = userEmail;
}

function renderUserOrders() {
  const tbody = document.getElementById("userOrdersTableBody");
  const tbody2 = document.getElementById("userOrdersTableBody2");
  if (!tbody && !tbody2) return;

  const orders = typeof Store !== "undefined" ? Store.getOrders() : [];

  if (tbody) {
    if (orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">No orders placed yet.</td></tr>`;
    } else {
      tbody.innerHTML = orders.map(order => `
        <tr>
          <td><strong>${order.id}</strong></td>
          <td>${order.date}</td>
          <td>${order.itemsCount} ${order.itemsCount === 1 ? 'item' : 'items'}</td>
          <td><strong>$${order.total}.00</strong></td>
          <td>
            <span class="status-badge ${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span>
          </td>
        </tr>
      `).join('');
    }
  }

  if (tbody2) {
    if (orders.length === 0) {
      tbody2.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">No orders placed yet.</td></tr>`;
    } else {
      tbody2.innerHTML = orders.map(order => `
        <tr>
          <td><strong>${order.id}</strong></td>
          <td>${order.date}</td>
          <td>${order.itemsCount} ${order.itemsCount === 1 ? 'item' : 'items'}</td>
          <td><strong>$${order.total}.00</strong></td>
          <td>
            <span class="status-badge ${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span>
          </td>
          <td>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn btn-secondary" onclick="if(typeof Store!=='undefined') Store.showToast('Generating official tax receipt for ${order.id}...');" style="font-size: 0.72rem; padding: 0.35rem 0.65rem;">Receipt</button>
              <a href="#" onclick="document.querySelector('[data-tab=tab-tracking]').click();" class="btn btn-primary" style="font-size: 0.72rem; padding: 0.35rem 0.65rem;">Track</a>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }
}

function renderUserWishlist() {
  const container = document.getElementById("userWishlistGrid");
  if (!container) return;

  const wishlistIds = typeof Store !== "undefined" ? Store.getWishlist() : [];
  const products = wishlistIds.map(id => typeof getProductById === "function" ? getProductById(id) : null).filter(Boolean);

  if (products.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); text-align: center; padding: 2rem;">No items in your wishlist.</p>`;
    return;
  }

  container.innerHTML = products.map(product => `
    <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 4px; overflow: hidden;">
      <img src="${product.image}" alt="${product.name}" style="width: 100%; aspect-ratio: 3/4; object-fit: cover;">
      <div style="padding: 1rem;">
        <h4 style="font-size: 0.95rem; margin-bottom: 0.25rem;">${product.name}</h4>
        <div style="font-weight: 600; margin-bottom: 0.75rem;">$${product.price}</div>
        <button class="btn btn-primary" style="width: 100%; font-size: 0.75rem; padding: 0.5rem;" onclick="Store.addToCart(getProductById('${product.id}'), '${product.colors[0].name}', '${product.sizes[0]}');">
          Add to Bag
        </button>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   3. ADMIN DASHBOARD CONTROLLER & CHARTS
   -------------------------------------------------------------------------- */
function initAdminDashboard() {
  const navItems = document.querySelectorAll("#adminDashboardShell .dashboard-nav-item[data-tab]");
  const tabPanes = document.querySelectorAll("#adminDashboardShell .dashboard-tab-pane");

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const tabTarget = item.dataset.tab;

      navItems.forEach(n => n.classList.remove("active"));
      tabPanes.forEach(p => p.style.display = "none");

      item.classList.add("active");
      const activePane = document.getElementById(tabTarget);
      if (activePane) activePane.style.display = "block";
    });
  });

  // Clicking logo in admin dashboard resets view to admin overview tab
  const adminLogoLink = document.getElementById("adminDashboardLogoLink");
  if (adminLogoLink) {
    adminLogoLink.addEventListener("click", (e) => {
      e.preventDefault();
      const overviewBtn = document.querySelector("#adminDashboardShell .dashboard-nav-item[data-tab='tab-admin-overview']");
      if (overviewBtn) {
        overviewBtn.click();
      } else {
        navItems.forEach(n => n.classList.remove("active"));
        tabPanes.forEach(p => p.style.display = "none");
        const defaultPane = document.getElementById("tab-admin-overview");
        if (defaultPane) defaultPane.style.display = "block";
      }
    });
  }

  renderAdminOrders();
  renderAdminInventory();
  drawAdminRevenueChart();
}

function renderAdminOrders() {
  const tbody = document.getElementById("adminOrdersTableBody");
  if (!tbody) return;

  const orders = typeof Store !== "undefined" ? Store.getOrders() : [];
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td>${order.customer?.fullName || "Valued Client"}</td>
      <td>${order.date}</td>
      <td><strong>$${order.total}.00</strong></td>
      <td>
        <select onchange="updateOrderStatus('${order.id}', this.value)" style="padding: 0.35rem 0.6rem; border: 1px solid var(--border-light); font-size: 0.75rem; border-radius: 2px;">
          <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
          <option value="In Transit" ${order.status === 'In Transit' ? 'selected' : ''}>In Transit</option>
          <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </td>
    </tr>
  `).join('');
}

window.updateOrderStatus = function(orderId, newStatus) {
  const orders = Store.getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    localStorage.setItem(STORE_KEYS.ORDERS, JSON.stringify(orders));
    Store.showToast(`Order ${orderId} updated to ${newStatus}.`);
  }
};

function renderAdminInventory() {
  const tbody = document.getElementById("adminInventoryTableBody");
  if (!tbody) return;

  const products = typeof getAllProducts === "function" ? getAllProducts() : [];
  tbody.innerHTML = products.map(p => `
    <tr>
      <td><strong>${p.id}</strong></td>
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${p.image}" alt="${p.name}" style="width: 36px; height: 46px; object-fit: cover; border-radius: 2px;">
          <span>${p.name}</span>
        </div>
      </td>
      <td>${p.category}</td>
      <td>$${p.price}</td>
      <td>
        <span style="font-weight: 600; color: ${p.stock < 8 ? 'var(--danger)' : 'var(--success)'};">
          ${p.stock} units ${p.stock < 8 ? '(Low Stock)' : ''}
        </span>
      </td>
    </tr>
  `).join('');
}

// Pure Canvas Line Chart for Admin Revenue
function drawAdminRevenueChart() {
  const canvas = document.getElementById("adminRevenueCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  const revenue = [28000, 35000, 42000, 39000, 58000, 64000, 78500];

  const padding = { top: 30, right: 30, bottom: 40, left: 60 };
  const width = rect.width - padding.left - padding.right;
  const height = rect.height - padding.top - padding.bottom;

  const maxVal = 90000;

  // Clear
  ctx.clearRect(0, 0, rect.width, rect.height);

  // Draw Grid Lines
  ctx.strokeStyle = "#ECE7DF";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#8C8C8C";
  ctx.font = "11px Inter, sans-serif";

  for (let i = 0; i <= 4; i++) {
    const yVal = (maxVal / 4) * i;
    const yPos = padding.top + height - (height * (yVal / maxVal));

    ctx.beginPath();
    ctx.moveTo(padding.left, yPos);
    ctx.lineTo(padding.left + width, yPos);
    ctx.stroke();

    ctx.fillText(`$${(yVal / 1000)}k`, 10, yPos + 4);
  }

  // Draw Points & Curve
  const points = revenue.map((val, idx) => {
    const x = padding.left + (width / (months.length - 1)) * idx;
    const y = padding.top + height - (height * (val / maxVal));
    return { x, y, val };
  });

  // Area Fill
  ctx.beginPath();
  ctx.moveTo(points[0].x, padding.top + height);
  points.forEach(pt => ctx.lineTo(pt.x, pt.y));
  ctx.lineTo(points[points.length - 1].x, padding.top + height);
  ctx.closePath();
  ctx.fillStyle = "rgba(176, 99, 70, 0.12)";
  ctx.fill();

  // Line Stroke
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = "#B06346";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Draw Points and X-Axis labels
  points.forEach((pt, idx) => {
    // Dot
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#141414";
    ctx.fill();
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Month Label
    ctx.fillStyle = "#666";
    ctx.textAlign = "center";
    ctx.fillText(months[idx], pt.x, padding.top + height + 22);
  });
}

// Global Sign Out handler across dashboards
document.querySelectorAll(".dashboard-logout-item").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (typeof Store !== "undefined" && Store.showToast) {
      Store.showToast("Signed out successfully. Redirecting to login...");
    }
    setTimeout(() => {
      window.location.href = "login.html";
    }, 600);
  });
});

window.addEventListener("resize", () => {
  if (document.getElementById("adminRevenueCanvas")) {
    drawAdminRevenueChart();
  }
});
