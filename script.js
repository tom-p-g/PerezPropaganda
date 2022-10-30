// VARIABLES ARRAYS & OBJETOS
let vendedor = ""

const almanaques = [{
    id:"1",
    nombre: "Almanaque de Bolsillo",
    provedor: "A",
    precioUnitario: 75,
    cantidad:"",
    vendedor: vendedor,
    comisionVendedor: 30,
    categoria: "almanaque",
    colorImpresion: "",
},{
    id:"2",
    nombre: "Aplique de Heladera",
    provedor: "A",
    precioUnitario: 135,
    vendedor: vendedor,
    comisionVendedor: 30,
    categoria: "almanaque",
    colorImpresion: "",
},{ 
    id:"3",
    nombre: "Señalador",
    provedor: "A",
    precioUnitario: 79,
    vendedor: vendedor,
    comisionVendedor: 30,
    categoria: "almanaque",
    colorImpresion: "",}
]
const articulosEmpresariales = [{
    id:"2141",
    nombre: "Bolígrafo Medio Cuerpo Gris",
    provedor: "C",
    precioUnitario: 145,
    cantidad:"",
    vendedor: vendedor,
    comisionVendedor: 30,
    categoria: "empresariales",
    colorImpresion: "",
},{
    id:"2145",
    nombre: "Bolígrafo Retractil Traslucido",
    provedor: "C",
    precioUnitario: 213,
    cantidad:"",
    vendedor: vendedor,
    comisionVendedor: 30,
    categoria: "empresariales",
    colorImpresion: "",
}
]
const trabajosDeImprenta = [{
    id:"10",
    nombre: "Tarjeta Simple",
    provedor: "X",
    precioUnitario: 10,
    cantidad:"",
    vendedor: vendedor,
    comisionVendedor: 30,
    categoria: "imprenta",
    colorImpresion: "",

},{
    id:"11",
    nombre: "Iman de Heladera con publicidad",
    provedor: "X",
    precioUnitario: 90,
    cantidad:"",
    vendedor: vendedor,
    comisionVendedor: 30,
    categoria: "imprenta",
    colorImpresion: "",
}
]
const productos1 = []
const productos2 = []
const carrito = []
salir = 1

//PROGRAMA -----------------------------------------------------------------------------------------------------------------------------------
alert("El programa le pedirá que elija entre categorías de producto. Luego le mostrará productos en esa categoría. Elija producto y cantidad y el precio se almacenará en el carrito (Se aplica descuento por cantidad). Repita operacion para sumar mas productos.")
do {
let eleccion1 = Number(prompt("Elija que categoría de producto quiere buscar: 1 - Almanaques 2 - Artículos Empresariales 3 - Artículos de Imprenta 0 - Ir a Carrito"))
if (eleccion1 === 1) {
    eleccionUno(almanaques)
    ordenar()
    productoCategoria(almanaques)
    vaciarArray(productos1)
    vaciarArray(productos2)
}
if (eleccion1 === 2) {
    eleccionUno(articulosEmpresariales)
    ordenar()
    productoCategoria(articulosEmpresariales)
    vaciarArray(productos1)
    vaciarArray(productos2)
}
if (eleccion1 === 3) {
    eleccionUno(trabajosDeImprenta)
    ordenar()
    productoCategoria(trabajosDeImprenta)
    vaciarArray(productos1)
    vaciarArray(productos2)
}
if (eleccion1 === 0) {
    salir = 0
}
} while (salir != 0);
let precioFinal = 0
for (let index = 0; index < carrito.length; index++) {
    precioSumar = carrito[index]
    precioFinal = precioSumar + precioFinal
}
alert("El total a abonar es $ " + precioFinal)
alert("FIN DE PROGRAMA")

// FUNCIONES -----------------------------------------------------------------------------------------------------------------------------

function eleccionUno(categoria) {
    categoria.forEach(articulo => { 
        articuloMostrar = articulo.nombre
        productos1.push(articuloMostrar)

        
    })
}
function ordenar() {
    for (let index = 0; index < productos1.length; index++) {
        artOrdenar = 1 + index + " - " + productos1[index] + " " ;
        productos2.push(artOrdenar)

        
    }
}
function productoCategoria (categoria) {
    eleccion2 = prompt("Elija el producto que desea comprar: " + productos2)
    precio = categoria[eleccion2 - 1].precioUnitario

    cantidad = prompt("Elija la cantidad que desea comprar del producto (mínimo 100)")
    alert("El precio es $ " + factorCantidad(precio, cantidad) + " - Añadido al Carrito" )
}
function factorCantidad(precio, cantidad) {
    if (cantidad<100) {
        alert("Error, cantidad mínima 100")
        precio = 0
        precioDevuelto = precio
    } 
    if (cantidad>=100 && cantidad<200) {
        precioDevuelto = precio
 

    }
    if (cantidad>=200 && cantidad<300) {
        precioDevuelto = precio*0.75

    }
    if (cantidad>=300 && cantidad<400) {
        precioDevuelto = precio*0.65

    }
    if (cantidad>=400 && cantidad<500) {
        precioDevuelto = precio*0.6

    }
    if (cantidad>=500 && cantidad<1000) {
        precioDevuelto = precio*0.55

    }
    if (cantidad>=1000) {
        precioDevuelto = precio*0.50

    }
    precioDevuelto = precioDevuelto * cantidad;
    carrito.push(precioDevuelto)
    return precioDevuelto
}
function vaciarArray(array) {
    do {
        array.pop()
    } while (array.length != 0);
} 