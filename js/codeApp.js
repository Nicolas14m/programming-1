// inciamos listas // objetos // variables globales
let lstDocentes = new Array();
let lstAlumnos = new Array();
let lstEjercicios = new Array();
let lstEntregas = new Array();
// usuario logueado
let usuarioLogueado = null;


/******************************************** Alumnos *****************************************************/

function preCargaAlumnos(){
    //invoca crearGuardarAlumno(nivel,"nombre", docente(username), "userName","pass")
    crearGuardarAlumno(1,"Nicolas Mattos","GonzaRockandPop","Chipi13","Nico1234");
    crearGuardarAlumno(1,"Francisco Mendy","GonzaRockandPop","F3NRYR","Fran1234");
    console.log(lstAlumnos);
}
function crearGuardarAlumno(pNiv,pName,pUsrDoc,pUsrName,pPass){
    let exito = false;
    //validaciones
    if(!isNaN(pNiv) && pName.trim().length > 4 && pUsrDoc.trim().length>0 && pUsrName.trim().length>0 && passValida(pPass)){
        let unAlumno = new Alumno();
        unAlumno.tipo = "Alumno";
        unAlumno.nivel = pNiv;
        unAlumno.nombre = pName;
        unAlumno.docente = pUsrDoc;
        unAlumno.userName = pUsrName;
        unAlumno.pass = pPass;
        lstAlumnos.push(unAlumno);
        exito = true;
    }
    return exito; // donde usaba este return despues?
}

/******************************************** Docentes *****************************************************/


function preCargaDocentes(){
    //invoca crearGuardarDocente("nombre","username","pass")
    crearGuardarDocente("Gonzalo Gentille","GonzaRockandPop","Gonza1234");
    crearGuardarDocente("Daniel Baccino","DaniDelCAP","Dani1234");
    console.log(lstDocentes);
}
function crearGuardarDocente(pName,pUsrName,pPass){
    let exito = false;
    //validaciones
    if(pName.trim().length>3 && pUsrName.trim().length>0 && passValida(pPass)){
        let unDocente = new Docente();
        unDocente.tipo = "Docente";
        unDocente.nombre = pName;
        unDocente.userName = pUsrName;
        unDocente.pass = pPass;
        lstDocentes.push(unDocente);
        exito = true;
    }
    return exito;
}

/******************************************** Password *****************************************************/


function passValida(pPass){ //FUNCION PARA VALIDAR PASSWORD
    let valida = false;
    let nroOK = false; // cambio a true cuando encuentro un num, una mayuscula, y una minuscula.
    let mayusOK = false; //
    let minusOK = false; //   
    if(pPass.length >= 4){
        let i = 0;
        while(i < pPass.length && (!nroOK || !mayusOK || !minusOK)){
            if(pPass.charCodeAt(i) >= 48 && 57>= pPass.charCodeAt(i)){
                nroOK = true;
            } else {
                if(pPass.charCodeAt(i) >= 65 && pPass.charCodeAt(i) <= 90){
                    mayusOK = true;
                } else {
                    if(pPass.charCodeAt(i)>= 97 && pPass.charCodeAt(i) <= 122){
                        minusOK = true;
                    }
                }
            }
            i++;
        }
        valida = nroOK && mayusOK && minusOK;
    }
    return valida;
    //return T o F
}

/******************************************** Registro *****************************************************/

function registrarUsuario(){
   let nombre = document.querySelector("#txtNameUsr").value;
   let userName = document.querySelector("#txtUserName").value;
   let password = document.querySelector("#txtPassUsr").value;
   let mensaje = "";
   
   if(checkRegistro(nombre,userName,password)){
       var checkbox = document.querySelector("#chkUsuario").checked;
       if(checkbox){//si el checkbox esta chequeado es alumno
           let docente = document.querySelector("#selDocentes").value;
           crearGuardarAlumno(1,nombre,docente,userName,password);
       } else {//else es docente
           crearGuardarDocente(nombre,userName,password);
       }
       mensaje = "Usuario registrado correctamente.";
   } else {
       mensaje = "Registro invalido. Por favor verifique los datos ingresados.";
       
   }
   document.querySelector("#pMostrarErrorRegistro").innerHTML = mensaje;
}


function checkUsr(){
   var checked = document.querySelector("#chkUsuario").checked;
   if(checked){
       document.querySelector("#selDocentes").style.display = "block";
   } else {
       document.querySelector("#selDocentes").style.display = "none";
   }  
}

function checkRegistro(pName,pUsrName,pPass){
    let exito = false;
    if(pName.trim().length>4 && pUsrName.trim().length>0 && passValida(pPass)){
        exito = true;
    }
    return exito;
}
 
/******************************************** Login *****************************************************/

function checkLogin(pUsu,pPwd){
    let encontreUsuario = false;
    let i=0;
    let j=0
    let matchOk = false;
    while(i < lstAlumnos.length && !encontreUsuario){
        if(lstAlumnos[i].userName.toUpperCase() === pUsu.toUpperCase()){
            encontreUsuario = true;
            if(lstAlumnos[i].pass === pPwd){
                matchOk = true;
                //login exitoso. ususarioLogueado = lstUsuarios[i]
                usuarioLogueado = lstAlumnos[i];
                
            }
        }
        i++;
    }
    while(j < lstDocentes.length && !encontreUsuario){
        if(lstDocentes[j].userName.toUpperCase() === pUsu.toUpperCase()){
            encontreUsuario = true;
            if(lstDocentes[j].pass === pPwd){
                matchOk = true;
                usuarioLogueado = lstDocentes[j];
                
            }
        }
        j++;
    }
    return matchOk;

}


function login() {
    document.querySelector("#spnUsuario").innerHTML = ""; //limpio mensajes anteriores
    let usrName = document.querySelector("#txtUsuario").value;
    let pass = document.querySelector("#txtPwd").value;
    let loginExitoso = checkLogin(usrName, pass);
    if (loginExitoso) { //mostrar pag de usuario
       // document.querySelector("#divVentas").style.display = "block";

        //llamar a una funcion donde cambie la interfaz una vez que el usr se loguee//
       interfazLogin(usuarioLogueado);

       // document.querySelector("#spnUsuario").innerHTML = "Login Correcto";

    } else {
        document.querySelector("#spnUsuario").innerHTML = "Usuario o contraseña incorrectos.";
    }
}

/******************************************** Cerrar Sesion *****************************************************/

function cerrarSesion(){
    usuarioLogueado = null;
    limpiarNavPrincipal();
    limpiarInterfaz();
    interfazPreLogin();

    //y limpiar lo que el usuario haya utilizado.. divs, inputs, combos , etc.
    //LIMPIAR INTERFASE. YA CUANDO Oculto limpio.
    /* ESCONDO LA INTERFAZ LOGIN 
    
    document.querySelector("#divCerrarSesion").style.display = "none"
    document.querySelector("#divPlantearEjercicio").style.display = "none";
    document.querySelector("#spnUserLogged").innerHTML = "";
    document.querySelector("#divInterfazRedactarDev").style.display = "none";
    document.querySelector("#divInterfazDoc01").style.display = "none";
    document.querySelector("#divInterfazDoc02").style.display = "none";
    document.querySelector("#divInterfazDoc03").style.display = "none";*/
    document.querySelector("#divCabezalUserLogueado").style.display = "none";
    



    /* VUELVO A MOSTRAR LA INTERFAZ PRE LOGIN 
    document.querySelector("#divLogin").style.display = "block";
    document.querySelector("#divRegistro").style.display = "block";
    document.querySelector("#txtUsuario").value = "";
    document.querySelector("#txtPwd").value = "";
    document.querySelector("#spnUsuario").value = ""
    */
    document.querySelector("#divNavPreLogin").style.display = "block";
    document.querySelector("#contenidoPreLogin").style.display = "block";

}




/******************************************** Ejercicios *****************************************************/

function preCargaEjercicios(){
    //primero obtenemos el docente invocando a obtenerDocente() y dsp creamos el ejercicio invocando crearGuardarEjercicio
    let docente1=obtenerDocente("GonzaRockandPop");
    crearGuardarEjercicio(1,"Ejercicio 1","ej1.png","esta es la descripcion",docente1);
    let docente2=obtenerDocente("DaniDelCAP");
    crearGuardarEjercicio(1,"Ejercicio 2","ej2.png","esta es la descripcion",docente2);
    console.log(lstEjercicios);
}
function crearGuardarEjercicio(pNiv,pTitulo,pImagen,pDescripcion,pDocente){
    let exito = false;
    //validaciones
    if(!isNaN(pNiv) && Number(pNiv) <= 3 && Number(pNiv) >= 1 && pTitulo.trim().length > 4 && pImagen.trim().length>4 && pDescripcion.trim().length>4 && pDocente !== null){
        let ejercicio = new Ejercicio();
        ejercicio.nivel = pNiv;
        ejercicio.titulo = pTitulo;
        ejercicio.imagen = pImagen;
        ejercicio.descripcion = pDescripcion;
        ejercicio.Docente = pDocente;
        lstEjercicios.push(ejercicio);
        exito = true;
    }
    return exito; 
}

function obtenerDocente(pUsrDoc){
    let docenteB = null;
    let i=0;
    while(i < lstDocentes.length && docenteB === null){
        if(lstDocentes[i].userName === pUsrDoc){
            docenteB = lstDocentes[i];            
        }
        i++;
    }
    return docenteB;
}

// el titulo y descripcion lleva unas validaciones especiales, entre 20 y 200 caracteres entre ambos campos.
function plantearEjercicio() { 
    let msg = "";
    let descripcion=document.querySelector("#txtDescripcion").value;
    let titulo=document.querySelector("#txtTitulo").value;
    if(descripcion.trim().length >0 && titulo.trim().length > 0 && descripcion.length + titulo.length >= 20 && descripcion.length + titulo.length <= 200){
        if(document.querySelector("#selNivel").value !== "-1"){
            let nivel=document.querySelector("#selNivel").value;
            if(document.querySelector("#fileImagen").value.length>0){
                let imagen=quitarFakePath(document.querySelector("#fileImagen").value);
                let docente=null;
                if (usuarioLogueado.tipo==="Docente"){ 
                    docente=usuarioLogueado;
                }
                crearGuardarEjercicio(nivel,titulo,descripcion,imagen,docente);
                msg = "Ejercicio planteado correctamente."
                console.log(lstEjercicios)
            } else {
                msg = "Debe seleccionar una Imagen.";
            }      
        } else {
            msg = "Debe seleccionar el nivel correspondiente al ejercicio."
        }
              
        
    } else {
        msg = "Entre titulo y descripcion no pueden superar los 200 caracteres. Tampoco pueden quedar campos vacíos.";
    }  
    document.querySelector("#pMostrarPlantearEjercicio").innerHTML = msg;    
}

function quitarFakePath(pNom){
    //C:\fakepath\acustica.png    C:/fakepath/acustica.png 
    let nombreOk = "";
    let encontreBarra = false;
    let posBarra = -1;
    let i=pNom.length-1;
    while(i >=0 && !encontreBarra){
        let car = pNom[i];        
        if(car === "\\" || car === "/"){
            encontreBarra = true;    
            posBarra = i;                   
        }
        i--;
    }
    //i =  1 pos antes de la barra
    if(encontreBarra){
        nombreOk = pNom.substr(posBarra +1);
    }
    return nombreOk;
}




/******************************************** Entregas *****************************************************/


function preCargaEntregas(){
    //primero obtenemos el ejercicio invocando a obtenerEtrega() y dsp creamos la entrega invocando crearGuardarEntrega
    let ejercicio1=obtenerEjercicio(0);
    let alumno1=obtenerAlumno("Chipi13")
    crearGuardarEntrega(ejercicio1,alumno1,"ej1.m4a","devolucion");
    let ejercicio2=obtenerEjercicio(1);
    let alumno2=obtenerAlumno("F3NRYR")
    crearGuardarEntrega(ejercicio2,alumno2,"sonido","");
    console.log(lstEntregas);
}
function crearGuardarEntrega(pEjer,pAlumno,pSonido,pDevolucion){
    let exito = false;
    //validaciones
    if(pEjer!==null && pAlumno !==null && pSonido.trim().length>4 && pDevolucion.trim().length>4){
        let entrega = new Entrega();
        entrega.Ejercicio = pEjer;
        entrega.Alumno = pAlumno;
        entrega.Sonido = pSonido;
        entrega.devolucion = pDevolucion;
        lstEntregas.push(entrega);
        exito = true;
    }
    return exito; 
}

function obtenerAlumno(pUsrAlm){
    let alumnoB = null;
    let i=0;
    while(i < lstAlumnos.length && alumnoB === null){
        if(lstAlumnos[i].userName === pUsrAlm){
            alumnoB = lstAlumnos[i];            
        }
        i++;
    }
    return alumnoB;
}

function obtenerEjercicio(pIdEjer){
    let ejercicioB = null;
    let i=0;
    while(i < lstEjercicios.length && ejercicioB === null){
        if(lstEjercicios[i].id === pIdEjer){
            ejercicioB = lstEjercicios[i];            
        }
        i++;
    }
    return ejercicioB;
}

/*
function hacerEntrega() {
    
    if (usrAlumno){ 
        Alumno=usuarioLogueado;
    }
    
}


*/


/******************** REDACTAR DEVOLUCIONES ? ****************/


// cuando da click en seccion 3 (redactar dev) hago la primer funcion.
let arrayEntregas = new Array();
function cargarEntregasDeAlumnos(){
    document.querySelector("#divInterfazRedactarDev").style.display = "block";//esto dsp lo hago en otro lado.por ahora lo pruebo aqui.
    arrayEntregas = []; // funca esto pa limpiar el array ??
    if(usuarioLogueado.tipo === "Docente"){
        cargarAlumnos(usuarioLogueado); //carga los alumnos de ese doc - sacar de aqui?
        let docente = usuarioLogueado;
        let i = 0;
        while (i < docente.misAlumnos.length){ // accede al array con sus alumnos
            let j = 0;
            let unAlumno = docente.misAlumnos[i];
            cargarEntregas(unAlumno); //cargo las entregas al alumno elegido.
            while (j < unAlumno.misEntregas.length){//accede al array de entregas
                let unaEntrega = unAlumno.misEntregas[j];
                if(unaEntrega.sonido !== null && unaEntrega.devolucion ===""){//encontre una entrega realizada aun sin corregir
                    arrayEntregas.push(unaEntrega);// cargo un array con todas las entregas sin corregir de ese profesor.
                }
                j++;
            }
            i++;
        } 
        // mostrar las entregas del array en una tabla?  
        let tabla = `<table border ="1"><tr><th>Alumno</th><th>Ejercicio</th><th>Estado</th></tr>`;
        for(let x=0;x<arrayEntregas.length;i++){
            let entrega = arrayEntregas[x];
            tabla += `<tr><td>${entrega.Alumno.nombre}</td><td>${entrega.Ejercicio.titulo}</td><td><a class="linkRedactDev">Redactar Devolucion</a></td></tr>`;
        }
        tabla += `</table>`;
        document.querySelector("#divInterfazRedactarDev").innerHTML = tabla;    
    }
   
}
//la primer funcion muestra una tasbla con los ejercicios que el profe tiene para corregir. queda hacer otra funcion, dinamica, que tome una devolucion del profe y la guarde en entrea.devolucion
/*
function redactarDevoluciones(){
    let i = 0;
    while(i <= arrayEntregas.length){

    }
}

*/

/******************** 
 
 Estas 2 funciones son para cargar los alumnos, entregas,etc. pq inicialmente nuestros docentes aparecen con el array misAlumnos vacio.. y Alumnos.misEntregas tmb, etc etc. habria que ver de hacer esto antes probablemente, junto con la precarga
 
 ***************************/ 

function cargarAlumnos(pDocente){
    for(let i = 0;i < lstAlumnos.length;i++){
        let doc = lstAlumnos[i].docente;
        if(pDocente.userName === doc){
            pDocente.misAlumnos.push(lstAlumnos[i]);
        }
    }
}

function cargarEntregas(pAlumno){
    for(let i=0;i < lstEntregas.length;i++){
        let user = lstEntregas[i].Alumno;
        if(pAlumno.userName === user.userName){
            pAlumno.misEntregas.push(lstEntregas[i]);
        }
    }
}






function buscarEjercicio(palabraBuscada,criterio){
    let retorno=[];
    for(let i=0; i<lstEjercicios.length; i++){
        if (criterio==="titulo"){
            if(lstEjercicios[i].titulo.indexOf(palabraBuscada)>-1){
                retorno.push(lstEjercicios[i]);
            }

        }else{
            if(lstEjercicios[i].descripcion.indexOf(palabraBuscada)>-1){
                retorno.push(lstEjercicios[i]);
            }
        }
    }
    return retorno;
}


function obtenerEjercicioXId(pId){
    let i=0;
    let ejerX = null;
    while(i<usuarios.length && ejerX === null){
        if(usuarios[i].id === Number(pId)){
            ejerX = usuarios[i];
        }
        i++;
    }
    return ejerX;
}




























