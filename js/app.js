const pizarra = document.querySelector("#pizarra")
const div_seleccion_simple = document.querySelector("#seleccion-simple")
const div_respuesta_texto = document.querySelector("#texto-resp")
const div_verdadero_falso = document.querySelector("#verdadero-falso")
const verdadero = document.querySelector("#verdadero")
const falso = document.querySelector("#falso")
const respuesta_texto = document.querySelector("#respuesta-texto")
const feedback = document.querySelector("#feedback")
const capa_traslucida = document.querySelector("#capa_traslucida")
const puntuacion = document.querySelector("#puntos")
const mensaje_positivo = document.querySelector("#mensaje_positivo")
const mensaje_negativo = document.querySelector("#mensaje_negativo")
//capa_traslucida
var opcion;
var tiempo = true
//Con este par de arreglos es que sucede la magia
//Solo basta conocer que hacen estos arreglso para poder agregar más preguntas jaja
var indice = 0
const cantidad_preguntas = arreglo_preguntas.length/3
var cantidad_preguntas_respondidas = 0
var cantidad_bien_respondidas = 0
var puntos = 0

pizarra.style.backgroundImage = "url("+arreglo_preguntas[indice]+")";

document.querySelector("#linea_temporal").style.animationName="lineaTiempo"
document.querySelector("#linea_temporal").style.animationDuration = String(tiempo_quiz)+"s"

// DEPENDIENDO DEL ESTILO DE LA PREGUNTA, SE CAMBIA LOS BOTONES DE RESPUESTA
// SELECCION SIMPLE -> 4 BONOTES   DIV_SELCCION_SIMPLE
// VERDADERO Y FALSO -> 2 RADIO BONOTES   DIV_RESPUESTA_TEXTO
// RESPUESTA TEXTO -> 1 BOTON  INPUT DE TEXTO
// SI YA LA PREGUNTA SE RESPONDIO SE PONE UNA IMAGEN FEEDBACK
function cambiar_modalidad(){
    if(arreglo_preguntas[indice+1]=="s"  && arreglo_respuestas[indice]==null){
        div_seleccion_simple.style.display="flex"
        div_verdadero_falso.style.display="none"
        div_respuesta_texto.style.display="none"
        feedback.style.display="none"
    }else if(arreglo_preguntas[indice+1]=="v" && arreglo_respuestas[indice]==null){
        div_seleccion_simple.style.display="none"
        div_verdadero_falso.style.display="flex"
        div_respuesta_texto.style.display="none"
        feedback.style.display="none"
    }else if(arreglo_preguntas[indice+1]=="t" && arreglo_respuestas[indice]==null){
        div_seleccion_simple.style.display="none"
        div_verdadero_falso.style.display="none"
        div_respuesta_texto.style.display="block"
        feedback.style.display="none"
    }else{

        if(arreglo_respuestas[indice]){
            div_seleccion_simple.style.display="none"
            div_verdadero_falso.style.display="none"
            div_respuesta_texto.style.display="none"
            feedback.style.display="block"
            feedback.style.backgroundImage = "url(img/good.png)"
        }else{

            div_seleccion_simple.style.display="none"
            div_verdadero_falso.style.display="none"
            div_respuesta_texto.style.display="none"
            feedback.style.display="block"
            feedback.style.backgroundImage = "url(img/wrong.png)"
        }
    }
}

// ESTA FUNCION SE USA CUANDO SE LE DA CLICK AL BOTON SIGUIENTE O CUANDO 
// UNO SE SALE DE LA CAPA TRASLUCIDA
function continuar(){
    if(indice+3 < arreglo_preguntas.length-1) {indice+=3
    document.querySelector("#linea_temporal").style.animationName = "lineaTiempo"
    cambiar_modalidad()
    pizarra.style.backgroundImage = "url("+arreglo_preguntas[indice]+")"
    }
}

document.querySelector("#siguiente").onclick = ()=>{
    continuar()
}

document.querySelector("#anterior").onclick = ()=>{
    if(indice > 0) indice-=3
    cambiar_modalidad()
    pizarra.style.backgroundImage = "url("+arreglo_preguntas[indice]+")"
}

// AQUÍ SE SETEA EN LA VARIABLE OPCION,  LA OPCION RESPONDIDA POR EL USUARIO
document.querySelector("#opciona").onclick=()=>{ opcion = "a"}
document.querySelector("#opcionb").onclick=()=>{ opcion = "b"}
document.querySelector("#opcionc").onclick=()=>{ opcion = "c"}
document.querySelector("#opciond").onclick=()=>{ opcion = "d"}

capa_traslucida.onclick = ()=>{
    if(cantidad_preguntas > cantidad_preguntas_respondidas && tiempo){
    capa_traslucida.style.display = "none";
    continuar()
    }
}

function mensaje_final(){
    capa_traslucida.style.display="flex"
    mensaje_positivo.style.display="none"
    mensaje_negativo.style.display="none"
    document.querySelector("#mensaje_final").style.display="flex"
    document.querySelector("#cantidad_bien").innerText = cantidad_bien_respondidas
    document.querySelector("#cantidad_total").innerText = cantidad_preguntas

    if(puntos >= puntos_para_pasar){
        document.querySelector("#msg_f_titulo").innerText = "¡Aprobaste el quiz!"
        document.querySelector("#recomendacion").innerText = "Recomendamos que continues al siguiente tema"
    }
    else {
        document.querySelector("#msg_f_titulo").innerText = "Reprobaste el quiz"
        document.querySelector("#recomendacion").innerText = "Recomendamos que repases el anterior tema"
    }
}

document.querySelector("#contestar").onclick = ()=>{
    var bool;
    cantidad_preguntas_respondidas++
    if(arreglo_preguntas[indice+1]=="s"){
        if( opcion === arreglo_preguntas[indice+2])
            bool = true
        else
            bool = false
    } 
    else if(arreglo_preguntas[indice+1]=="v"){
        if(arreglo_preguntas[indice+2] == verdadero.checked || arreglo_preguntas[indice+2] == !falso.checked)
            bool = true
        else
            bool = false
    }else if(arreglo_preguntas[indice+1]=="t"){
        if(respuesta_texto.value == arreglo_preguntas[indice+2])
            bool = true
        else
            bool = false
    }

    if(bool){
        capa_traslucida.style.display="flex"
        mensaje_positivo.style.display="flex"
        mensaje_negativo.style.display="none"
        puntuacion.innerText = Number(puntuacion.innerText)+valor_preguntas[indice]
        puntos+=valor_preguntas[indice]
        arreglo_respuestas[indice]=true
        document.querySelector("#recompensa").innerText=valor_preguntas[indice]
        cantidad_bien_respondidas++
    }else{
        capa_traslucida.style.display="flex"
        mensaje_positivo.style.display="none"
        mensaje_negativo.style.display="block"
        arreglo_respuestas[indice]=false
    }

    if(cantidad_preguntas == cantidad_preguntas_respondidas){
        tiempo = false
        document.querySelector("#linea_temporal").style.animationName=""
        mensaje_final()

    }else{
        setTimeout(()=>{
            if(tiempo && capa_traslucida.style.display == "flex"){
            capa_traslucida.style.display="none"; continuar()}}, 5000)
}
}

setTimeout(()=>{
    if(tiempo){
        tiempo=false, 
        mensaje_final(), document.querySelector("#tiempo").style.display="block"
    }
}, 
    tiempo_quiz*1000)
