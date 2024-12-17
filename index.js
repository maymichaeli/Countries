let selectedRegion = null;
let countries= null;
const container = document.querySelector('.countries-grid');

document.addEventListener('DOMContentLoaded', () => {
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');
    const dropdownHeader = dropdownWrapper.querySelector('.dropdown-header');
    const dropdownBody = dropdownWrapper.querySelector('.dropdown-body');
    //open the dropdown
    dropdownHeader.addEventListener('click', (event) => {
        dropdownWrapper.classList.toggle('open');
    });
    //check if need to close the dropdown
    document.addEventListener('click', (event) => {
        if (dropdownWrapper.classList.contains('open') && !dropdownWrapper.contains(event.target)) {
            dropdownWrapper.classList.remove('open');
        }
    });
    //get the region that choosen
    dropdownBody.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if(clickedElement.tagName === 'LI')
        {
            selectedRegion= clickedElement.dataset.region;
            console.log(selectedRegion);
        }
        // Re-render countries based on selected region
        renderCountries(countries, container);
    });
  });


function createCountryCard(country) {
    // Create the main <a> element
    const card = document.createElement('a');
    card.className = 'country scale-effect';
    card.href = '#';
    card.dataset.countryName = country.name;
  
    // Create the flag container and image
    const flagDiv = document.createElement('div');
    flagDiv.className = 'country-flag';
  
    const flagImg = document.createElement('img');
    flagImg.src = country.flag;
    flagImg.alt = `${country.name} Flag`;
  
    flagDiv.appendChild(flagImg);
  
    // Create the info container
    const infoDiv = document.createElement('div');
    infoDiv.className = 'country-info';
  
    const countryTitle = document.createElement('h2');
    countryTitle.className = 'country-title';
    countryTitle.textContent = country.name;
  
    infoDiv.appendChild(countryTitle);
  
    // Create the ul
    const ulList = document.createElement('ul');
    ulList.className = 'country-brief';
  
    const populationItem = document.createElement('li');
    populationItem.innerHTML = `<strong>Population: </strong>${country.population}`;
  
    const regionItem = document.createElement('li');
    regionItem.innerHTML = `<strong>Region: </strong>${country.region}`;
  
    const capitalItem = document.createElement('li');
    capitalItem.innerHTML = `<strong>Capital: </strong>${country.capital}`;
  
    ulList.appendChild(populationItem);
    ulList.appendChild(regionItem);
    ulList.appendChild(capitalItem);
  
    // Add the ul to the infoDiv
    infoDiv.appendChild(ulList);
  
    // Add the flag and info containers to the main card
    card.appendChild(flagDiv);
    card.appendChild(infoDiv);
    
    // card.addEventListener('click',()=>{
    //     location.href = "./details.html";
    // });
    card.addEventListener('click', () => {
        const url = `details.html?name=${encodeURIComponent(country.name)}&region=${encodeURIComponent(country.region)}&population=${country.population}&capital=${encodeURIComponent(country.capital)}&flag=${encodeURIComponent(country.flag)}`;
        window.location.href = url;
    });
    

    return card;
}
  
function renderCountries(countries, container) {
    // Clear the container before rendering
    container.innerHTML = '';

    // Filter the countries based on the selected region
    let filteredCountries = countries;

    if (selectedRegion && selectedRegion !== 'all') {
        filteredCountries = countries.filter(country => 
            country.region.toLowerCase() === selectedRegion.toLowerCase()
        );
    }

    // Render the filtered (or all) countries
    filteredCountries.forEach(country => {
        const card = createCountryCard(country);
        container.appendChild(card);
    });

    console.log('Selected region:', selectedRegion);
    console.log('Filtered countries:', filteredCountries);

    // countries.forEach(country => {
    //     const card = createCountryCard(country);
    //     container.appendChild(card);
    // });
}

const fetchCountriesData = (url) => {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      });
  };
  
  fetchCountriesData('./CountriesData.json')
    .then((data) => {
        console.log('Fetched data:', data);
        countries = data;
        renderCountries(countries, container);
    })

    .catch((error) => {
      console.error('Error fetching countries data:', error.message);
    });

