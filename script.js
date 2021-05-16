const form = document.querySelector('[data-form]')
const inputSearch = document.querySelector('[data-search]') 
const moviesList = document.querySelector('[data-movies-list]')
const apiKey = 'a60c16eaddacf852ba0fc28403a21c8b'

const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`



