let value2 = 0;

function plus2() {
    if (vipticketsToBuy <= 0){
        if (value2 < 5) {
            value2++;
            document.getElementById("antalLabel2").textContent = value2;
        }
    }
    else{
        console.log("Antallabel2 value = " + value);
    }
}

function minus2() {
    if (vipticketsToBuy <= 0){
        if (value2 > 0) {
            value2--;
            document.getElementById("antalLabel2").textContent = value2;
        }
    }
    else{
        console.log("Antallabel2 value = " + value);
    }
}