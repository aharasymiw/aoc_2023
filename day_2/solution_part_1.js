// Import the fs module, so we can interact with the file system
const fs = require('fs');

// Read in the input file, blocking rather than the default async.
// The data variable is now one big string.
const fileString = fs.readFileSync('./day_2/input.txt',
    { encoding: 'utf8', flag: 'r' });

// Declare the constraints we'll test each game against.
const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

// Let's split it into an array, with each line being an element
const lines = fileString.split(/\r?\n/);

// Remove the blank line at the end
lines.pop();

// Remove the Game number text from each line
// Turn this:
// 'Game 5: 19 red, 1 green; 7 red, 1 green, 1 blue; 7 red; 13 red, 2 green'
// Into this:
// '19 red, 1 green; 7 red, 1 green, 1 blue; 7 red; 13 red, 2 green'
const cleanLines = lines.map(line => line.split(': ')[1]);

// For each cleand up line, split it into an array of trial strings
// Turn this:
// '19 red, 1 green; 7 red, 1 green, 1 blue; 7 red; 13 red, 2 green'
// Into this:
// ['19 red, 1 green', '7 red, 1 green, 1 blue', '7 red; 13 red, 2 green']
const games = cleanLines.map(cleanLine => cleanLine.split('; '));

// Split each trial into an array of color count strings
// Turn this:
// ['19 red, 1 green', '7 red, 1 green, 1 blue', '7 red; 13 red, 2 green']
// Into this:
// [['19 red', '1 green'], ['7 red', '1 green', '1 blue'], ['7 red', '13 red', '2 green']]
const splitGames = games.map(game => game.map(trial => trial.split(', ')));

// Recollect each game into one array, with each test color as an element
// Turn this:
// [['19 red', '1 green'], ['7 red', '1 green', '1 blue'], ['7 red', '13 red', '2 green']]
// Into this:
// ['19 red', '1 green', '7 red', '1 green', '1 blue', '7 red', '13 red', '2 green']
const flatGames = splitGames.map(splitGame => splitGame.flat());

// Loop over our games, and check if each is valid.  If it is, add it's score to the answer (which starts at 0)
// We will use the index of the game + 1 to equal the value that game contributes to the answer
let answer = flatGames.reduce((accumulator, game, index) => validateGame(accumulator, game, index + 1), 0);

console.log(answer);

// Loops over all tests in a game, and checks to see (color by color), if any trial's value excedes the max possible value for that color.
function validateGame(total, tests, gameNumber) {

    // Let's start off on a good foot, assuming this game is good
    let isValidGame = true;

    // Test each trial in the game
    tests.forEach(test => {
        if (
            // Decide if it's bad by testing to see if it's an invalid red trial
            rejectBasedOnColorPull(test, ' red', maxRed) ||
            // Or an invalid green trial
            rejectBasedOnColorPull(test, ' green', maxGreen) ||
            // Or an invalid blue trial
            rejectBasedOnColorPull(test, ' blue', maxBlue)
        ) {
            // If the trial is bad, the game is not valid
            isValidGame = false;
        }
    });

    // If the game is valid
    if (isValidGame) {
        // Return the updated total score, including what this game contributes
        return total += gameNumber;
    }

    // Otherwise, return running total without this game's contribution
    return total;
}

// Tell if a trial is invalid for a particular color
function rejectBasedOnColorPull(test, splitColor, maxValue) {
    // '17 color' -> '17', only if the split color is ' color'
    let testValue = test.split(splitColor)[0];
    // If we have a number (since this trial's color matched the split color)
    if (!isNaN(testValue)) {
        // and if that number exedes the max for the given color
        if (testValue > maxValue) {
            // Then this game is invalid
            return true;
        }
    }
    // Otherwise, we can't claim anything based on this one trial
    return false;
};
