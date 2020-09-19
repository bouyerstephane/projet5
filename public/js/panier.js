const panier = (articles) => {

    console.log(articles)

    const panier = document.getElementById("basket");
    const p = creatElem("p", articles.id + articles.color + articles.qty);
    const div = creatElem("div", null, [{attribut: "id", content: "test"}]);
    div.appendChild(p)
    panier.appendChild(div);

}


const test = JSON.parse(localStorage.getItem("basket"))
test.map(val => panier(val))


const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    localStorage.clear()
    window.location.reload()
})


