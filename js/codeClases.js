class Alumno {
    constructor(){
        this.tipo; // tipo = "Alumno"
        this.nivel;  // num (1 = Inicial,2 = Intermedio,3 = Avanzado)
        this.nombre; // str 
        this.misEntregas = new Array();// Array de OBJ ENTREGAS
        this.docente; // OBJ o str??? -> le pasamos el username
         // para crear los usuarios ? 
         this.userName;
         this.pass;
    }
}

class Docente{
    constructor(){
        this.tipo; // tipo = "Docente"
        this.misAlumnos = new Array(); //--- ARRAY ?
        this.misEjercicios = new Array(); // Array de los OBJ ejercicios del docente
        this.nombre; //str
        this.userName;// para crear los usuarios ? y para linkear con alumnos
        this.pass; 
        //this.id // para linkear Alumno con docentes. (podemos sacar ese num de un select de docentes)
    }
}

class Ejercicio{  // crear otro obj Ejercicios para que el alumno lo resuelva sin modificar el original??
    static nro = 0;
    constructor(){
        this.id = Ejercicio.nro++;
        this.nivel
        this.titulo // txt
        this.imagen
        this.descripcion // txt
        this.Docente;
        
    }
} 

class Entrega{
    constructor(){
        this.Ejercicio; // Obj ejer
        this.Alumno // 
        this.sonido //
        this.devolucion // devolucion del profe STR ?
        //this.estado

    }
}
