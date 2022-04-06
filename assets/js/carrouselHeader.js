const api_key = '94d3b735c0a1582c1b3cb985eee421a1';

const fetchData = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=94d3b735c0a1582c1b3cb985eee421a1&language=fr-FR&page=1', {cache: "no-cache"});
    return await data.json();
}

let titleMovie = [];
let synopsis = [];
let poster = [];
let release = [];
let dateCut = [];
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

        // Création des images
        for(i = 0; i < nbr; i++)
        {
            div = document.createElement('img');
            div.className = "photo";
            div.src = linkImg + poster[i];
            if(div.src == 'https://image.tmdb.org/t/p/originalnull')
            {
                div.src = '../assets/img/ugly_doggy.png'
            }
            div.style.width = '627px';
            div.style.height = '290px';
            container.appendChild(div);
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
                
            container.style.transform = "translate("+ p * 627 + "px)";
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

            container.style.transform = "translate("+ p * 627 + "px)";
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