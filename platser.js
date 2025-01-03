const seats = document.querySelectorAll('.seat');
const ticketCountLabel = document.getElementById('antalLabel2');
const seatSelectionLabel = document.getElementById('seatSelectionLabel');

const payButton = document.getElementById('payButton');
const modalOverlay = document.getElementById('modalOverlay');
const swishModal = document.getElementById('swishModal');
const agreementModal = document.getElementById('agreementModal');

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
        ? `Standard platser valda: ${seatNumbers.join(', ')}`
        : 'Inga standard platser valda';
    updateSelectedSeatsDisplay();
}

seats.forEach((seat, index) => {
    seat.addEventListener('click', () => {
        console.log("Standard plats tryckt")
        if (ticketsToBuy <= 0) {
            seatSelectionLabel.textContent = "Du behöver välja åtminstone 1 standard biljett!";
            return;
        }

        
        if (!seat.classList.contains('booked')) {
            adjustSelection(index, ticketsToBuy);
        }
    });

    seat.addEventListener('mouseenter', () => {
        console.log("Standard plats hover")
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
    updateSelectedSeatsDisplay();
}

function minus22() {
    ticketsToBuy = Math.max(ticketsToBuy - 1, 0);
    ticketCountLabel.innerText = ticketsToBuy;

    selectSeats(ticketsToBuy);
    updateSelectedSeatsDisplay();
}

function updateSelectedSeatsDisplay() {
    const selectedSeats = [];
    seats.forEach((seat, index) => {
        if (seat.classList.contains('selected')) {
            selectedSeats.push(index + 1); // Adjust if seat numbering starts differently
        }
    });


    const displayElement = document.getElementById('selectedSeatsDisplay');
    let price = 0;

    if (selectedSeats.length > 0) {
        displayElement.textContent = `Skriv in standard platserna du bokar i swishen, dina platser är: ${selectedSeats.join(', ')}`;
        price = document.getElementById("antalLabel").textContent * 250 + document.getElementById("antalLabel2").textContent * 200 + " kr";
        document.getElementById('PrisBiljetter').textContent = "Det du ska betala är: " + price;
    } else {
        displayElement.textContent = `Skriv in standard platserna du bokar i swishen, dina platser är: Inga valda`;
        document.getElementById('PrisBiljetter').textContent = "";
    }
}

seats.forEach((seat) => {
    seat.addEventListener('click', updateSelectedSeatsDisplay);
});