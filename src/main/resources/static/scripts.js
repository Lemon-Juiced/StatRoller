// scripts.js - The JavaScript file for the web application.
// @author: Lemon

// All the information for the (game) classes being turned on/off.
let artificer = false;
let barbarian = false;
let bard = false;
let cleric = false;
let druid = false;
let fighter = false;
let fighter_dex = false;
let monk = false;
let paladin = false;
let ranger = false;
let rogue = false;
let sorcerer = false;
let warlock = false;
let wizard = false;

/**
 * Simulates rolling a dice of n number of sides and returns the result.
 *
 * @param n - The number of sides on the dice.
 * @returns The result of the dice roll.
 */
function rollDice(n) {
    return Math.floor(Math.random() * n) + 1;
}

/**
 * Simulates the rolling of a n number of dice with x number of sides and drops the lowest y number of dice.
 * Additionally, it will check if z is true and if so, it will re-roll ones.
 * It then returns the sum of the remaining dice.
 *
 * @param n - The number of dice to roll.
 * @param x - The number of sides on the dice.
 * @param y - The number of dice to drop.
 * @param z - Whether to re-roll ones.
 * @returns The sum of the remaining dice.
 */
function rollDropLowest(n, x, y, z) {
    let dice = [];
    let sum = 0;

    for (let i = 0; i < n; i++) {
        let roll = rollDice(x);
        if (z && roll === 1) {
            roll = rollDice(x);
        }
        dice.push(roll);
    }

    dice.sort(function(a, b) {
        return a - b;
    });

    for (let i = y; i < dice.length; i++) {
        sum += dice[i];
    }

    return sum;
}

/**
 * Do the following for all six ability scores:
 * Simulates the rolling of a n number of dice with x number of sides and drops the lowest y number of dice.
 * Additionally, it will check if z is true and if so, it will re-roll ones.
 * It then returns the sum of the remaining dice.
 *
 * @param n - The number of dice to roll.
 * @param x - The number of sides on the dice.
 * @param y - The number of dice to drop.
 * @param z - Whether to re-roll ones.
 * @return The sums for all six ability scores.
 */
function roll() {
    // Grab the scores from the HTML elements.
    let n = document.getElementById("roll").value;
    let x = document.getElementById("sides").value;
    let y = document.getElementById("drop").value;
    let z = document.getElementById("reroll").checked;

    let scores = [];

    for (let i = 0; i < 6; i++) {
        scores.push(rollDropLowest(4, 6, 1, true));
    }

    return scores;
}

/**
 * Inserts the result of the preset into the input field.
 *
 * @param n - The number of dice to roll.
 * @param x - The number of sides on the dice.
 * @param y - The number of dice to drop.
 */
function insertPreset(n, x, y) {
    document.getElementById("roll").value = n
    document.getElementById("sides").value = x
    document.getElementById("drop").value = y
}

/**
 * Set the state of the class to true or false depending on if it is checked in the HTML.
 */
function setClassState() {
    artificer = document.getElementById("artificer").checked;
    barbarian = document.getElementById("barbarian").checked;
    bard = document.getElementById("bard").checked;
    cleric = document.getElementById("cleric").checked;
    druid = document.getElementById("druid").checked;
    fighter = document.getElementById("fighter").checked;
    fighter_dex = document.getElementById("fighter_dex").checked;
    monk = document.getElementById("monk").checked;
    paladin = document.getElementById("paladin").checked;
    ranger = document.getElementById("ranger").checked;
    rogue = document.getElementById("rogue").checked;
    sorcerer = document.getElementById("sorcerer").checked;
    warlock = document.getElementById("warlock").checked;
    wizard = document.getElementById("wizard").checked;
}