
function Rezumat() {
    //let div = document.getElementsByClassName("remove");
    //for(let i = 0; i < div.length; i++) {
    //    div[i].removeChild(div);
    //}

    let r1 = document.getElementsByClassName("r1");
    let div1 = document.getElementById("Remove1");

    let x1 = r1.length;
    
    for(let i = 0; i < x1; i++) {
        div1.removeChild(r1[0]);
    }

    let r2 = document.getElementsByClassName("r2");
    let div2 = document.getElementById("Remove2");

    let x2 = r2.length;

    for(let i = 0; i < x2; i++) {
        div2.removeChild(r2[0]);
    }

    let p = document.getElementById("MesajRezumat");
    p.textContent = "Pagina a fost actualizata!";
    p.style.paddingLeft = "30px";
}