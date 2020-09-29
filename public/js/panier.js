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
        if (val._id === teddies._id) {
            teddies.colors.map(colors => {
                if (val.color === colors) {
                    const div = creatElem("div", null, [{attribut: "class", content: "divTeddies bg-base"}]);
                    const p = creatElem("p", teddies.name + "</br> Couleur choisi : " + val.color)
                    const img = creatElem("img", null, [{attribut: "src", content: teddies.imageUrl}, {attribut: "alt", content: "Photo Ourson"}, {attribut: "class", content: "imgTeddy"}])
                    const pQty = creatElem("p", "quantité : " + val.qty)
                    const pPrice = creatElem("p", "prix : " + price(teddies.price, val.qty), [{attribut: "class", content: "price"}])
                    const remove = creatElem("button", "supprimer", [{attribut: "class", content: "delete bg_base"}])
                    remove.addEventListener("click" ,() => {
                        console.log(val.color)
                        deleteElementBasket(val._id, val.color)

                    })
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
const simpleRegExp = /^[a-zA-ZÀàéèîïÉÈÎÏ _-]+$/;
const adressRegExp = /^[a-zA-Z0-9ÀàéèîïÉÈÎÏ _-]+$/;

inputSubmit.addEventListener("click", (event) => {

    document.getElementById("invalidFName").textContent = !simpleRegExp.test(inputFname.value) ? "Veuillez entrer un prénom valide" : "";
    document.getElementById("invalidLName").textContent = !simpleRegExp.test(inputLname.value) ? "Veuillez entrer un nom valide" : "";
    document.getElementById("invalidEmail").textContent = !emailRegExp.test(inputEmail.value) ? "Veuillez entrer un Email valide" : "";
    document.getElementById("invalidCity").textContent = !simpleRegExp.test(inputCity.value) ? "Veuillez entrer un nom de ville valide" : "";
    document.getElementById("invalidAdress").textContent = !adressRegExp.test(inputAdress.value) ? "Veuillez entrer une adresse valide" : "";

    if (simpleRegExp.test(inputFname.value) && simpleRegExp.test(inputLname.value) && emailRegExp.test(inputEmail.value) && simpleRegExp.test(inputCity.value) && adressRegExp.test(inputAdress.value)){
        event.preventDefault()
        const products = storage.map(s => s._id)
        const order = {
            contact : {
                firstName : inputFname.value,
                lastName : inputLname.value,
                address : inputAdress.value,
                city : inputCity.value,
                email : inputEmail.value
            },
            products
        }

        sendTeddy(order)
    }

})

getTeddies()
