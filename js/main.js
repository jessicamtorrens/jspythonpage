const nav= document.getElementById("nav");

window.addEventListener("scroll",()=>{//evento scroll
    let actual= window.pageYOffset;// Obtengo la posición en Y actual del documento

    if (actual>=100){//A partir de esta altura el menú deja de ser transparente
        nav.classList.remove("nav1");
        nav.classList.add("nav2");
    }else{
        nav.classList.add("nav1");
        nav.classList.remove("nav2");
    }
    
})





//MENU ACORDEON DEL CONTENIDO
const principal= document.getElementsByClassName("principal");
let activa=document.getElementById("caja0")

for (let i = 0; i < principal.length; i++) {
    
    principal[i].onclick= ()=>{
        activa.classList.remove("activo");
        activa= document.getElementById("caja"+ i.toString())
        activa.classList.add("activo");
    }
    
}