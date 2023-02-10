
/////////////////////////////////////////////////////////////////////////


// Grab the form
let form = document.getElementById('weatherForm');
// console.log(form);

async function handleFormSubmit(e){
    e.preventDefault(); // Prevent the event from refreshing the page
    let display = document.getElementById('weatherDisplay');

    display.innerHTML = "";

    let cityName = e.target.cityName.value;
    let weatherInfo = await getWeatherInfo(cityName);

    let displayTitle = document.createElement('h2');
    displayTitle.className = 'text-center';
    displayTitle.innerHTML = cityName;
    display.append(displayTitle)

    buildWeatherCard(display, 'Temperature', 'bg-color-primary', weatherInfo.main.temp);
    buildWeatherCard(display, 'High', 'bg-color-primary', weatherInfo.main.temp_max);
    buildWeatherCard(display, 'Low', 'bg-color-primary', weatherInfo.main.temp_min);
    buildWeatherCard(display, 'Feels Like', 'bg-color-primary', weatherInfo.feels_like);

    // Clear the input box at the end
    e.target.cityName.value = '';
};

form.addEventListener('submit', handleFormSubmit);

// Function that takes in a country name, makes a GET request to API, returns data
async function getWeatherInfo(cityName){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
    let data = await response.json();
    console.log(data)
    return data
}

// function getCountryInfo2(countryName){
//     return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//         .then(res => res.json())
//         .then(data => data[0])
// }

// Function that will take in country object and build an HTML card and add to gallery
function buildWeatherCard(display, title, color, value){

    // Create a card div
    let card = document.createElement('div')
    card.className = `card h-100 ${color}`;
    
    // Create card body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    // Create country name and population elements
    let cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.innerHTML = title;
    
    let cardValue = document.createElement('p');
    cardValue.className = 'card-text';
    cardValue.innerHTML = value
    
    // Add the title and population to the card body
    cardBody.append(cardTitle);
    cardBody.append(cardValue);
    
    // Add card body to card
    card.append(cardBody);

    // Create a column for the row
    let col = document.createElement('div')
    col.className = 'col-12 col-md-6 col-lg-3 my-3'

    // Add the card to the column
    col.append(card);

    // Get the country display and add the column
 
    display.append(col);

}
