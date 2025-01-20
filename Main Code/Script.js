document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const bedAvailability = document.getElementById('bedAvailability').value;
    const rating = document.getElementById('rating').value;

    const hospitals = [
        { name: "Fortis Hospital", lat: 12.9165, lng: 77.6101, bedsAvailable: true, rating: 4, bloodGroup: ["A+", "B+", "O+", "AB+"] },
        { name: "Apollo Hospital", lat: 12.9346, lng: 77.6269, bedsAvailable: true, rating: 4, bloodGroup: ["A+", "O+", "AB+"] },
        { name: "Narayana Hospital", lat: 12.9006, lng: 77.6038, bedsAvailable: false, rating: 3, bloodGroup: ["B+", "O+"] },
        { name: "Manipal Hospital", lat: 12.9352, lng: 77.6689, bedsAvailable: true, rating: 2, bloodGroup: ["A+", "AB+"] },
        { name: "St. John's Medical College", lat: 12.9345, lng: 77.6192, bedsAvailable: false, rating: 11, bloodGroup: ["O+", "B+", "AB+"] },
        { name: "Victoria Hospital", lat: 12.9612, lng: 77.5736, bedsAvailable: true, rating: 3, bloodGroup: ["A+", "B+"] },
        { name: "BGS Gleneagles Global Hospital", lat: 12.9163, lng: 77.5703, bedsAvailable: true, rating: 3, bloodGroup: ["O+", "AB+"] },
        { name: "Sakra Premium Hospital", lat: 12.9358, lng: 77.6964, bedsAvailable: false, rating: 5, bloodGroup: ["A+", "B+", "O+"] },
    ];

    const filteredHospitals = hospitals.filter(h => {
        const matchesBloodGroup = bloodGroup ? h.bloodGroup.includes(bloodGroup) : true;
        const matchesBeds = bedAvailability ? 
            (bedAvailability === 'yes' ? h.bedsAvailable : !h.bedsAvailable) : true;
        const matchesRating = rating ? h.rating >= parseFloat(rating) : true;
        return matchesBloodGroup && matchesBeds && matchesRating;
    });

    const map = L.map('map').setView([12.9716, 77.5946], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    filteredHospitals.forEach(hospital => {
        L.marker([hospital.lat, hospital.lng])
            .addTo(map)
            .bindPopup(`
                <b>${hospital.name}</b><br>
                Rating: ${hospital.rating}<br>
                Beds Available: ${hospital.bedsAvailable ? 'Yes' : 'No'}<br>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}" 
                   target="_blank" style="color: blue; text-decoration: underline;">
                    Navigate to this Hospital
                </a>
            `);
    });

    if (filteredHospitals.length === 0) {
        alert('No hospitals match your criteria.');
    }
});
