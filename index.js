/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// Import the JSON data about the crowd-funded games from the games.js file
import GAMES_JSON from './games.js';

// Grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// Function to remove all child elements from a parent element
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// Function that adds all game cards to the page
function addGamesToPage(games) {
    deleteChildElements(gamesContainer);

// Create a for loop that loops over each item in games
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

// Create a new div element and add game-card class
        const gameElement = document.createElement("div");
        gameElement.classList.add("game-card");

// Use template literal to set inner HTML with game info
        gameElement.innerHTML = `
            <h3>${game.name}</h3>
            <img class="game-img" src="${game.img}" alt="${game.name} cover" />
            <p><strong>Description:</strong> ${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
        `;

        // Append the div to the games container
        gamesContainer.appendChild(gameElement);
    }
}

// Call the function with GAMES_JSON to add all games to the page
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Grab the contributions, raised, and games cards
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

// Calculate total individual contributions (backers) using reduce
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// Calculate total amount pledged using reduce
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

//  Display total number of games
gamesCard.innerHTML = GAMES_JSON.length.toLocaleString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
// use filter() to get a list of games that have not yet met their goal
 // use the function we previously created to add the unfunded games to the DOM
// show only games that are fully funded
// use filter() to get a list of games that have met or exceeded their goal
 // use the function we previously created to add unfunded games to the DOM
// show all games
    // add all games from the JSON data to the DOM
// select each button in the "Our Games" section
// add event listeners with the correct functions to each button

// Show only games that do not yet have enough funding
function filterUnfundedOnly() {
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
    return unfundedGames; // For testing purposes
}

// Show only games that are fully funded
function filterFundedOnly() {
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
    return fundedGames; // For testing purposes
}

//  Show all games
function showAllGames() {
    addGamesToPage(GAMES_JSON);
}

// Add event listeners to filter buttons
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/
// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const descriptionText = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${numUnfunded} ${numUnfunded === 1 ? "game remains" : "games remain"} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p");
descriptionElement.innerText = descriptionText;
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// use destructuring and the spread operator to grab the first and second games
// create a new element to hold the name of the top pledge game, then append it to the correct element
// do the same for the runner up item

// Sort the games in descending order of pledged amount
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// Use destructuring to get the first and second games
const [firstGame, secondGame] = sortedGames;

// Display the top games and create and display first game
const firstGameElement = document.createElement("p");
firstGameElement.innerText = firstGame.name;
firstGameContainer.appendChild(firstGameElement);

// Create and display second game
const secondGameElement = document.createElement("p");
secondGameElement.innerText = secondGame.name;
secondGameContainer.appendChild(secondGameElement);