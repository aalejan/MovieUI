let watchlist = []

export function addToWatchList(id){
    const existingItem = watchlist.find(entry => entry.id === id )
    if(existingItem){
        return
    }else{
        shoppingCart.push(id)
    }

}