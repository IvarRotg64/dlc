/** @format */

import { products } from "./product-data.js";
// Add this import for badge update
import("./main.js").then((mod) => {
	window.updateCartBadge = mod.updateCartBadge || (() => {});
});

// Utility: get cart from localStorage
function getCart() {
	return JSON.parse(localStorage.getItem("cart") || "{}");
}
// Utility: save cart to localStorage
function saveCart(cart) {
	localStorage.setItem("cart", JSON.stringify(cart));
}
// Utility: get product by id
function getProductById(id) {
	return products.find((p) => p.id === Number(id));
}

// Render cart items
function renderCart() {
	const cart = getCart();
	const cartMain = document.querySelector("main.container");
	let total = 0;
	let html = "";
	if (Object.keys(cart).length === 0) {
		html = `<div class="alert alert-info text-center">Your cart is empty.</div>`;
	} else {
		html = `<div class="table-responsive"><table class="table align-middle bg-white rounded-4 shadow-sm">
      <thead><tr><th></th><th>Product</th><th>Price</th><th style="width:120px">Qty</th><th>Subtotal</th><th></th></tr></thead><tbody>`;
		for (const key in cart) {
			const item = cart[key];
			const product = getProductById(item.id);
			if (!product) continue;
			const qty = item.qty || 1;
			const price = item.price || product.price;
			const gram = item.gram
				? `<div class="text-muted small">${item.gram}</div>`
				: "";
			const subtotal = price * qty;
			total += subtotal;
			html += `<tr>
        <td><img src="${product.image}" alt="${product.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;background:#e3f6ff"></td>
        <td>${product.name}${gram}</td>
        <td>R${price}</td>
        <td><input type="number" min="1" value="${qty}" class="form-control form-control-sm cart-qty-input" data-id="${key}" style="width:70px"></td>
        <td>R${subtotal}</td>
        <td><button class="btn btn-outline-danger btn-sm cart-remove-btn" data-id="${key}"><i class="bi bi-trash"></i></button></td>
      </tr>`;
		}
		html += `</tbody></table></div>`;
		html += `<div class="text-end fw-bold fs-5 mb-4">Total: R${total}</div>`;
		html += `<div class="text-end"><a href="checkout.html" class="btn btn-success btn-lg">Checkout</a></div>`;
	}
	cartMain.innerHTML =
		`<h1 class="text-center mb-5 fw-bold">Your Cart</h1>` + html;
	window.updateCartBadge && window.updateCartBadge();
}

// Handle cart events
function setupCartEvents() {
	const cartMain = document.querySelector("main.container");
	cartMain.addEventListener("input", function (e) {
		if (e.target.classList.contains("cart-qty-input")) {
			const id = e.target.getAttribute("data-id");
			let qty = parseInt(e.target.value);
			if (isNaN(qty) || qty < 1) qty = 1;
			const cart = getCart();
			if (cart[id] && typeof cart[id] === "object") {
				cart[id].qty = qty;
			} else {
				cart[id] = { qty };
			}
			saveCart(cart);
			renderCart();
			window.updateCartBadge && window.updateCartBadge();
		}
	});
	cartMain.addEventListener("click", function (e) {
		if (
			e.target.classList.contains("cart-remove-btn") ||
			e.target.closest(".cart-remove-btn")
		) {
			const btn = e.target.closest(".cart-remove-btn");
			const id = btn.getAttribute("data-id");
			const cart = getCart();
			delete cart[id];
			saveCart(cart);
			renderCart();
			window.updateCartBadge && window.updateCartBadge();
		}
	});
}

// On load
if (window.location.pathname.endsWith("cart.html")) {
	document.addEventListener("DOMContentLoaded", function () {
		renderCart();
		setupCartEvents();
	});
}
