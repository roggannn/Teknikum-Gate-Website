let value2 = 0;

function plus2() {
    if (value2 < 5) {
        value2++;
        document.getElementById("antalLabel2").textContent = value2;
    }
}

function minus2() {
    if (value2 > 0) {
        value2--;
        document.getElementById("antalLabel2").textContent = value2;
    }
}