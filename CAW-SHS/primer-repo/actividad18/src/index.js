// elindex solo arranca y prueba no tiene logica de inicio

import * as ctrl from "./src/controllers/producto.controllers.js"
import {calcularTotal, formatearPrecio} from "./src/utils/calculo.js"

console.log("-----listar-------");
console.log(ctrl.listarProductos());

console.log("-------crear------");  
const creado = ctrl.crearProducto({nombre:"Sincronizada",precio:32,categoria:"comida"});
console.log(creado);


