// Afficher tous les trajets ajoutés aux réservations
fetch('http://localhost:3000/booking', {
    method: 'POST',
    headers : {'Content-Type':'application/json'},
    body: JSON.stringify(userInput)
})
    .then(response => response.json())
    .then(data => {
        if (data && data["Booked trips"].length > 0) {

            const bookingsContainer = document.querySelector('#bookings-main');
            bookingsContainer.innerHTML = '';

            let addTrip ='';
            const timeLeft = 1000; // Chiffre bidon, remplacer par un calcul

            data["Booked trips"].forEach(trip => {
                    addTrip += `
                    <div class="trip-item">
                        <p>${trip.departure} > ${trip.arrival}</p>
                        <p>${new Date(trip.date).toLocaleDateString()}</p>
                        <p>${trip.price} €</p>
                        <p>Departure in ${timeLeft} hours</p>
                    </div>`
            })

            bookingsContainer.innerHTML += addTrip;
        
        } // Pas de else, on va plutôt mettre direct dans index.html ce qui est affiché si aucun trajet réservé
})