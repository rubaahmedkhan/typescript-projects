#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const userInput = await inquirer.prompt([
    {
        type: "input",
        name: "userID",
        message: "Enter User ID",
    },
    {
        type: "number",
        name: "userPin",
        message: "Enter your pin"
    },
    {
        type: "list",
        name: "accountType",
        choices: ["Current", "Saving"],
        message: "Select your account type"
    },
    {
        type: "list",
        name: "transactionType",
        choices: ["Fast Cash", "Cash Withdraw", "Balance Inquiry"],
        message: "Select your transaction"
    },
    {
        type: "number",
        name: "amount",
        message: "Enter amount you want to withdraw",
        when(userInput) {
            return userInput.transactionType === "Cash Withdraw";
        }
    },
    {
        type: "list",
        name: "amount",
        choices: ["5000", "7000", "8000", "9000", "250000"],
        message: "Select amount you want to withdraw",
        when(userInput) {
            return userInput.transactionType === "Fast Cash";
        }
    }
]);
//store user input data in variable
const userID = userInput.userID;
const userPin = userInput.userPin;
const enteredAmount = userInput.amount;
if ((userID && userPin) && userInput.transaction === "Balance Inquiry") {
    const userBalance = Math.floor(Math.random() * 100000);
    console.log(chalk.blue.italic(`Your current balance is Rs ${userBalance}\n`));
}
else if (userID && userPin) {
    const userBalance2 = Math.floor(Math.random() * 100000);
    if (userBalance2 > enteredAmount) {
        console.log(chalk.green.italic(`Your account has been debited with Rs  ${enteredAmount}
        and your remaing balance is ${userBalance2 - enteredAmount}`));
    }
    else {
        console.log(chalk.red.underline(`\n Unsufficient Balance`));
    }
    ;
}
;
