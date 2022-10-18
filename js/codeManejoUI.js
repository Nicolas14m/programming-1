bloqueEventos();

function bloqueEventos(){
    preCargaAlumnos();
    preCargaDocentes();
    preCargaEjercicios();
    preCargaEntregas();
    limpiarNavPrincipal();
    interfazPreLogin();
    document.querySelector("#btnRegUsuario").addEventListener("click",registrarUsuario);
    document.querySelector("#chkUsuario").addEventListener("click",checkUsr);
    document.querySelector("#btnLogin").addEventListener("click",login);
    

   
    
    //document.querySelector("#btnCrearEjercicio").addEventListener("click",plantearEjercicio);
    //document.querySelector("#btnInterfazPlantearEj").addEventListener("click",interfazPlantearEj);
    //document.querySelector("#btnInterfazAsignarNiv").addEventListener("click",interfazAsignarNiv);
    //document.querySelector("#btnInterfazRedactarDev").addEventListener("click",interfazAsignarEj);
    //document.querySelector("#btnInterfazRedactarDev").addEventListener("click",cargarEntregasDeAlumnos);
}

function armarComboDocentes(){
    let miCombo = `<select id="selDocentes"><option value="-1">Elija un Docente</option>`;
    for(let i=0; i< lstDocentes.length; i++){
        let docente = lstDocentes[i];
        miCombo += `<option value="${docente.userName}">  ${docente.nombre}(${docente.userName})</option>`;
    }
    miCombo += `</select>`;
    document.querySelector("#divComboUsuarios").innerHTML=miCombo;
}

function interfazPreLogin(){
    //document.querySelector("#divInterfazDoc01").style.display = "none";
    //document.querySelector("#divInterfazDoc02").style.display = "none";
    //document.querySelector("#divInterfazDoc03").style.display = "none";
    //document.querySelector("#selDocentes").style.display = "none";
    //document.querySelector("#divCerrarSesion").style.display = "none";
    //document.querySelector("#divCabezalUserLogueado").style.display = "none";
    //document.querySelector("#divPlantearEjercicio").style.display = "none";
    limpiarInterfaz();
    armarComboDocentes();
    
    //muestro los elementos de la clase preLogin a pedal
    document.querySelector("#divNavPreLogin").style.display = "block"; 
    document.querySelector("#divLogin").style.display = "block"; 
    document.querySelector("#contenidoPreLogin").style.display = "block";
    document.querySelector("#divRegistro").style.display = "block"; 

}
/******************************************** Interfaz Alumno *****************************************************/

function mostrarEjercicios(){
    //mostrarEjerciciosAlumno();
    mostrarEjerciciosTabla(lstEjercicios);
    document.querySelector("#divBuscarEjercicio").style.display = "block"; 
    document.querySelector("#divVerEjerAlumn").style.display = "block"; 
    document.querySelector("#divVerEjercicio").style.display = "block"; 
    document.querySelector("#btnBuscarEj").addEventListener("click", function (){
        respuesta=buscarEjercicio(document.querySelector("#txtBuscarEj").value,"titulo");
        if (respuesta.length===0){
            respuesta=buscarEjercicio(document.querySelector("#txtBuscarEj").value,"descripcion");
        }
        console.log(respuesta);
        mostrarEjerciciosTabla(respuesta);
    })


}

function mostrarEjerciciosTabla(pListaEj){
    let tabla = `<table class="table table-hover ejercicios">
                    <thead>
                    <tr>
                    <th scope="col">#</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Descripcion Breve</th>
                        <th scope="col">Nivel</th>
                    </tr>
                    </thead>
                    <tbody>`;
    for(let i=0; i<pListaEj.length; i++){
        if(pListaEj[i].nivel===usuarioLogueado.nivel && pListaEj[i].Docente.userName===usuarioLogueado.docente){
            tabla += `<tr id="${pListaEj[i].id}" class="ejerFila"><th scope="row">${i+1}</th><<td>${pListaEj[i].titulo}</td><td>${pListaEj[i].descripcion}</td><td>${pListaEj[i].nivel}</td></tr>`;
        }
    }
    tabla += `</tbody></table>`;
    document.querySelector("#divVerEjerAlumn").innerHTML = tabla;
    //
    let elementosDOM = document.querySelectorAll(".ejerFila");

    for (let i = 0; i < elementosDOM.length; i++) {
        let eleDomX = elementosDOM[i];
        eleDomX.addEventListener("click", mostrarFilaGenerica); //asigno a cada fila autom'aticamente
    }
}


function mostrarFilaGenerica() {
    // this //será el elemento del DOM que DISPARÓ EL EVENTO/
    /*   let miAtributoX = this.getAttribute("laFila");
       console.log(miAtributoX);
   */
       let idEjercicio = this.getAttribute("id"); //se donde click y en que objeto.
       let ejercicioOBJEncontrado = mostrarUnEjercicio(idEjercicio);
       let msg;
       if(ejercicioOBJEncontrado !== null){
           msg = ejercicioOBJEncontrado;
       }else{  
           msg="Error con el ejercicio";
       }
       document.querySelector("#divVerEjercicio").innerHTML=msg;
   
}




/*
function mostrarTablaGuitarrasVentas() {
    let tabla = `<table border="1"><tr><th>Nombre</th><th>Tipo</th><th>Precio</th><th>Imagen</th><th>Sonido</th></tr>`;
    for (let i = 0; i < guitarras.length; i++) {
        let gX = guitarras[i];
        let img = `<img src="img/${gX.imagen}" />`;
        let son = `<audio controls><source src="audio/${gX.sonido}"></audio>`;        
        tabla += `<tr ubicador="${gX.nombre}" class="poderAsignarEventosAMasDeUna"><td>${gX.nombre}</td><td>${gX.Tipo.nomTipo}</td><td>${gX.Tipo.precio}</td><td>${img}</td><td>${son}</td></tr>`;
    }
    tabla += `</table>`;
    document.querySelector("#divTablaGuitarrasVentas").innerHTML = tabla;
    let elementosDOM = document.querySelectorAll(".poderAsignarEventosAMasDeUna");
    for (let i = 0; i < elementosDOM.length; i++) {
        let eleDomX = elementosDOM[i];
        eleDomX.addEventListener("click", mostrarFilaGenerica); //asigno a cada fila autom'aticamente
    }
}

function mostrarFilaGenerica() {
    // this //será el elemento del DOM que DISPARÓ EL EVENTO/
    /*   let miAtributoX = this.getAttribute("laFila");
       console.log(miAtributoX);
   *//*
       let ubicadorGuitarra = this.getAttribute("ubicador"); //se donde click y en que objeto.
       let guitarraOBJEncontrada = obtenerGuitarraPorNombre(ubicadorGuitarra);
       let msg;
       if(guitarraOBJEncontrada !== null){
           msg = obtenerMostrarUnaGuitarra(guitarraOBJEncontrada);
       }else{  
           msg="Error con la guitarra";
       }
       document.querySelector("#divEligida").innerHTML=msg;
   
   }
   
   function obtenerMostrarUnaGuitarra(pGuitarra){
      
        let img = `<img src="img/${pGuitarra.imagen}" />`;
       let son = `<audio controls><source src="audio/${pGuitarra.sonido}"></audio>`;
       let listaGuitarra = `<ul id="guitarraElegida" ubicador="${pGuitarra.nombre}"><li>${pGuitarra.nombre}</li><li> ${pGuitarra.Tipo.nomTipo}</li><li>${pGuitarra.Tipo.precio}</li>`;
       listaGuitarra += `<li>${img}</li><li>${son}</li></ul>`;
       return listaGuitarra;
   }

*/



function mostrarUnEjercicio(pEjerId){
    let contenido = `<div class="ejercicios">`;
    let i=0;
    encontre=false;
    while(i<lstEjercicios.length && encontre===false){
        if (lstEjercicios[i].id===Number(pEjerId)){
            contenido += `<h2>${lstEjercicios[i].titulo}</h2><br>
                      <img src="img/${lstEjercicios[i].imagen}">
                      <p>${lstEjercicios[i].descripcion}</p>
                      <label for="filSonido">Sonido: </label><input id="filSonido" type="file"> <span id="spnFilSonido"
                      class="error"></span><br>
                      <br>
                      <input type="button" value="Hacer entrega"><br><hr>`;  
                      encontre===true;         
        }
        i++;
    }
    contenido+=`</div>`;
    return contenido;
    //document.querySelector("#divVerEjercicio").innerHTML = contenido;
}


/******************************************** Interfaz Docente *****************************************************/



/******************************************** Interfaz logueado *****************************************************/

//---- una vez que el usuario hace login, usamos esta funcion para ocultar/mostrar los datos correspondientes segun el tipo de usuario --//

function interfazLogin(pUsuario){   
        limpiarInterfaz();
        //document.querySelector("#divNavPreLogin").style.display = "none";
        //document.querySelector("#divCerrarSesion").style.display = "block"
        document.querySelector("#divCabezalUserLogueado").style.display = "block";
        document.querySelector("#divUsrSesion").innerHTML = `<p style="color:white;">${pUsuario.nombre}(${pUsuario.userName})</p> <input type="button" id="btnCerrarSesion" value="Cerrar Sesion">`;
        //document.querySelector("#contenidoPreLogin").style.display = "none";
        document.querySelector("#btnCerrarSesion").addEventListener("click",cerrarSesion);

        if(pUsuario.tipo === "Alumno"){
            document.querySelector("#navPrincipalAl").style.display = "block";
            //mostrarElmentosDeLaClase(menuAlumno); me undefined
            mostrarEjercicios()
            //mostrarEjerciciosTabla();
        } 
        if(pUsuario.tipo === "Docente"){ // interfaz para docente
            document.querySelector("#navPrincipalDc").style.display = "block"
            //mostrarElmentosDeLaClase(menuDocente);
            // document.querySelector("#divPlantearEjercicio").style.display = "block";
            //document.querySelector("#divInterfazDoc01").style.display = "block";
            //document.querySelector("#divInterfazDoc02").style.display = "block";
            //document.querySelector("#divInterfazDoc03").style.display = "block";
        }
        document.querySelector("#divUsrSesion").style.display = "block";
        document.querySelector("#aMenuAlEjercicios").addEventListener("click", mostrarEjercicios);
        //cargarEventosMenu();
        
    }

    
    


 

    // la idea es separar las funcionalidades tanto del docente como de los alumnos en distintos divs o "interfaces". cada vez que accedemos a una interfaz debemos limpiar (dejar en none) las otras, eso lo hariamos en la funcion limpiarInterfazLogin, y luego settear en "block" la interfaz (el div) que queremos ver, en funciones separadas, como se puede ver aca abajo..
    function interfazPlantearEj(){
        limpiarInterfazLogin();
        document.querySelector("#divPlantearEjercicio").style.display = "block";
    }
    function interfazAsignarNiv(){
        limpiarInterfazLogin();
        document.querySelector("#divInterfazAsignarNiv").style.display = "block";
    }
    function interfazAsignarEj(){
        limpiarInterfazLogin();
        document.querySelector("#divInterfazRedactarDev").style.display = "block";
    }
    
    function limpiarInterfazLogin(){
        document.querySelector("#divPlantearEjercicio").style.display = "none";
        document.querySelector("#divInterfazAsignarNiv").style.display = "none";
        document.querySelector("#divInterfazRedactarDev").style.display = "none";
        
        
    }
    
    function limpiarNavPrincipal(){
        let miListaDOMContenedores = document.querySelectorAll(".navPrincipal");
        for (let i = 0; i < miListaDOMContenedores.length; i++) {
            let unDivCont = miListaDOMContenedores[i];
            unDivCont.style.display = "none";
        }
    }

    function limpiarInterfaz(){
        let miListaDOMContenedores = document.querySelectorAll(".misContenedores");
        for (let i = 0; i < miListaDOMContenedores.length; i++) {
            let unDivCont = miListaDOMContenedores[i];
            unDivCont.style.display = "none";
        }
    }

    function cargarEventosMenu() {
        /* a pedal
        document.querySelector("#aMenuOrden").addEventListener("click", mostrarOrdenUI);
        document.querySelector("#aMenuVentas").addEventListener("click", mostrarVentasUI);
        document.querySelector("#aMenuGuitarras").addEventListener("click", mostrarGuitarrasUI);
        */
       let pClase="";
       if (usuarioLogueado.tipo==="Docente"){
           pClase=".menuDocente"; 
       }
       if (usuarioLogueado.tipo==="Alumno"){
           pClase=".menuAlumno";
       }

        let miListaDOMMenus = document.querySelectorAll(`${pClase}`);
        for (let i = 0; i < miListaDOMMenus.length; i++) {
            let aMenu = miListaDOMMenus[i];
            aMenu.addEventListener("click", diClickEnMenu);
        }
    }
    
    function diClickEnMenu() {
        //limpiarInterfaz(); //oculto para que solo se vea lo que quiero.
        let elMenuClickeado = this;
        let elId = elMenuClickeado.getAttribute("id");
        if (elId !== null) {
            console.log(elId);
            //id válido
            //obtener el dato del menu que quiero mostrar
            let clase = obtenerDatoDelMenu(elId);  // aMenuDatos, clase es el nombre de la clase a mostrar
            mostrarElmentosDeLaClase(clase);
            console.log(clase);
        } else {
            console.warn("te trajiste un null");
        }
    }
    function mostrarElmentosDeLaClase(pClase){
        limpiarInterfaz(); //oculto para que solo se vea lo que quiero.
        //interfazLogin(usuarioLogueado);
        let listaDeLaClase = document.querySelectorAll(`.${pClase}`);
        for (let i = 0; i < listaDeLaClase.length; i++) {
            let elemX = listaDeLaClase[i];
            elemX.style.display = "block";
        }
    }
    function obtenerDatoDelMenu(elId){
        //ya sé que lo que quiero está desde la pos 5  "aMenuAl o aMenuDc" "0123456"
        let dato ="";
        for(let i = 7; i<elId.length ; i++){
            dato += elId.charAt(i);
        }
        return dato.toLowerCase(); //por en el menu es "aMenuGuitarras"
    }
    

    //limpiar varios de la misma clase
function limpiarCajasTexto(pClase){
    //  ocultarTodo(); //oculto para que solo se vea lo que quiero.
      let lasCajas = document.querySelectorAll(`.${pClase}`);
      for (let i = 0; i < lasCajas.length; i++) {
          let cajaX = lasCajas[i];
          cajaX.value= "";
      }
}

function limpiarSpnDivP(pClase){
  //  ocultarTodo(); //oculto para que solo se vea lo que quiero.
    let losContenedores = document.querySelectorAll(`.${pClase}`);
    for (let i = 0; i < losContenedores.length; i++) {
        let contX = losContenedores[i];
        contX.innerHTML= "";
    }
}
  
    


/*
function iniciarDisplay(){
    document.querySelector("#divInterfazDoc01").style.display = "none";
    document.querySelector("#divInterfazDoc02").style.display = "none";
    document.querySelector("#divInterfazDoc03").style.display = "none";
    document.querySelector("#selDocentes").style.display = "none";
    document.querySelector("#divCerrarSesion").style.display = "none";
    document.querySelector("#divCabezalUserLogueado").style.display = "none";
    document.querySelector("#divPlantearEjercicio").style.display = "none";
}
*/

/*
function test(){
    let nombreArchivo = document.querySelector("#filImagen").value;
     //C:\fakepath\acustica.png  
    let nombreLimpio = quitarFakePath(nombreArchivo);
    console.log(nombreArchivo);
    console.log(nombreLimpio);
    //document.querySelector("#divMostrar").innerHTML= nombreArchivo + "<br> " + nombreLimpio;
    //mostrarImagen(nombreLimpio);
}

*/