
let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")

botonDarkMode.addEventListener ("click", ()=>{
    console.log ("btn oscuro funciona")
    document.body.classList.add ("darkMode")
    localStorage.setItem ("modoOscuro", true)
})
botonLightMode.addEventListener ("click", ()=>{
    console.log ("btn claro funciona")
    document.body.classList.remove ("darkMode")
    localStorage.setItem ("modoOscuro", false)
})


let modoOscuro = JSON.parse(localStorage.getItem ("modoOscuro"))
if (modoOscuro == true) {
    document.body.classList.add ("darkMode")
}