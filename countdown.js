const Dagar = document.getElementById('dagar');
const Timmar = document.getElementById('timmar');
const Minuter = document.getElementById('minuter');
const Sekunder = document.getElementById('sekunder');

const targetDatum = new Date("March 7 2025 19:00:00").getTime();

function timer() {
    const currentDate = new Date().getTime();
    const distance = targetDatum - currentDate;

    const dagar = Math.floor(distance / 1000 / 60 / 60 / 24);
    const timmar = Math.floor(distance / 1000 / 60 / 60) % 24;
    const minuter = Math.floor(distance / 1000 / 60) % 60;
    const sekunder = Math.floor(distance / 1000) % 60;

    if (distance < 0){
        Dagar.innerHTML = "00";
        Timmar.innerHTML = "00";
        Minuter.innerHTML = "00";
        Sekunder.innerHTML = "00";
    }
    else{
        Dagar.innerHTML = dagar + " :";
        Timmar.innerHTML = timmar + " :";
        Minuter.innerHTML = minuter + " :";
        Sekunder.innerHTML = sekunder;
    }
}

setInterval(timer, 1000);
