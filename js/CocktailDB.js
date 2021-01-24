class CocktailDB {

    // save the recipes into local storage
    saveIntoDB(drink){
        const drinks = this.getFromDB();
        drinks.push(drink);

        // Add the new array into the local storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    // // removes elements from the Local Storage
    removeFromDB(id){
        const drinks = this.getFromDB();

        // iterate
        drinks.forEach((drink, index) => {
            if(id === drink.id){
                drinks.splice(index, 1);    // delete the element from that array
            }
        });
        console.log(JSON.stringify(drinks))
        // set the modified array into the Local Storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    // return recipes from storage
    getFromDB(){
        let drinks;
        // check form localStorage
        if(localStorage.getItem('drinks') === null){
            drinks = []
        }else{
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }
        return drinks;
    }
}