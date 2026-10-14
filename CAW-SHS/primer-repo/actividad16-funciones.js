// Ejercicio de uso de arreglos con CRUD -menu version e referencia

//---Paso 1---

const productos=[
    {id: crypto.randomUUID(), nombre:"Molletes", precio:30, categoria:"comida", dispobible:true},
    {id:crypto.randomUUID(), nombre:"Jugo de naranja", precio: 18, categoria:"bebida", disponible:true},
    {id:crypto.randomUUID(), nombre:"Gelatina", precio: 12, categoria: "postre", dispobible:false}
];

//---Paso 2 y 3 Leer---

const listar= () => productos;
const listarDisponibles= () => productos.filter((p) => p.dispobible);

//---Paso 4 Buscar 1---

const obtenerPorId= (id) => productos.find ((p) => p.id===id);
// obtenerPorId("no-existe") devuelve undefined cuando el find no encontro nada
// console.log(obtenerPorId("no-exist").nombre)
//cannot read properities of undefined
// el programa cae se convierte en un error 404 biend manejado

// ---Paso 5 crear---
function crear(datos){
    const nuevo ={id:crypto.randomUUID(), dispobible:true, ...datos};
    productos.push(nuevo);
    return nuevo;
}

//---Paso 6 Actualizar---
function actualizar(id, cambios){
    const i = productos.findIndex((p)=> p.id ===id);
    if (i=== -1) return null;
    productos[i] = {...productos[i], ...cambios};
    return productos[i];
}

//---Paso 7 Borrado lógico---
function eliminar(id) {
    const producto = obtenerPorId(id);
    if(!producto) return null;

producto.disponible= false;
return producto;
}

// razon: los pedidos viejos guardan el id de su producto
// sí lo borro de verdad el historial queda apuntando a algo que no existe
// el corte del día se rompe: marcarlo cómo no disponible lo saca del menu
// sin destruir la información y además se puede revertir

//---Paso 8 total con reduce---
function  calcularTotal(pedido){
    return pedido.items.reduce((suma, item) => suma+ item.precio * item.cantidad, 0);

}

//---Paso 9¿ya existe?
const existeNombre = (nombre) =>
    productos.some((p) => p.nombre.toLowerCase());

const buscarPorTexto =(texto) =>
    productos.filter((p) => p.nombre.toLocaleLowerCase().includes(texto.toLocaleLowerCase()));

//---Paso 10 pruebas---

console.log ("---listar---")
console.log(listar())

console.log("----ListarDisponibles---")
console.log(listarDisponibles().map((p)=>p.nombre));

console.log("---Crear---");
const creado=crear ({nombre:"sincronizada", precio:32, categoria:"comida"});
console.log (creado);

console.log("----Obtener por id----");
console.log(obtenerPorId(creado.id).nombre);
console.log(obtenerPorId("no-existe", {precio:1}));

console.log("----Actualizar----");
console.log(actualizar(creado.id, {precio:35}));
console.log(actualizar("no-existe"));

console.log("----Eliminar(logico)----")
console.log(eliminar(creado.id).dispobible);
console.log("disponibles ahora", listarDisponibles().length);

console.log("------calcular total-------");
const pedido ={
    folio:"PR-0341",
    items: [
        {nombre:"Molletes", precio:30, cantidad:2},
        {nombre:"Jugo", precio:18, cantidad:1}
    ]
};

console.log(calcularTotal(pedido));

console.log("-------existe nombre-------");
console.log(existeNombre("gelatina"), existeNombre("pizza"));

console.log("---------buscar por texto---------");
console.log(buscarPortexto("ju").map((p) => p.nombre));

