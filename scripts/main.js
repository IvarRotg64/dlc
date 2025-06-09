/** @format */

import { products } from "./product-data.js";

document.addEventListener("DOMContentLoaded", function () {
	const categoryButtons = document.querySelectorAll(".category-btn");
	const productList = document.getElementById("product-list");
	const categoryTitle = document.getElementById("category-title");

	function renderProducts(category) {
		// Filter products by category
		const filtered = products.filter((p) => p.category === category);
		// Set title
		categoryTitle.textContent =
			category.charAt(0).toUpperCase() + category.slice(1) + " Products";
		categoryTitle.style.display = "block";
		// Animate fade out/in
		productList.style.opacity = 0;
		setTimeout(() => {
			productList.innerHTML = filtered
				.map(
					(p) => `
          <div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow border-0">
              <img src="${
								p.image
							}" class="card-img-top p-3 rounded-4 product-img" alt="${
						p.name
					}" />
              <div class="card-body text-center">
                <h5 class="card-title fw-bold">${p.name}</h5>
                <p class="card-text">${p.desc}</p>
                <div class="mb-2 fw-bold text-primary product-price" data-id="${
									p.id
								}">R${p.grams ? p.grams[0].price : p.price}</div>
                ${
									p.grams
										? `<select class="form-select form-select-sm mb-2 product-gram-select" data-id="${
												p.id
										  }">
                  ${p.grams
										.map(
											(g, i) =>
												`<option value="${i}">${g.label} - R${g.price}</option>`
										)
										.join("")}
                </select>`
										: ""
								}
                <button class="btn btn-success add-to-cart-btn" data-id="${
									p.id
								}">Add to Cart</button>
              </div>
            </div>
          </div>
        `
				)
				.join("");
			productList.style.opacity = 1;
		}, 200);
	}

	categoryButtons.forEach((btn) => {
		btn.addEventListener("click", function () {
			const cat = this.getAttribute("data-category");
			renderProducts(cat);
			// Scroll to product list
			document
				.getElementById("product-list-section")
				.scrollIntoView({ behavior: "smooth" });
		});
	});

	// On page load, show a default category (e.g., Vapes)
	if (productList && categoryButtons.length > 0) {
		renderProducts(categoryButtons[0].getAttribute("data-category"));
	}

	// Bootstrap Toast for Add to Cart
	function showToast(message) {
		let toastContainer = document.getElementById("toast-container");
		if (!toastContainer) {
			toastContainer = document.createElement("div");
			toastContainer.id = "toast-container";
			toastContainer.style.position = "fixed";
			toastContainer.style.top = "1rem";
			toastContainer.style.right = "1rem";
			toastContainer.style.zIndex = "9999";
			document.body.appendChild(toastContainer);
		}
		const toastId = "toast-" + Date.now();
		toastContainer.insertAdjacentHTML(
			"beforeend",
			`
    <div id="${toastId}" class="toast align-items-center text-bg-success border-0 show mb-2" role="alert" aria-live="assertive" aria-atomic="true" style="min-width:220px;">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `
		);
		const toastEl = document.getElementById(toastId);
		const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
		toast.show();
		toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
	}

	// Listen for gram selection changes and update price
	if (productList) {
		productList.addEventListener("change", function (e) {
			if (e.target.classList.contains("product-gram-select")) {
				const id = e.target.getAttribute("data-id");
				const product = products.find((p) => p.id == id);
				if (product && product.grams) {
					const gramIdx = parseInt(e.target.value);
					const price = product.grams[gramIdx].price;
					const priceEl = document.querySelector(
						`.product-price[data-id='${id}']`
					);
					if (priceEl) priceEl.textContent = `R${price}`;
				}
			}
		});
	}

	// Add to cart with selected gram/price
	if (productList) {
		productList.addEventListener("click", function (e) {
			if (e.target.classList.contains("add-to-cart-btn")) {
				const id = e.target.getAttribute("data-id");
				const product = products.find((p) => p.id == id);
				let gramIdx = 0;
				let price = product.price;
				let gramLabel = null;
				if (product.grams) {
					const select = document.querySelector(
						`.product-gram-select[data-id='${id}']`
					);
					if (select) {
						gramIdx = parseInt(select.value);
						price = product.grams[gramIdx].price;
						gramLabel = product.grams[gramIdx].label;
					}
				}
				// Add to cart logic
				let cart = JSON.parse(localStorage.getItem("cart") || "{}");
				const cartKey = product.grams ? `${id}_${gramLabel}` : id;
				if (!cart[cartKey])
					cart[cartKey] = { qty: 0, price, gram: gramLabel, id };
				cart[cartKey].qty += 1;
				cart[cartKey].price = price;
				localStorage.setItem("cart", JSON.stringify(cart));
				showToast("Item has been added to cart!");
			}
		});
	}

	// Generate a unique order ID that is never reused
	function generateUniqueOrderId() {
		let id;
		let usedIds = JSON.parse(localStorage.getItem("usedOrderIds") || "[]");
		do {
			id = "DLC-" + Math.random().toString(36).substr(2, 8).toUpperCase();
		} while (usedIds.includes(id));
		usedIds.push(id);
		localStorage.setItem("usedOrderIds", JSON.stringify(usedIds));
		return id;
	}

	// Checkout form validation and order success
	if (window.location.pathname.includes("checkout.html")) {
		const form = document.getElementById("checkout-form");
		if (!form) {
			console.warn("No checkout form found on this page.");
			return;
		}
		console.log("Checkout form JS event attached");
		form.addEventListener("submit", function (e) {
			if (!form.checkValidity()) {
				e.preventDefault();
				e.stopPropagation();
				form.classList.add("was-validated");
			} else {
				// On valid submit, create order log and redirect to success page
				e.preventDefault();
				const cart = JSON.parse(localStorage.getItem("cart") || "{}");
				let total = 0;
				for (const key in cart) {
					const item = cart[key];
					const price = item.price || 0;
					const qty = item.qty || 1;
					total += price * qty;
				}
				const deliveryMethod = form.deliveryMethod.value;
				let deliveryFee = 0;
				if (deliveryMethod === "delivery") deliveryFee = 60;
				const orderId = generateUniqueOrderId();
				const order = {
					id: orderId,
					name: form.name.value,
					email: form.email.value,
					address: form.address.value,
					city: form.city.value,
					zip: form.zip.value,
					payment: "Direct Bank Transfer",
					cart: cart,
					deliveryMethod: deliveryMethod,
					deliveryFee: deliveryFee,
					total: total + deliveryFee,
					date: new Date().toLocaleString(),
				};
				// Save order log
				let orderLogs = JSON.parse(localStorage.getItem("orderLogs") || "[]");
				orderLogs.push(order);
				localStorage.setItem("orderLogs", JSON.stringify(orderLogs));
				localStorage.setItem("lastOrder", JSON.stringify(order));
				localStorage.removeItem("cart");

				// --- WhatsApp auto-send logic ---
				import("./product-data.js").then(({ products }) => {
					let msg = `Order ID: ${order.id}%0AName: ${order.name}%0AAddress: ${
						order.address
					}, ${order.city} ${order.zip}%0ADelivery: ${
						order.deliveryMethod === "delivery"
							? "Delivery to Address (R60)"
							: "Self Pickup (Free)"
					}%0AItems:`;
					for (const key in order.cart) {
						const item = order.cart[key];
						const product = products.find(
							(p) => p.id == (item.id || key.split("_")[0])
						);
						let name = product ? product.name : `Product #${key}`;
						let gram = item.gram ? ` (${item.gram})` : "";
						let qty = item.qty || item;
						msg += `%0A- ${name}${gram} x${qty}`;
					}
					if (order.deliveryFee && order.deliveryFee > 0) {
						msg += `%0A- Delivery Fee: R${order.deliveryFee}`;
					}
					msg += `%0AReference: ${order.id}`;
					window.open("https://wa.me/27821234567?text=" + msg, "_blank");
					window.location.href = "success.html";
				});
			}
		});
	}
});
