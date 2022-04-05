const api_key = '94d3b735c0a1582c1b3cb985eee421a1';


const fetchData = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=94d3b735c0a1582c1b3cb985eee421a1&language=en-US&page=1', {cache: "no-cache"});
    return await data.json();
}

console.log(fetchData());

let titleMovie = [];
let synopsis = [];
let poster = [];
let release = [];
const linkImg = 'https://image.tmdb.org/t/p/original';

let getFilmData = (arr) =>
{
    console.log(arr.results);
    return arr.results.forEach(elem => 
        {
           titleMovie.push(elem.title);
           synopsis.push(elem.overview);
           poster.push(elem.poster_path);
           release.push(elem.release_date); 
        })
}

fetchData()
    .then(res => {        
        
        getFilmData(res);   
        
        
        console.log(titleMovie.length);

            // Nbre d'images
            nbr = titleMovie.length;

            // Position du carrousel
            p = 0;
            afficherMasquer(); 

            moviesCount = 0;
            document.getElementById('titleTop').innerHTML = titleMovie[moviesCount];  
            document.getElementById('releaseTop').innerHTML = release[moviesCount];
        
            container = document.getElementById('containerMain');
            buttonGauche = document.getElementById('g');
            buttonDroit = document.getElementById('d');
        
            container.style.width = (400 * nbr) + "px";

        for(i = 0; i <= nbr; i++)
        {
            console.log(poster[i]);
            
            div = document.createElement('img');
            div.className = "photo";
            div.src = linkImg + poster[i];
            div.style.width = '400px';
            div.style.height = '500px';
            container.appendChild(div);
        }
            // for(i = 1; i <= nbr; i++)
            // {
            //     div = document.createElement('div');
            //     div.className = "photo";
            //     div.style.backgroundImage="url('../assets/img/dog"+i+".png')";
            //     container.appendChild(div);
            // }

        // Codes correspondant aux fleches du carrousel 

        // Fleches gauche
        g.onclick = function()
        {
             if((-nbr+1) < p)
        
            p--;
            moviesCount++;

            container.style.transform = "translate("+ p * 400 + "px)";
            container.style.transition = "all 0.5s ease";        
            afficherMasquer();
            document.getElementById('titleTop').innerHTML = titleMovie[moviesCount];  
            document.getElementById('releaseTop').innerHTML = release[moviesCount];           
        }


        // Feches droite
        d.onclick = function()
        {   
            if( p <= 0)
            {
                p++;
                moviesCount --;

                container.style.transform = "translate("+ p * 400 + "px)";
                container.style.transition = "all 0.5s ease";
            }
        document.getElementById('titleTop').innerHTML = titleMovie[moviesCount];  
        document.getElementById('releaseTop').innerHTML = release[moviesCount];
        afficherMasquer();
        }        
        
        console.log(titleMovie);
        console.log(p);
        
    })
    
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



console.log(fetchData());