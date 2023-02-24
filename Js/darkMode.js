//Dark Mode
let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")

botonDarkMode.addEventListener ("click", ()=>{
    console.log ("btn oscuro funciona")
    document.body.classList.add ("darkMode")
    //para guardarlo
    localStorage.setItem ("modoOscuro", true)
})
botonLightMode.addEventListener ("click", ()=>{
    console.log ("btn claro funciona")
    document.body.classList.remove ("darkMode")
    localStorage.setItem ("modoOscuro", false)
})

//para capturarlo
let modoOscuro = JSON.parse(localStorage.getItem ("modoOscuro"))
//condicional para que se active el modo oscuro si esta guardado
if (modoOscuro == true) {
    document.body.classList.add ("darkMode")
}