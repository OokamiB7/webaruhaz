let state = {
    products: [
    {
        imgName: "Spallos.png",
        id: idGen(),
        name: "Acél Pallos",
        type: "Fegyver",
        price: 350,
        quantity: 5
    },
    {
        imgName: "ironsword.jpg",
        id: idGen(),
        name: "Vas Kard",
        type: "Fegyver",
        price: 200,
        quantity: 2
    },
    {
        imgName: "Hpotion.jpg",
        id: idGen(),
        name: "Közönséges Gyógyító Ital",
        type: "Bájital",
        price: 400,
        quantity: 10
    },
    {
        imgName: "Lboots.png",
        id: idGen(),
        name: "Bőr csizma",
        type: "Páncél",
        price: 50,
        quantity: 3
    },
    {
        imgName: "Rpotion.jpg",
        id: idGen(),
        name: "Regeneráció Ital",
        type: "Bájital",
        price: 300,
        quantity: 15
    },
    {
        imgName: "Samulett.jpg",
        id: idGen(),
        name: "Zafír Amulett",
        type: "Ékszer",
        price: 500,
        quantity: 2
    },
    {
        imgName: "Dring.jpg",
        id: idGen(),
        name: "Sárkánylélek gyűrű",
        type: "Ékszer",
        price: 3500,
        quantity: 1
    },
    {
        imgName: "Bible.jpg",
        id: idGen(),
        name: "Biblia",
        type: "Könyv",
        price: 500,
        quantity: 4
    },
    {
        imgName: "Ichest.jpg",
        id: idGen(),
        name: "Vas mellvért",
        type: "Páncél",
        price: 230,
        quantity: 3
    },


    
],
    event: "read",
    order: false
};

let masolat = [...state.products];

function idGen(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function searchIndex(id){
    for (let index = 0; index < state.products.length; index++) {
        if (id === state.products[index].id) {
            return index;
        }
    }
}


function renderTable(products){
    let tableHtml = "";
    for (const product of products) {
        tableHtml += `<tr>`;

        tableHtml += `<td><div class="hover_img">
        <a href="#">${product.name}<span>
          <div class="card" id="Kartyak">
            <img src="img/${product.imgName}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title" id="KartyaCim">${product.name}</h5>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </span></a>
      </div></td>`;

        tableHtml += `<td>${product.type}</td>`;
        tableHtml += `<td>${product.price} <img src="img/aranyerme.png" id="erme" alt="" srcset=""></td>`;
        tableHtml += `<td>${product.quantity}x</td>`;
        tableHtml += `<td><button type="button" class="btn btn-danger btn-sm" onclick="DeleteProduct('${product.id}')">Törlés</button>`;
        tableHtml += `<button type="button" class="btn btn-success btn-sm ms-2" onclick="UpdateProduct('${product.id}')">Módosítás</button></td>`;
        tableHtml += `</tr>`;
    }
      
    document.getElementById("tbody").innerHTML = tableHtml;
}

function UpdateProduct(id){
    state.event = "update";
    state.currentId = id;
    let index = searchIndex(id);
    let name = state.products[index].name
    let type = state.products[index].type
    let price = state.products[index].price
    let quantity = state.products[index].quantity

    
    document.getElementById("nameInput").value = name;
    document.getElementById("typeInput").value = type;
    document.getElementById("priceInput").value = price;
    document.getElementById("quantityInput").value = quantity;
    

    document.getElementById("title-update").classList.remove("d-none");
    document.getElementById("title-new").classList.add("d-none");

    formView();
    
}

function SortByName(){
    state.order = !state.order
    if (state.order) {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
    } else {
        state.products.sort((a, b) => b.name.localeCompare(a.name))
    }
    renderTable(state.products)
}

function SortByPrice() {
    state.order = !state.order
    if (state.order) {
        state.products.sort((a,b) => a.price - b.price)
    } else {
        state.products.sort((a,b) => b.price - a.price)
    }
    renderTable(state.products)
}

function SortByType() {
    state.order = !state.order
    if (state.order) {
        state.products.sort((a, b) => a.type.localeCompare(b.type))
    } else {
        state.products.sort((a, b) => b.type.localeCompare(a.type))
    }
    renderTable(state.products)
}

function SortByQuantity() {
    state.order = !state.order
    if (state.order) {
        state.products.sort((a,b) => a.quantity - b.quantity)
    } else {
        state.products.sort((a,b) => b.quantity - a.quantity)
    }
    renderTable(state.products)
}

function DeleteProduct(id){
    state.event = "delete";
    let index = searchIndex(id); 
    state.products.splice(index,1);
    renderTable(state.products);
}

function SearchProduct() {
    let beirtAdat = document.getElementById("searchInput").value;
    keresett = state.products.filter(product =>{ 
        return product.name.includes(beirtAdat) || product.type.includes(beirtAdat)
    });
    console.log(keresett);
    renderTable(keresett);
}

function formView(){
    document.getElementById("form").classList.remove("d-none");
}

document.getElementById("btnNewProduct").onclick = function () {
    state.event = "create";
    document.getElementById("title-new").classList.remove("d-none");
    document.getElementById("title-update").classList.add("d-none");
    formView();
}

document.getElementById("cancel-product").onclick = function () {
    state.event = "read";
    document.getElementById("form").classList.add("d-none");
}

document.getElementById("save-product").onclick = function(event){
    event.preventDefault()
    
    
    let id = idGen();
    let name = document.getElementById("nameInput").value;
    let type = document.getElementById("typeInput").value;
    let price = document.getElementById("priceInput").value;
    let quantity = document.getElementById("quantityInput").value;
    
    let errorList = [];
    if (! (name)) {
        document.getElementById("name-label").classList.add("text-danger");
        errorList.push("Name Error");
    }
    if (! (type)) {
        document.getElementById("type-label").classList.add("text-danger");
        errorList.push("Name Error");
    }
    if (! (price)) {
        document.getElementById("price-label").classList.add("text-danger");
        errorList.push("Name Error");
    }
    if (! (quantity)) {
        document.getElementById("quantity-label").classList.add("text-danger");
        errorList.push("Name Error");
    }

    if (errorList.length > 0) {
        return;
    }

    if(state.event === "update") {
        id = state.currentId;
    }

    
    let product = {
        imgName: "default.jpg",
        id: id,
        name: name,
        type: type,
        price: price,
        quantity: quantity
    };
    
    if (state.event == "create" ) {
        state.products.push(product);
    }
   else if (state.event = "update") {
        let index = searchIndex(id);
        state.products[index] = product;
    }
    
    document.getElementById("nameInput").value = null;
    document.getElementById("typeInput").value = null;
    document.getElementById("priceInput").value = null;
    document.getElementById("quantityInput").value = null;
    
    renderTable(state.products);
}


window.onload = renderTable(state.products);