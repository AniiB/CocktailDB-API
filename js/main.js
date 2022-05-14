//API link
//https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita

//Check for button click event
document.querySelector('button').addEventListener('click', fetchCocktail)

function fetchCocktail() {
    
    let drink = document.querySelector('input').value

    fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) //parse respone to JSON
    .then(data => {
        displayDetails(data)
    })
    .catch(error => console.log(`error, ${error}`))
}

function resetDOM() {
    const ingredients = document.querySelector('#ingredients')
    ingredients.innerText = ''

    document.querySelector('section + section').classList.add('hidden')
}

function displayDetails(data) {
    resetDOM()
    const drinkName = document.querySelector('#cocktailName')
    const drinkImg = document.querySelector('img')
    const ingredients = document.querySelector('#ingredients')
    const instructions = document.querySelector('#instructions')

    let drinkObj = data.drinks[0]

    document.querySelector('section + section').classList.remove('hidden')

    drinkName.innerText = drinkObj.strDrink
    drinkImg.src = drinkObj.strDrinkThumb
    instructions.innerText = drinkObj.strInstructions 

    for(let key in drinkObj) {
        if(key.includes('strIngredient') && drinkObj[key] !== null ) ingredients.innerHTML += `<li>${drinkObj[key]}</li>` 
    }
}
        