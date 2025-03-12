fetch('http://localhost:3000/cart/')
.then(response => response.json())
.then((responseData) => {
    const booksContainer = document.querySelector('#trips-in-bookings');

    responseData.data.forEach(booking => {
        const bookingDiv = document.createElement('div');

        bookingDiv.innerHTML = `
            <div class="tripBooked">
                <p>${trip.departure} > ${trip.arrival}</p>
                <p>${new Date(trip.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>${trip.price} €</p>
            </div>
        `;})
    });