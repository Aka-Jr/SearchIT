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

    // Clear the results container
    resultsContainer.innerHTML = '';

    // If the search query is empty, hide the results container
    if (searchQuery.trim() === '') {
        resultsContainer.style.display = 'none';
        return;
    }

    // Fetch data
    fetchData().then(data => {
        // Filter cities based on the search query
        const matchingCities = data.filter(city => {
            const cityName = city.city.toLowerCase();
            return cityName.includes(searchQuery);
        });

        // Display matching cities and their details
        if (matchingCities.length > 0) {
            // Modify this part of your search results HTML generation code
            const resultsHTML = matchingCities.map(city => {
                const growthClass = parseFloat(city.growth_from_2000_to_2013) > 0 ? 'positive-growth' : 'negative-growth';
                return `
                    <div class="result">
                        <strong>${city.city}, ${city.state}</strong><br>
                        Population: ${city.population}<br>
                        Growth: <span class="${growthClass}">${city.growth_from_2000_to_2013}</span>
                    </div>`;
            }).join('');

            resultsContainer.innerHTML = resultsHTML;
            resultsContainer.style.display = 'block'; // Show results

            // Add click event listeners to open the modal when a result is clicked
            const resultElements = document.querySelectorAll('.result');
            resultElements.forEach((resultElement, index) => {
                resultElement.addEventListener('click', () => {
                    openModal(matchingCities[index]);
                });
            });
        } else {
            resultsContainer.style.display = 'none'; // Hide results if no matches
        }
    });
}

// ... (Previous JavaScript code remains the same)

// Function to open the modal and display city details
function openModal(city) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');

    // Clear existing content
    modalContent.innerHTML = '';

    // Populate modal with city details
    const growthClass = parseFloat(city.growth_from_2000_to_2013) > 0 ? 'positive-growth' : 'negative-growth';
    const cityDetails = `
        <h2>${city.city}, ${city.state}</h2>
        <p>Population: ${city.population}</p>
        <p>Growth: <span class="${growthClass}">${city.growth_from_2000_to_2013}</span></p>
    `;

    modalContent.innerHTML = cityDetails;

    // Show the modal
    modal.style.display = 'block';

    // Add a click event listener to close the modal when the close button is clicked
    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', () => {
        closeModal();
    });

    // Add a click event listener to close the modal when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Add event listener for input changes
document.getElementById('searchInput').addEventListener('input', updateResultsOnInput);

// Initial call to populate results
updateResultsOnInput();
