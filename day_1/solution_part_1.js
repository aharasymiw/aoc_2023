// Import the fs module, so we can interact with the file system
const fs = require('fs');

// Read in the input file, blocking rather than the default async.
// The data variable is now one big string.
const fileString = fs.readFileSync('./day_1/input.txt',
    { encoding: 'utf8', flag: 'r' });

// Let's split it into an array, with each line being an element
const entries = fileString.split(/\r?\n/);

// Set the intial value for the accumulator to 0.
const intialValue = 0;

// reduce our array of entries, with the parseLine function and an intial value for the accumulator.
let sum = entries.reduce(parseLine, intialValue);

console.log(sum);

// a function that takes in a number (accumulator) and a string (line entry from the file).
// It it parses the numeric value from the entry, adds it to the accumulator, and returns the result.
function parseLine(accumulator, entry) {

    // use regex to extract an array of digits from our entry
    let entryNumerics = entry.match(/\d/g);

    // if block, becuase an entry may not have a digit (or may be a blank line at the end of the file);
    if (entryNumerics) {
        // concatinate the first and last value from our digit array (they may be the same digit if there is only 1!)
        let number = entryNumerics[0] + entryNumerics[entryNumerics.length - 1];

        // turn that 2 digit string into a number, add it to our accumulator, and return the value
        return accumulator + Number(number);
    } else {

        // If there were no numbers in our entry, return the accumulator unchanged.
        return accumulator;
    }
}
