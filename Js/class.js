class Producto {
    constructor (id, marca, tipo, precio,imagen){
        this.id = id,
        this.marca = marca,
        this.producto = tipo,
        this.precio = precio,
        this.imagen = imagen 
    };
}
const producto1 = new Producto(1,"producto1", "Accesorio", 900, "Accesorio1.webp")

const producto2 = new Producto(2,"producto2", "Accesorio", 4500, "Accesorio2.webp")

const producto3 = new Producto(3,"producto3",  "Accesorio", 2800, "Accesorio3.webp")

const producto4 = new Producto(4,"alimento1", "comida", 1400, "alimento1.webp")

const producto5 = new Producto(5,"alimento2", "comida",  2200, "alimento2.webp")

const producto6 = new Producto(6,"alimento3", "comida", 2000, "alimento3.webp")

let catalogo = []

if (localStorage.getItem("catalogo")){
    catalogo = JSON.parse (localStorage.getItem ("catalogo"))
} else {
    console.log("Entra por primera vez, seteamos array")
    catalogo.push(producto1, producto2, producto3, producto4,producto5,producto6)
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}


let productosDiv = document.getElementById ("productos")