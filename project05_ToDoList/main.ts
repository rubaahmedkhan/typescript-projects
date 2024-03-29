#! /usr/bin/env node

import inquirer from "inquirer";

let toDos: string[] =[]
let loop = true;

while(loop) {
    const answers: {
        toDo: string;
        addMore: boolean
    } = await inquirer.prompt([
        {
            type: "input",
            name: "toDo",
            message: "What do you want to add in your Todo"
        },
        {
            type: "confirm",
            name: "addMore",
            message: "Do you want to add more Todo?"
        },
    ]);
    const {toDo , addMore} =answers;

    loop =addMore;
    if(toDo){
        toDos.push(toDo);
    }else{
        console.log("Kindly add valid input");
    }
}
if (toDos.length > 0){
    console.log("Your Todo list is: ");
    toDos.forEach(toDo => {
        console.log(toDo);
    });
}else{
    console.log("No Todos found");
}