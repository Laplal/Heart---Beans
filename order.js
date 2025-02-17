document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();
});

let selectedDeliveryMode = "On-Demand Pick-Up";
let selectedPickupHour = ""; 

// Load cart items from local storage
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orderItemsContainer = document.getElementById("order-items");
    let subtotal = 0;

    if (!Array.isArray(cart) || cart.length === 0) {
        orderItemsContainer.innerHTML = "<p>No items in cart.</p>";
        document.getElementById("subtotal").textContent = "$0.00";
        document.getElementById("total").textContent = "$0.00";
        return;
    }

    orderItemsContainer.innerHTML = ""; 

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        let itemElement = document.createElement("p");
        itemElement.textContent = `${item.name} (${item.size}) x${item.quantity} - $${itemTotal.toFixed(2)}`;
        orderItemsContainer.appendChild(itemElement);
    });

    let tax = subtotal * 0.0113;
    let total = subtotal + tax;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

// Select delivery mode
function selectDelivery(mode) {
    selectedDeliveryMode = mode;

    document.querySelectorAll(".delivery-btn").forEach(btn => btn.classList.remove("active-btn"));
    event.target.classList.add("active-btn");

    const pickupHourContainer = document.getElementById("pickup-hour-container");
    if (mode === "Scheduled Pick-Up") {
        pickupHourContainer.classList.remove("hidden");
    } else {
        pickupHourContainer.classList.add("hidden");
        selectedPickupHour = "";
    }
}// Confirm the order and show the confirmation pop-up
function confirmOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (selectedDeliveryMode === "Scheduled Pick-Up") {
        selectedPickupHour = document.getElementById("pickup-hour").value;
    }

    let subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let tax = subtotal * 0.0113;
    let total = subtotal + tax;

    // Calculate reward points (30% of total)
    let rewardPoints = Math.floor(total * 0.30);

    let currentPoints = parseInt(localStorage.getItem("rewardPoints")) || 0;
    let updatedPoints = currentPoints + rewardPoints;
    localStorage.setItem("rewardPoints", updatedPoints);

    let recentOrders = JSON.parse(localStorage.getItem("recentOrders")) || [];
    let orderDetails = {
        items: cart,
        deliveryMode: selectedDeliveryMode,
        pickupHour: selectedPickupHour,
        total: `$${total.toFixed(2)}`,
        earnedPoints: rewardPoints
    };

    recentOrders.push(orderDetails);
    localStorage.setItem("recentOrders", JSON.stringify(recentOrders));
    localStorage.removeItem("cart");

    document.getElementById("popup-message").innerText = 
        `Order successfully placed! You earned ${rewardPoints} points.`;
    document.getElementById("confirmation-modal").style.display = "flex";
}

// Close pop-up and redirect to account page
document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("confirmation-modal").style.display = "none";
    window.location.href = "account.html";
});


// Function to clear the order
function clearOrder() {
    localStorage.removeItem("cart");
    loadCartItems();
}
