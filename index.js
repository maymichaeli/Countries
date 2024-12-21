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


const createCountryCard=(country)=> {
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

    // Create the ul using a reusable function
    const ulList = createCountryDetailsList(country);
    infoDiv.appendChild(ulList);
  
    // Add the flag and info containers to the main card
    card.appendChild(flagDiv);
    card.appendChild(infoDiv);
    
    // card.addEventListener('click',()=>{
    //     location.href = "./details.html";
    // });
    card.addEventListener('click', () => {
        const baseUrl = 'details.html';
        const url = `${baseUrl}?name=${encodeURIComponent(country.name)}&region=${encodeURIComponent(country.region)}&population=${country.population}&capital=${encodeURIComponent(country.capital)}&flag=${encodeURIComponent(country.flag)}`;
        window.location.href = url;
    });
    

    return card;
}

// Helper function to create the country details list
const createCountryDetailsList = (country) => {
    const ulList = document.createElement('ul');
    ulList.className = 'country-brief';
  
    // Define the details dynamically
    const details = [
      { label: 'Population', value: country.population },
      { label: 'Region', value: country.region },
      { label: 'Capital', value: country.capital },
    ];
  
    details.forEach((detail) => {
      const li = document.createElement('li');
  
      const strongElement = document.createElement('strong');
      strongElement.textContent = `${detail.label}: `;
  
      li.appendChild(strongElement);
      li.appendChild(document.createTextNode(detail.value));
      ulList.appendChild(li);
    });
  
    return ulList;
  };


const renderCountries=(countries, container)=> {
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



const searchInput = document.querySelector('.search-input');
const countriesGrid = document.querySelector('.countries-grid');

searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();

    // Filter the countries based on the search term
    const filteredCountries = countries.filter(country => {
    return (
        country.name.toLowerCase().includes(searchTerm) ||  // Match name
        country.region.toLowerCase().includes(searchTerm) || // Match region
        country.capital.toLowerCase().includes(searchTerm) || // Match capital
        country.population.toString().includes(searchTerm) // Match population (convert to string)
    );
    });

    // Clear the current display
    countriesGrid.innerHTML = '';

    // Render the filtered countries
    if (filteredCountries.length > 0) {
    renderCountries(filteredCountries, countriesGrid);
    } else {
    countriesGrid.innerHTML = '<p>No matching countries found.</p>';
    }
});