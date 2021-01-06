class CocktailAPI{
    constructor(){

    }

    // get recipe by name
    async getDrinksByName(name){
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        
        return {data};
    }

    // get recipe by ingredient
    async getDrinksByIngredient(ingredient){
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();

        return {data};
    }

    // get recipe by id
    async getSingleRecipe(id){
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await response.json();

        return {data};
    }

    // get the categories of the cocktails/drinks
    async getCategories(){
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();

        return {data};
    }

    // get drinks by category
    async getDrinksByCategory(category){
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();

        return {data};
    }

    // get drinks by alcoholic content
    async getDrinksByAlcohol(alcoholContent){
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholContent}`);
        const data = await response.json();

        return {data};
    }
}