
//comentario en una linea
/*comentario de
dos lineas*/

//crear un array objetos:
//const catalogo = [producto1, producto2, producto3, producto4,producto5,producto6]
let guardarProductoBtn = document.getElementById("guardarProductoBtn")
let buscador = document.getElementById ("buscador")
let selectOrden = document.getElementById ("selectOrden")
function mostrarCatalogo(array){
    //vaciar Div
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
mostrarCatalogo (catalogo)
let productosEnCarrito = []

if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem ("carrito"))
}else {
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}



function agregarAlCarrito (productos) {
    console.log(`El producto ${productos.marca} ha sido agregado al carrito. Vale ${productos.precio}`)
    productosEnCarrito.push (productos)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

//function de ordenamiento:
function ordenarMenorMayor(array){
    //copiamos array original // concat
    const menorMayor = [].concat(array)
    //ordena de menor a mayor
    menorMayor.sort((a,b) => a.precio - b.precio)
    mostrarCatalogo(menorMayor)
}
function ordenarMayorMenor(arr){
    //ordenar de mayor a menor
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
        // a must be equal to b
        return 0;
    })
    mostrarCatalogo(ordenadoAlfabeticamente)
}

//function que busca -- includes encuentra palabras parciales
function buscarInfo(buscado, producto){
    let busquedaArray = producto.filter(
        (catalogo)=> catalogo.marca.toLowerCase().includes(buscado) || catalogo.producto.toLowerCase().includes(buscado)
    )
    if(busquedaArray.length == 0){
        coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`
        mostrarCatalogo(busquedaArray)}
    else {
        coincidencia.innerHTML = ""
        mostrarCatalogo(busquedaArray)
    }
    
}


function cargarProducto(catalogoNuevo){
        let inputMarca = document.getElementById("marcaInput")
        let inputTipo = document.getElementById("tipoInput")
        let inputPrecio = document.getElementById("precioInput")
        
        const productoNuevo = new Producto(catalogo.length+1, inputMarca.value, inputTipo.value, parseInt(inputPrecio.value), "productoNuevo.jpg")

        //sumarlo a catalogo:
        catalogo.push(productoNuevo)
        //sumarlo al storage
        localStorage.setItem("catalogo", JSON.stringify(catalogoNuevo))
        mostrarCatalogo(catalogoNuevo)
        //resetear el input
        inputMarca.value = ""
        inputPrecio.value = ""
        inputTipo.value = ""
}

//adjuntar eventos
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
















