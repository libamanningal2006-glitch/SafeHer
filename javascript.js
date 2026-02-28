document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message");

    if (email === "" || password === "") {
        message.style.color = "red";
        message.textContent = "Please fill all fields";
        return;
    }

    // Demo login credentials (for hackathon)
    if (email === "user@safeher.com" && password === "1234") {
        message.style.color = "green";
        message.textContent = "Login successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    } else {
        message.style.color = "red";
        message.textContent = "Invalid email or password";
    }
});
function showStatus(text) {
    const status = document.getElementById("status");
    if (status) status.textContent = text;
}

// 🚨 SOS — send live location to saved contacts
function sendSOS() {
    const btn = document.querySelector(".sos");
    if (btn) btn.classList.add("sos-active");

    let contacts = JSON.parse(localStorage.getItem("safeher_contacts")) || [];

    if (contacts.length === 0) {
        alert("No trusted contacts saved!");
        return;
    }

    if (!navigator.geolocation) {
        alert("Location not supported on this device.");
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const locationLink = "https://maps.google.com/?q=" + lat + "," + lon;

        const message =
            "🚨 EMERGENCY ALERT from SafeHer!\n" +
            "I need help. My live location:\n" +
            locationLink;

        // Open SMS for each saved contact
        contacts.forEach(contact => {
            const phone = contact.phone.replace(/\s+/g, "");
            const smsLink = "sms:" + phone + "?body=" + encodeURIComponent(message);
            window.open(smsLink);
        });

        alert("Emergency message ready to send!");
    },
    function() {
        alert("Unable to get location.");
    });
}


// 🚓 Nearby Police
function findPolice() {
    showStatus("Opening nearby police stations...");
    window.open("https://www.google.com/maps/search/police+station+near+me");
}

// 👥 Save Contacts
function saveContacts() {
    showStatus("Feature to save trusted contacts (demo).");
}

// ☎️ Fake Call
function fakeCall() {
    showStatus("Incoming fake call...");
    alert("Incoming call from: Mom");
}

// 📍 Track Location
function trackLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            showStatus("Location: " + lat + ", " + lon);
        });
    } else {
        showStatus("Geolocation not supported.");
    }
}
// 📂 Open contacts page
function openContacts() {
    window.location.href = "contacts.html";
}

// 🔙 Back to dashboard
function goBack() {
    window.location.href = "dashboard.html";
}

// 👥 Save contact
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();

        let contacts = JSON.parse(localStorage.getItem("safeher_contacts")) || [];

        contacts.push({ name, phone });
        localStorage.setItem("safeher_contacts", JSON.stringify(contacts));

        contactForm.reset();
        displayContacts();
    });
}

// 📋 Display contacts
function displayContacts() {
    const list = document.getElementById("contactList");
    if (!list) return;

    list.innerHTML = "";

    let contacts = JSON.parse(localStorage.getItem("safeher_contacts")) || [];

    contacts.forEach((contact, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${contact.name} - ${contact.phone}
            <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

// ❌ Delete contact
function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("safeher_contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("safeher_contacts", JSON.stringify(contacts));
    displayContacts();
}

// Load contacts when page opens
displayContacts();
// 📞 Start fake call from dashboard
function startFakeCall() {
    setTimeout(() => {
        window.location.href = "fakecall.html";
    }, 1000);
}

// 🔔 Play ringtone when fake call screen opens
const ringtone = document.getElementById("ringtone");
if (ringtone) {
    ringtone.play().catch(() => {});
}

// ✅ Accept call
function acceptCall() {
    alert("Call connected. Stay safe 💜");
    window.location.href = "dashboard.html";
}

// ❌ Reject call
function rejectCall() {
    window.location.href = "dashboard.html";
}
// 🏥 Nearby Hospitals
function findHospitals() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = "https://www.google.com/maps/search/hospitals/@"
                        + lat + "," + lon + ",15z";

            window.open(url, "_blank");
        }, function() {
            // If location permission denied
            window.open("https://www.google.com/maps/search/hospitals+near+me", "_blank");
        });
    } else {
        window.open("https://www.google.com/maps/search/hospitals+near+me", "_blank");
    }
}
// 📝 Open report page
function openReport() {
    window.location.href = "report.html";
}

// 📤 Handle report submission
const reportForm = document.getElementById("reportForm");

if (reportForm) {
    reportForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const report = {
            name: document.getElementById("name").value,
            location: document.getElementById("location").value,
            type: document.getElementById("type").value,
            description: document.getElementById("description").value,
            time: new Date().toLocaleString()
        };

        let reports = JSON.parse(localStorage.getItem("safeher_reports")) || [];
        reports.push(report);
        localStorage.setItem("safeher_reports", JSON.stringify(reports));

        document.getElementById("reportStatus").textContent =
            "Report submitted successfully ✔";

        reportForm.reset();
    });
}

// 🛡️ Safer route guidance
function navigateSafe() {
    if (pathCoords.length === 0) {
        alert("Start tracking first");
        return;
    }

    const last = pathCoords[pathCoords.length - 1];
    const lat = last[0];
    const lon = last[1];

    // Example safer place → nearest police station
    const url = "https://www.google.com/maps/search/police+station/@"
                + lat + "," + lon + ",15z";

    window.open(url, "_blank");

}
// Sample data for demo
const stays = [
  {
    name: "Safe Stay Hotel",
    city: "New Delhi",
    rating: 4.5,
    reviews: 120
  },
  {
    name: "Women Friendly Inn",
    city: "Mumbai",
    rating: 4.8,
    reviews: 95
  },
  {
    name: "Comfort Hostel",
    city: "Bangalore",
    rating: 4.2,
    reviews: 60
  },
  {
    name: "Secure Lodge",
    city: "Chennai",
    rating: 4.7,
    reviews: 80
  }
];

// Function to display stays
function displayStays(list) {
  const container = document.getElementById("staysContainer");
  container.innerHTML = "";

  if(list.length === 0){
    container.innerHTML = "<p>No stays found.</p>";
    return;
  }

  list.forEach(stay => {
    const card = document.createElement("div");
    card.className = "stay-card";
    card.innerHTML = `
      <h3>${stay.name}</h3>
      <p>City: ${stay.city}</p>
      <p class="rating">Rating: ${stay.rating} ⭐ (${stay.reviews} reviews)</p>
      <button onclick="selectStay('${stay.name}')">Select</button>
    `;
    container.appendChild(card);
  });
}

// Search functionality
function searchStays() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = stays.filter(stay => stay.city.toLowerCase().includes(query));
  displayStays(filtered);
}

// Select stay
function selectStay(name) {
  alert(`You selected: ${name}`);
}

// Display all stays on page load
displayStays(stays);
function openSafeStays() {
  // Opens the Safe Stays page
  window.location.href = "safe-stays.html";
}
function openSafeMap() {
  // Opens the Safe Map page
  window.location.href = "safe-map.html";
}
let map;
let marker;
let watchId = null;
let routePath;
let trackingPaused = false;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20.5937, lng: 78.9629 }, // Default to India
    zoom: 5,
  });

  routePath = new google.maps.Polyline({
    path: [],
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
  });

  routePath.setMap(map);
}

// Start tracking
// Function to open tracking map page
function openTrackingMap() {
  window.location.href = "track.html";
}
document.getElementById("startTracking").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported!");
    return;
  }

  if (watchId) {
    alert("Tracking already started!");
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    updatePosition,
    (error) => alert("Error getting location: " + error.message),
    { enableHighAccuracy: true }
  );
});

// Pause tracking
document.getElementById("pauseTracking").addEventListener("click", () => {
  if (watchId) {
    trackingPaused = true;
    alert("Tracking paused");
  }
});

// Resume tracking
document.getElementById("resumeTracking").addEventListener("click", () => {
  if (watchId) {
    trackingPaused = false;
    alert("Tracking resumed");
  }
});

// Stop tracking
document.getElementById("stopTracking").addEventListener("click", () => {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    alert("Tracking stopped");
  }
});

// Clear track
document.getElementById("clearTrack").addEventListener("click", () => {
  routePath.setPath([]);
  if (marker) marker.setMap(null);
  marker = null;
  alert("Track cleared");
});

// Function to update position
function updatePosition(position) {
  if (trackingPaused) return;

  const latLng = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  // Update map center
  map.setCenter(latLng);

  // Update marker
  if (!marker) {
    marker = new google.maps.Marker({ position: latLng, map: map });
  } else {
    marker.setPosition(latLng);
  }

  // Update polyline path
  const path = routePath.getPath();
  path.push(new google.maps.LatLng(latLng.lat, latLng.lng));
}

window.onload = initMap;