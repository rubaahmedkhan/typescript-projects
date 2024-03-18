import inquirer from "inquirer";
import chalk from "chalk";

interface userInput{
    paragraph: string;
}

const userInput: userInput = await inquirer.prompt({
    type: "input",
    name: "paragraph",
    message: "Enter your paragraph to count words!"

});

const paraInput = userInput.paragraph;

// for counting letters in paragraph
const letterWithoutSpace =paraInput.replace(/\s/g, "");
const letterCount = letterWithoutSpace.length; //count total number of letter
//console.log(letterCount);

//for counting words
const word = paraInput.split(" ");
const wordCount = word.length;

console.log(chalk.green.italic(`Total letters in your para are ${letterCount} and total words are ${wordCount}`));