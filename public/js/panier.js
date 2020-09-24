const storage = JSON.parse(localStorage.getItem("basket"))

const addTeddies = (teddies) => {
    const panier = document.getElementById("basket");
    const div = creatElem("div", null, [{attribut: "class", content: "divTeddies bg-base"}]);

    if (storage === null){
        const p = creatElem("p", "Le panier est vide")
        div.appendChild(p)
        panier.appendChild(div)
    }


    // regroupe les teddy par id
       const teddyId = storage.filter((teddy) =>
           teddy.id === teddies._id
       )
  // puis par couleur
teddies.colors.map(val => {
    const teddyColor = teddyId.filter((teddy) =>
        teddy.color === val
    )
    //console.log(teddyColor)

    if(teddyColor.length !== 0){
        const totalQuantity = teddyColor.reduce((accu, teddy) => {
            return accu + parseInt(teddy.qty)
        },0)
       // console.log(teddyColor[0].id + teddyColor[0].color)

        if (teddyColor[0].id === teddies._id){
            const p = creatElem("p", teddies.name + "</br> Couleur choisi : " + teddyColor[0].color)
            const img = creatElem("img", null, [{attribut: "src", content: teddies.imageUrl}, {attribut: "alt", content: "Photo Ourson"}, {attribut: "class", content: "imgTeddy"}])
            const pQty = creatElem("p", "quantité : " + totalQuantity)
            const pPrice = creatElem("p", "prix : " + price(teddies.price, totalQuantity), [{attribut: "class", content: "price"}])
            const remove = creatElem("button", "supprimer", [{attribut: "class", content: "bg_base"}])

            div.appendChild(p)
            div.appendChild(img)
            div.appendChild(pQty)
            div.appendChild(pPrice)
            div.appendChild(remove)
            panier.appendChild(div)



        }

   }

})
    // const prix = document.getElementsByClassName("price")
    // const data = [].map.call(prix, val => val.textContent.substr(7, val.textContent.length -7 -1))
    // const test = data.reduce((accu, data) =>{
    //     return accu + parseInt(data)
    // },0)
    //
    // const div2 =  creatElem("div", null, [{attribut: "class", content: "divTeddies bg-base"}]);
    // const pTotal = creatElem("p", test)
    //
    // div2.appendChild(pTotal)
    // panier.appendChild(div2)
    // console.log(test)
}


getTeddies()





const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    localStorage.clear()
    window.location.reload()
})


