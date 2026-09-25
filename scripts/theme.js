const favicon = document.querySelector("link[rel~='icon']");
if (localStorage.getItem("theme") === "dark") {document.body.classList.add("dark"); if (favicon) favicon.href = "dark.png";}
document.getElementById("mode-toggle").addEventListener("click", () => {document.body.classList.toggle("dark");
	if (document.body.classList.contains("dark")) {localStorage.setItem("theme", "dark"); if (favicon) favicon.href = "/images/daGoatChopped2.bmp";} 
	else {localStorage.removeItem("theme"); if (favicon) favicon.href = "/images/daGoat.png";}});