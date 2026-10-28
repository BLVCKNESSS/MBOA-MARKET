const carrousel= document.querySelector("#carrousel");
/*
======================================
declaration des donnees
=====================================
*/

const datas_slide= [
    {
        titre:"le gout du pays, livre chez vous",
        description:"Miel, Epices, cafes, pagnes et soins natures "
    },
     {
        titre:"les cafes du haut plateaux",
        description:"Arabica, Epices, cafes. le cordiceps militarices fortifie et donne une vitaliter"
    },
     {
        titre:"Poivre blanc et noir de Penja",
        description:"Le poivre de Penja est un poivre de qualité supérieure, reconnu pour son goût unique et sa saveur intense. Il est cultivé dans la région de Penja au Cameroun."
    }
]

carrousel.innerHTML= "";
for(let i=0; i<datas_slide.length; i++){
    const data= datas_slide[i];
    carrousel.innerHTML += `
      <div
          class="slide"
          style="background-image: url('images/slide${i + 1}.jpg')">
          <div class="slide_container">
            <div class="slide_text">
              <h2>${data.titre}</h2>
              <p>
                ${data.description}
              </p>
              <div class="buttons">
                <a href="#"> En savoir +</a>
              </div>
            </div>
          </div>
        </div>
    `;
}
carrousel.innerHTML += `
 <!-- boutons d'option du slide -->
        <div class="slide_options">
          <span class="slide_left"><i class="fa-solid fa-chevron-left"></i></span>
          <span class="slide_right"><i class="fa-solid fa-chevron-right"></i></span>
        </div>
`;

/*
======================================
declaration des variables 
=====================================
*/

const slides = document.querySelectorAll("#carrousel .slide");
const slide_left = document.querySelectorAll("#carrousel .slide_left");
const slide_right = document.querySelectorAll("#carrousel .slide_right");

// contient l'indice du slide actuellement affiché
let slide_courant = 0;


/*
====================================
MASQUER TOUT LES SLIDES SAUF LE PREMIER
====================================
*/

for(let i=1; i< slides.length; i++) {
    slides[i].classList.add('hide');
}

/*
====================================
QUELQUES FONCTIONS UTILES
====================================
*/

//FONCTION PERMETTANT D'AFFICHER UN SLIDE

function showSlide(index,direction) {
    //on masque le slide courant
    slides[slide_courant].classList.add('hide');

    //on cherche l'indice du nouveau slide a afficher
    if(direction.trim().toLowerCase() == "right")  {
        if(index >= slides.length){
            slide_courant=0;
        }
        else {
            slide_courant=index;
        }
    }
    else if(direction.trim().toLowerCase() == "left") {
        if(index < 0){
            slide_courant=slides.length - 1;        }
        else {
            slide_courant=index;
        }
    }
    else {
        slide_courant= index;
    }
//on affiche le slide courant 
    slides[slide_courant].classList.remove('hide');
}

/*
====================================
LANCER LE SLIDE
====================================
*/

slide_left.forEach(function(element) {
    element.addEventListener("click", function(e) {
        showSlide(slide_courant - 1, "left");
    });
});

slide_right.forEach(function(element) {
    element.addEventListener("click", function(e) {
        showSlide(slide_courant + 1, "right");
    });
});


/*
====================================
LANCER LE SLIDE AUTOMATIQUEMENT
====================================
*/

setInterval(function() {
     showSlide(slide_courant + 1, "right");
}, 5000);