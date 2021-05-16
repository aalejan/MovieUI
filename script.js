const form = document.querySelector('[data-form]')
const inputSearch = document.querySelector('[data-search]') 
import 'regenerator-runtime/runtime'
const moviesList = document.querySelector('[data-movies-list]')
const apiKey = 'a60c16eaddacf852ba0fc28403a21c8b'
const IMGPATH = ''

const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`

showMovies(apiUrl)
function showMovies(url){
    const fetchData = async () => {
        const response = await fetch(url)
        const data = await response.json()
        const results = data.results
        console.log(results)
        results.forEach(result => {
            const movieEl = document.createElement('div')
            const movieTitle = document.createElement('h2')
            const moviePoster = document.createElement('img')

            moviePoster.src = `https://image.tmdb.org/t/p/w500/${result.poster_path}`
            movieTitle.innerText= `${result.title}`
            

           movieEl.appendChild(movieTitle)
           movieEl.appendChild(moviePoster)
            moviesList.appendChild(movieEl)
        })
    }
    fetchData()
    
}
