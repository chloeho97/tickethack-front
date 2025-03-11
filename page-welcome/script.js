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
                <p>${trip.departure} > ${trip.arrival} </p>
                <p>${new Date(trip.date).toLocaleDateString()}</p>
                <p>${trip.price}</p>
                <button class="book-button"> Book </button>
                </div>`
            })

            resultContainer.innerHTML += addTrip;

          } 
          else {
            document.querySelector('#textResultSearch').textContent += " No trip found."
          }
})
})



// Click sur un bouton "Book"

let allBookButton = document.querySelectorAll('.book-button');

allBookButton.forEach(button => {
    button.addEventListener('click',function() {
        

        fetch('http://localhost:3000/search', {
            method: 'POST',
            headers : {'Content-Type':'application/json'},
            body: JSON.stringify(userInput)
        })

    })
})
