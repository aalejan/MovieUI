const form = document.querySelector('[data-form]')
const inputSearch = document.querySelector('[data-search]') 
const homeLink = document.querySelector('[data-home]')
const moviesList = document.querySelector('[data-movies-list]')
const apiKey = 'a60c16eaddacf852ba0fc28403a21c8b'
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
const searchAPIUrl =` https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`
const trendingAPIURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
const comingSoonURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
const releaseDateFilter = document.querySelector('[data-release-date]')
const trendingMoviesFilter = document.querySelector('[data-trending]') 
const nowPlayingFilter = document.querySelector('[data-now_playing]')
const comingSoonFilter = document.querySelector('[data-coming-soon]')

let movies = []
showMovies(apiUrl)

function showMovies(url){
   
    const fetchData = async () => {
        const response = await fetch(url)
        const data = await response.json()
        const results = data.results
       movies = []
        // results.forEach(result => {
        //    renderMovie(result)
        //    movieIds.push(result.id)
        // })
              results.map(async(result) => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${result.id}?api_key=${apiKey}&language=en-US`)
                const data = await response.json()
               movies.push(data)
              renderMovie(data)
              console.log(movies)
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
    

   
   movieEl.appendChild(moviePoster)
   movieEl.appendChild(movieTitle)
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
    const sortedActivities = movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    
    moviesList.innerHTML = ''
    sortedActivities.forEach(activity => {
        renderMovie(activity)
    })
    console.log(sortedActivities)
}

releaseDateFilter.addEventListener('click', () => {
    sortByRelease()
})

trendingMoviesFilter.addEventListener('click', () => {
    moviesList.innerHTML = ''
    showMovies(trendingAPIURL)
})

nowPlayingFilter.addEventListener('click', () => {
    moviesList.innerHTML = ''
    showMovies(nowPlayingURL)
})

comingSoonFilter.addEventListener('click', () => {
    moviesList.innerHTML = ''
    showMovies(comingSoonURL)
})