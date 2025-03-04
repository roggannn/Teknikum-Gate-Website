let pris = 0;

function prisförändring() {
    pris = document.getElementById("antalLabel").textContent * 250 + document.getElementById("antalLabel2").textContent * 150 + " kr";
    document.getElementById("priset").textContent = "Det kostar: " + pris;
}