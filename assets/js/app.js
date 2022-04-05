const dataFetch = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=94d3b735c0a1582c1b3cb985eee421a1&primary_release_year=2022')
    return await data.json();
}

let poster = [];
let title = [];
let vote = [];
let synopsis = [];

//je remplies des sous-tableaux avec les données que je récupère
function getData(arr){
    return arr.results.forEach(el => {
        poster.push(el.poster_path);
        title.push(el.title);
        vote.push(el.vote_average);
        synopsis.push(el.overview);
    });
    //console.log(poster);
}

dataFetch()
    .then(r => {
        getData(r);

        let nombreImg = title.length;
        //position par défaut du carousel
        p = 0;

        //manipulation du dom
        container = document.getElementById("container");
        g = document.getElementById("flecheGauche")
        d = document.getElementById("flecheDroite")

        container.style.width = (400*nombreImg) + "px"

        //je crée les images
        for(let i = 0; i < nombreImg; i++) {
            img = document.createElement('img');
            img.className = "photo";
            img.src = 'https://image.tmdb.org/t/p/original' + poster[i];
            img.style.width = '250px'
            img.style.height = '300px'
            container.appendChild(img)
        }

        //je crée le déplacement quand je clique à gauche
        g.onclick = function(){
            if(p > -nombreImg+1) {
                p--;
                container.style.transform="translate("+p*400+"px)"
                container.style.transition="all 0.5s ease"
            }
            
        }

        //je crée le déplacement quand je clique à droite
        d.onclick = function(){
            if(p < 0) {
                p++;
                container.style.transform="translate("+p*400+"px)";
                container.style.transition="all 0.5s ease"
            }
            
        }
    })