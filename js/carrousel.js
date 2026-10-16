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
        titre:"Payez par mobile money",
        description:"Regler vos achats pas MTN Mobile money ou Orange money et faites vous livrez en 48h "
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

const slide= document.querySelectorAll("#carrousel .slide"); 
const slide_left= document.querySelector("#carrousel .slide_left"); 
const slide_right= document.querySelector("#carrousel .slide_right"); 
//contient l'indice du slide actuellemnt afficher
let slide_courant= 0;