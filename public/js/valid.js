const valid  = document.getElementById("validation");
const strURL = window.location.href;
const url = new URL(strURL);
const orderId = url.searchParams.get("orderId")
const h1 = creatElem("h1", "<h1>Votre commande : "+ orderId +" à bien été enregistré</h1>")

valid.appendChild(h1)
