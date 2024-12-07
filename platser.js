const seats = document.querySelectorAll('.seat');
const ticketCountLabel = document.getElementById('antalLabel2');
const seatSelectionLabel = document.getElementById('seatSelectionLabel');

let ticketsToBuy = 0;

function selectSeats(ticketCount) {
    // Reset all seat selections
    seats.forEach(seat => seat.classList.remove('selected'));

    let selectedSeats = 0;

    // Iterate through the seats and select the first `ticketCount` available ones
    for (let i = 0; i < seats.length; i++) {
        if (!seats[i].classList.contains('booked') && selectedSeats < ticketCount) {
            seats[i].classList.add('selected');
            selectedSeats++;
        }
    }

    // Update the label to display the selected seat numbers
    updateSeatLabel();
}

function adjustSelection(clickedSeatIndex, ticketCount) {
    ticketCount = Math.max(1, Math.min(ticketCount, 5)); // Clamp ticketCount to range [1, 5]

    // Start selecting from the clicked seat and spread out
    let startIndex = Math.max(0, clickedSeatIndex - Math.floor(ticketCount / 2));
    let endIndex = Math.min(seats.length, startIndex + ticketCount);

    let selectedSeats = 0;

    // Reset all selections
    seats.forEach(seat => seat.classList.remove('selected'));

    // Select seats within the range
    for (let i = startIndex; i < endIndex; i++) {
        if (!seats[i].classList.contains('booked') && selectedSeats < ticketCount) {
            seats[i].classList.add('selected');
            selectedSeats++;
        }
    }

    // Update the label with the selected seats
    updateSeatLabel();
}

function previewSelection(clickedSeatIndex, ticketCount) {
    ticketCount = Math.max(1, Math.min(ticketCount, 5));

    let startIndex = Math.max(0, clickedSeatIndex - Math.floor(ticketCount / 2));
    let endIndex = Math.min(seats.length, startIndex + ticketCount);

    seats.forEach(seat => seat.classList.remove('preview'));

    let selectedSeats = 0;

    for (let i = startIndex; i < endIndex && selectedSeats < ticketCount; i++) {
        if (!seats[i].classList.contains('booked')) {
            seats[i].classList.add('preview');
            selectedSeats++;
        }
    }
}

function updateSeatLabel() {
    const seatNumbers = [];

    // Collect seat numbers for all selected seats
    seats.forEach((seat, index) => {
        if (seat.classList.contains('selected')) {
            seatNumbers.push(index + 1); // Convert 0-based index to 1-based seat number
        }
    });

    // Update the label with seat numbers
    seatSelectionLabel.textContent = seatNumbers.length > 0
        ? `Valda platser: ${seatNumbers.join(', ')}`
        : 'Inga platser valda';
}

seats.forEach((seat, index) => {
    seat.addEventListener('click', () => {
        // Prevent selection if ticketsToBuy is 0
        if (ticketsToBuy <= 0) {
            seatSelectionLabel.textContent = "Du behöver välja åtminstone 1 standard biljett!";
            return;
        }

        // Only proceed if the seat is not booked
        if (!seat.classList.contains('booked')) {
            adjustSelection(index, ticketsToBuy);
        }
    });

    seat.addEventListener('mouseenter', () => {
        if (ticketsToBuy > 0 && !seat.classList.contains('booked')) {
            previewSelection(index, ticketsToBuy);
        }
    });

    seat.addEventListener('mouseleave', () => {
        seats.forEach(seat => seat.classList.remove('preview'));
    });
});

function plus22() {
    // Increment the ticket count, clamping it to the maximum of 5
    ticketsToBuy = Math.min(ticketsToBuy + 1, 5);
    ticketCountLabel.innerText = ticketsToBuy;

    // Automatically select the first available seats based on the ticket count
    selectSeats(ticketsToBuy);
}

function minus22() {
    // Decrement the ticket count, clamping it to a minimum of 0
    ticketsToBuy = Math.max(ticketsToBuy - 1, 0);
    ticketCountLabel.innerText = ticketsToBuy;

    // Automatically adjust the seat selection based on the new ticket count
    selectSeats(ticketsToBuy);
}