let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let guardarProductoBtn = document.getElementById("guardarProductoBtn")
let buscador = document.getElementById ("buscador")
let selectOrden = document.getElementById ("selectOrden")
let precioTotal = document.getElementById ("precioTotal")
let loaderTexto = document.getElementById("loaderTexto")
let loader = document.getElementById("loader")
let botonFinalizarCompra = document.getElementById ("botonFinalizarCompra")

function mostrarCatalogo(array){


    productosDiv.innerHTML = ""
    for(let productos of array){
        let nuevoProductoDiv = document.createElement("div")
        nuevoProductoDiv.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3")
        nuevoProductoDiv.innerHTML = `
        <div id="${productos.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="img/${productos.imagen}" alt="${productos.marca}">
            <div class="card-body">
                <h4 class="card-title">${productos.marca}</h4>
                <p>tipo: ${productos.producto}</p>
                <p class="">Precio: ${productos.precio}</p>
            <button id="agregarBtn${productos.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div>`
        productosDiv.appendChild(nuevoProductoDiv)

        
        let agregarBtn = document.getElementById(`agregarBtn${productos.id}`)
        agregarBtn.addEventListener("click", ()=>{
            agregarAlCarrito (productos)
        })
    }



} 

setTimeout(()=>{
    loaderTexto.remove()
    loader.remove()
    mostrarCatalogo(catalogo)
}, 400)

let productosEnCarrito = []

if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem ("carrito"))
}else {
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}



function agregarAlCarrito (productos) {

    let productoAgregado = productosEnCarrito.find((elem)=>elem.id == productos.id)
    if(productoAgregado == undefined)
    {
    console.log(`El producto ${productos.marca} ha sido agregado al carrito. Vale ${productos.precio}`)
    productosEnCarrito.push (productos)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    Swal.fire({
        title: 'Ha agregado un producto al carrito',
        icon: "success",
        confirmButtonColor: "green",
        confirmButtonText: "Continuar",
        imageUrl: `img/${productos.imagen}`,
        imageHeight: 300,
        timer: 3000
    })}
    else {
        Swal.fire({
            title: 'El producto ya esta en el carrito',
            imageUrl: `img/${productos.imagen}`,
            imageHeight: 100,
            icon: "info",
            showConfirmButton: false,
            timer: 1500,
            
        })
    }
}

function calcularTotal (array) {
    let  totalCompra = array.reduce ((acc, productosEnCarrito)=>acc + productosEnCarrito.precio, 0)
    if (totalCompra >= 5000) {
        totalCompra = totalCompra - (totalCompra * 0.05)
        precioTotal.innerHTML = ` Su compra tiene descuento, el total es de ${totalCompra} y tiene envio gratis`
    }
    else if (totalCompra >= 2000) {
        precioTotal.innerHTML = `el precio final es de $${totalCompra} y tiene envio gratis, gastando $${5000-totalCompra} 
        mas puede acceder a un descuento`
    }
    else if (totalCompra == 0) {
        precioTotal.innerHTML = `No hay productos en el carrito`
    }
    else {
        precioTotal.innerHTML = `Total de la compra es de $${totalCompra} solo te falta gastar $${2000-totalCompra} para obtener envio gratis`
    }

}

function ordenarMenorMayor(array){
    const menorMayor = [].concat(array)
    menorMayor.sort((a,b) => a.precio - b.precio)
    mostrarCatalogo(menorMayor)
}

function ordenarMayorMenor(arr){
    const mayorMenor = [].concat(arr)
    mayorMenor.sort((param1, param2)=>{
        return param2.precio - param1.precio
    })
    mostrarCatalogo(mayorMenor)
}

function ordenarAlfabeticamente(array){
    const ordenadoAlfabeticamente = [].concat(array)
    ordenadoAlfabeticamente.sort((a,b) => {
        if(a.marca > b.marca) {
            return 1
        }
        if (a.marca < b.marca) {
            return -1
        }
        return 0;
    })
    mostrarCatalogo(ordenadoAlfabeticamente)
}


function buscarInfo(buscado, producto){
    let busquedaArray = producto.filter(
        (catalogo)=> catalogo.marca.toLowerCase().includes(buscado) || catalogo.producto.toLowerCase().includes(buscado)
    )
    busquedaArray.length == 0 ?
    (coincidencia.innerHTML = `<h3>No hay coincidencias con su b??squeda</h3>`, mostrarCatalogo(busquedaArray)) 
    :
    (coincidencia.innerHTML = "", mostrarCatalogo(busquedaArray))

    
}


function cargarProducto(catalogoNuevo){
        let inputMarca = document.getElementById("marcaInput")
        let inputTipo = document.getElementById("tipoInput")
        let inputPrecio = document.getElementById("precioInput")
        
        const productoNuevo = new Producto(catalogo.length+1, inputMarca.value, inputTipo.value, parseInt(inputPrecio.value), "productoNuevo.jpg")

        catalogo.push(productoNuevo)

        localStorage.setItem("catalogo", JSON.stringify(catalogoNuevo))
        mostrarCatalogo(catalogoNuevo)

        inputMarca.value = ""
        inputPrecio.value = ""
        inputTipo.value = ""
}

function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML  = ""
    array.forEach((productos)=>{
        modalBodyCarrito.innerHTML +=
        `
        <div id="productoCarrito${productos.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="img/${productos.imagen}" alt="${productos.marca}">
            <div class="card-body">
                <h4 class="card-title">${productos.marca}</h4>
                <p>tipo: ${productos.producto}</p>
                <p class="">Precio: ${productos.precio}</p>
            
            <button class= "btn btn-danger" id="botonEliminar${productos.id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>`

    })

    array.forEach((productoEnCarrito) =>

    document.getElementById(`botonEliminar${productoEnCarrito.id}`).addEventListener("click",()=>{
        console.log(`El producto eliminado es ${productoEnCarrito.marca}`)
        let cardProducto = document.getElementById(`productoCarrito${productoEnCarrito.id}`)
        cardProducto.remove()
        let productoEliminar = array.find((producto)=> producto.id ==productoEnCarrito.id)
        console.log(productoEliminar)
        let posicion = array.indexOf(productoEliminar)
        console.log(posicion)
        array.splice(posicion,1)
        console.log(array)
        localStorage.setItem("carrito", JSON.stringify(array))
        calcularTotal(array)
    })
    )

    calcularTotal (array)
}
//agregar if
function finalizarCompra (){
        Swal.fire({
            title: 'Est?? seguro de realizar la compra?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'S??, seguro',
            cancelButtonText: 'No, no quiero',
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
        }).then((result)=>{
            if(result.isConfirmed){
                Swal.fire({
                    title: 'Compra realizada',
                    icon: 'success',
                    confirmButtonColor: 'green',
                    text: `Muchas gracias por su compra `,
                    })
                    productosEnCarrito = []
                    localStorage.removeItem("carrito")
            }else{
                Swal.fire({
                    title: 'Compra no realizada',
                    icon: 'info',
                    text: `La compra no ha sido realizada! Atenci??n sus productos siguen en el carrito`,
                    confirmButtonColor: 'green',
                    timer:3500
                })
            }
        }
    
        )
    
}


guardarProductoBtn.addEventListener("click", ()=>{
    cargarProducto(catalogo)}
    )

buscador.addEventListener ("input", ()=>{
    console.log (buscador.value)
    buscarInfo (buscador.value, catalogo)
})


selectOrden.addEventListener ("change", () => {
    console.log (selectOrden.value)
    if(selectOrden.value == 1){
        ordenarMayorMenor(catalogo)
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(catalogo)
    }else if(selectOrden.value == 3){
        ordenarAlfabeticamente(catalogo)
    }else{
        mostrarCatalogo(catalogo)
    }
})

botonCarrito.addEventListener("click", () =>{
    cargarProductosCarrito(productosEnCarrito)
})

botonFinalizarCompra.addEventListener("click", ()=>{
    finalizarCompra(productosEnCarrito)})

Toastify({
    text: "seguinos en instagram",
    duration: 3000,
    destination: "https://www.instagram.com/minerva.chlo.e/",
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} 
}).showToast();
















