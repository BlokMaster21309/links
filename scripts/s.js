//Settings application script
const themeKey = "theme";
const schemeKey = "scheme";
let favicon = document.querySelector("link[rel~='icon']");
let old_icon = favicon.href

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", apply);
} else {
	apply();
}

window.addEventListener("storage", (e) => {
	console.log("Storage update:", e.key)
	if (e.key === themeKey) changeTheme();
	if (e.key === schemeKey) changeScheme();
});

function apply() {
	changeTheme();
	changeScheme();
}

function changeTheme() {
	const theme = localStorage.getItem(themeKey);
	if(theme) applyTheme(theme);
	else removeTheme();
	console.log("Theme update:", theme);
}

async function applyTheme(theme) {
	// Apply theme class to <body>
	document.body.className = document.body.className
		.replace(/\btheme-\S+/g, "")
		.trim();
	document.body.classList.add(`theme-${theme}`);

	// Apply dynamic CSS stylesheet
	let themeStylesheet = document.getElementById("theme-stylesheet");
	if (!themeStylesheet) {
		themeStylesheet = document.createElement("link");
		themeStylesheet.id = "theme-stylesheet";
		themeStylesheet.rel = "stylesheet";
		document.head.appendChild(themeStylesheet);
	}
	themeStylesheet.href = `/theme/${theme}/theme.css`;

	// Apply page-specific icon
	try {
		const response = await fetch(`/theme/${theme}/icons.json`);
		if (!response.ok) return;
		const icons = await response.json();
		
		if (!favicon) {
			favicon = document.createElement("link");
			favicon.rel = "icon";
			document.head.appendChild(favicon);
		}
		if (icons[window.location.pathname]) {
			favicon.href = `/theme/${theme}/icons/${icons[window.location.pathname]}`;
		}
	} catch (err) {
		console.error("Could not fetch theme icons configuration:", err);
	}
}

function removeTheme() {
	document.body.className = document.body.className
		.replace(/\btheme-\S+/g, "")
		.trim();
	const themeStylesheet = document.getElementById("theme-stylesheet");
	if (themeStylesheet) {
		themeStylesheet.remove();
	}
	favicon.href = old_icon
}

function changeScheme() {
	const scheme = localStorage.getItem(schemeKey);
	document.body.classList.remove("dark","light");
	if (scheme) document.body.classList.add(scheme);
	console.log("Scheme update:", scheme);
}