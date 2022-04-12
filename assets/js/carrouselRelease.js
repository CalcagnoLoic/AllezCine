/**===========================================================
 * Création de la fonction asynchrone + récupération de l'API
 * ===========================================================
 */
const dataFetch = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=94d3b735c0a1582c1b3cb985eee421a1&primary_release_year=2022&language=fr-FR', {cache: "no-cache"})
    return await data.json();
}


/**===========================================================
 * Création de sous-tableaux + remplissage avec les infos
 * contenues dans l'API
 * ===========================================================
 */
let posterCarrousel2 = [];
let titleCarrousel2 = [];
let voteCarrousel2 = [];
let synopsisCarrousel2 = [];

getData = (arr) => {
    return arr.results.forEach(el => {
        posterCarrousel2.push(el.poster_path);
        titleCarrousel2.push(el.title);
        voteCarrousel2.push(el.vote_average);
        synopsisCarrousel2.push(el.overview);
    });
}

/**===========================================================
 * Création de la promesse 
 * ===========================================================
 */
dataFetch()
    .then(r => {
        getData(r);

        let nombreImg = titleCarrousel2.length;
        
        /**===========================================================
         *  Position par défaut du carrousel
         * ===========================================================
         */
        pos = 0;
        
        /**===========================================================
         * Récupération des éléments pour la manipulation du DOM
         * ===========================================================
         */
        const containerCarrousel2 = document.getElementById("containerCarrousel2");
        const g = document.getElementById("flecheGauche");
        const d = document.getElementById("flecheDroite");
    

        /**===========================================================
         * Ajout du comportement des flèches du carrousel
         * ===========================================================
         */
        comportementFleche();

        /**===========================================================
         * Définition de la taille du container en fonction du nombre
         * d'images présentes dans le carrousel
         * ===========================================================
         */
        containerCarrousel2.style.width = (210*nombreImg)+"px"; 

        /**===========================================================
         * Création des images avec la boucle for
         * ===========================================================
         */
        for(let i = 0; i < nombreImg; i++) {
            img = document.createElement('img');
            img.className = "photo";
            img.src = 'https://image.tmdb.org/t/p/original' + posterCarrousel2[i];
            img.alt="poster du film";
            img.style.width = '250px';
            img.style.height = '285px';
            containerCarrousel2.appendChild(img);
        }

        /**===========================================================
         * Création du déplacement lors du click à gauche
         * ===========================================================
         */
        g.onclick = function(){
            if(pos > -19) {
                pos--;
                containerCarrousel2.style.transform="translate("+pos*210+"px)"
                containerCarrousel2.style.transition="all 0.3s ease";
            }
            comportementFleche()
        }

        /**===========================================================
         * Création du déplacement lors du click à droite
         * ===========================================================
         */
        d.onclick = function(){
            if(pos < 0) {
                pos++;
                containerCarrousel2.style.transform="translate("+pos*210+"px)";
                containerCarrousel2.style.transition="all 0.3s ease";
            }
            comportementFleche()
        }

        /**===========================================================
         * Sélection des éléments pour manipuler le DOM + création de 
         * la boucle afin de complétement le modal
         * ===========================================================
         */
        const modal = document.querySelector('.modal');
        const close = document.querySelector('.btn-close');
        const closeBtn = document.querySelector('.btn');
        const pictures = document.getElementsByClassName("photo");        

        for(let j = 0; j < nombreImg ; j++) {
            pictures[j].onclick = function(){
                /**====================================================
                 * Ajout du titre et de la popularité du film
                 * ===================================================
                 */
                document.querySelector(".modal-title").innerHTML = `"` + titleCarrousel2[j] + `" / Evaluation des spectateurs : ` + voteCarrousel2[j];

                /**====================================================
                 * Ajout du synopsis de chaque film
                 * ===================================================
                 */
                //j'ajoute le synopsis
                document.querySelector(".modal-body").innerHTML = `"` + synopsisCarrousel2[j] + `"`
                if (synopsisCarrousel2[j] === "") {
                    document.querySelector(".modal-body").innerHTML = "Synopsis à venir..."
                }

                /**====================================================
                 * Comportement de la fenêtre modal en fonction du 
                 * click sur l'image ou sur le bouton de fermeture
                 * ===================================================
                 */
            
                modal.style.display="block"
                close.onclick = function(){
                    modal.style.display = "none"
                }
                closeBtn.onclick = function(){
                    modal.style.display = "none"
                }
                window.onclick = function(e){
                    if(e.target == modal){
                        modal.style.display = "none"
                    }
                }
            }
        }

        /**===========================================================
         * Création de la fonction permettant d'afficher ou non les 
         * flèches en début et fin de carrousel
         * ===========================================================
         */
        function comportementFleche(){
            if(pos==(-nombreImg+1)) {
                g.style.visibility="hidden";
            } else {
                g.style.visibility = "visible";
            }
            if(pos==0) {
                d.style.visibility="hidden";
            } else {
                d.style.visibility = "visible";
            }
        }
    })

    //-------------------------------------------
  

    // let dates_release = [];
   
    
    
    // getData = (arr) => {
    //     return arr.dates.forEach(el => {
    //         dates_release.push(el.maximum);
            
    //     });
    // }
    
