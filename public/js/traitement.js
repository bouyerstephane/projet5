const getTeddies = async () => {
    const response = await fetch("/api/teddies/");
    const data = await response.json();
    data.map(val => addTeddies(val));
    //console.log(data)
}

const getUrl = async () => {
    const strURL = window.location.href;
    const url = new URL(strURL);
    const response = await fetch("/api/teddies/" + url.searchParams.get("id"));
    const data = await response.json();
    if (data._id) {

        return url.searchParams.get("id");
    } else {
        window.location.href = "error.html";
    }

}

const price = (value, multipl = 1) => {
    const number = value * multipl;
    return number.toString().substr(0, number.toString().length - 2) + "," + number.toString().substr(number.toString().length - 2, 2) + "€";
}

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

const getColors = (colors, select) => {
    const option = creatElem("option", colors);
    select.appendChild(option);
}

const optionsQuantity = (select, qty) => {
    for (let i = 1; i < qty; i++) {
        const option = creatElem("option", i);
        select.appendChild(option);
    }
}

const submit = (id,price) => {
    const send = document.getElementById("submit");
    send.addEventListener("click", () => {
        const selectColor = document.getElementById("selectColors");
        const indexColor = selectColor.selectedIndex;
        const selectedColor = selectColor.options[indexColor].value;
        const selectQuantity = document.getElementById("selectQuantities");
        const indexQuantity = selectQuantity.selectedIndex;
        const selectedQuantity = selectQuantity.options[indexQuantity].value;

        addArticle(id, selectedQuantity, selectedColor,price)
    })
}

const addArticle = (id, selectedQuantity, selectedColor, price) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));


    if (totalPrice === null) {
        totalPrice = [{"price": +price * +selectedQuantity}];
    } else{
        totalPrice[0].price += +price * +selectedQuantity;

    }

    if (basket === null) {
        basket = [];
    }

    if (basket.some(articles => articles.id === id && articles.color === selectedColor)){
        basket = basket.map(article => {
            if (article.id === id && article.color === selectedColor ){
                article.qty += +selectedQuantity
            }
            return article
        })
    }else{
        const article = {"id": id, "qty": +selectedQuantity, "color": selectedColor}
        basket.push(article);
    }




    localStorage.setItem("basket", JSON.stringify(basket));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));

}