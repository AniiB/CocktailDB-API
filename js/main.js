//API link
//https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita

//Check for button click event
document.querySelector('button').addEventListener('click', getCocktail)

function getCocktail() {
    let ingredientList = document.querySelector('#ingredients')
    ingredientList.innerText= ''
    

//Take user input value from the DOM
let drink = document.querySelector('input').value

//Fetch API
fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
.then(res => res.json()) //parse respone to JSON
.then(data => {
    console.log(data)
    //Select the relevant drink object
    let drinkObj = data.drinks[0]

    //Display the name
    document.querySelector('#cocktailName').innerText = drinkObj.strDrink

    //Display the Image
    document.querySelector('img').src = drinkObj.strDrinkThumb

    //Display the ingredients
 
    for(let key in drinkObj) {
        if(key.includes('strIngredient') && drinkObj[key] !== null ) ingredientList.innerHTML += `<li>${drinkObj[key]}</li>` 
    }

    //Display Instructions
    document.querySelector('#instructionsEnglish').innerText = drinkObj.strInstructions 

})
.catch(error => console.log(`error, ${error}`))
}



