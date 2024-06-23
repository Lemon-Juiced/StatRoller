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
let fighter_e_knight = false;
let monk = false;
let paladin = false;
let ranger = false;
let ranger_str = false;
let rogue = false;
let rogue_a_trickster = false;
let sorcerer = false;
let warlock = false;
let wizard = false;
let wizard_enchantment = false;

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
 * Next it will figure out which classes are selected and apply the appropriate ability score modifiers.
 * If no classes are selected it will not order them in any way.
 * Finally, it will display the results in the HTML.
 *
 * This is borked, but idk :)
 *
 * @param n - The number of dice to roll.
 * @param x - The number of sides on the dice.
 * @param y - The number of dice to drop.
 * @param z - Whether to re-roll ones.
 */
function roll() {
    // Grab the scores from the HTML elements.
    let n = parseInt(document.getElementById("roll").value);
    let x = parseInt(document.getElementById("sides").value);
    let y = parseInt(document.getElementById("drop").value);
    let z = document.getElementById("reroll").checked;

    let scores = [];

    for (let i = 0; i < 6; i++) {
        scores.push(rollDropLowest(n, x, y, z));
    }

    // Sort the scores in descending order.
    scores.sort(function(a, b) {
        return b - a;
    });

    // Set the state of the classes.
    setClassState();

    let abilities = [
        {name: 'str', value: 0},
        {name: 'dex', value: 0},
        {name: 'con', value: 0},
        {name: 'int', value: 0},
        {name: 'wis', value: 0},
        {name: 'cha', value: 0}
    ];

    if (artificer) {
        abilities.find(a => a.name === 'int').value += 2;
        abilities.find(a => a.name === 'dex').value += 1;
        abilities.find(a => a.name === 'con').value += 1;
    }
    if (barbarian) {
        abilities.find(a => a.name === 'str').value += 2;
        abilities.find(a => a.name === 'con').value += 1;
    }
    if (bard) {
        abilities.find(a => a.name === 'cha').value += 2;
        abilities.find(a => a.name === 'dex').value += 1;
    }
    if (cleric) {
        abilities.find(a => a.name === 'wis').value += 2;
        abilities.find(a => a.name === 'str').value += 1;
        abilities.find(a => a.name === 'con').value += 1;
    }
    if (druid) {
        abilities.find(a => a.name === 'wis').value += 2;
        abilities.find(a => a.name === 'con').value += 1;
    }
    if (fighter) {
        abilities.find(a => a.name === 'str').value += 2;
        if(!fighter_e_knight) abilities.find(a => a.name === 'con').value += 1;
    }
    if (fighter_dex) {
        abilities.find(a => a.name === 'dex').value += 2;
        if(!fighter_e_knight) abilities.find(a => a.name === 'con').value += 1;
    }
    if (fighter_e_knight) {
        abilities.find(a => a.name === 'int').value += 1;
    }
    if (monk) {
        abilities.find(a => a.name === 'dex').value += 2;
        abilities.find(a => a.name === 'wis').value += 1;
    }
    if (paladin) {
        abilities.find(a => a.name === 'str').value += 2;
        abilities.find(a => a.name === 'cha').value += 1;
    }
    if (ranger) {
        abilities.find(a => a.name === 'dex').value += 2;
        abilities.find(a => a.name === 'wis').value += 1;
    }
    if (ranger_str) {
        abilities.find(a => a.name === 'str').value += 2;
        abilities.find(a => a.name === 'wis').value += 1;
    }
    if (rogue) {
        abilities.find(a => a.name === 'dex').value += 2;
        if(!rogue_a_trickster) abilities.find(a => a.name === 'cha').value += 1;
    }
    if (rogue_a_trickster) {
        abilities.find(a => a.name === 'int').value += 1;
    }
    if (sorcerer) {
        abilities.find(a => a.name === 'cha').value += 2;
        abilities.find(a => a.name === 'con').value += 1;
    }
    if (warlock) {
        abilities.find(a => a.name === 'cha').value += 2;
        abilities.find(a => a.name === 'con').value += 1;
    }
    if (wizard) {
        abilities.find(a => a.name === 'int').value += 2;
        if(!wizard_enchantment) {
            abilities.find(a => a.name === 'dex').value += 1;
            abilities.find(a => a.name === 'con').value += 1;
        }
    }
    if (wizard_enchantment) {
        abilities.find(a => a.name === 'cha').value += 1;
    }

    // A final optimization is that Strength and Intelligence are dump stats in 5e, so if their scores are 0, we can assign them another -1 to prioritize the other abilities.
    if (abilities.find(a => a.name === 'str').value === 0) {
        abilities.find(a => a.name === 'str').value -= 1;
    }
    if (abilities.find(a => a.name === 'int').value === 0) {
        abilities.find(a => a.name === 'int').value -= 1;
    }

    // Sort the abilities based on their values in descending order
    abilities.sort(function(a, b) {
        return b.value - a.value;
    });

    // Assign the scores to the abilities based on the order
    for (let i = 0; i < abilities.length; i++) {
        abilities[i].score = scores[i];
    }

    // Display the results in the HTML.
    for (let i = 0; i < abilities.length; i++) {
        document.getElementById(abilities[i].name).innerHTML = abilities[i].score + " (" + getModifier(abilities[i].score) + ")";
    }
}

/**
 * Gets the modifier for an ability score.
 * If the score is positive we have to add the '+' symbol
 *
 * @param score - The ability score.
 * @returns The modifier for the ability score.
 */
function getModifier(score) {
    let modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? "+" + modifier : modifier;
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
    fighter_e_knight = document.getElementById("fighter_e_knight").checked;
    monk = document.getElementById("monk").checked;
    paladin = document.getElementById("paladin").checked;
    ranger = document.getElementById("ranger").checked;
    ranger_str = document.getElementById("ranger_str").checked;
    rogue = document.getElementById("rogue").checked;
    rogue_a_trickster = document.getElementById("rogue_a_trickster").checked;
    sorcerer = document.getElementById("sorcerer").checked;
    warlock = document.getElementById("warlock").checked;
    wizard = document.getElementById("wizard").checked;
    wizard_enchantment = document.getElementById("wizard_enchantment").checked;
}