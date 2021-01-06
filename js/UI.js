class UI{
    constructor(){

    }

    // display the cocktail drinks' categories in the selection
    displayCategories(categories){
        const firstOption = document.createElement('option');
        firstOption.textContent = '-- Select --';
        firstOption.value = "";
        document.querySelector('#search').appendChild(firstOption);   // don't worry about calling the other 'search' id elements, this is only called if we're in the categories page
        categories.forEach(category => {
            let option = document.createElement('option');
            option.textContent = category.strCategory;
            option.value = category.strCategory.replace(/\s/g, '_'); // this can work as well => category.strCategory.split(' ').join('_')
            document.querySelector('#search').appendChild(option);
        });      
    }

    // displaying drinks without ingredients
    displayDrink(drinks){
        // show the results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // insert the results
        const resultsDiv = resultsWrapper.querySelector('#results');

        // loop through drinks
        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-4">
                    <div class="card my-3">
                        <button type="button" data-id=${drink.idDrink} class="favorite-btn btn btn-outline-info">+</button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}"></img>
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
                        </div>
                    </div>
                </div>
            `;
        });
    }



    // displaying drinks with ingredients
    displayDrinksWithIngredients(drinks){
        // show the results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // insert the results
        const resultsDiv = resultsWrapper.querySelector('#results');
        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">
                    <button type="button" data-id=${drink.idDrink} class="favorite-btn btn btn-outline-info">+</button>
                    <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}"></img>
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instructions:</p>
                            <p class="card-text">${drink.strInstructions}</p>
                            <p class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item alert alert-danger">Ingredients</li> 
                                    ${this.displayIngredients(drink)}
                                </ul>
                            </p>
                            <p class="card-text font-weight-bold">Extra Information:</p>
                            <p class="card-text">
                                <span class="badge badge-pill badge-success">${drink.strAlcoholic}</span>
                                <span class="badge badge-pill badge-warning">${drink.strCategory}</span>
                            </p>
                        </div>

                    </div>
                </div>
            `;
        });
    }

    // prints the ingredients and measurements
    displayIngredients(drink){
        let ingredients = [];
        for(let i=1; i<16; i++){
            const ingredientMeasure = {};
            if(drink[`strIngredient${i}`]){
                ingredientMeasure.ingredient = drink[`strIngredient${i}`]
                ingredientMeasure.measure = drink[`strMeasure${i}`] === null ? '🤷🏾‍♂️👍🏽': drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }
            
        }
        // Build the template for showing the ingredients
        let ingredientsTemplate = '';
        ingredients.forEach(ingredient => {
            ingredientsTemplate += `<li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>`
        });
        return ingredientsTemplate;
    }


    // display single recipe
    displaySingleRecipe(recipe){

        // get variables
        const modalTitle = document.querySelector('.modal-title'),
            modalDescription = document.querySelector('.modal-body .description-text'),
            modalIngredientList = document.querySelector('.modal-body .ingredient-list .list-group');

        // set values of the empty modals
        modalTitle.textContent = recipe.strDrink;
        modalDescription.textContent = recipe.strInstructions; 

        // get list of ingredients for the current drink
        const ingredientsList = this.displayIngredients(recipe);
        
        // set the html returned from the above method to the empty ul's innerHTML
        modalIngredientList.innerHTML = ingredientsList;

    }

    // display a custom message
    printMessage(message, className){
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="alert alert-dismissible alert-${className}">
                <button type="button" class="close" data-dismiss="alert">x</button>
                ${message}
            </div>
        `;

        // insert before
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        // remove after three seconds
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        }, 2500);
    }


    // clear previous results 
    clearResults() {
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'none';
    }

    clearModal() {
        const modalTitle = document.querySelector('.modal-title'),
            modalDescription = document.querySelector('.modal-body .description-text'),
            modalIngredientList = document.querySelector('.modal-body .ingredient-list .list-group');

        modalTitle.textContent = '';
        modalDescription.textContent = '';
        modalIngredientList.innerHTML = '';
    }   
}