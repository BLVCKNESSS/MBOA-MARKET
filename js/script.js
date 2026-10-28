/*
======================================
gestion de l'entete
=====================================
*/
const entete= document.querySelector("#entete");
window.addEventListener("scroll",function(e){
if(window.scrollY > 50){
    entete.classList.add("enetete_fond");
}
else{
    entete.classList.remove("enetete_fond");
}
});