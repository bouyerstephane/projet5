const addTeddies = (teddy) => {
    //recuperation de l'id de la div
    const teddiesDiv = document.getElementById("teddies");

    //Création des élements
    const div = creatElem("div", null,[{attribut: "class",content: "divTeddies bg-base"}] );
    const pName = creatElem("p", "<strong>" + teddy.name + "</strong><br>");
    const pDescription =  creatElem("p", teddy.description)
    const img = creatElem("img",null,[{attribut: "src", content: teddy.imageUrl},{attribut: "alt", content: "Photo Ourson"},{attribut: "class", content: "imgTeddy"}])
       // [["src",  teddy.imageUrl], ["alt", "Photo Ourson"], ["class", "imgTeddy"]]
    const pPrice = creatElem("p","prix : " + price(teddy.price))
    const a = creatElem("a","<p>Voir le produit</p>", [{attribut: "href", content: "../produit.html?id=" + teddy._id}])

    //Ajouts des élements dans une div
    div.appendChild(pName)
    div.appendChild(pDescription)
    div.appendChild(img)
    div.appendChild(pPrice)
    div.appendChild(a)

    // affiche les div remplis avec les élements
    teddiesDiv.appendChild(div)
}

getTeddies();
