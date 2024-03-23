#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
async function startGame() {
    const secretNum = Math.floor(Math.random() * 10 + 1);
    async function playRound() {
        const userInput = await inquirer.prompt({
            type: "number",
            name: "userNum",
            message: "Enter Your Number"
        });
        const userNum = userInput.userNum;
        if (userNum === secretNum) {
            console.log(chalk.blue.italic(`Congratulations! your guessed number is correct`));
            return true;
        }
        else {
            if (userNum > secretNum) {
                console.log(chalk.yellow.underline(`\n Your guessed number is greater than actual number`));
            }
            else if (userNum < secretNum) {
                console.log(chalk.green.underline(`\n Your guessed number is less than actual number`));
            }
            return false;
        }
    }
    let isguessed = false;
    let attempts = 0;
    console.log(`\n Number Guessing Game!`);
    while (!isguessed) {
        attempts++;
        console.log(`Your attempt No.${attempts}`);
        isguessed = await playRound();
    }
    ;
    console.log(`You have attempted ${attempts} times to guessed the right Number`);
}
;
startGame();
