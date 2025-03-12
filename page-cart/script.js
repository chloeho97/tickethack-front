
// Création de la fonction de calcul du total des prix 

function displayTotalPrice() {
    fetch('http://localhost:3000/cart/totalPrice')
    .then(response => response.json())
    .then((data) => {
        const totalContainer = document.querySelector('#total-price');
        totalContainer.textContent = `${data.total} €`;
    })
    .catch((err) => {
        console.error('Error while fetching total price:', err);
    });
}

// Création du bouton X permettant de supprimer un trajet du panier

function deleteTripCart () {
    allCroix = document.querySelectorAll('.cancel-button');

    allCroix.forEach(croix => {
        croix.addEventListener('click',function() {

            let TripInCart = {
                departure: this.getAttribute('data-departure'),
                arrival: this.getAttribute('data-arrival'),
                date: this.getAttribute('data-date'),
                price: this.getAttribute('data-price')
                }
                
                fetch('http://localhost:3000/cart/deleteTripCart', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(TripInCart)
                }).then((response) => response.json())
                .then((data) => {
                    this.parentNode.remove()
                    displayTotalPrice();
                })
                .catch((err) => {
                    console.error('Error while adding to cart:', err);
                });
            });
            })
};


// Afficher tous les trajets ajoutés au panier + fonction X -> suppression de trajet du panier (côté DOM & côté BDD)

fetch('http://localhost:3000/cart/addTripCart')
.then(response => response.json())
.then((responseData) => {
    const tripsContainer = document.querySelector('#trips-in-cart');
    responseData.data.forEach(trip => {
        const tripDiv = document.createElement('div');

        tripDiv.innerHTML = `
            <div class="tripBooked">
                <p>${trip.departure} > ${trip.arrival}</p>
                <p>${new Date(trip.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>${trip.price} €</p>
                <button class="cancel-button" 
                                    data-departure="${trip.departure}" 
                                    data-arrival="${trip.arrival}" 
                                    data-date="${trip.date}" 
                                    data-price="${trip.price}">
                                X
                            </button>
            </div>
        `;
        tripsContainer.appendChild(tripDiv)});
        displayTotalPrice();
        deleteTripCart();
});



// Envoyer les voyages du panier dans les réservations au click sur le bouton Purchase
const purchaseButton = document.querySelector('#btn-purchase');
purchaseButton.addEventListener('click', function() {
    
    //fetch('http://localhost:3000/booking/purchase');

    let allButtons = document.querySelectorAll('.cancel-button');
    let buttonArray = [];

    for (let i=0; i < allButtons.length; i++) {

        let tripInCart = {
            departure: this.getAttribute('data-departure'),
            arrival: this.getAttribute('data-arrival'),
            date: this.getAttribute('data-date'),
            price: this.getAttribute('data-price')
            }
        buttonArray.push(tripInCart);
    }

    
    fetch('http://localhost:3000/booking/purchase', {
        method: 'POST',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify(buttonArray) // ça envoie quoi ???
    }).then((response) => response.json())
    .then((data) => {
        console.log('Purchased:', data);
    })
    .catch((err) => {
        console.error('Error during purchase:', err);
    })
    

    // Puis rediriger vers page Bookings
    .then(window.location.replace("../page-bookings/index.html"));

});