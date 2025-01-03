const vipseats = document.querySelectorAll('.vipseat');
const ticketCountLabel2 = document.getElementById('antalLabel');
const vipseatSelectionLabel = document.getElementById('vipseatSelectionLabel');

let agreementAccepted = false;

let vipticketsToBuy = 0;

function selectVIPSeats(vipticketCount) {
    vipseats.forEach(vipseat => vipseat.classList.remove('selected'));
    
    let selectedvipSeats = 0;

    for (let i = 0; i < vipseats.length; i++) {
        if (!vipseats[i].classList.contains('booked') && selectedvipSeats < vipticketCount) {
            vipseats[i].classList.add('selected');
            selectedvipSeats++;
            console.log(selectedvipSeats);
        }
    }

    updateSeatLabel2();
}

function adjustSelection2(clickedvipSeatIndex, vipticketCount) {
    vipticketCount = Math.max(1, Math.min(vipticketCount, 5)); 

    let vipstartIndex = Math.max(0, clickedvipSeatIndex - Math.floor(vipticketCount / 2));
    let vipendIndex = Math.min(vipseats.length, vipstartIndex + vipticketCount);

    let selectedvipSeats = 0;

    vipseats.forEach(vipseat => vipseat.classList.remove('selected'));

    for (let i = vipstartIndex; i < vipendIndex; i++) {
        if (!vipseats[i].classList.contains('booked') && selectedvipSeats < vipticketCount) {
            vipseats[i].classList.add('selected');
            selectedvipSeats++;
        }
    }

    
    updateSeatLabel2();
}

function previewSelection2(clickedvipSeatIndex, vipticketCount) {
    vipticketCount = Math.max(1, Math.min(vipticketCount, 5));

    let vipstartIndex = Math.max(0, clickedvipSeatIndex - Math.floor(vipticketCount / 2));
    let vipendIndex = Math.min(vipseats.length, vipstartIndex + vipticketCount);

    vipseats.forEach(vipseat => vipseat.classList.remove('preview'));

    let selectedvipSeats = 0;

    for (let i = vipstartIndex; i < vipendIndex && selectedvipSeats < vipticketCount; i++) {
        if (!vipseats[i].classList.contains('booked')) {
            vipseats[i].classList.add('preview');
            selectedvipSeats++;
        }
    }
}

function updateSeatLabel2() {
    const selectedvipSeats = Array.from(vipseats).filter(vipseat => vipseat.classList.contains('selected'));
    const vipseatNumbers = [];

    
    vipseats.forEach((vipseat, vipindex) => {
        if (vipseat.classList.contains('selected')) {
            vipseatNumbers.push(vipindex + 1); 
        }
    });

    const payButton = document.getElementById('payButton');
    if (selectedvipSeats.length > 0) {
        payButton.style.display = 'block';
    } else {
        payButton.style.display = 'none';
    }
    
    vipseatSelectionLabel.textContent = vipseatNumbers.length > 0
        ? `Vip platser valda: ${vipseatNumbers.join(', ')}`
        : 'Inga vip platser valda';
    updateSelectedSeatsDisplay2();
}

vipseats.forEach((vipseat, vipindex) => {
    vipseat.addEventListener('click', () => {
        console.log("Vip plats tryckt")
        if (vipticketsToBuy <= 0) {
            vipseatSelectionLabel.textContent = "Du behöver välja åtminstone 1 vip biljett!";
            return;
        }

        
        if (!vipseat.classList.contains('booked')) {
            adjustSelection2(vipindex, vipticketsToBuy);
        }

        updateSelectedSeatsDisplay2();
    });

    vipseat.addEventListener('mouseenter', () => {
        console.log("Vip plats hover")
        if (vipticketsToBuy > 0 && !vipseat.classList.contains('booked')) {
            previewSelection2(vipindex, vipticketsToBuy);
        }
    });

    vipseat.addEventListener('mouseleave', () => {
        vipseats.forEach(vipseat => vipseat.classList.remove('preview'));
    });
});

function plus1() {
    
    vipticketsToBuy = Math.min(vipticketsToBuy + 1, 5);
    ticketCountLabel2.innerText = vipticketsToBuy;

    selectVIPSeats(vipticketsToBuy);
    updateSelectedSeatsDisplay2();
}

function minus1() {
    vipticketsToBuy = Math.max(vipticketsToBuy - 1, 0);
    ticketCountLabel2.innerText = vipticketsToBuy;

    selectVIPSeats(vipticketsToBuy);
    updateSelectedSeatsDisplay2();
}

function updateSelectedSeatsDisplay2() {
    const selectedvipSeats = [];
    vipseats.forEach((vipseat, vipindex) => {
        if (vipseat.classList.contains('selected')) {
            selectedvipSeats.push(vipindex + 1); // Adjust if seat numbering starts differently
        }
    });

    const displayElement = document.getElementById('selectedSeatsDisplay');
    let price = 0;

    if (selectedvipSeats.length > 0) {
        displayElement.textContent = `Skriv in vip platserna du bokar i swishen, dina platser är: ${selectedvipSeats.join(', ')}`;
        price = (parseInt(document.getElementById("antalLabel").textContent) * 250 + parseInt(document.getElementById("antalLabel2").textContent) * 200) + " kr";
        document.getElementById('PrisBiljetter').textContent = "Det du ska betala är: " + price;
    } else {
        displayElement.textContent = `Skriv in vip platserna du bokar i swishen, dina platser är: Inga valda`;
        document.getElementById('PrisBiljetter').textContent = "";
    }
}