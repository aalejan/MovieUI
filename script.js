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
const Burger = document.querySelector('.burger')
const BurgerMenu = document.querySelector('.options')


let movies = []
let watchlist = []
let burgerOpen = false

Burger.addEventListener('click', toggleMenu)


showMovies(apiUrl)

function showMovies(url){
   
    const fetchData = async () => {
        const response = await fetch(url)
        const data = await response.json()
        const results = data.results
       movies = []
              
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
    
    
function renderMovie({release_date, overview, runtime, poster_path, title, id}){
    const addToListBtn = document.createElement('button')
    addToListBtn.setAttribute('data-add-watchlist', '')
    addToListBtn.classList.add('addButton')
    const removeListBtn = document.createElement('button')
    removeListBtn.setAttribute('data-remove-watchlist', '')
    removeListBtn.classList.add('removeBtn')
    const movieEl = document.createElement('div')
    movieEl.setAttribute('data-movie', '')
    movieEl.dataset.movieId = id
    const movieTitle = document.createElement('h2')
    const moviePoster = document.createElement('img')
    const imgOverlay = document.createElement('div')
    imgOverlay.classList.add('overlay')
    const movieDescription = document.createElement('p')
    movieDescription.classList.add('description')
    const movieReleaseDate = document.createElement('p')
    const movieRuntime = document.createElement('p')
    const movieRelease = new Date(`${release_date}`)
    
    movieDescription.innerText = `${overview}`
    movieReleaseDate.innerText = `Released ${dateFormatter(movieRelease)}`
    movieRuntime.innerText = formatRuntime(`${runtime}`)
    moviePoster.src = `https://image.tmdb.org/t/p/w500/${poster_path}`
    movieTitle.innerText= `${title}`
    addToListBtn.innerText = 'Add to Watchlist'
    removeListBtn.innerText = 'Remove from Watchlist'
    
    imgOverlay.appendChild(movieTitle)
   imgOverlay.appendChild(movieDescription)
   imgOverlay.appendChild(movieReleaseDate)
   imgOverlay.appendChild(movieRuntime)
    imgOverlay.appendChild(addToListBtn)
    if(watchlist.includes(id)){
        imgOverlay.appendChild(removeListBtn)
    }

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

document.addEventListener('click', e => {
    if(e.target.matches('[data-remove-watchlist]')){
        const id = e.target.closest('[data-movie]')
            .dataset.movieId
            
            removeFromWatchlist(parseInt(id))    
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

function removeFromWatchlist(id){
    const existingItem = watchlist.find(entry => entry === id )
    if(existingItem == null) return
    watchlist = watchlist.filter(entry => entry != id)

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


       renderWatchlist()
})

function renderWatchlist(){
   
    watchlist.map(async(result) => {
     const response = await fetch(`https://api.themoviedb.org/3/movie/${result}?api_key=${apiKey}&language=en-US`)
     const data = await response.json()
   
   renderMovie(data)
   console.log()
 })  
}  

BurgerMenu.classList.add('inactive-menu')
Burger.classList.add('burger-absolute')
function toggleMenu(){


    if (burgerOpen){
        burgerOpen = !burgerOpen 
        Burger.classList.remove('open')
         Burger.classList.add('close')
         Burger.classList.remove('burger-absolute')
         Burger.classList.add('burger-fixed')
         BurgerMenu.classList.add('inactive-menu')
          BurgerMenu.classList.add('active-menu')
          document.body.style.overflow = 'auto'
         
    }else{
        burgerOpen = !burgerOpen
        Burger.classList.remove('close')
         Burger.classList.add('open')
         Burger.classList.remove('burger-absolute')
        BurgerMenu.classList.remove('active-menu')
        BurgerMenu.classList.remove('inactive-menu')
        document.body.style.overflow = 'hidden';
    }

    console.log(burgerOpen)
}


