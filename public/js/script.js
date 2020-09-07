fetch('http://localhost:3000/api/teddies')
    .then(res => res.json())
    .then(data => console.log(data[0]))
