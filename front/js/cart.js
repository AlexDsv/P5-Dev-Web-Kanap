i = localStorage.length
let productInfos = localStorage.getItem('product')
let productInfosObj = JSON.parse(productInfos)
const selectCart = document.getElementById("cart__items")
const selectTotalPrice = document.getElementById("totalPrice")
const selectTotalQuantity = document.getElementById("totalQuantity")
let someProducts = [];
let storageData = JSON.parse(localStorage.getItem("data"));
if(localStorage.length == 0){
  emptyCart();
}
else{
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
}


function emptyCart(){
  selectCart.innerHTML = '<p>Votre panier est vide</p>'
  selectTotalPrice.textContent = 0
  selectTotalQuantity.textContent = 0
}



const cartDisplay = async () =>{
  if(storageData == null){
    emptyCart();
  }
  else{
  for (i = 0; i < storageData.length; i++){
    const product = await getProduct();
    //let multiplPriceQty = `${product.price}`*`${storageData[i].quantity}`
  selectCart.innerHTML += `<article class="cart__item" data-id="${storageData[i].id}" data-color="${storageData[i].color}">
  <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${storageData[i].name}</h2>                                                        
      <p>${storageData[i].color}</p>
      <p>${product.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : ${storageData[i].quantity}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" data-id="${storageData[i].id}" data-color="${storageData[i]}}" min="1" max="100" value="${storageData[i].quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem" data-id="${storageData[i].id}" data-color=${storageData[i].color}>Supprimer</p>
      </div>
    </div>
  </div>
  </article>`
}
}
changeQuantity();
removeProduct();
totalCartPrice();
totalCartQuantity();
}  

cartDisplay();



const removeProduct = async (cartDisplay) =>{
  await cartDisplay;
  let deleteBtns = document.querySelectorAll(".deleteItem");
  let productToRemove = storageData.length
  
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', () => {
      
      if(productToRemove == 1){
        return (
          localStorage.removeItem('data'),
          location.reload()
        )
      }

      else {
        someProducts = storageData.filter((el) =>{
          if (deleteBtn.dataset.id != el.id || deleteBtn.dataset.color != el.color){
            console.log(deleteBtn.dataset.id);
            return true;
          }
        })
       console.log(someProducts);
       localStorage.setItem('data', JSON.stringify(someProducts));
       location.reload()
      }
});
  
});
return;
};

const changeQuantity = async (cartDisplay) =>{
await cartDisplay;
console.log('ok');
const selectQuantityBtns = document.querySelectorAll(".itemQuantity");

console.log(selectQuantityBtns);

selectQuantityBtns.forEach((quantityBtn) => {
  console.log(quantityBtn);
  
  quantityBtn.addEventListener('change', () => {
    console.log('ok2');
    console.log(quantityBtn.value);
    console.log(quantityBtn.dataset.id);
    for(i=0; i < storageData.length; i++){
      
        console.log('ok3');
        return storageData[i].quantity=quantityBtn.value,
        console.log(storageData[i].quantity),
        localStorage.setItem("data", JSON.stringify(storageData)),
        (document.querySelectorAll('.cart__item__content__settings__quantity > p')[i].textContent = storageData[i].quantity)

    }
  }
)})
}


const totalCartPrice = async (cartDisplay) =>{
  await cartDisplay
}