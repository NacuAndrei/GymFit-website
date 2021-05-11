let button = document.getElementById("ButonOrar");
button.addEventListener("click", function() {
    ProgSarbatori();
})

function ProgSarbatori() {
   let orarArrary = document.getElementsByClassName("orar");

   for(let i = 0; i < orarArrary.length; i++) {
        orarArrary[i].textContent = "9:00 - 14:00";
        if(i >= 5) {
            orarArrary[i].textContent = "INCHIS";
            orarArrary[i].style.color = "red";
        }
   }
    let p = document.getElementById("MesajOrar");
    p.textContent = "Orarul a fost actualizat!";
    p.style.paddingLeft = "30px";
}


var input = document.getElementById("myInput");
