// instanciate classes
const ui = new UI(), 
    cocktail = new CocktailAPI();
    cocktailDB = new CocktailDB();

// create the event listeners
const eventListners = () => {
    // document ready
    document.addEventListener('DOMContentLoaded', documentReady);
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
            case 'category':
                serverResponse = cocktail.getDrinksByCategory(searchTerm);
                break;
            case 'alcohol':
                serverResponse = cocktail.getDrinksByAlcohol(searchTerm);    
                break;
        }

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
        //clear the modal to make it empty if there's been another one loaded before the current one
        ui.clearModal();
        cocktail.getSingleRecipe(e.target.dataset.id)   // can also be written as e.target.getAttribute('id')
            .then(recipe => {
                // display a single recipe into a modal
                ui.displaySingleRecipe(recipe.data.drinks[0])

            }).catch(err => console.log(err)); 
    }

    // when favorite button is clicked
    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){
            // remove the class
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';
        }else{
            // add the class
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            // Get info
            const cardBody = e.target.parentElement;
            const drinkInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }

            // Add into the storage
            cocktailDB.saveIntoDB(drinkInfo);
        }
    }
}

// document ready
const documentReady = e =>{
    // get a refenrence to the category selection
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory){
        cocktail.getCategories()
            .then(categories => {
                ui.displayCategories(categories.data.drinks);
            }).catch(err => console.log(err));
    }

    // when favorites page is opened
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable){
        // Get the favorites from storage and display them
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks);

        // When view or delete are clicked
        
        favoritesTable.addEventListener('click', e =>{
            e.preventDefault();
            // delegation
            
            // VIEW
            if(e.target.classList.contains('get-recipe')){
                ui.clearModal();
                cocktail.getSingleRecipe(e.target.dataset.id) 
                    .then(recipe => {
                        ui.displaySingleRecipe(recipe.data.drinks[0])
                    }).catch(err => console.log(err)); 
            }

            // DELETE
            if(e.target.classList.contains('remove-recipe')){
                // Remove form the DOM
                ui.removeFavorite(e.target.parentElement.parentElement)

                // Remove from the Local Storage
                cocktailDB.removeFromDB(e.target.dataset.id);
            }
        })
    }
}

eventListners();



