let value = 0;

function plus() {
    if (value < 5) {
        value++;
        document.getElementById("antalLabel").textContent = value;
    }
}

function minus() {
    if (value > 0) {
        value--;
        document.getElementById("antalLabel").textContent = value;
    }
}