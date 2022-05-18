let btn = document.querySelector('button')
btn.addEventListener('click', fetchCocktail)

function fetchCocktail() {
    let drink = document.querySelector('input').value.toLowerCase()

    fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) //parse respone to JSON
    .then(data => {
        if (drink === data.drinks[0].strDrink.split(' ')[0].toLowerCase()) {
            displayDetails(data) 
        }
        else {
            resetDOM()
            document.querySelector('.displayError').innerText = 'No drink found :(' 
        }
    })
    .catch(error => console.log(`error, ${error}`))
}

function resetDOM() {
    document.querySelector('.displayError').innerText = ''
    document.querySelector('#ingredients').innerText = ''
}
      
function displayDetails(data) {
    const drinkName = document.querySelector('#cocktailName')
    const drinkImg = document.querySelector('img')
    const ingredients = document.querySelector('#ingredients')
    const instructions = document.querySelector('#instructions')
    const instrHeading = document.querySelector('.instructionsHeading')
    const ingreHeading = document.querySelector('.ingredientsHeading')
    let i = 0
    let drinkArray = data.drinks

    slideShow()

    function slideShow() {
        drinkName.innerText = drinkArray[i].strDrink
        drinkImg.src = drinkArray[i].strDrinkThumb
        
        ingredients.innerText = ''
        ingreHeading.innerText = `Ingredients`
        for (let key in drinkArray[i]) {
            if(key.includes('strIngredient') && (drinkArray[i][key] !== null && drinkArray[i][key] !== '')) {
                ingredients.innerHTML += `<li>${drinkArray[i][key]}</li>`
            }
        }
        instrHeading.innerText = `Instructions`
        instructions.innerText = drinkArray[i].strInstructions

        if(i < drinkArray.length-1) i++
        else i=0
    
       timeO = setTimeout(slideShow, 3000)
    
       btn.addEventListener('click', () => {
        clearTimeout(timeO)
        })
    }
}