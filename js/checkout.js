/**
 * VÉRITÉ ATELIER - Checkout Form Controller & Strict JS Validation
 */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("checkoutForm")) {
    initCheckoutPage();
  }
});

function initCheckoutPage() {
  const form = document.getElementById("checkoutForm");
  const summaryBox = document.getElementById("checkoutSummaryBox");

  // Render live summary
  function renderCheckoutSummary() {
    const cart = Store.getCart();
    const totals = Store.getCartTotals();
    const promo = Store.getPromo();

    if (!summaryBox) return;

    if (cart.length === 0) {
      summaryBox.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <p style="color: var(--text-muted); margin-bottom: 1rem;">Your bag is empty.</p>
          <a href="shop.html" class="btn btn-secondary">Return to Shop</a>
        </div>
      `;
      return;
    }

    summaryBox.innerHTML = `
      <div class="order-summary-card">
        <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;">In Your Bag (${cart.length})</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; max-height: 240px; overflow-y: auto; margin-bottom: 1.5rem; padding-right: 0.5rem;">
          ${cart.map(item => `
            <div style="display: flex; gap: 1rem; align-items: center;">
              <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 65px; object-fit: cover; border-radius: 2px;">
              <div style="flex: 1;">
                <div style="font-size: 0.875rem; font-weight: 500;">${item.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-light);">${item.color} &bull; ${item.size} &bull; Qty: ${item.quantity}</div>
              </div>
              <div style="font-size: 0.875rem; font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          `).join('')}
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
          <span>Shipping</span>
          <span>${totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}</span>
        </div>

        <div class="summary-row">
          <span>Estimated Tax</span>
          <span>$${totals.tax.toFixed(2)}</span>
        </div>

        <div class="summary-row total">
          <span>Total to Pay</span>
          <span>$${totals.total.toFixed(2)}</span>
        </div>
      </div>
    `;
  }

  renderCheckoutSummary();

  // Strict Validation Rules
  function validateField(input) {
    const group = input.closest(".form-group");
    const val = input.value.trim();
    let isValid = true;
    let errorMsg = "";

    switch (input.id) {
      case "fullName":
        // Letters and spaces only (no numbers or symbols)
        const nameRegex = /^[A-Za-z\s]{2,50}$/;
        if (!val) {
          isValid = false;
          errorMsg = "Full name is required.";
        } else if (!nameRegex.test(val)) {
          isValid = false;
          errorMsg = "Name must contain letters and spaces only.";
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) {
          isValid = false;
          errorMsg = "Email address is required.";
        } else if (!emailRegex.test(val)) {
          isValid = false;
          errorMsg = "Please enter a valid email address.";
        }
        break;

      case "mobile":
        // Numbers only and between 8 to 15 digits
        const mobileRegex = /^[0-9+-\s]{8,15}$/;
        const pureDigits = val.replace(/\D/g, "");
        if (!val) {
          isValid = false;
          errorMsg = "Mobile number is required.";
        } else if (pureDigits.length < 8 || pureDigits.length > 15) {
          isValid = false;
          errorMsg = "Enter a valid mobile number (8-15 digits, numbers only).";
        }
        break;

      case "postalCode":
        // Numbers/alphanumeric between 3 and 10 chars
        const zipRegex = /^[0-9A-Za-z\s-]{3,10}$/;
        if (!val) {
          isValid = false;
          errorMsg = "Postal code is required.";
        } else if (!zipRegex.test(val)) {
          isValid = false;
          errorMsg = "Enter a valid postal code.";
        }
        break;

      case "address":
      case "city":
      case "state":
      case "country":
        if (!val) {
          isValid = false;
          errorMsg = "This field is required.";
        }
        break;
    }

    if (group) {
      const msgEl = group.querySelector(".form-error-msg");
      if (!isValid) {
        group.classList.add("has-error");
        input.classList.add("is-invalid");
        if (msgEl) msgEl.textContent = errorMsg;
      } else {
        group.classList.remove("has-error");
        input.classList.remove("is-invalid");
      }
    }

    return isValid;
  }

  // Real-time blur and input validation
  const inputs = form.querySelectorAll("input, select");
  inputs.forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("is-invalid")) {
        validateField(input);
      }
    });
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cart = Store.getCart();
    if (cart.length === 0) {
      Store.showToast("Your cart is empty. Please add items before checkout.");
      return;
    }

    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      Store.showToast("Please correct the errors in the form before proceeding.");
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Collect Data
    const customerDetails = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      mobile: document.getElementById("mobile").value.trim(),
      address: document.getElementById("address").value.trim(),
      city: document.getElementById("city").value.trim(),
      state: document.getElementById("state").value.trim(),
      postalCode: document.getElementById("postalCode").value.trim(),
      country: document.getElementById("country").value.trim()
    };

    // Create Order in Store
    const placedOrder = Store.createOrder(customerDetails);

    // Show Confirmation Modal
    showOrderConfirmationModal(placedOrder);
  });
}

function showOrderConfirmationModal(order) {
  let modal = document.getElementById("orderConfirmationModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "orderConfirmationModal";
    modal.className = "modal-backdrop";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content-box" style="max-width: 580px; text-align: center;">
      <div style="width: 64px; height: 64px; background: #E8F5E9; color: #2E7D32; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <span class="eyebrow">Order Placed Successfully</span>
      <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Thank You, ${order.customer.fullName}</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
        Your bespoke order <strong style="color: var(--text-main);">${order.id}</strong> has been received by our atelier. A confirmation receipt has been sent to <strong>${order.customer.email}</strong>.
      </p>

      <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: 4px; text-align: left; font-size: 0.875rem; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="color: var(--text-muted);">Tracking Number:</span>
          <strong>${order.trackingNumber}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="color: var(--text-muted);">Total Paid:</span>
          <strong>$${order.total}.00</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">Delivery Address:</span>
          <span>${order.customer.address}, ${order.customer.city}</span>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center;">
        <a href="user-dashboard.html" class="btn btn-primary">Track in Dashboard</a>
        <a href="index.html" class="btn btn-secondary">Back to Home</a>
      </div>
    </div>
  `;

  modal.classList.add("open");
}
