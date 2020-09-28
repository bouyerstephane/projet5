const storage = JSON.parse(localStorage.getItem("basket"))
const panier = document.getElementById("basket");

if (storage === null) {
    const div = creatElem("div", null, [{attribut: "class", content: "divTeddies bg-base"}]);
    const p = creatElem("p", "Le panier est vide");
    div.appendChild(p);
    panier.appendChild(div);
}

const addTeddies = (teddies) => {
if (storage){
    storage.map(val => {
        if (val.id === teddies._id) {
            teddies.colors.map(colors => {
                if (val.color === colors) {
                    const div = creatElem("div", null, [{attribut: "class", content: "divTeddies bg-base"}]);
                    const p = creatElem("p", teddies.name + "</br> Couleur choisi : " + val.color)
                    const img = creatElem("img", null, [{attribut: "src", content: teddies.imageUrl}, {attribut: "alt", content: "Photo Ourson"}, {attribut: "class", content: "imgTeddy"}])
                    const pQty = creatElem("p", "quantité : " + val.qty)
                    const pPrice = creatElem("p", "prix : " + price(teddies.price, val.qty), [{attribut: "class", content: "price"}])
                    const remove = creatElem("button", "supprimer", [{attribut: "class", content: "delete bg_base"}])

                    div.appendChild(p);
                    div.appendChild(img);
                    div.appendChild(pQty);
                    div.appendChild(pPrice);
                    div.appendChild(remove);
                    panier.appendChild(div);
                }
            })
        }
    })
}
}

const storagePrice = JSON.parse(localStorage.getItem("totalPrice"))
if (storagePrice){
    const panierPrice = document.getElementById("basketPrice");
    const div = creatElem("div", null, [{attribut: "class", content: "divTeddies bg-base"}]);
    const p = creatElem("p","Prix total : " + price(storagePrice[0].price))
    div.appendChild(p);
    panierPrice.appendChild(div);
    //console.log(storagePrice)
}

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
})

const inputFname = document.getElementById("firstName");
const inputLname = document.getElementById("lastName");
const inputEmail = document.getElementById("email");
const inputAdress = document.getElementById("adress");
const inputCity = document.getElementById("city");
const inputSubmit = document.getElementById("submit");
const emailRegExp = /^([a-z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/;
const simpleRegExp = /^[a-zA-ZÀàéèîïÉÈÎÏ _-]+$/
const adressRegExp = /^[a-zA-Z0-9ÀàéèîïÉÈÎÏ _-]+$/

inputSubmit.addEventListener("click", (event) => {
    if (simpleRegExp.test(inputFname.value) === false) {
        event.preventDefault()
        document.getElementById("invalidFName").textContent = "Veuillez entrer un prénom valide"
    }else{
        document.getElementById("invalidFName").textContent = ""
    }
    if (simpleRegExp.test(inputLname.value) === false) {
        event.preventDefault()
        document.getElementById("invalidLName").textContent = "Veuillez entrer un nom valide"
    }else{
        document.getElementById("invalidLName").textContent = ""
    }
    if (emailRegExp.test(inputEmail.value) === false){
        event.preventDefault()
        document.getElementById("invalidEmail").textContent = "Veuillez entrer un Email valide"
    }else{
        document.getElementById("invalidEmail").textContent = ""
    }
    if (simpleRegExp.test(inputCity.value) === false){
        event.preventDefault()
        document.getElementById("invalidCity").textContent = "Veuillez entrer un nom de ville valide"
    }else{
        document.getElementById("invalidCity").textContent = ""
    }
    if (adressRegExp.test(inputAdress.value) === false){
        event.preventDefault()
        document.getElementById("invalidAdress").textContent = "Veuillez entrer une adresse valide"
    }else{
        document.getElementById("invalidAdress").textContent = ""
    }

    if (simpleRegExp.test(inputFname.value) && simpleRegExp.test(inputLname.value) && emailRegExp.test(inputEmail.value) && simpleRegExp.test(inputCity.value) && adressRegExp.test(inputAdress.value)){
        event.preventDefault()
        const order = {
            "firstName" : inputFname.value,
            "lastName" : inputLname.value,
            "address" : inputAdress.value,
            "city" : inputCity.value,
            "email" : inputEmail.value,
            "products" : storage
        }
        console.log(order)
    }


})






getTeddies()
