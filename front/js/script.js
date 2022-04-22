const apiLink = "http://localhost:3000/api/products"

fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function(productsList){
        console.log(productsList)
        
        for(let product of productsList){
        console.log(product)
        
        const newAnchor = document.createElement("a")       //Crée une balise a
        const newArticle = document.createElement("article")  //Crée une balise article
        
        newArticle.setAttribute("id", "articlepart")
        
        let itemsPartSelector = document.getElementById("items")   //Variabe pour selectionner directement la partie items 
        let productId = `${product._id}`            //Variable pour récupérer l'id des produits
        
        console.log(productId)
        itemsPartSelector.appendChild(newAnchor)        //Crée un enfant en utilisant la variable qui crée une balise a
        itemsPartSelector.innerHTML = `<a href=.../${productId} id=itemsanchor>`  //Injection de l'html pour la balise a
        
        let itemsAnchor = document.getElementById("itemsanchor") //Selectionner la balise a avec l'id itemsanchor
        
        itemsAnchor.appendChild(newArticle)     //Crée une balise article à l'intérieur de la balise a 
        
        const newImage = document.createElement("img")  //Crée une balise img
        let itemsArticle = document.getElementById("articlepart")       // selection de la partie ayant pour id 'article'
        let productImgUrl = `${product.imageUrl}`       //Recuperation des données de l'API sous forme de variable
        let productAltText = `${product.altTxt}`        // ""          ""               ""           ""           ""
        
        itemsArticle.innerHTML = `<img src=${productImgUrl} alt=${productAltText}>` //injection de l'html pour la balise img
        console.log(itemsArticle)
        
        const newTitle3 = document.createElement("h3") //const pour créer une balise h3
        
        itemsArticle.appendChild(newTitle3) //Crée une balise h3 à l'intérieur de l'article
        
        newTitle3.setAttribute("class", "productName")      //Ajoute la class productName au titre h3
        newTitle3.setAttribute("id", "itemTitle")       //Ajoute l'id itemTitle au titre h3
        
        let productTitle = document.getElementById("itemTitle")     //Selectionne la balise h3 ayant pour id itemTitle
        let productName = `${product.name}`             //Recuperation des données de l'api sous forme de variable
        
        productTitle.textContent = `${productName}`                 //Injection sous forme de texte du titre du produit     
        console.log(productTitle)
        
        const newParagraphs = document.createElement("p")           //const pour créer un nouveau paragraphe
        newParagraphs.setAttribute("class", "productDescription")       //ajoute une class productDescription au paragraphe
        newParagraphs.setAttribute("id", "productDescription")      //aujourde un nouvel id product Description au paragraphe 
        
        itemsArticle.appendChild(newParagraphs)     //CRée un nouveau paragraphe à l'intérieur de la balise article 
        
        let itemsDescription = document.getElementById("productDescription")        //variable pour sélectionner l'objet ayant pour id productDescription
        let productDescription = `${product.description}`                   //Recuperation des données de l'api sous forme de variable 
        
        itemsDescription.textContent = `${productDescription}`              //injection sous forme de texte de la description du produit à partir de l'api
        console.log(itemsDescription)
        
        
        
        /*productsList.forEach(product => {
            
            itemsPartSelector.innerHTML = `<a href="${productId}">
            <article>
              <img src="${productImgUrl}" alt="${productAltText}">
              <h3 class="productName">${productName}</h3>
              <p class="productDescription">${productDescription}</p>
            </article>
          </a>`
        });*/




        
    }
})

.catch(function(err){
});






