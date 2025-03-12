fetch('http://localhost:3000/booking/')
.then(response => response.json())
.then((responseData) => {

    if (responseData) {

    document.querySelector('#NoTrip').innerHTML += ''
    const booksContainer = document.querySelector('#trips-in-bookings');

    responseData.data.forEach(booking => {

        const bookingDiv = document.createElement('div');
        
         const now = new Date();
         const departureDate = new Date(booking.date);

       
         const timeDifference = departureDate - now;

         // Convertir la différence en heures
         const timeLeft = Math.abs(Math.round(timeDifference / (1000 * 60 * 60))); 

        bookingDiv.innerHTML = `
            <div class="tripBooked">
                <p>${booking.departure} > ${booking.arrival}</p>
                <p>${new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>${booking.price} €</p>
                <p>Departure in ${timeLeft} hours</p>
                <p> </p>
            </div> `

            booksContainer.appendChild(bookingDiv)});
       ;}});


/* // Afficher tous les trajets ajoutés aux réservations
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
 */