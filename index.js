document.addEventListener('DOMContentLoaded', () => {
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');
    const dropdownHeader = dropdownWrapper.querySelector('.dropdown-header');
    const dropdownBody = dropdownWrapper.querySelector('.dropdown-body');

    dropdownHeader.addEventListener('click', () => {
        dropdownWrapper.classList.toggle('open');
    });
  });

//   fetch('./CountriesData.json').then().then().catch();
  fetch('./CountriesData.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
