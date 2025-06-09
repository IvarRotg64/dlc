/** @format */

// scripts/feedback.js
// Handles feedback form, stores feedback in localStorage, and renders feedback on homepage

document.addEventListener("DOMContentLoaded", function () {
	const FEEDBACK_KEY = "dlc_feedback";

	// --- Feedback Form Submission ---
	const form = document.getElementById("feedback-form");
	if (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			const name = form.elements["name"].value.trim();
			const rating = parseInt(form.elements["rating"].value);
			const comment = form.elements["comment"].value.trim();
			if (!name || !rating || !comment) {
				form.classList.add("was-validated");
				return;
			}
			const feedback = {
				name,
				rating,
				comment,
				date: new Date().toISOString(),
			};
			const all = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
			all.unshift(feedback); // newest first
			localStorage.setItem(FEEDBACK_KEY, JSON.stringify(all));
			form.reset();
			form.classList.remove("was-validated");
			showToast("Thank you for your feedback!");
			renderFeedback();
		});
	}

	// --- Render Feedback ---
	function renderFeedback() {
		const container = document.getElementById("feedback-list");
		if (!container) return;
		const all = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
		if (all.length === 0) {
			container.innerHTML = "";
			return;
		}
		container.innerHTML = all
			.slice(0, 3)
			.map(
				(f) => `
			<div class="col-12 col-md-4">
				<div class="bg-white rounded-4 shadow-sm p-4 h-100 text-center">
					<div class="mb-3 fs-2 text-primary">${"★ ".repeat(f.rating).trim()}</div>
					<blockquote class="blockquote mb-2">${escapeHtml(f.comment)}</blockquote>
					<footer class="blockquote-footer">${escapeHtml(f.name)}</footer>
				</div>
			</div>
		`
			)
			.join("");
	}

	// --- Toast ---
	function showToast(msg) {
		let toast = document.getElementById("feedback-toast");
		if (!toast) {
			toast = document.createElement("div");
			toast.id = "feedback-toast";
			toast.className =
				"toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-4";
			toast.style.zIndex = 9999;
			toast.innerHTML = `<div class="d-flex"><div class="toast-body"></div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
			document.body.appendChild(toast);
		}
		toast.querySelector(".toast-body").textContent = msg;
		const bsToast = new bootstrap.Toast(toast, { delay: 2500 });
		bsToast.show();
	}

	// --- Escape HTML ---
	function escapeHtml(str) {
		return str.replace(/[&<>"']/g, function (c) {
			return {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;",
			}[c];
		});
	}

	renderFeedback();
});
