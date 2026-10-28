/*
======================================
gestion de l'entete
=====================================
*/
const entete= document.querySelector("#entete");
window.addEventListener("scroll",function(e){
if(window.scrollY > 50){
    entete.classList.add("entete_fond");
}
else{
    entete.classList.remove("entete_fond");
}
});