document.addEventListener("DOMContentLoaded", function () {
    loadRecentOrders();
    updateRewardPoints();

    // Add event listeners for logout confirmation
    document.getElementById("confirm-logout").addEventListener("click", logoutUser);
    document.getElementById("cancel-logout").addEventListener("click", function () {
        document.getElementById("logout-modal").style.display = "none";
    });
});

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
