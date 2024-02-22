let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
};

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion(); // Muestra y oculta las secciones
    tabs(); // Cambia la sección cuando se presionen los tabs
    botonesPaginador(); // Agrega o quita los botones del paginador
    paginaAnterior();
    paginaSiguiente();
    consultarAPI(); // Consulta la API en el backend de PHP

    idCliente();
    nombreCliente(); // Añade el nombre del cliente al objeto cita desde el asignado en el formulario
    seleccionarFecha(); // Añade la fecha de la cita en el objeto
    seleccionarHora(); // Añade la hora de la cita en el objeto
    mostrarResumen(); // Muestra el resumen de la cita
}

function mostrarSeccion() {
    // Ocultar la sección que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');

    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar')
    }

    // Seleccionar la sección con el paso...
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    //Remover clase del tab resaltado anterior
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    // Resalta el tab actual
    tabActual = `[data-paso="${paso}"]`;
    const tab = document.querySelector(tabActual);
    tab.classList.add('actual');

}


function tabs() {
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach( boton => {
        boton.addEventListener('click', function(e) {
            paso = parseInt( e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        });
    });
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function(){
        if(paso <= pasoInicial) return;
            paso--;
            botonesPaginador();
        })
}
    
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function(){
        if(paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
})
}

async function consultarAPI() // se usa async para que la función se ejecute mientras se ejecutan otras y no tenga que esperar a que esta se complete y tiene que ir complementada con await la cual se usa para esperar por alguna acción para que otra pase
{
 try {
    const url = `${location.origin}/api/servicios`;
    const resultado = await fetch(url);
    const servicios = await resultado.json(); // con el console log en resultado se puede encontrar el .json en PROTOTYPE // Esto se usa porque en javascript no existen los arreglos asociativos, entonces lo que hacemos es convertirlo a un objeto que eso si existe en javascript y es basicamente el arreglo asociativo de javascript
    mostrarServicios(servicios);
 } catch (error) {
    console.log(error);
 }
}

function mostrarServicios(servicios) {
    servicios.forEach( servicio => {
        const { id, nombre, precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = `Nombre:  ${nombre}`;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = '$' + precio;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() 
            {
                seleccionarServicio(servicio);
             }
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
        
        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicio(servicio) {
    const { id } = servicio;
    const { servicios } = cita;
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    // Comprobar si un servicio ya fue agregado
    if(servicios.some(agregado => agregado.id === servicio.id)) { 
        // Eliminarlo
        cita.servicios = servicios.filter (agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        // Agregarlo
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }


    console.log(cita);
}

function idCliente() {
    cita.id = document.querySelector('#id').value;
}
function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;// lo que en html es un atributo en javascript es un objeto (se refiere al .value)
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e) {
        alertaPrevia = document.querySelector('.alerta');
        const dia = new Date(e.target.value).getUTCDay();

        if( [6, 0]. includes(dia) ){
            if (!alertaPrevia) {
                e.target.value = '';
                mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
            } else {
                alertaPrevia.remove();
                mostrarAlerta('Hora No válida', 'error', '.formulario');
            }
        } else {;
            if (!alertaPrevia){
                cita.fecha = e.target.value
            } else {
                alertaPrevia.remove();
                cita.fecha = e.target.value
            }

        }
    })
}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {
        alertaPrevia = document.querySelector('.alerta');
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];

        if( hora < 10 || hora > 18){
            e.target.value = '';
            if (!alertaPrevia) {
                mostrarAlerta('Hora No válida', 'error', '.formulario');
            } else {
                alertaPrevia.remove();
                mostrarAlerta('Hora No válida', 'error', '.formulario');
                
            }
        } else {
            if (!alertaPrevia){
                cita.hora = e.target.value
            } else {
                alertaPrevia.remove();
                cita.hora = e.target.value
            }

        }
    })
}

function mostrarAlerta(mensaje, tipo, elemento) {
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta')
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);
}

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');
        alertaPrevia = document.querySelector('.alerta');

        // Limpiar el contenido de resumen
        while(resumen.firstChild){
            resumen.removeChild(resumen.firstChild);
        }
    if (Object.values(cita).includes('') || cita.servicios.length === 0) {
        if (!alertaPrevia) {
            mostrarAlerta('Hacen falta datos o servicios', 'error', '.contenido-resumen');
        } else {
            alertaPrevia.remove();
            mostrarAlerta('Hacen falta datos o servicios', 'error', '.contenido-resumen');
        }
        
        return;
    }
    // Formatear el div de resumen
    const {nombre, fecha, hora, servicios} = cita;

    // Heading para servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = `Resumen de Servicios`;
    resumen.appendChild(headingServicios);

    // Itirando y mostrando los servicios
    servicios.forEach(servicio => {
        const {id, precio, nombre} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`; // tambien se podría hacer servicio.nombre si no se hiciera el destructuring de arriba

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);

    });

    // Heading para Cita en Resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = `Resumen de Cita`;
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    // Formatear la fecha en español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date( Date.UTC(year, mes, dia));
    
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`;

    // Boton para crear cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;
    

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);
}

async function reservarCita(){ // desde aquí
    const {nombre, fecha, hora, servicios, id} = cita;
    const idServicios = servicios.map(servicio => servicio.id);

    const datos = new FormData();
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);

    try {
        // Peticion hacia la API
        const url = `${location.origin}/api/citas`;

        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });

        const resultado = await respuesta.json(); // todo esto hasta aquí sería el códiigo para comprobar lo mismo que se puede comprobar con POSTMAN y que el servidor esté conectado y recibiendo la respuesta.
        console.log(resultado);

        if (resultado.resultado) {
            Swal.fire({
                title: "Cita Creada Correctamente",
                text: "Tu cita fue creada correctamente",
                icon: "success",
            }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            });
        } 
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al crear la cita",
          });
    }
}