document.addEventListener('DOMContentLoaded', () => {
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');
    const dropdownHeader = dropdownWrapper.querySelector('.dropdown-header');
    const dropdownBody = dropdownWrapper.querySelector('.dropdown-body');

    dropdownHeader.addEventListener('click', () => {
        dropdownWrapper.classList.toggle('open');
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
 
    return card;
}
  
function renderCountries(countries, container) {
    countries.forEach(country => {
        const card = createCountryCard(country);
        container.appendChild(card);
    });
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
        const countries = data;
        const container = document.querySelector('.countries-grid');
        countries.forEach(country => {
            const card = createCountryCard(country);
            container.appendChild(card);
    });

    })
    .catch((error) => {
      console.error('Error fetching countries data:', error.message);
    });

