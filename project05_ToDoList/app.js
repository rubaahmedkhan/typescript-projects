#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
//print welcome message
console.log(chalk.bold.green("\n \t TODO LIST APPLICATION \n"));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option you want todo:",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
// funtion to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task:"
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task} task added successfully in Todo List`);
};
//function to view all Todo-List Tasks
let viewTask = () => {
    console.log(`\n Your Todo List: \n`);
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
};
// function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to delete:",
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deletedTask} this task has been deleted successfully from your Todo List`);
};
// function to update task 
let updateTask = async () => {
    await viewTask();
    let updateTaskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to update :"
        },
        {
            name: "newTask",
            type: "input",
            message: "Now Enter new task name"
        }
    ]);
    todoList[updateTaskIndex.index - 1] = updateTaskIndex.newTask;
    console.log(` \n Task at index no. ${updateTaskIndex.index - 1} updated successfully [for updated list check option:'view todo list']`);
};
main();
