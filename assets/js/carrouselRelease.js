const dataFetch = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=94d3b735c0a1582c1b3cb985eee421a1&primary_release_year=2022&language=fr-FR', {cache: "no-cache"})
    return await data.json();
}

let posterCarrousel2 = [];
let titleCarrousel2 = [];
let voteCarrousel2 = [];
let synopsisCarrousel2 = [];

//je remplies des sous-tableaux avec les données que je récupère
getData = (arr) => {
    return arr.results.forEach(el => {
        posterCarrousel2.push(el.poster_path);
        titleCarrousel2.push(el.title);
        voteCarrousel2.push(el.vote_average);
        synopsisCarrousel2.push(el.overview);
    });
}

dataFetch()
    .then(r => {
        getData(r);

        let nombreImg = titleCarrousel2.length;
        
        //position par défaut du Carrousel
        pos = 0;
        
        //manipulation du dom
        const containerCarrousel2 = document.getElementById("containerCarrousel2");
        const g = document.getElementById("flecheGauche");
        const d = document.getElementById("flecheDroite");
    

        //je débute le comportement des flèches de nav du carrousel
        comportementFleche();

        //taille du container en fonction du nombre d'images
        containerCarrousel2.style.width = (210*nombreImg)+"px"; 

        //je crée les images
        for(let i = 0; i < nombreImg; i++) {
            img = document.createElement('img');
            img.className = "photo";
            img.src = 'https://image.tmdb.org/t/p/original' + posterCarrousel2[i];
            img.style.width = '250px'
            img.style.height = '285px'
            containerCarrousel2.appendChild(img)
        }

        //je crée le déplacement quand je clique à gauche
        g.onclick = function(){
            if(pos > -19) {
                pos--;
                containerCarrousel2.style.transform="translate("+pos*210+"px)"
                containerCarrousel2.style.transition="all 0.3s ease";
            }
            comportementFleche()
        }

        //je crée le déplacement quand je clique à droite
        d.onclick = function(){
            if(pos < 0) {
                pos++;
                containerCarrousel2.style.transform="translate("+pos*210+"px)";
                containerCarrousel2.style.transition="all 0.3s ease";
            }
            comportementFleche()
        }

        //image cliquable 
        const modal = document.querySelector('.modal');
        const close = document.querySelector('.btn-close');
        const closeBtn = document.querySelector('.btn');
        const pictures = document.getElementsByClassName("photo");

        for(let j = 0; j < nombreImg ; j++) {
            pictures[j].onclick = function(){
            modal.style.display="block"
            close.onclick = function(){
                modal.style.display = "none"
            }
            closeBtn.onclick = function(){
                modal.style.display = "none"
            }}
        }

        // ajout des données
        nbrMovie = 5;
        document.querySelector(".modal-title").innerHTML = `"` + titleCarrousel2[nbrMovie] + `" / Evaluation des spectateurs : ` + voteCarrousel2[nbrMovie];
        document.querySelector(".modal-body").innerHTML = `"` + synopsisCarrousel2[nbrMovie] + `"`
        
        //création de la fonction permettant d'afficher ou non les flèches
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