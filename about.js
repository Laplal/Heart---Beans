document.addEventListener("DOMContentLoaded", function () {
    loadGoogleMap();
});

// Function to load Google Map
function loadGoogleMap() {
    let mapContainer = document.getElementById("map");
    mapContainer.innerHTML = `<iframe 
        width="100%" height="250px" frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Ottawa,ON,Canada" allowfullscreen>
    </iframe>`;
}
