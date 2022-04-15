const api_key = '94d3b735c0a1582c1b3cb985eee421a1';

let carrouselWidth = document.getElementById("containerMain").offsetWidth; 
let carrouselHeight = document.getElementById("containerMain").offsetHeight; 

console.log(carrouselWidth);

const fetchData = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=94d3b735c0a1582c1b3cb985eee421a1&language=fr-FR&page=1', {cache: "no-cache"});
    return await data.json();
}

let titleMovie = [];
let synopsis = [];
let poster = [];
let release = [];
let dateCut = [];
let voteUsers = [];
const linkImg = 'https://image.tmdb.org/t/p/original';

console.log(fetchData());

// On stock les données reçu dans la réponse JSON dans des tableaux
let getFilmData = (arr) =>
{
    return arr.results.forEach(elem => 
        {
           titleMovie.push(elem.title);
           synopsis.push(elem.overview);
           poster.push(elem.backdrop_path);
           release.push(elem.release_date); 
           voteUsers.push(elem.vote_average);
        })
}

// Transforme la date anglaise en date française
function changeDateFr()
{
    for(let i = 0; i < release.length; i++)
        {
            let dateSplit = release[i].split('-');
            dateCut.push(dateSplit);
        }
}

// Function pour changer les éléments du carrousel (titre et date de sortie)
function changeInfos()
{
    document.getElementById('titleTop').innerHTML = titleMovie[moviesCount];  
    document.getElementById('releaseTop').innerHTML = dateCut[moviesCount][2] + '-' + dateCut[moviesCount][1] + '-' + dateCut[moviesCount][0];  
}

fetchData()
    .then(res => {           
        
        // On lance la fonction getFilmData avec comme arguments la réponse JSON
        getFilmData(res);

        // On lance la fonction changeDateFr pour transformer les dates
        changeDateFr();
        
        console.log(dateCut);
            // Nbre d'images
            nbr = titleMovie.length;

            // Position du carrousel
            p = 0;

            // Lancement de la fonction pour afficher/Masquer les fléches de naviguation
            afficherMasquer(); 

            // Variable pour modifier le titre et la date de release
            moviesCount = 0;

            // On lance la fonction changeInfos() pour modifier le titre et la date de sortie
            changeInfos()
        
            container = document.getElementById('containerMain');
            buttonGauche = document.getElementById('g');
            buttonDroit = document.getElementById('d');
            container.style.width = (627 * nbr) + "px";

            window.onclick = function(e){
                if(e.target == modal){
                    modal.style.display = "none"
                }
            }
            
        // Création des images
        for(i = 0; i < nbr; i++)
        {
            div = document.createElement('img');
            div.className = "photo";
            div.alt="Poster du film";
            div.src = linkImg + poster[i];
            if(div.src == 'https://image.tmdb.org/t/p/originalnull')
            {
                div.src = 'assets/img/ugly_doggy.png'
            }
            div.style.width = '627px';
            div.style.height = '290px';
            container.appendChild(div);
        }
            //////////////////////////////////////////////////////////////////////////////
                            // Codes correspondant au modal 

            const modal = document.querySelector('.modal');
            const close = document.querySelector('.btn-close');
            const closeBtn = document.querySelector('.btn');
            const pictures = document.getElementsByClassName("photo");
    
        
            for(let j = 0; j < nbr ; j++) {

                pictures[j].onclick = function(){

                    // Ajouts du titre et la popularité du film
                    document.querySelector(".modal-title").innerHTML = `"` + titleMovie[j] + `" | Note : ` + voteUsers[j];

                    // Ajouts du synopsis
                    document.querySelector(".modal-body").innerHTML = `"` + synopsis[j] + `"`
                    if (synopsis[j] === "") {
                        document.querySelector(".modal-body").innerHTML = "Synopsis à venir..."
                    }
                    
                    // Affichage du modal
                    modal.style.display="block"
                    close.onclick = function(){
                        modal.style.display = "none"
                    }
                    closeBtn.onclick = function(){
                        modal.style.display = "none"
                    }}
            }

            //////////////////////////////////////////////////////////////////////////////
                            // Codes correspondant aux fleches du carrousel 

        // Fonction de la "Fléche gauche"
        g.onclick = function()
        {
            if((-nbr+1) < p)
            {
                p--;
                moviesCount++;                
            }
                
            container.style.transform = "translate("+ p * carrouselWidth + "px)";
            container.style.transition = "all 0.5s ease";   

            afficherMasquer();
            changeInfos()          
        }

        // Fonction de la "fléche droite"
        d.onclick = function()
        {   
            if( p < 0)
            {
                p++;
                moviesCount --;
            }

            container.style.transform = "translate("+ p * carrouselWidth + "px)";
            container.style.transition = "all 0.5s ease";

            afficherMasquer();
            changeInfos() 
        }        
    })
    
// Fonction pour afficher/Masquer les fléches de naviguation
function afficherMasquer()
{
    if(p == (-nbr+1) )
    
        g.style.visibility = "hidden";
    
    else
    
        g.style.visibility = "visible";
    

    if(p == 0 )
    
        d.style.visibility = "hidden";
    
    else
    
        d.style.visibility = "visible";
    
}
    
// function carousel()
// {
//     document.body.onload = function()
//     {
//         // Nbre d'images

        
//         // Position du carrousel
//         p = 0;
    
//         container = document.getElementById('containerMain');
//         buttonGauche = document.getElementById('g');
//         buttonDroit = document.getElementById('d');
    
//         container.style.width = (800 * nbr) + "px";
    
//         // for(i = 1; i <= nbr; i++)
//         // {
//         //     div = document.createElement('div');
//         //     div.className = "photo";
//         //     div.style.backgroundImage="url('../assets/img/dog"+i+".png')";
//         //     container.appendChild(div);
//         // }
//         afficherMasquer();
//     }
// }

// function fleches()
// {
//     g.onclick = function()
//     {
//         if((-nbr+1) < p)
        
//             p--;

//             container.style.transform = "translate("+ p * 800 + "px)";
//             container.style.transition = "all 0.5s ease";
//             afficherMasquer();

        
//     }

//     d.onclick = function()
//     {
//         if( p < 0)
        
//             p++;

//             container.style.transform = "translate("+ p * 800 + "px)";
//             container.style.transition = "all 0.5s ease";
            
        
//         afficherMasquer();
//     }
// }


// function afficherMasquer()
//     {
//         if(p == (-nbr+1) )
        
//             g.style.visibility = "hidden";
        
//         else
        
//             g.style.visibility = "visible";
        

//         if(p == 0 )
        
//             d.style.visibility = "hidden";
        
//         else
        
//             d.style.visibility = "visible";
        
// }