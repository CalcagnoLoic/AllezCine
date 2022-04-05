const api_key = '94d3b735c0a1582c1b3cb985eee421a1';


const fetchData = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=94d3b735c0a1582c1b3cb985eee421a1&language=en-US&page=1', {cache: "no-cache"});
    return await data.json();
}

let titleMovie = [];
let synopsis = [];
let poster = [];
let release = [];
//const linkImg = 'https://image.tmdb.org/t/p/original'

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
console.log(fetchData())
