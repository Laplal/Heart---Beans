document.addEventListener("DOMContentLoaded", function () {
    loadCartCount();
});





let selectedSizes = {}; 
let previousCategory = document.querySelector(".active-category");

// Menu Data 
const menuData = {
    coffee: [
        { name: "Espresso", img: "Images/Coffee/Espresso.webp", sizes: ["Single Shot - $2.50", "Double Shot - $3.50"] },
        { name: "Latte", img: "Images/Coffee/Latte.webp", sizes: ["S - $3.25", "M - $4.00", "L - $4.50"] },
        { name: "Cappuccino", img: "Images/Coffee/Cappucino.webp", sizes: ["S - $3.50", "M - $4.25", "L - $4.75"] },
        { name: "Americano", img: "Images/Coffee/Americano.webp", sizes: ["S - $2.75", "M - $3.50", "L - $4.00"] },
        { name: "Mocha", img: "Images/Coffee/Mocha.webp", sizes: ["S - $3.75", "M - $4.50", "L - $5.00"] },
        { name: "Flat White", img: "Images/Coffee/Flat_White.webp", sizes: ["S - $3.50", "M - $4.25", "L - $4.75"] },
        { name: "Macchiato", img: "Images/Coffee/Macchiato.webp", sizes: ["S - $3.00", "M - $3.75", "L - $4.25"] }
    ],
    tea: [
        { name: "Green Tea", img: "Images/Tea/Green_Tea.webp", sizes: ["S - $2.50", "M - $3.00", "L - $3.50"] },
        { name: "Black Tea", img: "Images/Tea/Black_Tea.webp", sizes: ["S - $2.75", "M - $3.25", "L - $3.75"] },
        { name: "Herbal Tea", img: "Images/Tea/Herbal_Tea.webp", sizes: ["S - $2.50", "M - $3.00", "L - $3.50"] },
        { name: "Chai Latte", img: "Images/Tea/Chai_Latte.webp", sizes: ["S - $3.25", "M - $4.00", "L - $4.50"] },
        { name: "Oolong Tea", img: "Images/Tea/Oolong_Tea.webp", sizes: ["S - $2.75", "M - $3.25", "L - $3.75"] },
        { name: "Jasmine Tea", img: "Images/Tea/Jasmine_Tea.webp", sizes: ["S - $2.50", "M - $3.00", "L - $3.50"] }
    ],
    cocoa: [
        { name: "Hot Chocolate", img: "Images/Cocoa/Hot_Chocolate.webp", sizes: ["S - $3.00", "M - $3.75", "L - $4.25"] },
        { name: "Dark Hot Chocolate", img: "Images/Cocoa/Dark_Hot_Chocolate.webp", sizes: ["S - $3.25", "M - $4.00", "L - $4.50"] },
        { name: "White Hot Chocolate", img: "Images/Cocoa/White_Hot_Chocolate.webp", sizes: ["S - $3.50", "M - $4.25", "L - $4.75"] },
        { name: "Marshmallow Cocoa", img: "Images/Cocoa/Marshmallow_Chocolate.webp", sizes: ["S - $3.75", "M - $4.50", "L - $5.00"] }
    ],
    cold_drinks: [
        { name: "Iced Coffee", img: "Images/Cold_Drinks/Iced_Coffee.webp", sizes: ["S - $3.50", "M - $4.00", "L - $4.50"] },
        { name: "Iced Latte", img: "Images/Cold_Drinks/Iced_Latte.webp", sizes: ["S - $3.75", "M - $4.50", "L - $5.00"] },
        { name: "Cold Brew", img: "Images/Cold_Drinks/Cold_Brew.webp", sizes: ["S - $3.75", "M - $4.50", "L - $5.00"] },
        { name: "Iced Mocha", img: "Images/Cold_Drinks/Iced_Mocha.webp", sizes: ["S - $4.00", "M - $4.75", "L - $5.25"] },
        { name: "Lemon Iced Tea", img: "Images/Cold_Drinks/Lemon_Iced_Tea.webp", sizes: ["S - $3.25", "M - $4.00", "L - $4.50"] }
    ],
    meals_snacks: [
        { name: "Butter Croissant", img: "Images/Meal_Snacks/Butter_Croissant.webp", sizes: ["$3.25"] },
        { name: "Chocolate Croissant", img: "Images/Meal_Snacks/Chocolate_Croissant.webp", sizes: ["$3.75"] },
        { name: "Blueberry Muffin", img: "Images/Meal_Snacks/Blueberry_Muffin.webp", sizes: ["$3.50"] },
        { name: "Almond Croissant", img: "Images/Meal_Snacks/Almond_Croissant.webp", sizes: ["$3.75"] },
        { name: "Bagel with Cream Cheese", img: "Images/Meal_Snacks/Bagel.webp", sizes: ["$4.00"] },
        { name: "Avocado Toast", img: "Images/Meal_Snacks/Avocado_Toast.webp", sizes: ["$5.00"] },
        { name: "Oatmeal Bowl", img: "Images/Meal_Snacks/Oatmeal_Bowl.webp", sizes: ["$4.50"] }
    ]
};

// Change categories dynamically
function changeCategory(category, element) {
    const menuContent = document.getElementById("menu-content");


    menuContent.style.opacity = "0";

    setTimeout(() => {
        menuContent.innerHTML = ""; // Clear menu

        // Create menu items 
        menuData[category].forEach(item => {
            let menuBox = document.createElement("div");
            menuBox.classList.add("menu-box");

            let img = document.createElement("img");
            img.src = item.img;
            img.alt = item.name;
            img.classList.add("menu-image");

            let title = document.createElement("h3");
            title.textContent = item.name;

            let sizeButtons = document.createElement("div");
            sizeButtons.classList.add("size-buttons");

            item.sizes.forEach(size => {
                let span = document.createElement("span");
                span.classList.add("size-btn");
                span.textContent = size;
                span.onclick = function () {
                    selectSize(span, item.name);
                };
                sizeButtons.appendChild(span);
            });

            let orderButton = document.createElement("a");
            orderButton.classList.add("order-btn");
            orderButton.textContent = "Order";
            orderButton.onclick = function () {
                addToCart(item.name);
            };

            menuBox.appendChild(img);
            menuBox.appendChild(title);
            menuBox.appendChild(sizeButtons);
            menuBox.appendChild(orderButton);
            menuContent.appendChild(menuBox);
        });

        menuContent.style.opacity = "1"; 
    }, 300);

    if (previousCategory) {
        previousCategory.classList.remove("active-category");
        previousCategory.classList.add("prev-category");
    }

    element.classList.add("active-category");
    element.classList.remove("prev-category");
    previousCategory = element;
}



// Select a size
function selectSize(span, itemName) {
    let parent = span.parentNode;
    let buttons = parent.getElementsByClassName("size-btn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active-btn");
    }

    span.classList.add("active-btn");

    // Store selected size and price
    let sizeText = span.innerText;
    let price = parseFloat(sizeText.match(/\$(\d+\.\d+)/)[1]);
    selectedSizes[itemName] = { size: sizeText, price: price };
}

//Add item to cart
function addToCart(itemName) {
    if (!selectedSizes[itemName]) {
        alert("Please select a size before ordering!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item with the same size already exists in cart
    let existingItem = cart.find(item => item.name === itemName && item.size === selectedSizes[itemName].size);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            size: selectedSizes[itemName].size,
            price: selectedSizes[itemName].price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count display
    loadCartCount();
}

// Update cart count in the Navbar
function loadCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = `Cart (${itemCount})`;
}

// Expose functions to global scope
window.changeCategory = changeCategory;
window.selectSize = selectSize;
window.addToCart = addToCart;
