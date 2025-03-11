
fetch('http://localhost:3000/cart/addTripCart')
.then(response => response.json())
.then((responseData) => {
    const tripsContainer = document.querySelector('#trips-in-cart');
    responseData.data.forEach(trip => {
        const tripDiv = document.createElement('div');
        tripDiv.classList.add('tripBooked');

        tripDiv.innerHTML = `
            <div class="tripBooked"
                <p>${trip.departure} > ${trip.arrival}</p>
                <p>${new Date(trip.date).toLocaleDateString()}</p>
                <p>${trip.price} €</p>
                <button class="cancel-button" 
                                    data-departure="${trip.departure}" 
                                    data-arrival="${trip.arrival}" 
                                    data-date="${trip.date}" 
                                    data-price="${trip.price}">
                                ❎
                            </button>
            </div>
        `;
        tripsContainer.appendChild(tripDiv)})});