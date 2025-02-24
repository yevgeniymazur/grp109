// Define js script for Natalia Lubskaya form to select available dates

//nlscript.js

// Data object containing all dates
const dates = {
    party: {
        available: [
            "March 1, 2025 - Friday Evening",
            "March 8, 2025 - Saturday Afternoon",
            "March 15, 2025 - Saturday Evening",
            "March 22, 2025 - Friday Evening",
            "March 29, 2025 - Saturday Afternoon"
        ],
        unavailable: [
            "March 5, 2025 - Wednesday Evening",
            "March 12, 2025 - Wednesday Evening"
        ]
    },
    class: {
        available: [
            "April 2, 2025 - Beginner Class (10 spots left)",
            "April 9, 2025 - Intermediate Class (5 spots left)",
            "April 16, 2025 - Advanced Class (3 spots left)",
            "April 23, 2025 - Beginner Class (8 spots left)",
            "April 30, 2025 - Intermediate Class (6 spots left)"
        ],
        full: [
            "April 7, 2025 - Advanced Class (FULL)",
            "April 14, 2025 - Intermediate Class (FULL)"
        ]
    }
};

// Add event listener when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('optionSelectNL');
    selectElement.addEventListener('change', showDates);
});

// Function to display dates based on selection
function showDates() {
    const selected = document.getElementById('optionSelectNL').value;
    const container = document.getElementById('dateContainerNL');
    container.innerHTML = '';

    if (!selected) return;

    if (selected === 'party') {
        container.innerHTML = `
            <h3>Available Party Dates:</h3>
            ${dates.party.available.map(date => `<div class="available">✓ ${date}</div>`).join('')}
            <h3>Unavailable Party Dates:</h3>
            ${dates.party.unavailable.map(date => `<div class="unavailable">✗ ${date}</div>`).join('')}
        `;
    } else {
        container.innerHTML = `
            <h3>Available Classes:</h3>
            ${dates.class.available.map(date => `<div class="available">✓ ${date}</div>`).join('')}
            <h3>Full Classes:</h3>
            ${dates.class.full.map(date => `<div class="unavailable">✗ ${date}</div>`).join('')}
        `;
    }
}

// End of script
