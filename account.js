document.addEventListener("DOMContentLoaded", function () {
    loadRecentOrders();
    updateRewardPoints();
    loadReservationDetails();

    // Add event listeners for logout confirmation
    document.getElementById("confirm-logout").addEventListener("click", logoutUser);
    document.getElementById("cancel-logout").addEventListener("click", function () {
        document.getElementById("logout-modal").style.display = "none";
    });
});

// Load and display reservation details in the account page
function loadReservationDetails() {
    let reservation = JSON.parse(localStorage.getItem("currentReservation"));

    if (reservation) {
        document.getElementById("user-name").innerText = reservation.name;
        document.getElementById("user-phone").innerText = `Phone Number: ${reservation.phone}`;
        document.getElementById("user-email").innerText = `Email: ${reservation.email}`;
        document.getElementById("user-address").innerText = `Address: ${reservation.address}`;
        document.getElementById("reservation-date").innerText = `Date: ${reservation.date}`;
        document.getElementById("reservation-time").innerText = `Time: ${reservation.time}`;
        document.getElementById("reservation-guests").innerText = `# of Guests: ${reservation.guests}`;
        document.getElementById("reservation-requests").innerText = `Requests: ${reservation.requests || "None"}`;
    } else {

        document.getElementById("user-name").innerText = "Full Name";
        document.getElementById("user-phone").innerText = "Phone Number:";
        document.getElementById("user-email").innerText = "Email:";
        document.getElementById("user-address").innerText = "Address:";

        document.getElementById("reservation-date").innerText = "No reservations found.";
        document.getElementById("reservation-time").innerText = "";
        document.getElementById("reservation-guests").innerText = "";
        document.getElementById("reservation-requests").innerText = "";
    }
}

// Update reward points display
function updateRewardPoints() {
    let points = localStorage.getItem("rewardPoints") || 0;
    document.getElementById("reward-points").textContent = points;
}

// Load recent orders
function loadRecentOrders() {
    let recentOrders = JSON.parse(localStorage.getItem("recentOrders")) || [];
    let ordersList = document.querySelector(".orders-list");

    if (recentOrders.length === 0) {
        ordersList.innerHTML = "<p>No recent orders.</p>";
        return;
    }

    ordersList.innerHTML = "";
    recentOrders.slice(-3).forEach(order => {
        let orderElement = document.createElement("div");
        orderElement.classList.add("order-entry");

        let itemsText = order.items.map(item => `${item.name} (x${item.quantity})`).join(", ");
        orderElement.innerHTML = `
            <p><strong>${order.deliveryMode}</strong>: ${itemsText} - <strong>Total:</strong> ${order.total}</p>
        `;

        ordersList.appendChild(orderElement);
    });
}

// Show logout confirmation modal
function showLogoutWarning() {
    document.getElementById("logout-modal").style.display = "flex";
}

// Log out the user
function logoutUser() {
    localStorage.removeItem("cart");            
    localStorage.removeItem("recentOrders");    
    localStorage.removeItem("userInfo");        
    localStorage.removeItem("currentReservation"); 
    localStorage.removeItem("rewardPoints");    

    window.location.href = "index.html";
}
