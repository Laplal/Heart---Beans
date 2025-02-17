document.addEventListener("DOMContentLoaded", function () {
    const reservationForm = document.getElementById("reservation-form");

    // Reset form fields when the page loads
    if (reservationForm) {
        reservationForm.reset();
    }

    // Initialize Flatpickr for date selection
    flatpickr("#selected-date", {
        enableTime: false,
        dateFormat: "Y-m-d",
        minDate: "today",
    });

    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const date = document.getElementById("selected-date").value;
        const time = document.getElementById("time").value;
        const guests = document.getElementById("guests").value;
        const requests = document.getElementById("requests").value;
        const address = document.getElementById("address").value;

        const userDetails = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            date: date,
            time: time,
            guests: guests,
            requests: requests
        };

        // Store the data in local storage
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        // Show the pop-up modal 
        document.getElementById("popup-message").innerText = 
            "Reservation successfully saved! You can view it in your Account page.";
        document.getElementById("confirmation-modal").style.display = "flex";
    });

    // Close the modal and redirect to Account page
    document.getElementById("close-popup").addEventListener("click", function () {
        document.getElementById("confirmation-modal").style.display = "none";
        window.location.href = "account.html";
    });
});
