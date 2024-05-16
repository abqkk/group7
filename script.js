document.addEventListener('DOMContentLoaded', function() {
  // Fetch and populate cities from flights.txt
  fetch('flights.txt')
    .then(response => response.text())
    .then(data => {
      const cities = data.trim().split('\n');
      const fromSelect = document.getElementById('fromSelect'); // Corrected ID
      const toSelect = document.getElementById('toSelect'); // Corrected ID

      cities.forEach(city => {
        const option = document.createElement('option');
        option.text = city.trim(); // trim to remove any whitespace
        fromSelect.add(option.cloneNode(true));
        toSelect.add(option.cloneNode(true));
      });
    })
    .catch(error => console.error('Error loading cities:', error));

  // Handle form submission
  const bookingForm = document.getElementById('bookingForm');
  const searchButton = document.getElementById('searchButton');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function(event) {
      event.preventDefault();
      searchFlights();
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', function(event) {
      event.preventDefault();
      searchFlights();
    });
  });

function searchFlights() {
  const from = document.getElementById('fromSelect').value; // Corrected ID
  const to = document.getElementById('toSelect').value; // Corrected ID

  // Fetch flight details from flight_details.txt
  fetch('flight_details.txt')
    .then(response => response.text())
    .then(data => {
      const details = data.split('\n');
      let flightDetails = '<h3>Flight Details</h3>';
      let found = false;

      details.forEach(detail => {
        if (detail.trim()) { // Check if the line is not empty
          const [route, info] = detail.split(': ');
          const [fromCity, toCity] = route.split('-');
          const [date, price] = info.split(', ');

          if (fromCity === from && toCity === to) {
            flightDetails += `
              <p><strong>From:</strong> ${fromCity}</p>
              <p><strong>To:</strong> ${toCity}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Price:</strong> ${price}</p>
            `;
            found = true;
          }
        }
      });

      if (!found) {
        flightDetails += '<p>No flights found for selected route.</p>';
      }

      document.getElementById('flightDetails').innerHTML = flightDetails;
    })
    .catch(error => console.error('Error loading flight details:', error));
}
