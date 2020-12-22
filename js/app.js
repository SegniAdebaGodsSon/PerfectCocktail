// instanciate classes
const ui = new UI();


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
        console.log('Query the rest api');
    }
}

eventListners();



