import inquirer from "inquirer";
import chalk from "chalk";
const answer = await inquirer.prompt([
    { message: "Enter first number", type: "number", name: "firstNumber" },
    { message: "Enter second number", type: "number", name: "secondNumber" },
    {
        message: "Select one of the operators to perform action",
        type: "list",
        name: "operators",
        choices: ["Addition", "Subtraction", "Multiplication", "Division"],
    },
]);
// conditional statement
if (answer.operators === 'Addition') {
    console.log(chalk.green(answer.firstNumber + answer.secondNumber));
}
else if (answer.operators === 'Subtraction') {
    console.log(chalk.yellow(answer.firstNumber - answer.secondNumber));
}
else if (answer.operators === 'Multiplication') {
    console.log(chalk.blue(answer.firstNumber * answer.secondNumber));
}
else if (answer.operators === 'Division') {
    console.log(chalk.bgGray(answer.firstNumber / answer.secondNumber));
}
else {
    console.log(chalk.red('Please select valid operator'));
}
;
