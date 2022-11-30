//VARIABLES 

let precioFinal = 0
let total = 0

// ARRAY

const productos = []
const carrito = []
const carritoRender = []
let carritoStorage = []
let preciosFinales = []

//FETCH

fetch("./productos.json")
 .then(r => r.json())
 .then(data => programa(data)) 



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

function programa(data) { 
    
    // Toma la data del fetch , construye objetos y push al array de productos
   
    data.forEach(element => {
        construirObjetos(element)
    })
  
    // RENDER PRODUCTOS

    renderizarProductos(catAlmanaques, "A")
    renderizarProductos(catEmpresariales, "B")
    renderizarProductos(catImprenta, "C")
    renderizarProductos(catMaterial, "D")
    contador()


    // .......................................................... CARRITO ....................................................................

    const btnsCarrito = document.getElementsByClassName("btnCarrito")

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
            let idInput = "inputCant" + productoAgregado.id
            const inputCant = document.getElementById(idInput)
            productoAgregado.cantidadCarrito = inputCant.value
            productoAgregado.totalPagar = (productoAgregado.cantidadCarrito * productoAgregado.precioU) * 1.21
            inputCant.value = ""
            if (productoAgregado.cantidadCarrito >= 50 && productoAgregado.cantidadCarrito != "") {
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
                //TOAST
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    title: 'Producto Agregado al Carrito'
                })
            } else {
                // alert("Error: Ingrese una cantidad")
                Swal.fire({
                    title: "Error - Cantidad Incorrecta",
                    icon: "error",
                    text: "Ingrese una cantidad mínima de 50 unidades",
                    confirmButtonText: "Entendido"
                })
            }
        }

    }
    // .......................................................................................................................................

    // TOGGLE SECCION PRODUCTOS / CARRITO POR BOTON

    const btnCarrito = document.getElementById("btnVerCarrito")

    btnCarrito.onclick = () => {
        carritoSeccion.classList.toggle("hide")
        carritoSeccion.className != "hide" ? productosSeccion.className = "hide" : productosSeccion.className = ""
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
        let precioDisplay = precioFinal
        if (precioFinal > 0){
        Swal.fire({
            html: `
            <section class="pagar">
                <form action="get">
                    <div class="pagarFormItem">
                        <p id="importeFinal"><h3>Importe Final: $${precioFinal}<h3></p>
                    </div>
                    <div class="pagarFormItem">
                        <h4>Ingrese su correo eléctronico</h4>
                        <input type="email" placeholder="Ingrese su e-mail">
                    </div>
                    <div class="pagarFormItem">
                        <h4>Ingrese su metodo de Pago</h4>
                        <div class="checkBox">
                        <input type="radio" id="visa" name="pago">Visa
                        <input type="radio" id="master" name="pago">Master Card
                        <input type="radio" id="mercadoPago" name="pago">Mercado Pago
                        </div>
                    </div>
                    <div class="pagarFormItem">
                        <h4>Ingrese su tipo de factura</h4>
                        <div class="checkBox">
                        <input type="radio" id="facA" name="factura">Factura A
                        <input type="radio" id="facB"  name="factura">Factura B
                        <input type="radio" id="facConFin"  name="factura">Consumidor Final
                        </div>
                    </div>
                    <div class="pagarFormItem">
                        <h4>Ingrese su CUIT/CUIL</h4>
                        <input type="text" placeholder="CUIT/CUIL - Ej: 20-12345678-9">
                    </div>
                </form>
                <div id="finalPrograma">PAGAR</div>
                </section>
                `,
            showConfirmButton:false,
            showCancelButton:true,
            cancelButtonText: "Cancelar",
            
        })
        const finalPrograma = document.getElementById("finalPrograma")
        finalPrograma.onclick = () => {
            Swal.fire({
                html: `<h3>Usted ha abonado $${precioDisplay}</h3>
                        <p>¡Gracias por su compra!</p>
                        <p>Recibira la factura en su correo eléctronico</p>`,
                
            })
            carrito.length = 0
            carritoStorage.length = 0
            localStorage.setItem("carrito", JSON.stringify(carritoStorage))
            renderizarCarrito()
            contador()
            carritoDom.innerHTML = ""
            totalProductosCarrito()
        }
        precioFinal = 0
    } else {
        Swal.fire ({
            icon: "error",
            text:"No hay items en el carrito",
            confirmButtonText:"Entendido"
        })
    }
    }
//---------------------------------------------------------- FIN PROGRAMA ----------------------------------------------------------------
}



//FUNCIONES ---------------------------------------------------------------------------------------------------------------------------------------

//CONSTURCTORAS DE OBJETOS - con el fetch se trae un array que contiene arrays con la informacion que necesita la funcion constructora "Producto"

function Producto(id, nombre, precioU, categoria, provedor, cantidadCarrito, totalPagar) { //funcion constructora de objetos
    this.nombre = nombre
    this.id = id
    this.precioU = precioU
    this.categoria = categoria
    this.provedor = provedor
    this.cantidadCarrito = cantidadCarrito
    this.totalPagar = totalPagar
}
function construirObjetos(producto) { //esta funcion se usa en el fetch para que la info de cada array del JSON cree un nuevo objeto producto que va al array de productos
    let aux = new Producto(...producto)
    productos.push(aux)
}

//RENDER PRODUCTOS SEPARADO POR CATEGORIA

function renderizarProductos(catProductos, categoria) { //(lugar del HTML, categoría de los objetos)
    let productosFiltrados = []
    productosFiltrados.length = 0
    productosFiltrados = productos.filter(producto => producto.categoria === categoria)
    for (let i = 0; i < productosFiltrados.length; i++) {
        const cartaProducto = document.createElement("div")
        cartaProducto.className = "cartaProducto"
        catProductos.append(cartaProducto)
        cartaProducto.innerHTML = `
        <div>
            <img src="./img/prod/${String(productosFiltrados[i].id)}.jpg" alt="Foto de ${productosFiltrados[i].nombre}" class="imgProd">
        </div>
        <ul class="listaProducto">
            <li class="nomProd">${productosFiltrados[i].nombre}</li>
            <li class="precioProd">Precio unitario: $ ${productosFiltrados[i].precioU}</li>
            <li class="cantProd btnCarta">
                <p>Ingrese cantidad que desea comprar</p>
                <input name="cantidad" id="inputCant${String(productosFiltrados[i].id)}" class="inputCant">
            </li>
        </ul>
        <div class="botonesProd">
            <button type="button" class="btnCarrito btnCarta" id="btn${productosFiltrados[i].id}">Añadir al Carrito</button>
        </div>
    `
    }
}

//RENDER CARRITO
function renderizarCarrito() {  
    if (carritoRender.length > 0) {
        const productoCarrito = document.createElement('div')
        productoCarrito.id = "carritoRenderItem" + carritoRender[0].id
        productoCarrito.className = "productosCarrito"
        productoCarrito.innerHTML = ` 
        <img class="imgCarrito" src="./img/prod/${carritoRender[0].id}.jpg" alt="">
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

            //ELIMINAR DEL ARRAY CARRITO

            let productoEliminarCarrito = carrito.find(producto => producto.id == e.target.id) //Busca el producto en el array Carrito(no el render) que coincida x ID con el ID del evento
            let numSplice = carrito.indexOf(productoEliminarCarrito) //busca el indice en donde se encuentra
            carrito.splice(numSplice, 1) //elimina producto de carrito

            //ELIMINAR LOCAL STORAGE --- La misma lógica que anterior pero sobrescribiendo el ARRAY del STORAGE

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
//CALCULO PRECIO FINAL
function totalProductosCarrito() {
    preciosTotales = document.getElementsByClassName("totalPagar")
    for (const item of preciosTotales) {
        precio = Number(item.innerText)
        precioFinal = precio + precioFinal

    }
    totalDisplay.innerText = precioFinal
    precioFinal = 0
}
//MISCELANEO
function contador() {
    let contador = document.getElementById("contador")
    if (carrito.length > 0) {
        let numero = carrito.length
        contador.innerHTML = `<p id="pContador">${numero}</p>`
    }
    else {
        contador.innerHTML = `<p id="pContador">0</p>`
    }
}
function volver() {
    if (carritoSeccion.className != "hide") {
        let contador = document.getElementById("contador")
        contador.className = "hide"
        let simbolo = document.getElementById("simbolo")
        simbolo.className = ""
        simbolo.innerHTML = `<p class="volver" style="font-family = Arial">VOLVER</p> `

    } else {
        simbolo.innerHTML = ""
        simbolo.className = "fa fa-shopping-cart"
    }
}
