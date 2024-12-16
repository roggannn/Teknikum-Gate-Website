const seats = document.querySelectorAll('.seat');
const ticketCountLabel = document.getElementById('antalLabel2');
const seatSelectionLabel = document.getElementById('seatSelectionLabel');

let ticketsToBuy = 0;

function selectSeats(ticketCount) {
    seats.forEach(seat => seat.classList.remove('selected'));

    let selectedSeats = 0;

    for (let i = 0; i < seats.length; i++) {
        if (!seats[i].classList.contains('booked') && selectedSeats < ticketCount) {
            seats[i].classList.add('selected');
            selectedSeats++;
        }
    }

    updateSeatLabel();
}

function adjustSelection(clickedSeatIndex, ticketCount) {
    ticketCount = Math.max(1, Math.min(ticketCount, 5)); 

    let startIndex = Math.max(0, clickedSeatIndex - Math.floor(ticketCount / 2));
    let endIndex = Math.min(seats.length, startIndex + ticketCount);

    let selectedSeats = 0;

    seats.forEach(seat => seat.classList.remove('selected'));

    for (let i = startIndex; i < endIndex; i++) {
        if (!seats[i].classList.contains('booked') && selectedSeats < ticketCount) {
            seats[i].classList.add('selected');
            selectedSeats++;
        }
    }

    
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
    const selectedSeats = Array.from(seats).filter(seat => seat.classList.contains('selected'));
    const seatNumbers = [];

    
    seats.forEach((seat, index) => {
        if (seat.classList.contains('selected')) {
            seatNumbers.push(index + 1); 
        }
    });

    const payButton = document.getElementById('payButton');
    if (selectedSeats.length > 0) {
        payButton.style.display = 'block';
    } else {
        payButton.style.display = 'none';
    }
    
    seatSelectionLabel.textContent = seatNumbers.length > 0
        ? `Valda platser: ${seatNumbers.join(', ')}`
        : 'Inga platser valda';
}

seats.forEach((seat, index) => {
    seat.addEventListener('click', () => {
        
        if (ticketsToBuy <= 0) {
            seatSelectionLabel.textContent = "Du behöver välja åtminstone 1 standard biljett!";
            return;
        }

        
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
    
    ticketsToBuy = Math.min(ticketsToBuy + 1, 5);
    ticketCountLabel.innerText = ticketsToBuy;

    selectSeats(ticketsToBuy);
}

function minus22() {
    ticketsToBuy = Math.max(ticketsToBuy - 1, 0);
    ticketCountLabel.innerText = ticketsToBuy;

    selectSeats(ticketsToBuy);
}

function showSwishQRCode() {
    const modal = document.getElementById('qrModal');
    const overlay = document.getElementById('modalOverlay');
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeSwishQRCode() {
    const modal = document.getElementById('qrModal');
    const overlay = document.getElementById('modalOverlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}