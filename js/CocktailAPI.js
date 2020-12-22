class CocktailAPI{
    constructor(){

    }

    // get recipe by name
    async getDrinksByName(name){
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        
        return {data};
    }
}