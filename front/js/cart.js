let productInfos = localStorage.getItem('product')
let productInfosObj = JSON.parse(productInfos)
const selectCart = document.getElementById("cart__items")
const selectTotalPrice = document.getElementById("totalPrice")
const selectTotalQuantity = document.getElementById("totalQuantity")
let someProducts = [];
let storageData = JSON.parse(localStorage.getItem("data"));


//-----------------------------------------Lien avec l'API afin de pouvoir récupérer des données si besoin-----------------------------------------

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


//-----------------------------------------Affichage des produits dans le panier-----------------------------------------

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
      <p class='productPrice'>${product.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p class="${storageData[i].id}">Qté : ${storageData[i].quantity}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" data-id="${storageData[i].id}" data-color="${storageData[i].color}}" min="1" max="100" value="${storageData[i].quantity}">
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
totalCartQuantity();
totalCartPrice();
}  

cartDisplay();


//-----------------------------------------Supprimer un produit du panier-----------------------------------------

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

//-----------------------------------------Modifier la quantité dans le panier-----------------------------------------

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
    console.log(quantityBtn.dataset.color.replace(/}/g, ''))
    totalCartQuantity();
    totalCartPrice();
    
    
    for(i=0; i < storageData.length; i++){
      if(storageData[i].id == quantityBtn.dataset.id && storageData[i].color == quantityBtn.dataset.color.replace(/}/g, '')){
      console.log('ok3');
        
      return storageData[i].quantity = quantityBtn.value,
        console.log(storageData[i].quantity),
        localStorage.setItem("data", JSON.stringify(storageData)),
        document.querySelectorAll(`.cart__item__content__settings__quantity > p`)[i].textContent = `Qté : ${storageData[i].quantity}`;
      }
    }
  }
  )})
}

//-----------------------------------------Calcul de la quantité total du panier-----------------------------------------

const selectCartQty = document.getElementById("cartQuantity");
const totalCartQuantity = async (cartDisplay,changeQuantity,
removeProduct) =>{
  await cartDisplay;
  await changeQuantity;
  await removeProduct;

  
  let productQuantityTab = [];
  
  for(i=0; i < storageData.length; i++){
    let selectProductQuantity = storageData[i].quantity;
    productQuantityTab.push(selectProductQuantity) 
  }
  
  console.log(productQuantityTab);
  selectTotalQuantity.textContent = eval(productQuantityTab.join("+"));
  selectCartQty.textContent +=  " (" + eval(productQuantityTab.join("+")) + ")";
  return totalCartQuantity
}

//-----------------------------------------Calcul du prix total du panier-----------------------------------------

const totalCartPrice = async (cartDisplay,changeQuantity,
  removeProduct) =>{
    await cartDisplay;
    await changeQuantity;
    await removeProduct;
    
    console.log("ok");
    let productPriceTab = [];
    for(i=0; i < storageData.length; i++){
      const product = await getProduct()
      let selectProductPrice = `${product.price}`*`${storageData[i].quantity}`;
      productPriceTab.push(selectProductPrice) 
    }
    console.log(productPriceTab);
    selectTotalPrice.textContent = eval(productPriceTab.join("+"));

    console.log("ok");
  }
  
//-----------------------------------------Formulaire panier-----------------------------------------
let selectFirstNameForm = document.getElementById("firstName")
let selectLastNameForm = document.getElementById("lastName")
let selectAddressForm = document.getElementById("address")
let selectCityForm = document.getElementById("city")
let selectEmailForm = document.getElementById("email")


//-----------------------------------------RegExp Prénom-----------------------------------------

console.log(selectFirstNameForm);
selectFirstNameForm.addEventListener('change', function(){
  firstNameValidation(this);
});

const firstNameValidation = function(selectFirstNameForm){

//RegExp pour autoriser uniquement des lettres
  let firstNameRegExp = /^(?=.{1,50}$)[a-zàâçéèêëîïôûùüÿñæœ -]+(?:[-'_.\s][a-zàâçéèêëîïôûùüÿñæœ -]+)*$/i;

  
  if(firstNameRegExp.test(selectFirstNameForm.value)){
    document.getElementById('firstNameErrorMsg').innerHTML = "";
    return true;
  }

  else{
    console.log('regexpttest');
    document.getElementById('firstNameErrorMsg').innerHTML = "Entrez un prénom valide";
    return(false);
  }

}

//-----------------------------------------RegExp Nom-----------------------------------------

selectLastNameForm.addEventListener('change', function(){
  lastNameValidation(this);
});

const lastNameValidation = function(selectLastNameForm){

//RegExp pour autoriser uniquement des lettres
  let lastNameRegExp = /^(?=.{1,50}$)[a-zàâçéèêëîïôûùüÿñæœ -]+(?:[-'_.\s][a-zàâçéèêëîïôûùüÿñæœ -]+)*$/i;
  
  
  if(lastNameRegExp.test(selectLastNameForm.value)){
    document.getElementById('lastNameErrorMsg').innerHTML = "";
    return true;
  }
  else{
    console.log('regexpttest');
    document.getElementById('lastNameErrorMsg').innerHTML = "Entrez un nom valide";
    return(false);
  }

}


//-----------------------------------------RegExp Adresse-----------------------------------------

selectAddressForm.addEventListener('change', function(){
  addressValidation(this);
});

const addressValidation = function(selectAddressForm){

//RegExp pour autoriser uniquement des lettres et des chiffres
  let addressRegExp = /^[0-9*]{1,3}[-'\s]+[a-zàâçéèêëîïôûùüÿñæœ -]+/;
  
  if(addressRegExp.test(selectAddressForm.value)){
    document.getElementById('addressErrorMsg').innerHTML = "";
    return true;
  }

  else{
    console.log('regexpttest');
    document.getElementById('addressErrorMsg').innerHTML = "Entrez une adresse valide";
    return(false);
  }

}


//-----------------------------------------RegExp Ville-----------------------------------------

selectCityForm.addEventListener('change', function(){
  cityValidation(this);
});

const cityValidation = function(selectCityForm){

//RegExp pour autoriser uniquement des lettres
  let cityRegExp = /^[a-zA-Zàâçéèêëîïôûùüÿñæœ]+(?:[\s-][a-zA-Zàâçéèêëîïôûùüÿñæœ]+)*$/; 

  
  if(cityRegExp.test(selectCityForm.value)){
    document.getElementById('cityErrorMsg').innerHTML = "";
    return true;
  }

  else{
    console.log('regexpttest');
    document.getElementById('cityErrorMsg').innerHTML = "Entrez une ville valide";
    return(false);
  }

}


//-----------------------------------------RegExp Email-----------------------------------------

selectEmailForm.addEventListener('change', function(){
  emailValidation(this);
});

const emailValidation = function(selectEmailForm){

//RegExp pour autoriser uniquement des lettres
  let emailRegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ ;
  
  if(emailRegExp.test(selectEmailForm.value)){
    document.getElementById('emailErrorMsg').innerHTML = "";
    return true;
  }

  else{
    console.log('regexpttest');
    document.getElementById('emailErrorMsg').innerHTML = "Entrez une adresse mail valide";
    return(false);
  }

}



//-----------------------------------------Confirmation de la commande-----------------------------------------




submitForm();

function submitForm() {
  const selectOrderBtn = document.getElementById("order");
  
  selectOrderBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    if (localStorage.length === 0 || storageData.length === 0) {
      alert("Veuillez ajouter un article dans votre panier");
    } else if (
      !selectFirstNameForm.value ||
      !selectLastNameForm.value ||
      !selectAddressForm.value ||
      !selectCityForm.value ||
      !selectEmailForm.value
    ) {
      alert("Veuillez remplir tous les champs du formulaire");
    }
    
    if (
      firstNameValidation(selectFirstNameForm) &&
      lastNameValidation(selectLastNameForm) &&
      addressValidation(selectAddressForm) &&
      cityValidation(selectCityForm) &&
      emailValidation(selectEmailForm) &&
      storageData.length != 0
      ) {

        const order = requestContact();
        
        fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((data) => {
          const orderId = data.orderId;
          window.location.href = `./confirmation.html?orderId=${orderId}`;
          localStorage.removeItem("data");
        })
        .catch((error) => {
          "Une erreur est survenue lors de la validation de la commande";
        });
      }
      console.log("okserv");
    });
    console.log(requestContact());
  }
  
function requestContact() {
  const productsId = [];
  for (product of storageData) {
    productsId.push(product.id);
  }

  const order = {
    contact: {
      firstName: selectFirstNameForm.value,
      lastName: selectLastNameForm.value,
      address: selectAddressForm.value,
      city: selectCityForm.value,
      email: selectEmailForm.value,
    },
    products: productsId,
  };
  
  return order;
}

console.log(localStorage.length)