const getTeddies = async() => {
    const response = await fetch("/api/teddies");
    const data = await response.json();
    data.map(val => addTeddy(val))
}
const getUrl = () => {
    const strURL = window.location.href;
    const url = new URL(strURL);
    if (url.searchParams.get("id") === null){
        console.error("erreur pas de parametre !")
    }else{
        console.log("ça marche!")
    }
    return url.searchParams.get("id")
}

const price = number => {
    return number.toString().substr(0,2) + "," + number.toString().substr(2, 2) + "€"

}

const addTeddy = (teddy) => {

    if (teddy._id === getUrl()){

        //recuperation de l'id de la div
        const teddiesDiv = document.getElementById("thisTeddy");
        //console.log(teddiesDiv)

        //creation des elements
        const div = document.createElement("div");
        div.setAttribute("class", "divTeddy bg-base")

        const pName = document.createElement("p");
        pName.innerHTML = "<strong>" + teddy.name  + "</strong><br>"

        const pDescription = document.createElement("p");
        pDescription.innerHTML = teddy.description

        const pPrice = document.createElement("p");

        pPrice.textContent = "prix : " + price(teddy.price);

        const img = document.createElement("img");
        img.setAttribute('src', teddy.imageUrl);
        img.setAttribute('alt', "Photo ourson");
        img.setAttribute('class', "imgTeddy");

        const select = document.createElement("select")
        const getColors = colors => {
            const option = document.createElement("option")
                option.textContent = colors;
                //console.log(option)
            select.appendChild(option);
        }
        teddy.colors.map(val => getColors(val))

        // regroupement des éléments dans une div

        div.appendChild(pName)
        div.appendChild(pDescription)
        div.appendChild(img)
        div.appendChild(pPrice)
        div.appendChild(select)

        // affiche les div remplis avec les élements

        teddiesDiv.appendChild(div)
    }

}



getTeddies()
