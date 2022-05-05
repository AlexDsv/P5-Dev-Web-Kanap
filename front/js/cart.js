i = 0
let productInfos = localStorage.getItem('product' +i)
let productInfosObj = JSON.parse(productInfos)
const selectCart = document.getElementById("cart__items")
let colorValue = localStorage.getItem("colorValue")
let quantityValue = localStorage.getItem("quantity")
console.log(productInfos)

/*function getProductsLS(){
    for(i=0 ;localStorage.getItem("product"+i); i++){
        showCart()
    }
   }
*/


function showCart(){                                                                    //Affichage du produit sur la page panier
selectCart.innerHTML += `<article class="cart__item" data-id="${productInfosObj._id}" data-color="${colorValue}">
<div class="cart__item__img">
  <img src="${productInfosObj.imageUrl}" alt="${productInfosObj.altTxt}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${productInfosObj.name}</h2>                                                        
    <p>${colorValue}</p>
    <p>${productInfosObj.price}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : ${quantityValue}</p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityValue}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`
}



/*
let totalQuantityValue = 
function totalQuantity(){
    let selectTotalQuantity = document.getElementById("totalQuantity")
    selectTotalQuantity.innerHTML = `${totalQuantityValue}`
}
*/


showCart();
