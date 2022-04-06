const dataFetch = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=94d3b735c0a1582c1b3cb985eee421a1&primary_release_year=2022%27')
    return await data.json();
}
dataFetch()
.then(res =>
    {
        getData(res);
    })
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
    
}
console.log(vote);