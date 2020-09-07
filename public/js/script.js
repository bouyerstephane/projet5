const getTeddies = async() => {
    const response = await fetch("/api/teddies")
    const data = await response.json()
    data.map(val => addTeddy(val))
       console.log(data)
}
const addTeddy = (teddy) => {
    console.log(teddy)
    const teddiesDiv = document.getElementById("teddies");
    console.log(teddiesDiv)
    const p = document.createElement("p")
    p.textContent = teddy.name
    teddiesDiv.appendChild(p)


}

getTeddies();

