const getTeddies = async() => {
    const response = await fetch("/api/teddies")
    const data = await response.json()
    data.map(val => addTeddies(val))
      console.log(data)
}

const getUrl = (ids) => {
    const strURL = window.location.href;
    const url = new URL(strURL);
    //console.log(ids)
    const urlId = url.searchParams.get("id")
    return urlId
}



const price = number => {
    return number.toString().substr(0,2) + "," + number.toString().substr(2, 2) + "€";
}


const creatElem = (tag, content, attribut) => {
    const element = document.createElement(tag)
    if (content != null){
        element.innerHTML = content
    }
    if (attribut != null){
        setAttr(element, attribut)
    }
    return element
}

const setAttr = (element, value) => {
    value.map(val => element.setAttribute(val.attribut, val.content))
}

const getColors = (colors, select) => {
    const option = creatElem("option", colors)
    select.appendChild(option);
}