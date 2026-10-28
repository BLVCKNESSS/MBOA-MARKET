const produits= document.querySelector("#produits");

/*
======================================
chargement des produits 
=====================================
*/

async function chargerProduits(){
    try{
const reponse= await fetch("data/produits.json");
if(!reponse.ok){
    throw new Error("Fichier data/produits.json introuvable");
}
datas= await reponse.json();
console.log(datas);
    }
    catch(erreur) {
console.error(erreur);
produits.innerHTML= `
<p class="danger">
 Impossible de charger les produits.
 </p>
 `;
    }
}

chargerProduits();