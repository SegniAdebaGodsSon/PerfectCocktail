// instanciate classes
const ui = new UI(), 
    cocktail = new CocktailAPI();


// create the event listeners
const eventListners = () => {
    // add event listner when the form is submitted
    const searchForm = document.querySelector('#search-form');
    if(searchForm){  // check because not all the pages have search form id
        searchForm.addEventListener('submit', getCocktails);        // e is automatically passed to getCocktails function
    }

    // the results div listner
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv){
        resultsDiv.addEventListener('click', resultsDelegation);
    }
    
}


// get cocktails function
const getCocktails = e => {
    e.preventDefault();
    ui.clearResults(); 
    const searchTerm = document.querySelector('#search').value.trim();

    // check if searchTerm is empty
    if(searchTerm === ''){
        // call the ui class method to show the results 
        ui.printMessage('Please add something into the search form', 'danger'); 
    }else{
        let serverResponse;                                     // server response from promise
        const type = document.querySelector('#type').value;     // type of search (name, ingredients ...)

        // Evaluete the type of method and then execute the query
        switch(type){
            case 'name':
                serverResponse = cocktail.getDrinksByName(searchTerm);
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient(searchTerm);
                break; 

        }

        // Query by the name of the drink
        serverResponse
            .then(cocktails => {
                console.log(cocktails)
                let drinksList = cocktails.data.drinks;
                if(drinksList === null){
                    // no results to show
                    ui.printMessage(`There\'re no results for ${searchTerm}, please try different term`, 'danger'); 
                }else{
                    if(type === 'name'){
                        // display with ingredient
                        ui.displayDrinksWithIngredients(drinksList);
                    }else{
                        // display without ingredient (category, ingredient, alcohol)
                        ui.displayDrink(drinksList);
                    }
                }
            }).catch(err => {
                console.log(err)
                ui.printMessage(`There\'re no results for ${searchTerm}, please try different term`, 'danger'); 
            });
    }
}

// event delegation for the #result are 
const resultsDelegation = e =>{
    e.preventDefault();
    if(e.target.classList.contains('get-recipe')){
        cocktail.getSingleRecipe(e.target.dataset.id)   // can also be written as e.target.getAttribute('id')
            .then(recipe => {
                // display a single recipe into a modal
                ui.displaySingleRecipe(recipe.data.drinks[0])

            }).catch(err => console.log(err));
          
    }
}

eventListners();



