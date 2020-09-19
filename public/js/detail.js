const addTeddies = (teddy) => {
    if (teddy._id === getUrl()) {

        //recuperation de l'id de la div
        const teddiesDiv = document.getElementById("teddy");
        console.log(teddiesDiv)

        //creation des elements
        const div = creatElem("div", null, [{attribut: "class", content: "divTeddy bg-base"}]);

        const pName = creatElem("p", "<strong>" + teddy.name + "</strong><br>")
        const pDescription = creatElem("p", teddy.description);
        const pPrice = creatElem("p", "prix : " + price(teddy.price));
        const img = creatElem("img", null, [{attribut: "src", content: teddy.imageUrl}, {
            attribut: "alt",
            content: "Photo Ourson"
        }, {attribut: "class", content: "imgTeddy"}]);
        const selectColors = creatElem("select", null, [{attribut: "id", content: "selectColors"}])
        teddy.colors.map(val => getColors(val, selectColors))
        const selectQuantity = creatElem("select", null, [{attribut: "id", content: "selectQuantities"}])
        quantity(selectQuantity, 11)
        const a = creatElem("a", "ajouter au panier", [{attribut: "href", content: "../panier.html"}, {
            attribut: "id",
            content: "submit"
        }]);


        //Ajouts des élements dans une div
        div.appendChild(pName)
        div.appendChild(pDescription)
        div.appendChild(img)
        div.appendChild(pPrice)
        div.appendChild(selectColors)
        div.appendChild(selectQuantity)
        div.appendChild(a)
        // affiche les div remplis avec les élements

        teddiesDiv.appendChild(div)

        submit(teddy._id)

    }
}

const submit = (id) => {
    const send = document.getElementById("submit");
    send.addEventListener("click", () => {
        const selectColor = document.getElementById("selectColors");
        const indexColor = selectColor.selectedIndex
        const selectedColor = selectColor.options[indexColor].value
        const selectQuantity = document.getElementById("selectQuantities");
        const indexQuantity = selectQuantity.selectedIndex
        const selectedQuantity = selectQuantity.options[indexQuantity].value


        const addArticle = {"id": id, "qty": selectedQuantity, "color": selectedColor};


        if (JSON.parse(localStorage.getItem("basket") === null)) {
            const init = [];
            init.push(addArticle)
            localStorage.setItem("basket", JSON.stringify(init));
        } else {
            const basket = JSON.parse(localStorage.getItem("basket"));
            basket.push(addArticle)
            localStorage.setItem("basket", JSON.stringify(basket));
        }
    })
}
getTeddies()
