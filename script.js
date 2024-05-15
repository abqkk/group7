document.addEventListener('DOMContentLoaded', () => {
  const flightSearchForm = document.getElementById('flight-search-form');
  const flightResults = document.getElementById('flight-results');
  const manageBookingForm = document.getElementById('manage-booking-form');
  const bookingDetails = document.getElementById('booking-details');

  if (flightSearchForm) {
    flightSearchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const from = document.getElementById('from').value;
      const to = document.getElementById('to').value;
      const date = document.getElementById('date').value;
      const passengers = document.getElementById('passengers').value;

      const response = await fetch(`http://localhost:3000/flights`);
      const flights = await response.json();
      flightResults.innerHTML = flights.map(flight => `
        <div class="card mt-3">
          <div class="card-body">
            <h5 class="card-title">${flight.fromLocation} to ${flight.toLocation}</h5>
            <p class="card-text">Departure: ${flight.departureTime} - Arrival: ${flight.arrivalTime}</p>
            <p class="card-text">Price: $${flight.price}</p>
            <button class="btn btn-primary">Book Now</button>
          </div>
        </div>
      `).join('');
    });
  }

  if (manageBookingForm) {
    manageBookingForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const ticketNumber = document.getElementById('ticketNumber').value;
      const lastName = document.getElementById('lastName').value;

      const response = await fetch(`http://localhost:3000/bookings`);
      const bookings = await response.json();
      const booking = bookings.find(b => b.id === ticketNumber);
      bookingDetails.innerHTML = booking ? `
        <div class="card mt-3">
          <div class="card-body">
            <h5 class="card-title">Booking ID: ${booking.id}</h5>
            <p class="card-text">Seat: ${booking.seatNumber}</p>
            <p class="card-text">Payment Status: ${booking.paymentStatus}</p>
          </div>
        </div>
      ` : '<p>No booking found</p>';
    });
  }
});
