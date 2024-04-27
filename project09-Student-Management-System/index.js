import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    constructor(name) {
        this.name = name;
        this.studentID = Student.generateStudentID();
        this.balance = 0;
        this.courses = [];
    }
    enroll(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance: ${this.balance}`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`Tuition paid: $${amount}`);
        this.viewBalance();
    }
    showStatus() {
        console.log(chalk.yellow(`Name: ${this.name}`));
        console.log(chalk.yellow(`StudentID: ${this.studentID}`));
        console.log(chalk.yellow("Courses Enrolled: "));
        this.courses.forEach(course => {
            console.log(chalk.yellow(course));
        });
        this.viewBalance();
    }
    // Function to generate a unique 5-digit student ID
    static generateStudentID() {
        return Math.floor(10000 + Math.random() * 90000);
    }
}
// course prices
const coursePrices = {
    HTML: 6000,
    CSS: 8000,
    Typescript: 1000,
    Python: 9000
};
// Function to prompt user for course selection
async function selectCourse() {
    const { course } = await inquirer.prompt([
        {
            type: 'list',
            name: 'course',
            message: 'Select a course:',
            choices: Object.keys(coursePrices)
        }
    ]);
    return course;
}
// Function to prompt user for payment method
async function selectPaymentMethod() {
    const { paymentMethod } = await inquirer.prompt([
        {
            type: 'list',
            name: 'paymentMethod',
            message: 'Select payment method:',
            choices: ['Jazz Cash', 'Bank Payment', 'EasyPaisa']
        }
    ]);
    return paymentMethod;
}
// Msin function 
async function main() {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
            validate: function (value) {
                if (value.trim() !== '') {
                    return true;
                }
                return "Please enter a non empty value";
            },
        }
    ]);
    const student = new Student(name);
    let addMoreCourses = true;
    while (addMoreCourses) {
        const course = await selectCourse();
        const coursePrice = coursePrices[course];
        student.enroll(course);
        console.log(`Course ${course} added. Price : ${coursePrice}`);
        student.viewBalance();
        const { addCourse } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'addCourse',
                message: 'Do you want to add another course?'
            }
        ]);
        addMoreCourses = addCourse;
    }
    const paymentMethod = await selectPaymentMethod();
    console.log(`Payment method selected: ${paymentMethod}`);
    // Assuming payment is succesful
    student.payTuition(student.courses.reduce((total, course) => total + coursePrices[course], 0));
    // Display student status
    console.log("\nStudent Status:");
    student.showStatus();
    // Congratulations message 
    console.log(chalk.green("\nCongratulations! you have successfully enrolled."));
}
// call the main function
main();
