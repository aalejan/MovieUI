export function dateFormatter(event){
const options = { year: 'numeric',month: 'short', day: 'numeric'}
    return event.toLocaleDateString('en-US',options)
}