class UI{
    constructor(){

    }

    // displaying drinks with ingredients
    displayDrinksWithIngredients(drinks){
        // show the results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // insert the results
        const resultsDiv = resultsWrapper.querySelector('#results');
        resultsDiv.innerHTML = '';
        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">

                        <button type="button" data-id=${drink.isDrink} class="favorite-btn btn btn-outline-info">+</button>
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
                ingredientMeasure.measure = drink[`strMeasure${i}`];
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
}