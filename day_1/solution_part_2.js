const fs = require('fs');

const fileString = fs.readFileSync('./day_1/input.txt',
    { encoding: 'utf8', flag: 'r' });

const entries = fileString.split(/\r?\n/);

const intialValue = 0;

let sum = entries.reduce(parseLine, intialValue);

console.log(sum);

function parseLine(accumulator, entry) {

    // This is the only new thing, we clean up the entries first, converting numbers as words to numbers as digits
    let convertedEntry = wordsToNumbers(entry);

    let entryNumerics = convertedEntry.match(/\d/g);

    if (entryNumerics) {
        let number = entryNumerics[0] + entryNumerics[entryNumerics.length - 1];

        return accumulator + Number(number);
    } else {

        return accumulator;
    }
}

// This function takes in a string, and replaces any substring that's a spelled out number thusly: seven -> seven7seven
function wordsToNumbers(entry) {

    let convertedEntry = entry.replaceAll('zero', 'zero0zero');

    convertedEntry = convertedEntry.replaceAll('one', 'one1one');
    convertedEntry = convertedEntry.replaceAll('two', 'two2two');
    convertedEntry = convertedEntry.replaceAll('three', 'three3three');
    convertedEntry = convertedEntry.replaceAll('four', 'four4four');
    convertedEntry = convertedEntry.replaceAll('five', 'five5five');
    convertedEntry = convertedEntry.replaceAll('six', 'six6six');
    convertedEntry = convertedEntry.replaceAll('seven', 'seven7seven');
    convertedEntry = convertedEntry.replaceAll('eight', 'eight8eight');
    convertedEntry = convertedEntry.replaceAll('nine', 'nine9nine');

    return convertedEntry;
}
