
/*
======================================
declaration des variables
=====================================
*/
const produits = document.querySelector("#produits");


/*
======================================
creation d'un produit
=====================================
*/

/*
function creerProduit(produit) {
    // 1. On cree une div pour la carte du produit
    const carte = document.createElement("div");
    carte.classList.add("produit");

    // 2. On remplit la carte avec les infos du produit
    carte.innerHTML = `
        <i class="${produit.icon}"></i>
        <h3>${produit.nom}</h3>
        <p>${produit.description}</p>
        <p><strong>${produit.prix} FCFA</strong> / ${produit.unite}</p>
        <p>Stock : ${produit.stock}</p>
        <button>Ajouter au panier</button>
    `;

    // 3. On ajoute la carte dans la zone #produits de la page
    produits.appendChild(carte);
}
*/

/*
======================================
quelques fonctions utiles
=====================================
*/

// chargement des produits depuis le fichiers json

async function chargerProduits() {
    try {
        const reponse = await fetch("data/produits.json");
        if (!reponse.ok) {
            throw new Error("Fichier data/produits.json introuvable");
        }
        const datas = await reponse.json();
        return datas;

        /*
        // On vide la zone avant d'afficher les produits
        produits.innerHTML = "";
        
        // On parcourt la liste et on cree une carte pour chaque produit
        for (let produit of datas) {
            creerProduit(produit);
        }
        */
    }
    catch (erreur) {
        console.error(erreur);
        produits.innerHTML = `
<p class="danger">
 Impossible de charger les produits.
 </p>
 `;
    }
}

// Afficher les produits
function afficherProduits(liste) {
    if (liste == null || liste.length == 0) {
        produits.innerHTML = `
        <p class="message">
        <i class="fa-solid fa-magnifying-glass"></i>
        Aucun produit trouve
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
                        <p class = "produit_unite">${produit.unite}</span>

                        <div class = "produit_footer">
                            <b> ${produit.prix} </b>
                            <button data-action = "ajouter" data-id = "${produit.id}">
                                <i class = "fa-solid fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            produits.innerHTML += html;
        }
    }
}

/*
======================================
chargement des produits
=====================================
*/
async function initBoutique() {
    const datas = await chargerProduits();
    console.log(datas);

    afficherProduits(datas);
}
initBoutique();
