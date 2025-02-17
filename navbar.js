document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbar-container");

    if (navbarContainer) {
        fetch("navbar.html")
            .then(response => response.text())
            .then(data => {
                navbarContainer.innerHTML = data;

                let navbarStyles = document.createElement("link");
                navbarStyles.rel = "stylesheet";
                navbarStyles.href = "navbar.css";
                document.head.appendChild(navbarStyles);

                highlightActivePage();
            })
            .catch(error => console.error("Error loading navbar:", error));
    } else {
        console.error("Navbar container not found!");
    }
});

// Highlight the active navbar link
function highlightActivePage() {
    const currentPage = window.location.pathname.split("/").pop(); // Get current file name
    const navLinks = document.querySelectorAll(".nav-button");

    navLinks.forEach(link => {
        const pageHref = link.getAttribute("href");
        if (pageHref && pageHref.includes(currentPage)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-button");

    if (cartButton) {
        cartButton.addEventListener("click", function (event) {
            event.preventDefault(); 
            window.location.href = "order.html"; // Redirect manually
        });
    }
});
