const apiLink = "http://localhost:3000/api/products";
const itemsPartSelector = document.getElementById("items");   //Variabe pour selectionner directement la partie items 


    
    (async function () {
        const productList = await getProducts();        //Injection des produits sur la page d'accueil
        for (let product of productList) {
            displayProduct(product);
        }
    })();
    
    
    function getProducts() {
        return fetch("http://localhost:3000/api/products")
        .then((res) => {
            return res.json();                                      //Recupération de chaque article et json + retour d'erreur
        })
        .then((products) => {
            return products;
        })
        .catch((error) => {
            alert(
                "Une erreur est survenue."
                );
        });
    }
    
    
    
    function displayProduct(product) {              //Création du html pour chaque card de produit
        let productId = `${product._id}`;            //Variable pour récupérer l'id des produits        
        let productImgUrl = `${product.imageUrl}`;       //Recuperation des données de l'API sous forme de variable
        let productAltText = `${product.altTxt}`;       // ""          ""               ""           ""           ""     
        let productName = `${product.name}`;             //Recuperation des données de l'api sous forme de variable       
        let productDescription = `${product.description}`;                   //Recuperation des données de l'api sous forme de variable    
        itemsPartSelector.innerHTML += ` <a href=./product.html?id=${productId}>
        <article>
        <img src=${productImgUrl} alt=${productAltText}>
        <h3 class="productName">${productName}</h3>
        <p class="productDescription">${productDescription}</p>
        </article>
        </a> `;
    }

    //Affichage du nombre d'article(s) dans le panier entre parenthèses
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