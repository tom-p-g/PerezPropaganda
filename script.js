//VARIABLES 
let precioFinal = 0
let total = 0
// ARRAY
const productos = []
const carrito = []
const carritoRender = []
let carritoStorage = []
let preciosFinales = []

//CONSTRUCTOR OBJETOS

const id1 = new Producto(1, "Almanaque de Bolsillo", 75, "A", "Nivel 10" + "Posse");
productos.push(id1)
const id2 = new Producto(2, "Aplique de Heladera", 85, "A", "Nivel10" + "Posse")
productos.push(id2)
const id3 = new Producto(3, "Señaladores", 90, "A", "Nivel 10" + "Posse")
productos.push(id3)
const id4 = new Producto(4, "Boligrafo", 145, "B", "Jivi")
productos.push(id4)
const id5 = new Producto(5, "Tarjetas Personales", 42, "C", "Local")
productos.push(id5)
const id6 = new Producto(6, "Miñon", 14.5, "D", "Soler")
productos.push(id6)
const id7 = new Producto(7, "Cubo Portalapiz", 500, "B", "Jivi")
productos.push(id7)
const id8 = new Producto(8, "Mensual Agenda", 275, "D", "Soler")
productos.push(id8)
const id9 = new Producto(9, "Folletos", 85, "C", "")
productos.push(id9)

//ELEMENTOS POR ID (LUGARES DEL HTML)

const catAlmanaques = document.getElementById("catAlmanaques")
const catEmpresariales = document.getElementById("catEmpresariales")
const catImprenta = document.getElementById("catImprenta")
const catMaterial = document.getElementById("catMaterial")
const carritoDom = document.getElementById("carrito")
const carritoSecccion = document.getElementById("carritoSeccion")
const productosSeccion = document.getElementById("productosSeccion")
let totalDisplay = document.getElementById("total")


//----------------------------------------------------------- PROGRAMA -------------------------------------------------------------------

renderizarProductos(catAlmanaques, "A")
renderizarProductos(catEmpresariales, "B")
renderizarProductos(catImprenta, "C")
renderizarProductos(catMaterial, "D")


// .......................................................... CARRITO ....................................................................

const btnsCarrito = document.getElementsByClassName("btnCarrito")
const inputsCant = document.getElementsByClassName("inputCant")

//IMPORTACION LOCAL STORAGE

if (localStorage.getItem("carrito")) {
    carritoStorage = JSON.parse(localStorage.getItem("carrito"))
}
//RENDER DE PRODUCTOS DE LOCAL STORAGE

for (let item of carritoStorage) {
    let productoAgregado = item
    carritoRender.push(productoAgregado)
    renderizarCarrito()
    carrito.push(productoAgregado)
    totalProductosCarrito()
    eliminarCarrito() // esto esta aca porque al recargar la página ya no funcionaba el boton de eliminar para los productos
    //que se habian renderizado del storage, quizas hay un lugar mas optimo, pero aca funciona.
    contador()
}

//EVENTO AÑADIR CARRITO

for (const boton of btnsCarrito) {
    boton.onclick = (e) => {
        let productoAgregado = productos.find(producto => "btn" + producto.id == e.target.id)
        productoAgregado.cantidadCarrito = Number(prompt("Ingrese la cantidad")) //En un futuro cercano por INPUT
        productoAgregado.totalPagar = (productoAgregado.cantidadCarrito * productoAgregado.precioU) * 1.21 //nueva propiedad para productos en carrito
        carritoRender.push(productoAgregado)
        renderizarCarrito()
        carrito.push(productoAgregado)

        //LOCAL STORAGE        

        carritoStorage.push(productoAgregado)
        localStorage.setItem("carrito", JSON.stringify(carritoStorage))

        //ELIMINAR PRODUCTOS CARRITO 
        eliminarCarrito() // originalmente solo estaba aca
        
        //ACTUALIZAR PRECIO CARRITO
        totalProductosCarrito()
        //ACTUALIZAR CONTADOR BOTON CARRITO
        contador()
    }
}
// .......................................................................................................................................

// VER SECCION CARRITO O SECCION PRODUCTOS POR BOTON

const btnCarrito = document.getElementById("btnVerCarrito")

btnCarrito.onclick = () => {
    carritoSeccion.classList.toggle("hide")
    if (carritoSeccion.className != "hide") {
        productosSeccion.className = "hide"
    } else {
        productosSeccion.className = ""
    }
    volver()
}

//PAGAR
const btnPagar = document.getElementById("btnPagar")
btnPagar.onclick = () => {
    preciosTotales = document.getElementsByClassName("totalPagar")
    for (const item of preciosTotales) {
        precio = Number(item.innerText)    
        precioFinal = precio + precioFinal

    }
    alert("Importe Adeudado: $" + precioFinal + ". Gracias por su compra.")
    precioFinal = 0
}

//---------------------------------------------------------- FIN PROGRAMA ----------------------------------------------------------------

//FUNCIONES

function renderizarProductos(catProductos, categoria) { //(lugar del HTML, categoría de los objetos)
    let productosFiltrados = []
    productosFiltrados.length = 0
    productosFiltrados = productos.filter(producto => producto.categoria === categoria)

    for (let i = 0; i < productosFiltrados.length; i++) {

        const cartaProducto = document.createElement("div")
        cartaProducto.className = "cartaProducto"
        catProductos.append(cartaProducto)
        cartaProducto.innerHTML = `<div><img src="./img/prod/${String(productosFiltrados[i].id)}.jpg" alt="Foto de ${productosFiltrados[i].nombre}" class="imgProd"></div><ul class="listaProducto"><li class="idProd">${productosFiltrados[i].id}</li><li class="nomProd">${productosFiltrados[i].nombre}</li><li class="precioProd">Precio unitario: $ ${productosFiltrados[i].precioU}</li><li class="cantProd"><p>Ingrese cantidad que desea comprar</p><input name="cantidad" id="inputCant${String(productosFiltrados[i].id)}" class="inputCant"></li></ul><div class="botonesProd"><button type="button" class="btnCarta" id="btn${productosFiltrados[i].id}">Añadir al Carrito</button><button type="button" class="btnCarta">Mas Información</button></div>`
        //Disculpas por el orden de esta linea, por alguna razon cuando la puse indentada no funcionaba y la desplegue asi y funciono
        //fue la primera vez que lo hacia
    }
}
function Producto(id, nombre, precioU, categoria, provedor, cantidadCarrito, totalPagar) { //funcion constructora de objetos
    this.nombre = nombre
    this.id = id
    this.precioU = precioU
    this.categoria = categoria
    this.provedor = provedor
    this.cantidadCarrito = cantidadCarrito
    this.totalPagar = totalPagar
}
function renderizarCarrito() {  //Quizas polemico tener 2 arrays de carrito pero no conseguía que funcione correctamente renderizar
    //productos con un solo array (se me repetían). Este array es temporal y se vacia luego de cumplir su función.

    if (carritoRender.length > 0) {

        const productoCarrito = document.createElement('div')
        productoCarrito.id = "carritoRenderItem" + carritoRender[0].id
        productoCarrito.className = "productosCarrito"
        productoCarrito.innerHTML = ` 
      <img class="imgCarrito" src="/img/prod/${carritoRender[0].id}.jpg" alt="">
      <ul>
       <li>${carritoRender[0].nombre}</li>
       <li>Cantidad: ${carritoRender[0].cantidadCarrito}</li>
       <li>Subtotal: $ ${carritoRender[0].cantidadCarrito * carritoRender[0].precioU}</li>
       <li>IVA: $ ${(carritoRender[0].cantidadCarrito * carritoRender[0].precioU) * 0.21} </li>
       <li>Total: $ <p class="totalPagar">${carritoRender[0].totalPagar}</p></li>
      </ul>
      <button id="${carritoRender[0].id}" class="elimCarrito">X</button>
      `
        carritoDom.append(productoCarrito)
        carritoRender.length = 0 //RESET ARRAY
    }
}  
function eliminarCarrito() {
    let btnsElim = document.getElementsByClassName("elimCarrito") // Toma botones de eliminar
    for (const boton of btnsElim) {
        boton.onclick = (e) => {
            //ELIMINAR DOM
            let productoEliminar = document.getElementById("carritoRenderItem" + e.target.id) //Toma especificamente el render del producto en cual se toco el boton
            carritoDom.removeChild(productoEliminar) //elimina del DOM el render del producto

            //ELIMINAR DE CARRITO FORMAL

            let productoEliminarCarrito = carrito.find(producto => producto.id == e.target.id) //Busca el producto en el array Carrito(no el render) que coincida x ID con el ID del evento
            let numSplice = carrito.indexOf(productoEliminarCarrito) //busca el indice en donde se encuentra
            carrito.splice(numSplice, 1) //elimina producto de carrito

            //ELIMINAR LOCAL STORAGE --- La misma lógica que anterior pero sobrescribiendo el carrito del STORAGE

            let productoEliminarStorage = carritoStorage.find(producto => producto.id == e.target.id)
            let numSplice2 = carritoStorage.indexOf(productoEliminarStorage)
            carritoStorage.splice(numSplice2, 1)
            localStorage.setItem("carrito", JSON.stringify(carritoStorage))
            //ACTUALIZAR PRECIO TOTAL
            totalProductosCarrito()
            //ACTUALIZAR CONTADOR BOTON CARRITO
            contador()
        }
    }
    
}
function totalProductosCarrito () {
    preciosTotales = document.getElementsByClassName("totalPagar")
    for (const item of preciosTotales) {
        precio = Number(item.innerText)    
        precioFinal = precio + precioFinal

    }
    totalDisplay.innerText = precioFinal
    precioFinal = 0
}

function contador() {
    let contador = document.getElementById("contador")
if (carrito.length > 0 ) {
    let numero = carrito.length

    contador.innerHTML = `<p id="pContador">${numero}</p>` 
} else {
    contador.innerHTML = `<p id="pContador">0</p>`
}
}
function volver() {
    if (carritoSeccion.className != "hide") {
        let contador = document.getElementById("contador")
        contador.className = "hide"
        let simbolo = document.getElementById("simbolo")
        simbolo.className =""
        simbolo.innerHTML =  `<p class="volver" style="font-family = Arial">VOLVER</p> `

    } else {
        simbolo.innerHTML = ""
        simbolo.className = "fa fa-shopping-cart"
    }
}
