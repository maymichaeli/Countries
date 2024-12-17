console.log('details.js loaded');

const loader = document.querySelector('.loader');
loader.style.display = 'none';

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        region: params.get('region'),
        population: params.get('population'),
        capital: params.get('capital'),
        flag: params.get('flag')
    };
}

const countryDetails = getQueryParams();
console.log(countryDetails);

const detailsContainer = document.querySelector('.country-details');

detailsContainer.innerHTML = `
    <div class="country-flag">
        <img src="${countryDetails.flag}" alt="${countryDetails.name} Flag">
    </div>
    <div class="country-info">
        <h1>${countryDetails.name}</h1>
        <div class="col-2">
            <ul>
                <li><strong>Region:</strong> ${countryDetails.region}</li>
                <li><strong>Population:</strong> ${countryDetails.population}</li>
                <li><strong>Capital:</strong> ${countryDetails.capital}</li>
            </ul>
        </div>
    </div>
`;
