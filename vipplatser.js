const vipseats = document.querySelectorAll('.vipseat');
const ticketCountLabel2 = document.getElementById('antalLabel');
const seatSelectionLabel = document.getElementById('seatSelectionLabel');
const vipknapp1 = document.getElementById('vipKnapp1');
const vipknapp2 = document.getElementById('vipKnapp2');

const payButton = document.getElementById('payButton');
const modalOverlay = document.getElementById('modalOverlay');
const swishModal = document.getElementById('swishModal');
const agreementModal = document.getElementById('agreementModal');

let agreementAccepted = false;

let vipticketsToBuy = 0;

function selectVIPSeats(ticketCount) {
    seats.forEach(seat => seat.classList.remove('selected'));

    let selectedSeats = 0;

    for (let i = 0; i < seats.length; i++) {
        if (!seats[i].classList.contains('booked') && selectedSeats < ticketCount) {
            seats[i].classList.add('selected');
            selectedSeats++;
        }
    }

    updateSeatLabel2();
}

function adjustSelection2(clickedSeatIndex, ticketCount) {
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

    
    updateSeatLabel2();
}

function previewSelection2(clickedSeatIndex, ticketCount) {
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

function updateSeatLabel2() {
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
        ? `Vip platser valda: ${seatNumbers.join(', ')}`
        : 'Inga vip platser valda';
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

function plus1() {
    
    ticketsToBuy = Math.min(ticketsToBuy + 1, 5);
    ticketCountLabel.innerText = ticketsToBuy;

    selectSeats(ticketsToBuy);
    updateSelectedSeatsDisplay2();
}

function minus1() {
    ticketsToBuy = Math.max(ticketsToBuy - 1, 0);
    ticketCountLabel.innerText = ticketsToBuy;

    selectSeats(ticketsToBuy);
    updateSelectedSeatsDisplay2();
}

function showAgreementModal() {
    modalOverlay.style.display = 'flex';
    agreementModal.style.display = 'block';
    swishModal.style.display = 'none';
}

function acceptAgreement() {
    agreementAccepted = true;
    agreementModal.style.display = 'none';
    swishModal.style.display = 'block'; // Directly proceed to the Swish modal
}

function showSwishModal() {
    if (!agreementAccepted) {
        showAgreementModal(); // Show the agreement modal first
    } else {
        modalOverlay.style.display = 'flex';
        swishModal.style.display = 'block';
    }
}

function closeModal() {
    modalOverlay.style.display = 'none';
    swishModal.style.display = 'none';
    agreementModal.style.display = 'none';
}

function updateSelectedSeatsDisplay2() {
    const selectedSeats = [];
    seats.forEach((seat, index) => {
        if (seat.classList.contains('selected')) {
            selectedSeats.push(index + 1); // Adjust if seat numbering starts differently
        }
    });

    const displayElement = document.getElementById('selectedSeatsDisplay');
    let price = 0;

    if (selectedSeats.length > 0) {
        displayElement.textContent = `Skriv in vip platserna du bokar i swishen, dina platser är: ${selectedSeats.join(', ')}`;
        price = document.getElementById("antalLabel").textContent * 250 + document.getElementById("antalLabel2").textContent * 200 + " kr";
        document.getElementById('PrisBiljetter').textContent = "Det du ska betala är: " + price;
    } else {
        displayElement.textContent = `Skriv in vip platserna du bokar i swishen, dina platser är: Inga valda`;
        document.getElementById('PrisBiljetter').textContent = "";
    }
}

seats.forEach((seat) => {
    seat.addEventListener('click', updateSelectedSeatsDisplay);
});

payButton.addEventListener('click', showSwishModal);