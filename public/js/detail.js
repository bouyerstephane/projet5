const addTeddies = async (teddy) => {
    if (teddy._id === await getUrl()) {
        //recuperation de l'id de la div
        const teddiesDiv = document.getElementById("teddy");
        //console.log(teddiesDiv)

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
        optionsQuantity(selectQuantity, 11)
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

        submit(teddy._id,teddy.price)


    }
}


getTeddies()
