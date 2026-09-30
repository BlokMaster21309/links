document.addEventListener("DOMContentLoaded", () => {
	// Entries
	const themeSelect = document.getElementById("themes");
	const schemeSelect = document.getElementById("schemes");

	// Keys for local storage
	const themeKey = "theme";
	const schemeKey = "scheme";

	// Set current values from localStorage on load
	if (localStorage.getItem(themeKey)) {
	themeSelect.value = localStorage.getItem(themeKey);
	}
	if (localStorage.getItem(schemeKey)) {
	schemeSelect.value = localStorage.getItem(schemeKey);
	}

	// Save preference and update on change
	themeSelect.addEventListener("change", (e) => {
		if (e.target.value) {
			localStorage.setItem(themeKey, e.target.value);
			console.log("Theme set to", e.target.value);
		}
		else {
			localStorage.removeItem(themeKey);
			console.log("Theme removed");
		}
		changeTheme(e.target.value);
	});
	schemeSelect.addEventListener("change", (e) => {
		if (e.target.value) {
			localStorage.setItem(schemeKey, e.target.value);
			console.log("Scheme set to", e.target.value);
		}
		else {
			localStorage.removeItem(schemeKey);
			console.log("Scheme removed");
		}
		changeScheme(e.target.value);
	});
});