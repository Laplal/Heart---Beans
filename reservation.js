document.addEventListener("DOMContentLoaded", function () {
    const reservationForm = document.getElementById("reservation-form");
    const confirmationModal = document.getElementById("confirmation-modal");
    const popupMessage = document.getElementById("popup-message");
    const closePopupBtn = document.getElementById("close-popup");

    // Ensure modal is hidden on page load
    confirmationModal.style.display = "none";

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

    // Handle form submission
    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("selected-date").value.trim();
        const time = document.getElementById("time").value.trim();
        const guests = document.getElementById("guests").value.trim();
        const address = document.getElementById("address").value.trim();
        const requests = document.getElementById("requests").value.trim();

        // Validate required fields
        if (!name || !email || !phone || !date || !time || !guests || !address) {
            alert("Please fill in all required fields before proceeding.");
            return;
        }

        // Store reservation details in localStorage
        const reservationDetails = {
            name,
            email,
            phone,
            address,
            date,
            time,
            guests,
            requests
        };
        localStorage.setItem("currentReservation", JSON.stringify(reservationDetails));

        // Set confirmation message and show modal
        popupMessage.innerText = "Reservation successfully saved! Click OK to continue.";
        confirmationModal.style.display = "flex";
    });

    // Close the modal when "OK" button is clicked
    closePopupBtn.addEventListener("click", function () {
        confirmationModal.style.display = "none";
        window.location.href = "account.html";
    });
});

});
