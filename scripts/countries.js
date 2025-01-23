/*$(() => {
    const fetchCountries = async () => {
        const url = 'https://restcountries.com/v3.1/all';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ZFhoSHFCZG1zNHpoTk9DOEdFZjdRRUZDMmhrYXkyS2xuWm9PcDNLRw==', //key used to fetch data but it is not neccessary to include it in production.
                    'Content-Type': 'application/json' //specifies that the content type of the request body is json
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const countries = await response.json();
            displayRandomCountries(countries);
        } catch (error) {
            //console.error('There was a problem with the fetch operation:', error);
            $('.countries').html('<p>Error loading countries. Please try again later.</p>');
        }
    };

    const displayRandomCountries = (countries) => {
        const countryList = $('.countries');
        countryList.empty(); // Clear previous results

        // Shuffle and select 8 random countries
        const shuffledCountries = countries.sort(() => 0.5 - Math.random()); //.sort = sorts the elements of an array in place and returns the sorted array. By subtracting `Math.random()` from 0.5, the function results in a value that can be positive or negative, effectively allowing for random ordering.

        const randomCountries = shuffledCountries.slice(0, 12);

        randomCountries.forEach(country => {  //loop
            countryList.append(`
                <div class="country-card">
                    <div class="card-inner">
                        <div class="card-front">
                            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="country-flag" />
                            <div class="country-name">${country.name.common}</div>
                            <div class="country-info">Capital: ${country.capital ? country.capital[0] : 'N/A'}</div>
                            <div class="country-info">Population: ${country.population.toLocaleString()}</div>
                        </div>
                        <div class="card-back">
                            <div class="country-info">Region: ${country.region}</div>
                            <div class="country-info">Subregion: ${country.subregion}</div>
                            <div class="country-info">Languages: ${Object.values(country.languages || {}).join(', ')}</div>
                            <div class="country-info">Currencies: ${Object.values(country.currencies || {}).map(curr => curr.name).join(', ')}</div>
                        </div>
                    </div>
                </div>
            `);
        });

    };

    // Set up the button click event
    $('.button').on('click', fetchCountries);
}); */

$(() => {
    const fetchCountries = async (search_word) => {
        const url = 'https://restcountries.com/v3.1/all';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ZFhoSHFCZG1zNHpoTk9DOEdFZjdRRUZDMmhrYXkyS2xuWm9PcDNLRw==', // key used to fetch data but it is not necessary to include it in production.
                    'Content-Type': 'application/json' // specifies that the content type of the request body is json
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const countries = await response.json();
            // Filter countries based on user input
            const filteredCountries = search_word ? countries.filter(country => 
                country.region.toLowerCase() === search_word.toLowerCase() || 
                (country.languages && Object.values(country.languages).some(lang => lang.toLowerCase() === search_word.toLowerCase()))
            ) : countries;
            displayRandomCountries(filteredCountries);
        } catch (error) {
            //console.error('There was a problem with the fetch operation:', error);
            $('.countries').html('<p>Error loading countries. Please try again later.</p>');
        }
    };

    const displayRandomCountries = (countries) => {
        const countryList = $('.countries');
        countryList.empty(); // Clear previous results

        // Shuffle and select 12 random countries
        const shuffledCountries = countries.sort(() => 0.5 - Math.random());

        const randomCountries = shuffledCountries.slice(0, 12);

        randomCountries.forEach(country => {  // loop
            countryList.append(`
                <div class="country-card">
                    <div class="card-inner">
                        <div class="card-front">
                            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="country-flag" />
                            <div class="country-name">${country.name.common}</div>
                            <div class="country-info">Capital: ${country.capital ? country.capital[0] : 'N/A'}</div>
                            <div class="country-info">Population: ${country.population.toLocaleString()}</div>
                        </div>
                        <div class="card-back">
                            <div class="country-info">Region: ${country.region}</div>
                            <div class="country-info">Subregion: ${country.subregion}</div>
                            <div class="country-info">Languages: ${Object.values(country.languages || {}).join(', ')}</div>
                            <div class="country-info">Currencies: ${Object.values(country.currencies || {}).map(curr => curr.name).join(', ')}</div>
                        </div>
                    </div>
                </div>
            `);
        });

    };

    // Set up the button click event
    $('.button').on('click', () => {
        const search_word = $('#search').val(); // Get the user input from the input field
        fetchCountries(search_word); // Pass the criteria for filtering
    });
});
