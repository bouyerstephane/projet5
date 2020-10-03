const getTeddies = async () => {
    //appel de l'API
    const response = await fetch("/api/teddies/");
    const data = await response.json();
    // appel de la fonction addTeddies pour chaque oursons
    data.map(val => addTeddies(val));
}

const getUrl = async () => {
    //récupération de l'url et appel de l'API
    const strURL = window.location.href;
    const url = new URL(strURL);
    const response = await fetch("/api/teddies/" + url.searchParams.get("id"));
    const data = await response.json();
    // si le paramètre url correspond à l'id d'un ourson de l'API, retourne l'id sinon envoi sur une page d'erreur
    if (data._id) {
        return url.searchParams.get("id");
    } else {
        window.location.href = "error.html";
    }
}
//mise en forme des prix
const price = (value, multipl = 1) => {
    const number = value * multipl;
    return number / 100  + ",00€";
}
// création d'élement html
const creatElem = (tag, content, attribut) => {
    const element = document.createElement(tag);
    if (content) {
        element.innerHTML = content;
    }
    if (attribut) {
        setAttr(element, attribut);
    }
    return element;
}

const setAttr = (element, value) => {
    value.map(val => element.setAttribute(val.attribut, val.content));
}

//création des options pour ajouter les couleurs dans un select
const getColors = (colors, select) => {
    const option = creatElem("option", colors);
    select.appendChild(option);
}

// création des options pour la quantité
const optionsQuantity = (select, qty) => {
    for (let i = 1; i < qty; i++) {
        const option = creatElem("option", i);
        select.appendChild(option);
    }
}

const submit = (id) => {
    //récupération des valeurs des selects choisi
    const selectColor = document.getElementById("selectColors");
    const selectedColor = selectColor.options[selectColor.selectedIndex].value;
    const selectQuantity = document.getElementById("selectQuantities");
    const selectedQuantity = selectQuantity.options[selectQuantity.selectedIndex].value;
    // récupération du localStorage et push de "basket"
    let basket = localStorage.getItem("basket");
    if (basket !== "") {
        basket = JSON.parse(localStorage.getItem("basket"))
        if (basket === null) {
            basket = [];
        }
        basketPush(basket, id, selectedQuantity, selectedColor)
    }else{
        localStorage.clear()
        basket = []
        basketPush(basket, id, selectedQuantity, selectedColor)
    }
}

const basketPush = (basket, id, selectedQuantity, selectedColor) => {
    //si plusieurs oursons ont la même Id et la même couleur alors incrémente seulement la quantité
    if (basket.some(articles => articles._id === id && articles.color === selectedColor)) {
        basket = basket.map(article => {
            if (article._id === id && article.color === selectedColor) {
                article.qty += +selectedQuantity;
            }
            return article;
        })
    } else {
        //sinon push un nouvel article
        const article = {"_id": id, "qty": +selectedQuantity, "color": selectedColor}
        basket.push(article);
    }
    localStorage.setItem("basket", JSON.stringify(basket));
}

const sendOrder = async (teddies) => {
    try{
        //appel de l'API et envoi de l'objet
        const response = await fetch('/api/teddies/order', {
            method: 'POST',
            headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teddies)
        })
        if (!response.ok) {
            throw new Error(response.status);
        }
        // si il n'y a pas d'erreur, vide le panier et affiche la page de validation
        const data = await response.json();
        localStorage.clear()
        window.location.href = "validation.html?orderId=" + data.orderId;
    }
    catch (error){
        console.log(error)
    }
}

const deleteElementBasket = (id, color) => {
    //suppression de d'un objet de basket en fonction de son id et de sa couleur
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket) {
        basket = basket.filter(b => b._id !== id || b.color !== color);
        localStorage.setItem("basket", JSON.stringify(basket));
        window.location.reload();
    }

}