function agregarProducto () {
    let nombreDelProducto = prompt ("ingrese nombre del producto")
    let precioProducto = parseInt(prompt ("ingrese el precio "))
    const nuevoProducto = new Producto (carrito.length + 1, nombreDelProducto, precioProducto)
    carrito.push (nuevoProducto)
    console.log (carrito)
}

function calcularTotal () {
    const total = carrito.reduce ((acumulador, elemento) => acumulador + elemento.precio, 0)
    console.log (total)
    if (total >= 5000) {
        totalDesc (total, descuento)
        alert (`el precio final es de $${precioDescuento} y tiene envio gratis`)
    }
    else if (total >= 2000) {
            alert (`el precio final es de $${total} y tiene envio gratis`)
        }
    else {
        alert (`el precio final es de $${total} y puede acceder a un envio gratis gastando $${2000-total} más`)
    }
}

function filtroPrecio () {
    let precio = parseInt (prompt("Ingrese precio maximo que desea buscar por producto"))
    let busquedaPrecio = carrito.filter ((maximovalor)=>maximovalor.precio <= precio)
    console.log (busquedaPrecio)
}

function mostrarCarrito () {
    carrito.forEach ( (producto)=>{
        console.log (producto.marca, producto.precio)   
        alert (`${producto.marca} $${producto.precio}`)
    })
    /*for (let producto of carrito){ 
        console.log (producto.marca, producto.precio) ---- reemplazamos el for of por el for each
    }*/
} 
function buscarCarrito () {
    let productoBuscado = prompt ("ingrese nombre de producto del carrito para obtener informacion")
    let productoEncontrado = carrito.find ((producto)=>producto.marca.toLowerCase == productoBuscado.toLowerCase)
    console.log (productoEncontrado)
    //alert (`${producto.marca} $${productoEncontrado.precio}`) averiguar como mostrarlo//
}


function menu () {
    let salirMenu = false
    do {
        salirMenu = preguntarOpcion (salirMenu)
    }while (!salirMenu)
}
function preguntarOpcion (salir) {
    let opcionIngresada = parseInt(prompt (`ingrese la opcion deseada
     1- Agregar Producto  
     2- Ver Carrito 
     3- Detalle Del producto
     4- Filtrar por precios
     5- Calcular el total
     0- Salir del menu`))
     switch(opcionIngresada){
        case 1:
            agregarProducto()
        break
        case 2:
            mostrarCarrito ()
        break
        case 3:
            buscarCarrito (carrito)
        break
        case 4:
            filtroPrecio (carrito)
        break
        case 5: 
            calcularTotal (carrito)   
        break    
        case 0:
            console.log("gracias por utilizar nuestra app")
            salir = true
            return salir
        break
        default:
            console.log("Ingrese una opción correcta")
        break
    }
}

const descuento = 0.05
function totalDesc (num1, num2)
{
    precioDescuento = (num1 - (num1*num2))
}





menu ()


//borrar esta pagina
