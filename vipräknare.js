let value = 0;

function plus() {
    if (ticketsToBuy <= 0){
        if (value < 5) {
            value++;
            document.getElementById("antalLabel").textContent = value;
        }
    }
    else
    {
        console.log("Antallabel value = " + value);
    }
}

function minus() {
    if (ticketsToBuy <= 0){
        if (value > 0) {
            value--;
            document.getElementById("antalLabel").textContent = value;
        }
    }
    else
    {
        console.log("Antallabel value = " + value);
    }
}