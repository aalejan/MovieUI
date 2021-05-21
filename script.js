const form = document.querySelector('[data-form]')
const inputSearch = document.querySelector('[data-search]') 
const homeLink = document.querySelector('[data-home]')
import 'regenerator-runtime/runtime'
const moviesList = document.querySelector('[data-movies-list]')
const apiKey = 'a60c16eaddacf852ba0fc28403a21c8b'
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
const searchAPIUrl =` https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`
const releaseDateFilter = document.querySelector('[data-release-date]')
let movies = []



showMovies(apiUrl)
function showMovies(url){
    const fetchData = async () => {
        const response = await fetch(url)
        const data = await response.json()
        const results = data.results
        movies = [...results]
        results.forEach(result => {
           renderMovie(result)
        })
    }
    fetchData()
    
}

function renderMovie(item){
    const movieEl = document.createElement('div')
    const movieTitle = document.createElement('h2')
    const moviePoster = document.createElement('img')

    moviePoster.src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
    movieTitle.innerText= `${item.title}`
    

   movieEl.appendChild(movieTitle)
   movieEl.appendChild(moviePoster)
    moviesList.appendChild(movieEl)
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const search = inputSearch.value
   

    if(search){
        moviesList.innerHTML = ''
        showMovies(searchAPIUrl + search )
        inputSearch.value = ''
    }
    
})

homeLink.addEventListener('click', () => {
    showMovies(apiUrl)
    moviesList.innerHTML = ''
})


function sortByRelease(){
    const sortedActivities = movies.sort((a, b) => b.release_date - a.release_date)
    
}

releaseDateFilter.addEventListener('click', () => {

    sortByRelease()

})