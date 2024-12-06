const seats = document.querySelectorAll('.seat');
const ticketCountLabel = document.getElementById('antalLabel2');
const seatSelectionLabel = document.getElementById('seatSelectionLabel');

let ticketsToBuy = 0;

function selectSeats(ticketCount) {
    seats.forEach(seat => seat.classList.remove('selected'));

    let selectedSeats = 0;
    let selectedRows = [];

    for (let i = 0; i < seats.length; i++) {

        if (seats[i].classList.contains('booked')) continue;

        if (selectedSeats < ticketCount) {
            seats[i].classList.add('selected');
            selectedSeats++;

            const row = getSeatRow(i);
            if (!selectedRows.includes(row)) {
            selectedRows.push(row);
            }
        }
    }

    updateSeatLabel(selectedSeats, selectedRows);
}

function adjustSelection(clickedSeatIndex, ticketCount) {
    ticketCount = Math.max(1, Math.min(ticketCount, 5));

    let startIndex = clickedSeatIndex - Math.floor(ticketCount / 2);

    if (startIndex < 0) startIndex = 0;

    let selectedSeats = 0;
    let selectedRows = [];

    seats.forEach(seat => seat.classList.remove('selected'));

    for (let i = startIndex; i < seats.length; i++) {

        if (seats[i].classList.contains('booked')) continue;

        if (selectedSeats < ticketCount) {
            seats[i].classList.add('selected');
            selectedSeats++;

            const row = getSeatRow(i);
            if (!selectedRows.includes(row)) {
                selectedRows.push(row);
            }
        } else {
            break;
        }
    }

    updateSeatLabel(selectedSeats, selectedRows);
}

function previewSelection(clickedSeatIndex, ticketCount) {
    ticketCount = Math.max(1, Math.min(ticketCount, 5));

    let startIndex = clickedSeatIndex - Math.floor(ticketCount / 2);

    if (startIndex < 0) startIndex = 0;

    let selectedSeats = 0;
    let selectedRows = [];

    seats.forEach(seat => seat.classList.remove('preview'));

    for (let i = startIndex; i < seats.length; i++) {

        if (seats[i].classList.contains('booked')) continue;

        if (selectedSeats < ticketCount) {
            seats[i].classList.add('preview');
            selectedSeats++;
            const row = getSeatRow(i);
            if (!selectedRows.includes(row)) {
                selectedRows.push(row);
            }
        } else {
            break;
        }
    }

    updateSeatLabel(selectedSeats, selectedRows);
}

function updateSeatLabel(selectedSeats, selectedRows) {
    const seatNumbers = [];
    const rowNumbers = [];

    if (startIndex === undefined || ticketCount === undefined) {
        for (let i= 0; i < seats.length; i++) {
            if (seats[i].classList.contains('selected')) {
                seatNumbers.push(i + 1);
            }
        }
    } else {
        for (let i = startIndex; i < startIndex + ticketCount; i++) {
            if (i < seats.length && !seats[i].classList.contains('booked')) {
                seatNumbers.push(i + 1);
            }
        }
    }

    
    
    seatSelectionLabel.textContent = `Valda platser: ${seatNumbers.join(', ')}`;
    
}

seats.forEach((seat, index) => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('booked')) {
            adjustSelection(index, ticketsToBuy);
        }
    });

    seat.addEventListener('mouseenter', () => {
        if (!seat.classList.contains('booked')) {
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