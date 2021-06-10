import 'regenerator-runtime/runtime'
import {dateFormatter} from './utils/dateFormatter'
import {formatRuntime} from './utils/runtimeFormatter'
const form = document.querySelector('[data-form]')
const inputSearch = document.querySelector('[data-search]') 
const homeLink = document.querySelector('[data-home]')
const moviesList = document.querySelector('[data-movies-list]')
const apiKey = 'a60c16eaddacf852ba0fc28403a21c8b'
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
const searchAPIUrl =` https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`
const trendingAPIURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1&region=US`
const comingSoonURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1&region=US`
const releaseDateFilter = document.querySelector('[data-release-date]')
const trendingMoviesFilter = document.querySelector('[data-trending]') 
const nowPlayingFilter = document.querySelector('[data-now_playing]')
const comingSoonFilter = document.querySelector('[data-coming-soon]')
const watchListOption = document.querySelector('[data-watchlist]')

 let movies = []
let watchlist = []
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
    const addToListBtn = document.createElement('button')
    addToListBtn.setAttribute('data-add-watchlist', '')
    addToListBtn.classList.add('addButton')
    const movieEl = document.createElement('div')
    movieEl.setAttribute('data-movie', '')
    movieEl.dataset.movieId = item.id
    const movieTitle = document.createElement('h2')
    const moviePoster = document.createElement('img')
    const imgOverlay = document.createElement('div')
    imgOverlay.classList.add('overlay')
    const movieDescription = document.createElement('p')
    movieDescription.classList.add('description')
    const movieReleaseDate = document.createElement('p')
    const movieRuntime = document.createElement('p')
    const movieRelease = new Date(`${item.release_date}`)
    


    movieDescription.innerText = `${item.overview}`
    movieReleaseDate.innerText = `Released ${dateFormatter(movieRelease)}`
    movieRuntime.innerText = formatRuntime(`${item.runtime}`)
    moviePoster.src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
    movieTitle.innerText= `${item.title}`
    addToListBtn.innerText = 'Add to Watchlist'
    
    imgOverlay.appendChild(movieTitle)
   imgOverlay.appendChild(movieDescription)
   imgOverlay.appendChild(movieReleaseDate)
   imgOverlay.appendChild(movieRuntime)
    imgOverlay.appendChild(addToListBtn)

    movieEl.appendChild(moviePoster)
    movieEl.appendChild(imgOverlay)
    moviesList.appendChild(movieEl)
    
}

document.addEventListener('click', e => {
    if(e.target.matches('[data-add-watchlist]')){
        const id = e.target.closest('[data-movie]')
            .dataset.movieId
            
            addToWatchList(parseInt(id))

    }
})



function addToWatchList(id){
    
    const existingItem = watchlist.find(entry => entry === id )
    if(!existingItem){
        watchlist.push(id)
    }else{
        return
    }
    console.log(watchlist)
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
    moviesList.innerHTML = ''
    showMovies(apiUrl)
    
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

watchListOption.addEventListener('click', () => {
    moviesList.innerHTML = ''

    
        watchlist.map(async(result) => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${result}?api_key=${apiKey}&language=en-US`)
            const data = await response.json()
          renderMovie(data)
          
        })   
})


