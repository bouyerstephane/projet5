const getTeddies = async() => {
    const response = await fetch("/api/teddies")
    const data = await response.json()
    data.map(val => addTeddy(val))
       console.log(data)
}

const addTeddy = (teddy) => {
    //console.log(teddy)

    //recuperation de l'id de la div
    const teddiesDiv = document.getElementById("teddies");
    //console.log(teddiesDiv)

    //creation des elements
    const div = document.createElement("div");
    div.setAttribute("class", "divTeddy bg-base")

    const pName = document.createElement("p");
    pName.innerHTML = "<strong>" + teddy.name  + "</strong><br>"

    const pDescription = document.createElement("p");
    pDescription.innerHTML = teddy.description

    const pPrice = document.createElement("p");
    const price = number => {
        const formatPrice = number.toString().substr(0,2) + "," + number.toString().substr(2, 2) + "€"
        return formatPrice
    }
    pPrice.textContent = "prix : " + price(teddy.price);

    const img = document.createElement("img");
    img.setAttribute('src', teddy.imageUrl);
    img.setAttribute('alt', "Photo ourson");
    img.setAttribute('class', "imgTeddy");

    const a = document.createElement("a");
    a.setAttribute("id", teddy._id)
    a.setAttribute("href", "../produit.html")
    a.innerHTML = "<p>Voir le produit</p>"

    // regroupement des éléments dans une div

    div.appendChild(pName)
    div.appendChild(pDescription)
    div.appendChild(img)
    div.appendChild(pPrice)
    div.appendChild(a)

    // affiche les div remplis avec les élements

    teddiesDiv.appendChild(div)


}

getTeddies();



const num = "1234";
console.log(num.toString().substr(0, 4))