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
                
                newQuantity = () => {
                    console.log('oui');
                    for (i = 0; i < storageData.length; i++){
                        console.log('oui2');
                        if (storageData[i].id === getProductId && storageData[i].color === selectColorOption.value){
                            storageData[i].quantity = parseInt(storageData[i].quantity) + parseInt(selectQuantity.value);

                            localStorage.data = JSON.stringify(storageData);
                        }
                    }
                };
            

               let alreadyInCart = false
                
                searchInCart = () => {
                    for (i = 0; i < storageData.length; i++) {
                     
                        if (storageData[i].id === getProductId && storageData[i].color === selectColorOption.value){
                            console.log('028');
                            alreadyInCart = true;
                        
                        }
                    }
                };


                if (storageData){
                    searchInCart();

                    if (alreadyInCart){
                        newQuantity();
                        console.log("produit déjà présent");
                    }

                    else{
                        console.log('produit pas présent');
                        addStorageData();
                    }
                }

                else{
                    storageData = [];
                    addStorageData();
                    console.log('produit pas présent2')
                }

            }
            else{
                alert("error");
            }
        });
        
}












































    //Ajouter un produit au panier
    /*const setProductInfos = async () => {
        const infos = await getProduct()
        localStorage.setItem('product' +i, JSON.stringify(infos))
        localStorage.setItem('colorValue' +i, selectColorOption.value)
        localStorage.setItem('quantity' +i, selectQuantity.value)
        

    
    };
    
    const addToCart = async () => {
        const infos = await getProduct()
        if("product" in localStorage){                                    //Si une ligne product existe dans LocalStorage alors
            localStorage.setItem('product'+ ++i, JSON.stringify(infos))   //Crée une ligne product1 contenant les données du produit de la page produit actuelle
            localStorage.setItem('colorValue'+i, selectColorOption.value) //Crée une ligne colorValue1 contenant la couleur choisie pour le produit actuel
            localStorage.setItem('quantity'+i, selectQuantity.value)      //Crée une ligne quantity1 contenant la quantité choisie pour le produit actuel
        
    }
        else if(productInfosObj != null && getProductId == productInfosObj._id && selectColorOption.value == localStorage.getItem('colorValue'+i, selectColorOption.value)){
            sameProductToCart()
    }
        else if(productInfosObj != null && getProductId == productInfosObj._id && selectColorOption.value != localStorage.getItem('colorValue'+i, selectColorOption.value)){
            localStorage.setItem('product'+ ++i, JSON.stringify(infos))   
            localStorage.setItem('colorValue'+i, selectColorOption.value) 
            localStorage.setItem('quantity'+i, selectQuantity.value)
    }
    //Si
    
        else{
            localStorage.setItem('product'+ ++i, JSON.stringify(infos))   //Crée une ligne product1 contenant les données du produit de la page produit actuelle
            localStorage.setItem('colorValue'+i, selectColorOption.value) //Crée une ligne colorValue1 contenant la couleur choisie pour le produit actuel
            localStorage.setItem('quantity'+i, selectQuantity.value)
        
    }
    }

    function sameProductToCart(){
        localStorage.setItem('quantity' +i, parseInt(localStorage.getItem('quantity'+i, selectQuantity.value))+parseInt(selectQuantity.value));
    
    }*/
    
        

    




    