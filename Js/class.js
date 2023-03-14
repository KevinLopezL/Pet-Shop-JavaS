class Producto {
    constructor (id, marca, tipo, precio,imagen){
        this.id = id,
        this.marca = marca,
        this.producto = tipo,
        this.precio = precio,
        this.imagen = imagen 
    };
}

let catalogo = []

const cargarProductos = async () => {
    const response = await fetch("../productos.json")
    const data = await response.json()
    console.log (data)

    for (let producto of data){
        let productoNuevo = new Producto (producto.id, producto.marca, producto.tipo, producto.precio, producto.imagen)
        catalogo.push (productoNuevo)
    }
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}


if (localStorage.getItem("catalogo")){
    for (let producto of JSON.parse (localStorage.getItem ("catalogo"))){
        let productoNuevo = new Producto (producto.id, producto.marca, producto.tipo, producto.precio, producto.imagen)
        catalogo.push (productoNuevo)
    }
} else {
    cargarProductos ()
}




let productosDiv = document.getElementById ("productos")