//récupération du localStorage
const getBasket = JSON.parse(localStorage.getItem("basket"));
//récupération de l'article ou seront affichés les oursons
const divBasket = document.getElementById("basket");
//si le storage est vide préviens l'utilisateur
if (getBasket === null || getBasket.length === 0) {
    const div = creatElem("div", null, [{attribut: "class", content: "divTeddies bg-base"}]);
    const p = creatElem("p", "Le panier est vide");
    div.appendChild(p);
    divBasket.appendChild(div);
}

const addTeddies = (teddies) => {
    // si il y a des oursons dans le local storage, les affiches en les comparants avec les informations reçu de l'API
    if (getBasket) {
        getBasket.map(val => {
            if (val._id === teddies._id) {
                teddies.colors.map(colors => {
                    if (val.color === colors) {
                        //création des élements
                        const div = creatElem("div", null, [{attribut: "class", content: "divTeddies bg-base"}]);
                        const p = creatElem("p", teddies.name + "</br> Couleur choisi : " + val.color);
                        const img = creatElem("img", null, [{attribut: "src", content: teddies.imageUrl}, {attribut: "alt", content: "Photo Ourson"}, {attribut: "class", content: "imgTeddy"}]);
                        const pQty = creatElem("p", "quantité : " + val.qty);
                        const pPrice = creatElem("p", "prix : " + price(teddies.price, val.qty), [{attribut: "class", content: "price"}]);
                        // ajout d'un bouton permettant de supprimer des oursons du localStorage
                        const remove = creatElem("button", "supprimer", [{attribut: "class", content: "delete bg_base"}]);
                        remove.addEventListener("click", () => {
                           deleteElementBasket(val._id, val.color);
                        })
                        //Ajouts des élements dans une div
                        div.appendChild(p);
                        div.appendChild(img);
                        div.appendChild(pQty);
                        div.appendChild(pPrice);
                        div.appendChild(remove);
                        // affiche les div remplis avec les élements
                        divBasket.appendChild(div);
                    }
                })
            }
        })
    }
}
// ajout d'un bouton pour vider le localStorage
const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
})
// création des inputs et des regExp
const inputFname = document.getElementById("firstName");
const inputLname = document.getElementById("lastName");
const inputEmail = document.getElementById("email");
const inputAdress = document.getElementById("adress");
const inputCity = document.getElementById("city");
const inputSubmit = document.getElementById("submit");
const emailRegExp = /^([a-z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/;
const simpleRegExp = /^[a-zA-ZÀàéèîïÉÈÎÏ _-]+$/;
const adressRegExp = /^[a-zA-Z0-9ÀàéèîïÉÈÎÏ _-]+$/;
// vérification des données utilisateurs
inputSubmit.addEventListener("click", (event) => {
    document.getElementById("invalidFName").textContent = !simpleRegExp.test(inputFname.value) ? "Veuillez entrer un prénom valide" : "";
    document.getElementById("invalidLName").textContent = !simpleRegExp.test(inputLname.value) ? "Veuillez entrer un nom valide" : "";
    document.getElementById("invalidEmail").textContent = !emailRegExp.test(inputEmail.value) ? "Veuillez entrer un Email valide" : "";
    document.getElementById("invalidCity").textContent = !simpleRegExp.test(inputCity.value) ? "Veuillez entrer un nom de ville valide" : "";
    document.getElementById("invalidAdress").textContent = !adressRegExp.test(inputAdress.value) ? "Veuillez entrer une adresse valide" : "";
// si toute les vérification sont Ok, création de l'objet pour l'envoyer à l'API
    if (getBasket === null || getBasket.length === 0) {
        alert("Le panier et vide");
    } else if (simpleRegExp.test(inputFname.value) && simpleRegExp.test(inputLname.value) && emailRegExp.test(inputEmail.value) && simpleRegExp.test(inputCity.value) && adressRegExp.test(inputAdress.value)) {
        const products = getBasket.map(s => s._id);
        const order = {
            contact: {
                firstName: inputFname.value,
                lastName: inputLname.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputEmail.value
            },
            products
        };
        sendOrder(order);
    }
})
getTeddies();
