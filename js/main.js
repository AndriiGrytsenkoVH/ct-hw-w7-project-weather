
/////////////////////////////////////////////////////////////////////////


// Grab the form
let form = document.getElementById('countryForm');
// console.log(form);

async function handleFormSubmit(e){
    e.preventDefault(); // Prevent the event from refreshing the page
    // console.log(e);
    let countryName = e.target.countryName.value;
    console.log(countryName);

    let countryInfo = await getCountryInfo(countryName);
    buildCountryCard(countryInfo);
    // Clear the input box at the end
    e.target.countryName.value = '';
};

form.addEventListener('submit', handleFormSubmit);

// Function that takes in a country name, makes a GET request to API, returns data
async function getCountryInfo(countryName){
    let response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    let data = await response.json();
    return data[0]
}

// function getCountryInfo2(countryName){
//     return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//         .then(res => res.json())
//         .then(data => data[0])
// }

// Function that will take in country object and build an HTML card and add to gallery
function buildCountryCard(countryObj){

    // Create a card div
    let card = document.createElement('div')
    card.className = 'card h-100';

    // Create a top image for card
    let image = document.createElement('img');
    image.className = 'card-img-top';
    image.src = countryObj.flags.png;
    // Add image as a child to the card
    card.append(image);
    
    // Create card body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    // Create country name and population elements
    let countryTitle = document.createElement('h5');
    countryTitle.className = 'card-title';
    countryTitle.innerHTML = countryObj.name.official;
    
    let countryPopulation = document.createElement('p');
    countryPopulation.className = 'card-text';
    countryPopulation.innerHTML = `Population: ${countryObj.population.toLocaleString('en-US')}`
    
    // Add the title and population to the card body
    cardBody.append(countryTitle);
    cardBody.append(countryPopulation);
    
    // Add card body to card
    card.append(cardBody);

    // Create a column for the row
    let col = document.createElement('div')
    col.className = 'col-12 col-md-6 col-lg-3 my-3'

    // Add the card to the column
    col.append(card);

    // Get the country display and add the column
    let display = document.getElementById('countryDisplay');
    display.append(col);

}
