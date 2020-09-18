const addTeddies = (teddy) => {
        if (teddy._id === getUrl()){

        //recuperation de l'id de la div
        const teddiesDiv = document.getElementById("teddy");

        //creation des elements
        const div = creatElem("div",null, [{attribut: "class", content: "divTeddy bg-base"}]);

        const pName = creatElem("p","<strong>" + teddy.name  + "</strong><br>")
        const pDescription = creatElem("p", teddy.description);
        const pPrice = creatElem("p", "prix : " + price(teddy.price));
        const img = creatElem("img", null, [{attribut: "src", content: teddy.imageUrl},{attribut: "alt", content: "Photo Ourson"},{attribut: "class", content: "imgTeddy"}]);
        const selectColors = creatElem("select")
        teddy.colors.map(val => getColors(val, selectColors))

       //Ajouts des élements dans une div
        div.appendChild(pName)
        div.appendChild(pDescription)
        div.appendChild(img)
        div.appendChild(pPrice)
        div.appendChild(selectColors)
        // affiche les div remplis avec les élements

        teddiesDiv.appendChild(div)
    }

}



getTeddies()
