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
                })
                .catch((err) => {
                    console.error('Error while adding to cart:', err);
                });
            });
            })
            }


// Afficher tous les trajets ajoutés au panier + fonction X -> suppression de trajet du panier (côté DOM & côté BDD)

fetch('http://localhost:3000/cart/addTripCart')
.then(response => response.json())
.then((responseData) => {
    const tripsContainer = document.querySelector('#trips-in-cart');
    responseData.data.forEach(trip => {
        const tripDiv = document.createElement('div');

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
        tripsContainer.appendChild(tripDiv)});
        deleteTripCart();
    });