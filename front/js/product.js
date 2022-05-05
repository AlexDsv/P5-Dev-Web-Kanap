const selectImgClass = document.querySelector(".item__img");
const selectTitle = document.getElementById("title");
const selectPrice = document.getElementById("price");
const selectDescription = document.getElementById("description");
const selectColorOption = document.getElementById("colors")
const selectColorValue = selectColorOption.children
const selectQuantityValue = document.querySelector("#quantity").value
const selectQuantity = document.getElementById("quantity")



var getUrl = window.location.href
var getProductId = getUrl.substring(getUrl.lastIndexOf("=")+1);


(async function () {
    const product = await getProduct();        //Injection des donneés sur la page produit
    
    showProduct(product);
})();

//fonction qui return les informations produit du produit correspondant à cet id (id récupéré dans l'url)
function showProduct(product){
    let productId = `${product.id}`;            //Variable pour récupérer l'id des produits        
    let productImgUrl = `${product.imageUrl}`;       //Recuperation des données de l'API sous forme de variable
    let productAltText = `${product.altTxt}`;       // ""          ""               ""           ""           ""     
    let productName = `${product.name}`;             //Recuperation des données de l'api sous forme de variable       
    let productDescription = `${product.description}`;                   //Recuperation des données de l'api sous forme de variable
    let productPrice = `${product.price}`;                  //Recuperation des données de l'api sous forme de variable
    let productColors = `${product.colors}`;
    
    selectImgClass.innerHTML = `<img src="${productImgUrl}" alt="${productAltText}">`
    selectTitle.innerHTML = `${productName}`
    selectPrice.innerHTML = `${productPrice}`
    selectDescription.innerHTML = `${productDescription}`
    
    for (let i = 0;i < `${product.colors.length}`; i++){        //Boucle qui, pour chaque unité du tableau, l'ajoute à la liste puis recommence jusqu'à être à la fin de l'array
        selectColorOption.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
        
        
    }
}


function getProduct() {
    return fetch(`http://localhost:3000/api/products/${getProductId}`)
    .then((res) => {
        return res.json();                                      //Recupération des infos correspondant au produit qui a le même id que celui dans l'url
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
    
    
    let i = parseInt(localStorage.length)/3
    const selectButton = document.getElementById("addToCart")                                                   
    
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
    
        
    let productInfos = localStorage.getItem("product" +i)
    let productInfosObj = JSON.parse(productInfos)  
    
    let addToCart = async() => {
        let infos = await getProduct();
        if()
        localStorage.setItem("product"+i, JSON.stringify(infos))
        localStorage.setItem('colorValue'+i, selectColorOption.value)
        localStorage.setItem('quantity'+i, selectQuantity.value)
        ++i
    }
    
    
    
    selectButton.addEventListener("click", addToCart)


    console.log(i);