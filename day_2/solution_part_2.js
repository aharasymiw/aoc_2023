const fs = require('fs');

const fileString = fs.readFileSync('./day_2/input.txt',
    { encoding: 'utf8', flag: 'r' });

// We no long have global max values declared, because they aren't needed.
// Rather than comparing each value against a max, and rejecting if we are over.
// We'll need to compare values against a min, and replace that min if they are over.

const lines = fileString.split(/\r?\n/);

lines.pop();

const cleanLines = lines.map(line => line.split(': ')[1]);

const games = cleanLines.map(cleanLine => cleanLine.split('; '));

const splitGames = games.map(game => game.map(trial => trial.split(', ')));

const flatGames = splitGames.map(splitGame => splitGame.flat());

// Loop over our games, and find the power of the minimum set.
// Add that value to the answer (which starts at 0)
let answer = flatGames.reduce((accumulator, game) => findGamePower(accumulator, game), 0);

console.log(answer);

// Loops over all tests in a game, and checks each one
// Updating the minumum value for the matching color if the new value is greater.
// At the end, multiply the mins for each color together and add that power to the running total
function findGamePower(total, tests) {

    // Let's start off on a good foot, assuming the min is 0 for each color until proven otherwise.
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;

    // Test each trial in the game
    tests.forEach(test => {
        // If it's a red trial check the number and update as necessary, otherwise return the same min red value.
        minRed = updateColorMin(test, ' red', minRed);
        // If it's a green trial check the number and update as necessary, otherwise return the same min green value.
        minGreen = updateColorMin(test, ' green', minGreen);
        // If it's a blue trial check the number and update as necessary, otherwise return the same min blue value.
        minBlue = updateColorMin(test, ' blue', minBlue);
    });

    // Once all mins are confirmed, multiply them to get our power
    let gamePowerScore = minRed * minGreen * minBlue;

    // Add our power to the running total, and return the updated total
    return total + gamePowerScore;
}

// Update the min for a given color
function updateColorMin(test, splitColor, minValue) {
    // '17 color' -> '17', only if the split color is ' color'
    let testValue = test.split(splitColor)[0];
    // If we have a number (since this trial's color matched the split color)
    if (!isNaN(testValue)) {
        // and if that number exedes the current min for the given color for the current game
        if (Number(testValue) > minValue) {
            // Then return the new larger min value
            return Number(testValue);
        }
    }

    // Otherwise, stick with the current min.
    return minValue;
};
