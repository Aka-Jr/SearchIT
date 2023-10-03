// Function to fetch data from the URL
async function fetchData() {
    try {
        const response = await fetch('https://tinyurl.com/5bzzvh6u');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to update results as the user types
function updateResultsOnInput() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('results');

    // Fetch data
    fetchData().then(data => {
        // Filter cities based on the search query
        const matchingCities = data.filter(city => {
            const cityName = city.city.toLowerCase();
            const stateName = city.state.toLowerCase();
            return cityName.includes(searchQuery) || stateName.includes(searchQuery);
        });

        // Display matching cities and their details
        if (matchingCities.length > 0) {
            const resultsHTML = matchingCities.map(city => {
                return `<div><strong>${city.city}, ${city.state}</strong><br>Population: ${city.population}
                <br>Growth: <span class="${growthClass}">${city.growth}%</span> 
                </div>`;
            }).join('');
            resultsContainer.innerHTML = resultsHTML;
            resultsContainer.style.display = 'block'; // Show results
        } else {
            resultsContainer.style.display = 'none'; // Hide results if no matches
        }
    });
}

// Add event listener for input changes
document.getElementById('searchInput').addEventListener('input', updateResultsOnInput);

// Initial call to populate results
updateResultsOnInput();
