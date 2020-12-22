class UI{
    constructor(){

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