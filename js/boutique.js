/*
========================================
DECLARATION DES VARIABLES
=========================================
*/
let DATAS_PRODUITS = null;
const produits = document.querySelector("#produits");
const nb_articles = document.querySelector("#nb_articles");
const btn_panier = document.querySelector("#btn_panier");
const modal_commande = document.querySelector("#modal_commande");
const liste_produits = document.querySelector("#liste_produits");
const total_commande = document.querySelector(".total_commande");
const modal_form = document.querySelector("#modal_form");
const btn_valider = document.querySelector("#btn_valider");
const confirmation = document.querySelector("#confirmation");

/*
=========================
QUELQUES FONCTIONS UTILES
=========================
*/
//Chargement des produits depuis le fichier json.
async function chargerProduits() {  //Dans une fonction asynchronne, il y'a tjr un await.
    try {
        const response = await fetch("data/produits.json");
        if (!response.ok) {
            throw new Error("Fichier data/produits.json introuvable");
        }

        const datas = await response.json();
        return datas;
    }
    catch (erreur) {
        console.error(erreur);
        produits.innerHTML = `
            <p class = "danger">
                Impossible de charger les produits.
            </p>
        `;
    }
}

//Afficher les produits
function afficherProduits(liste) {
    if (liste == null || liste.length == 0) {
        produits.innerHTML = `
            <p class = "message">
                <i class = "fa-solid fa-magnifying-glass"></i>
                Aucun produit trouvé
            </p>
        `;
    }
    else {
        produits.innerHTML = "";
        for (let i = 0; i < liste.length; i++) {
            const produit = liste[i];
            const html = `
                <div class = "produit">
                    <div class = "produit_icon" data-action = "detail" data-id = "${produit.id}">
                        <i class = "${produit.icon}"></i>
                    </div>
                    <div class = "produit_texte">
                        <span class = "produit_categorie">${produit.categorie}</span>
                        <h3 data-action = "detail" data-id = "${produit.id}"> ${produit.nom} </h3>
                        <p class = "produit_unite">${produit.unite}</p>
                        <p class = "produit_prix">${produit.prix} FCFA</p>

                        <div class = "produit_footer">
                            <div class = "produit_qte" data-stock = "${produit.stock}">
                                <span data-action = "moins" data-id = "${produit.id}">-</span>
                                <b class = "produit_qteCommande"> 1 </b>
                                <span data-action = "plus" data-id = "${produit.id}">+</span>
                            </div>
                            <button data-action = "ajouter" data-id = "${produit.id}">
                                <i class = "fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            produits.innerHTML += html;
        }
    }
}

//Retourne un produit à partir de son id
function rechercheProduit(id, liste) {
    return liste.find(function (val) {
        return val.id == id
    })
}


// supprimer un produit d'une liste a partir de son panier
function supprimerProduit(id, liste) {
    return liste.filter(function (val) {
        return String(val.id) !== String(id)
    });
}


//Initialisation du panier
function initPanier() {
    const panier = localStorage.getItem("panier");
    liste_produits.innerHTML = "";
    total_commande.textContent = "TOTAL : 0 FCFA";

    if (panier != null) {
        nb_articles.classList.remove('hide');
        let liste = JSON.parse(panier);
        nb_articles.textContent = liste.length;


        let total=0;
        for(let i=0; i< liste.length; i++){
            const produit=liste[i];
            liste_produits.innerHTML +=`
            <tr class="ligne_produit" data-id="${produit.id}">
            <td> ${produit.nom}</td>
               <td> ${produit.prix}</td>
                  <td> ${produit.qte}</td>
                     <td> ${produit.prix * produit.qte}</td>

                        <td class="options">
                        <button type="button" data-id="${produit.id}" class="delete" aria-label="Supprimer ${produit.nom}">
                        <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
                        </button>
                        </td>
            </tr>
            `;
            total = total + (produit.prix * produit.qte);
        }
        total_commande.textContent = `TOTAL : ${total} FCFA`;
    }
    else {
        nb_articles.textContent = 0;
        nb_articles.classList.add('hide');
    }
}

//Ajout d'un produit dans le panier
function ajoutProduitPanier(produit) {
    const panier = localStorage.getItem("panier");

    if (panier != null) {
        let liste = JSON.parse(panier);
        let data = rechercheProduit(produit.id, liste);

        if (data == null) {
            liste.push(produit);
            localStorage.setItem("panier", JSON.stringify(liste));  //stringify permet de convertir le tableau en JSON.
        }
        else {
            alert("Ce produit se trouve déjà dans le panier.");
        }
    }
    else {
        let liste = [produit];
        localStorage.setItem("panier", JSON.stringify(liste));
    }

    initPanier();
}


//Supprimer un produit dans le panier
function supprimerProduitPanier(id) {
    const panier = localStorage.getItem("panier");
    if (panier == null) {
        return;
    }

    let liste = JSON.parse(panier);
    liste = supprimerProduit(id, liste);

    if (liste.length == 0) {
        localStorage.removeItem("panier");
    } else {
        localStorage.setItem("panier", JSON.stringify(liste));
    }
    initPanier();
}

/*
=========================
CHARGEMENT DES PRODUITS
=========================
*/
async function initBoutique() {
    initPanier();   //On appele initPanier ici parceque l'on veut que lorsque l'on actualise la page, les produits restent tjr dans le panier.
    DATAS_PRODUITS = await chargerProduits();
    console.log(DATAS_PRODUITS);
    afficherProduits(DATAS_PRODUITS);
}


/*
=========================
GESTION DES EVENEMENTS
=========================
*/
produits.addEventListener("click", function (e) {
    const element = e.target.closest('[data-action]');

    //Décrémentation de la quantité d'un produit.
    if (element.matches('[data-action = "moins"]')) {
        const bloc = element.parentNode.querySelector('b');

        if (parseInt(bloc.textContent) > 1) {
            bloc.textContent = parseInt(bloc.textContent) - 1;
        }
    }

    //Incrémentation de la quantité d'un produit.
    if (element.matches('[data-action = "plus"]')) {
        const bloc = element.parentNode.querySelector('b');
        const stock = element.parentNode.dataset.stock;

        if (parseInt(bloc.textContent) < stock) {
            bloc.textContent = parseInt(bloc.textContent) + 1;
        }
    }

    //Incrémentation (ajout) d'un produit au panier.
    if (element.matches('[data-action = "ajouter"]')) {
        const id = element.dataset.id;
        const qte = parseInt(element.parentNode.querySelector(".produit_qteCommande").textContent);
        let produit = rechercheProduit(id, DATAS_PRODUITS);

        if (produit != null) {
            produit.qte = qte;
            ajoutProduitPanier(produit);
        }
        else {
            alert("Ce produit se trouve déjà dans le panier.");
        }
    }
});


initBoutique();

btn_panier.addEventListener("click", function(e){
e.preventDefault();
initPanier();
modal_form.classList.remove("hide");
confirmation.classList.add("hide");
modal_commande.classList.remove("hide");
});


modal_commande.addEventListener("click", function(e) {
if (e.target.closest('#modal_fermer') != null) {
    modal_commande.classList.add("hide");
}

if (e.target.closest('.delete') != null) {
    const ligne = e.target.closest('.ligne_produit');
    supprimerProduitPanier(ligne.dataset.id);
}

});

modal_form.addEventListener("submit", function(e) {
    e.preventDefault();

    const panier = JSON.parse(localStorage.getItem("panier") || "[]");
    if (panier.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    confirmation.classList.remove("hide");
    confirmation.textContent = "Votre commande a été validée avec succès.";
    modal_form.classList.add("hide");
    localStorage.removeItem("panier");
    initPanier();
});