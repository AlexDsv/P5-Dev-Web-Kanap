i = localStorage.length
let productInfos = localStorage.getItem('product')
let productInfosObj = JSON.parse(productInfos)
const selectCart = document.getElementById("cart__items")
const selectTotalPrice = document.getElementById("totalPrice")
const selectTotalQuantity = document.getElementById("totalQuantity")

let storageData = JSON.parse(localStorage.getItem("data"));

for (i = 0; i < storageData.length; i++){
function getProduct() {
  return fetch(`http://localhost:3000/api/products/${storageData[i].id}`)
  .then((res) => {
      return res.json();                                      
  })
  .then((product) => {
      return product;
  })
  .catch((error) => {
      alert(
          "Une erreur est survenue."
          );
      });
  }
}






const cartDisplay = async () =>{
  for (i = 0; i < storageData.length; i++){
    const product = await getProduct();
    let multiplPriceQty = `${product.price}`*`${storageData[i].quantity}`
  selectCart.innerHTML += `<article class="cart__item" data-id="${storageData[i].id}" data-color="${storageData[i].color}">
  <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${storageData[i].name}</h2>                                                        
      <p>${storageData[i].color}</p>
      <p>${multiplPriceQty}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : ${storageData[i].quantity}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${storageData[i].quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
  </article>`
}
}

function totalQuantity(){
  for (i = 1; i < storageData.length; i++){
    let totalQuantity = `${storageData[i].quantity}`+`${storageData[i--].quantity}`
    
    
  }
  selectTotalQuantity.innerHTML = totalQuantity
  
}



cartDisplay();
//totalQuantity();
