const getTeddies = async () => {
    const response = await fetch("/api/teddies/")
    const data = await response.json()
    data.map(val => addTeddies(val))
     //console.log(data)
}

const getUrl = async () => {
    const strURL = window.location.href;
    const url = new URL(strURL);
    const response = await fetch("/api/teddies/" + url.searchParams.get("id"))
    const data = await response.json()

    if (url.searchParams.get("id") === data._id ){
        return url.searchParams.get("id");
    }else{
       // console.log(url.searchParams.get("id"))
        window.location.href = "error.html"
    }

}

const price = (value, multipl = 1) => {
    const number = value * multipl
    return number.toString().substr(0, number.toString().length -2) + "," + number.toString().substr(number.toString().length -2, 2) + "€";
}

const creatElem = (tag, content, attribut) => {
    const element = document.createElement(tag)
    if (content != null) {
        element.innerHTML = content
    }
    if (attribut != null) {
        setAttr(element, attribut)
    }
    return element
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

const submit = (id) => {
    const send = document.getElementById("submit");
    send.addEventListener("click", () => {
        const selectColor = document.getElementById("selectColors");
        const indexColor = selectColor.selectedIndex;
        const selectedColor = selectColor.options[indexColor].value;
        const selectQuantity = document.getElementById("selectQuantities");
        const indexQuantity = selectQuantity.selectedIndex;
        const selectedQuantity = selectQuantity.options[indexQuantity].value;

        addArticle(id, selectedQuantity, selectedColor)
    })
}

const addArticle = (id, selectedQuantity, selectedColor) => {
    const article = {"id": id, "qty": selectedQuantity, "color": selectedColor}


    let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket === null) {
        basket = [];
    }
    basket.push(article);
    localStorage.setItem("basket", JSON.stringify(basket));

}