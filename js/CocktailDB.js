class CocktailDB {

    // save the recipes into local storage
    saveIntoDB(drink){
        const drinks = this.getFromDB();
        drinks.push(drink);

        // Add the new array into the local storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    // return recipes from storage
    getFromDB(){
        let drinks;
        // check form localStorage
        if(localStorage.getItem('drinks') === null){
            drinks = []
        }else{
            drinks = JSON.parse( localStorage.getItem('drinks'));
        }
        return drinks;
    }
}