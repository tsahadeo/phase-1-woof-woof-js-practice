const baseURL = "http://localhost:3000/pups"

//DOM Selectors
const bar = document.querySelector("#dog-bar")
const details = document.querySelector("#dog-info")
const filterButton = document.querySelector("#good-dog-filter")

filterButton.addEventListener('click', toggleFilter)

//Fetches
function getAllDogs(){
    fetch (baseURL)
    .then (resp => resp.json())
    .then (renderAllInBar)
}

function getOneDog(id){
    return fetch(baseURL + `/${id}`)
    .then(resp => resp.json())
}

//Rendering
function renderAllInBar(dogsArr){
    bar.innerHTML = ''
    dogsArr.forEach(addOneDogToBar)
}

function addOneDogToBar(dogObj){
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dogObj.name
    dogSpan.dataset.id = dogObj.id
    dogSpan.addEventListener('click', handleSpanClick)
    bar.append(dogSpan)
}

function showOneDog(dogObj){
    console.log(dogObj)
    details.innerHTML = ''
    const dogDiv = document.createElement('div')
    dogDiv.innerHTML = `
        <img src = ${dogObj.image}>
        <h2>${dogObj.name}</h2>`  
    const pupButton = document.createElement('button')
    // let buttonString;
    // if (dogObj.isGoodDog){
    //     buttonString = "Good Dog"
    // } else {
    //     buttonString = "Bad Dog"
    // }
    pupButton.textContent = ((dogObj.isGoodDog) ? "Good Dog" : "Bad Dog")
    pupButton.addEventListener('click', () => togglePupButton(pupButton))
    details.append(dogDiv, pupButton)
}

//Event Handlers
function handleSpanClick(event){
    const id = event.target.dataset.id
    getOneDog(id).then(showOneDog)
}

function togglePupButton(pupButton){
pupButton.textContent = pupButton.textContent.includes("Good") ? "Bad Dog" : "Good Dog"  
}

function toggleFilter(){
    if (filterButton.innerText.includes("OFF")) {
        filterButton.innerText = "Filter good dogs: ON"
    } else {
    filterButton.innerText = "Filter good dogs: OFF"
    }
}

//Intialize
getAllDogs()