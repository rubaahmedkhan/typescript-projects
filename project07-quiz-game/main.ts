#! /usr/bin/env node

import readlineSync from 'readline-sync';
import chalk from 'chalk';


interface Question{
    question: string;
    options:string[];
    correctAnswerIndex: number;
}

interface Quiz{
    questions: Question[];
    currentQuestionIndex: number;
    score:number;
}
function displayQuestion(quiz: Quiz): void{
    const currentQuestion = quiz.questions[quiz.currentQuestionIndex];
    console.log(currentQuestion.question);
    currentQuestion.options.forEach((option, index) => {
       console.log(`${index + 1}. ${option}`);
    });
    
}
function processAnswer(quiz: Quiz, userAnswer: number): void {
    const currentQuestion = quiz.questions[quiz.currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswerIndex + 1) {
        console.log(chalk.green("Correct!"));
        quiz.score++;
    }else {
        console.log(chalk.red("Incorrect! The correct answer is: "));
        console.log(chalk.green.bold(`${currentQuestion.correctAnswerIndex + 1}. ${currentQuestion.options[currentQuestion.correctAnswerIndex]}`));

    }
    quiz.currentQuestionIndex++;
    if (quiz.currentQuestionIndex === quiz.questions.length){
        displayResult(quiz);
    }
}
function displayResult(quiz: Quiz): void{
    console.log(chalk.green.bold(`Your scored ${quiz.score} out of ${quiz.questions.length}`));
}

function startQuiz(quiz: Quiz):void {
    while (quiz.currentQuestionIndex < quiz.questions.length) {
        displayQuestion(quiz);
        const userInput =readlineSync.question(chalk.blue.bold("Enter valid option (or '0' to exit):"))
        const userAnswer =  parseInt(userInput, 10);
        if(userInput.trim() === '0'){
            console.log(chalk.blue("Exiting the quiz..."));
            displayResult(quiz);
            return; // stop the quiz after exiting
        }
        if (isNaN(userAnswer) || userAnswer < 0 || userAnswer> quiz.questions[quiz.currentQuestionIndex].options.length){
            console.log(chalk.red.bold("Invalid input. Please enter a valid option or'0' to exit. "));
            continue;
        }
        processAnswer(quiz, userAnswer);
        if(quiz.currentQuestionIndex === quiz.questions.length) {
            break;
        }
    }
}


// Example usage
const quiz:Quiz ={
    questions: [
    {
        question: "What is Typescript?",
        options: ["A programming language","A super set of javascript","A framework for web development","A database management system"],
        correctAnswerIndex: 1,
    },
    {
        question:"Which of the following statements is true about Typescript?",
        options: ["IT requires a seperate compiler to run","It can directly run in any web browser","It is a dynamically-typed language","It is developed by Facebook"],
        correctAnswerIndex: 2,
    },
    {
        question:"What file extension is comonly used for Typescript files?",
        options:[".js",".ts",".html",".css"],
        correctAnswerIndex: 1,
    },
    {
    question:"Which tool canbe used to compile Typescript code into Javascript?",
    options: ["npm","Webpack","Babel","tsc (TypeScript Compiler)"],
    correctAnswerIndex: 3
    },
    {
        question:"Typescript support which of the following features that Javascript does not?",
        options:["Interfaces","Generics","Decorators","All of the above"],
        correctAnswerIndex: 3 },
    ],
    currentQuestionIndex: 0,

    score: 0,
    };
    startQuiz(quiz);  
