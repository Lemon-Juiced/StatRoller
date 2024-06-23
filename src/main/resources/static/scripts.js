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
    let n = document.getElementById("roll").value;
    let x = document.getElementById("sides").value;
    let y = document.getElementById("drop").value;
    let z = document.getElementById("reroll").checked;

    let scores = [];

    for (let i = 0; i < 6; i++) {
        scores.push(rollDropLowest(4, 6, 1, true));
    }

    // Sort the scores in descending order.
    scores.sort(function(a, b) {
        return b - a;
    });

    // Set the state of the classes.
    setClassState();

    // Each class impacts the order of the ability scores. They will apply a +2 to one of the scores and potentially +1 to one or several others.
    // The highest score will get the highest result of the dice roll and the lowest score will get the lowest result of the dice roll.
    // If there is a tie, the score first in the order will be chosen first
    let str = 0;
    let dex = 0;
    let con = 0;
    let int = 0;
    let wis = 0;
    let cha = 0;

    if (artificer) {
        int += 2;
        dex += 1;
        con += 1;
    }
    if (barbarian) {
        str += 2;
        con += 1;
    }
    if (bard) {
        cha += 2;
        dex += 1;
    }
    if (cleric) {
        wis += 2;
        str += 1;
        con += 1;
    }
    if (druid) {
        wis += 2;
        con += 1;
    }
    if (fighter) {
        str += 2;
        if(!fighter_e_knight) con += 1;
    }
    if (fighter_dex) {
        dex += 2;
        if(!fighter_e_knight) con += 1;
    }
    if (fighter_e_knight) {
        int + 1;
    }
    if (monk) {
        dex += 2;
        wis += 1;
    }
    if (paladin) {
        str += 2;
        cha += 1;
    }
    if (ranger) {
        dex += 2;
        wis += 1;
    }
    if (ranger_str) {
        str += 2;
        wis += 1;
    }
    if (rogue) {
        dex += 2;
        if(!rogue_a_trickster) cha += 1;
    }
    if (rogue_a_trickster) {
        int += 1;
    }
    if (sorcerer) {
        cha += 2;
        con += 1;
    }
    if (warlock) {
        cha += 2;
        con += 1;
    }
    if (wizard) {
        int += 2;
        if(!wizard_enchantment) {
        dex += 1;
        con += 1;
        }
    }
    if (wizard_enchantment) {
        cha += 1;
    }

    // Order the scores based on the classes selected.
    // The ability with the highest scores will have highest sums of the dice rolls added to their column.
    // The order is STR, DEX, CON, INT, WIS, CHA.
    let orderedScores = [];

    for (let i = 0; i < 6; i++) {
        if (str === Math.max(str, dex, con, int, wis, cha)) {
            orderedScores.push(scores.shift() + str);
        } else if (dex === Math.max(str, dex, con, int, wis, cha)) {
            orderedScores.push(scores.shift() + dex);
        } else if (con === Math.max(str, dex, con, int, wis, cha)) {
            orderedScores.push(scores.shift() + con);
        } else if (int === Math.max(str, dex, con, int, wis, cha)) {
            orderedScores.push(scores.shift() + int);
        } else if (wis === Math.max(str, dex, con, int, wis, cha)) {
            orderedScores.push(scores.shift() + wis);
        } else if (cha === Math.max(str, dex, con, int, wis, cha)) {
            orderedScores.push(scores.shift() + cha);
        }
    }

    // Display the results in the HTML.
    document.getElementById("str").innerHTML = orderedScores[0];
    document.getElementById("dex").innerHTML = orderedScores[1];
    document.getElementById("con").innerHTML = orderedScores[2];
    document.getElementById("int").innerHTML = orderedScores[3];
    document.getElementById("wis").innerHTML = orderedScores[4];
    document.getElementById("cha").innerHTML = orderedScores[5];
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