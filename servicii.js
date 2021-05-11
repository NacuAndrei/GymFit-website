let i = -1;
let c = 0;
let pas = 1;
let element = 1;

var lista = [
    {
        categorie: "Proteine:",
        alimente: ["Piept de pui", "Somon", "Ton"],
    },
    {
        categorie: "Carbohidrati:",
        alimente: ["Fructe", "Legume"]
    },
    {
        categorie: "Grasimi:",
        alimente: ["Unt de arahide", "Avocado"]
    }
]

function Add() {
    let div = document.getElementById("generatedAliments");
    let p = document.createElement("p");

    if(i == -1) {
        p.innerText = lista[c].categorie;
        p.style.marginLeft = "30px";
        p.style.color = "green";
    }
    else if(pas <= 10) {
        p.innerText = element + ". " + lista[c].alimente[i];
        p.style.marginLeft = "60px";
        element++;
    }
    
    i++;
    pas++;
    
    if(pas == 5 || pas == 8) {
        i = - 1;
        c++;
    }
    p.classList.add("newpclass");
    div.appendChild(p);
    
}