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
 * It then returns the sum of the remaining dice.
 *
 * @param n - The number of dice to roll.
 * @param x - The number of sides on the dice.
 * @param y - The number of dice to drop.
 * @returns The sum of the remaining dice.
 */
function rollDropLowest(n, x, y) {
    let rolls = [];
    for (let i = 0; i < n; i++) {
        rolls.push(rollDice(x));
    }
    rolls.sort((a, b) => a - b);
    rolls.splice(0, y);
    return rolls.reduce((a, b) => a + b, 0);
}

/**
 * Simulates the rolling of a n number of dice with x number of sides. (No dice are dropped)
 * It then returns the sum of the dice.
 *
 * @param n - The number of dice to roll.
 * @param x - The number of sides on the dice.
 * @returns The sum of the dice.
 */
function roll(n, x) {
    return rollDropLowest(n, x, 0);
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