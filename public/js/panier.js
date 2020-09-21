const panier = (articles) => {

   //console.log(articles)
    const panier = document.getElementById("basket");
    const p = creatElem("p", articles.id + articles.color + articles.qty)
    const div = creatElem("div", null, [{attribut: "id", content: "test"}])
    div.appendChild(p)
    panier.appendChild(div)

}


const storage = JSON.parse(localStorage.getItem("basket"))
storage.map(val => panier(val))


const addTeddies = (teddies) => {
    const test = storage.filter((teddy) => teddy.id === teddies._id)

    console.log(test)
}


getTeddies()





const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    localStorage.clear()
    window.location.reload()
})


