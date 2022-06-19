document.querySelector('form').addEventListener('submit', (e) => {
    document.querySelector('.card').style.opacity = 0;
    document.querySelector('.card').style.visiblity = `hidden`
    e.preventDefault()
    setTimeout(fetchCocktail, 850)
})

function fetchCocktail() {
    let prevInput
    let i = 0
    let userInput = document.querySelector('input').value.toLowerCase()
    if(prevInput == userInput) return
    else prevInput = userInput
    if (userInput === '')return
    const cocktailName = document.querySelector('#cocktailName')
    const cocktailImage = document.querySelector('img')
    const ingredientList = document.querySelector('.ingredients')
    const instructionList = document.querySelector('.instructions')
    const card = document.querySelector('.card')
    clearSlide()

    fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`)
        .then(res => res.json()) //parse respone to JSON
        .then(data => {
            let drinkArray = Array.from(data.drinks)
            displaySlide(drinkArray)
        })
        .catch(error => console.log(`error, ${error}`))

    function clearSlide() {
        document.querySelector('.card').style.opacity = 0;
        document.querySelector('.card').style.visiblity = `hidden`
        cocktailName.innerText = ''
        cocktailImage.src = ''
        ingredientList.innerText = ''
        instructionList.innerText = ''
    }
    function displaySlide(drinkArray) {
        let drink = drinkArray[0]
        card.style.visibility = `visible`
        cocktailName.innerText = drink.strDrink
        cocktailImage.src = drink.strDrinkThumb

        displayIngredients(drink)
        let instr = drink.strInstructions.split('. ')
        displayInstructions(instr)

        card.style.opacity = 1
    }
    function displayIngredients(drink) {
        for (let keys in drink) {

            if (keys.includes('strIngredient') && drink[keys] !== null && drink[keys] !== '' && drink[keys] !== undefined) {
                let listItem = document.createElement('li')
                let listText = document.createTextNode(`${drink[keys]}`)
                listItem.appendChild(listText)
                ingredientList.appendChild(listItem)
            }
        }
    }
    function displayInstructions(instr) {
        for (let i = 0; i < instr.length; i++) {
            let listItem = document.createElement('li')
            let listText = document.createTextNode(`${instr[i]}.`)
            listItem.appendChild(listText)
            instructionList.appendChild(listItem)
        }

    }
}