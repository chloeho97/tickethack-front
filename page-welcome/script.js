// Click sur un bouton "Book" - envoi du trajet dans la collection 'cart' 

function bookButtonListener() {

    allBookButton = document.querySelectorAll('.book-button');
    
    allBookButton.forEach(button => {
        button.addEventListener('click',function() {
    
        let addTripCart = {
            departure: this.getAttribute('data-departure'),
            arrival: this.getAttribute('data-arrival'),
            date: this.getAttribute('data-date'),
            price: this.getAttribute('data-price')
            }
            
        fetch('http://localhost:3000/cart/addTripCart', {
            method: 'POST',
            headers : {'Content-Type':'application/json'},
            body: JSON.stringify(addTripCart)
        }).then((response) => response.json())
        .then((data) => {
            console.log('Added to cart:', data);;
        })
        .catch((err) => {
            console.error('Error while adding to cart:', err);
        });
    });
    })
    }

    

// Affichage des trajets disponibles selon les critères du client

document.querySelector('#btn-search').addEventListener('click', function () {

const searchDeparture = document.querySelector('#searchDeparture').value
const searchArrival = document.querySelector('#searchArrival').value
const searchDate = document.querySelector('#searchDate').value

const userInput = {
    arrival: searchArrival, 
    departure: searchDeparture, 
    date: searchDate
}

fetch('http://localhost:3000/search', {
    method: 'POST',
    headers : {'Content-Type':'application/json'},
    body: JSON.stringify(userInput)
})
    .then(response => response.json())
    .then(data => {
        if (data && data["Trajets trouvés"].length > 0) {

            const resultContainer = document.querySelector('#result-container');
            resultContainer.innerHTML = ''

            let addTrip ='';

            data["Trajets trouvés"].forEach(trip => {
                    addTrip += `
                    <div class="trip-item">
                        <p>${trip.departure} > ${trip.arrival}</p>
                        <p>${new Date(trip.date).toLocaleDateString()}</p>
                        <p>${trip.price} €</p>
                        <button class="book-button" 
                                data-departure="${trip.departure}" 
                                data-arrival="${trip.arrival}" 
                                data-date="${trip.date}" 
                                data-price="${trip.price}">
                            Book
                        </button>
                    </div>`
            })

            resultContainer.innerHTML += addTrip;

            bookButtonListener();

          } 
          else {
            document.querySelector('#textResultSearch').textContent += " No trip found."
          }
})
})



