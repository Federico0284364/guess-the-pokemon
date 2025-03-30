
fetch('https://pokeapi.co/api/v2/pokemon/510')
.then((response) => {
    if (!response.ok){
        throw new Error("This pokemon doesn't exist");
    }
    return response.json()})
.then((response) => console.log(response.name))
.catch((error) => console.log(error));

async () => {
    try {
        const a = 1;
    }
    catch {

    }
}