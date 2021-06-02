export function formatRuntime(runtime){
     
    const hours = Math.floor(runtime / 60);  
    const minutes = runtime % 60;
    return `${hours} HR ${minutes} MIN`;

}