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