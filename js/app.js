// instanciate classes
const ui = new UI(), 
    cocktail = new CocktailAPI();


// create the event listeners
const eventListners = () => {
    // add event listner when the form is submitted
    const searchForm = document.querySelector('#search-form');
    if(searchForm){
        searchForm.addEventListener('submit', getCocktails);        // e is automatically passed to getCocktails function
    }
    
}


// get cocktails function
const getCocktails = e => {
    e.preventDefault();
    
    const searchTerm = document.querySelector('#search').value.trim();

    // check if searchTerm is empty
    if(searchTerm === ''){
        // call the ui class method to show the results 
        ui.printMessage('Please add something into the search form', 'danger'); 
    }else{
        // Query by the name of the drink
        cocktail.getDrinksByName(searchTerm)
            .then(cocktails => {
                if(cocktails.data.drinks === null){
                    // no results to show
                    ui.printMessage(`There\'re no results for ${searchTerm}, please try different term`, 'danger'); 
                }else{
                    console.log(cocktails);
                }
            }).catch(err => console.log(err));
    }
}

eventListners();



