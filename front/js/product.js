const selectImgClass = document.querySelector(".item__img");
const selectTitle = document.getElementById("title");
const selectPrice = document.getElementById("price");
const selectDescription = document.getElementById("description");
const selectColorOption = document.getElementById("colors")
const selectColorValue = selectColorOption.value
const selectQuantity = document.getElementById("quantity")
const selectQuantityValue = selectQuantity.value


var getUrl = window.location.href
var getProductId = getUrl.substring(getUrl.lastIndexOf("=")+1);



//--------------------------Injection des données récupérées grâce à l'API pou afficher la page produit-------------------------
(async function () {
    const product = await getProduct();    
    
    showProduct(product);
    addToCart();
})();





//-------------------------Ajoute les données du produit dans le html--------------------------------
function showProduct(product){
    let productId = `${product.id}`;              
    let productImgUrl = `${product.imageUrl}`;       
    let productAltText = `${product.altTxt}`;           
    let productName = `${product.name}`;                  
    let productDescription = `${product.description}`;                  
    let productPrice = `${product.price}`;                 
    let productColors = `${product.colors}`;
    
    selectImgClass.innerHTML = `<img src="${productImgUrl}" alt="${productAltText}">`
    selectTitle.innerHTML = `${productName}`
    selectPrice.innerHTML = `${productPrice}`
    selectDescription.innerHTML = `${productDescription}`
    
    for (let i = 0;i < `${product.colors.length}`; i++){        //Boucle qui, pour chaque unité du tableau, l'ajoute à la liste puis recommence jusqu'à être à la fin de l'array
        selectColorOption.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
        
        
    }
}


//-----------------------Recupération des infos correspondant au produit qui a le même id que celui dans l'url----------------------------

function getProduct() {
    return fetch(`http://localhost:3000/api/products/${getProductId}`)
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
    
    
    
    
    
    const selectButton = document.getElementById("addToCart")                                                   
    let productInfos = localStorage.getItem("product" )
    let productInfosObj = JSON.parse(productInfos)  
    

    
//------------------fonction pour ajouter un produit au panier--------------------------------
function addToCart(){
    selectButton.addEventListener("click", addToCart = () => {
        if (selectQuantity.value >= 1 && selectQuantity.value < 100 && selectColorOption.value != ""){
            let addProduct = {                                                                  
                id: getProductId,
                name: selectTitle.textContent,
                quantity: selectQuantity.value,
                color: selectColorOption.value,
                img: selectImgClass.src,
                altTxt: selectImgClass.alt,
            };
            
            let storageData = JSON.parse(localStorage.getItem("data"));

                const addStorageData = () => {
                    storageData.push(addProduct);
                    localStorage.data = JSON.stringify(storageData);
                };
                
                //------------------------------Additionne les quantités si un produit est déjà présent dans le tableau--------------------------
                newQuantity = () => {
                    for (i = 0; i < storageData.length; i++){
                        if (storageData[i].id === getProductId && storageData[i].color === selectColorOption.value){
                            storageData[i].quantity = parseInt(storageData[i].quantity) + parseInt(selectQuantity.value);

                            localStorage.data = JSON.stringify(storageData);
                        }
                    }
                };
            

               let alreadyInCart = false
                //------------------------Cherche dans le localstorage si un produit de même id et de même couleur est déjà présent--------------------------------
                searchInCart = () => {
                    for (i = 0; i < storageData.length; i++) {
                     
                        if (storageData[i].id === getProductId && storageData[i].color === selectColorOption.value){
                            alreadyInCart = true;
                        
                        }
                    }
                };


                if (storageData){
                    searchInCart();

                    if (alreadyInCart){
                        newQuantity();
                        location.reload();

                    }

                    else{

                        addStorageData();
                        location.reload();
                    }
                }

                else{
                    storageData = [];
                    addStorageData();
                }

            }
            else if(selectQuantity.value <= 1 && selectColorOption.value != ""){
                alert("Veuillez indiquer un nombre d'article(s)");
            }

            else if(selectQuantity.value >= 1 && selectColorOption.value == ""){
                alert("Veuillez sélectionner une couleur");
            }
        });
        
}




const selectCartQty = document.getElementById("cartQuantity");
const totalCartQuantity = () =>{
    let storageData = JSON.parse(localStorage.getItem("data"));
    let productQuantityTab = [];
  for(i=0; i < storageData.length; i++){
    let selectProductQuantity = storageData[i].quantity;
    productQuantityTab.push(selectProductQuantity) 
  }
  console.log(storageData.length);
  console.log(productQuantityTab);
  selectCartQty.textContent +=  " (" + eval(productQuantityTab.join("+")) + ")";
  return totalCartQuantity
}

console.log(localStorage.length);

totalCartQuantity()


    