const api_key = '94d3b735c0a1582c1b3cb985eee421a1';

const fetchData = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=94d3b735c0a1582c1b3cb985eee421a1&language=en-US&page=1', {cache: "no-cache"});
    return await data.json();
}

document.body.onload = function()
{
    // Nbre d'images
    nbr = 5;
    
    // Position du carrousel
    p = 0;

    container = document.getElementById('containerMain');
    buttonGauche = document.getElementById('g');
    buttonDroit = document.getElementById('d');

    container.style.width = (800 * nbr) + "px";

    for(i = 1; i <= nbr; i++)
    {
        div = document.createElement('div');
        div.className = "photo";
        div.style.backgroundImage="url('../assets/img/dog"+i+".png')";
        container.appendChild(div);
    }
    afficherMasquer();
}
    g.onclick = function()
    {
        if((-nbr+1) < p)
        
            p--;

            container.style.transform = "translate("+ p * 800 + "px)";
            container.style.transition = "all 0.5s ease";
            afficherMasquer();

        
    }

    d.onclick = function()
    {
        if( p < 0)
        
            p++;

            container.style.transform = "translate("+ p * 800 + "px)";
            container.style.transition = "all 0.5s ease";
            
        
        afficherMasquer();
    }

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

console.log(fetchData());