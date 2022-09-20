const fs = require("fs")
const inquirer = require("inquirer")


function menu() {
    inquirer.prompt([
        {
            type: 'list',
            message: `Where would you like to start?`,
            name: 'menu',
            choices: [
               "View all employees",
               "Add an employee",
               "Update empoyee role",
               "Veiw all roles",
               "Add role",
               "Veiw all departments",
               "Add departments"
               
             ] 
        }
    ]).then((options) => 
    {
       
        if (options.menu == "View all employees") {
            console.log("View all employees")
            //run code
        }
        if (options.menu == "Add an employee") {
            console.log("Add an employee")
            //run code
        }
        if (options.menu == "Update employee role") {
            console.log("Update employee role")
            //run code
        }
        if (options.menu == "Veiw all roles") {
            console.log("Veiw all roles")
            //run code
        }
        if (options.menu == "Add role") {
            console.log("Add role")
            //run code
        }
        if (options.menu == "Veiw all departments") {
            console.log("Veiw all departments")
            //run code
        }
        if (options.menu == "Add departments") {
            console.log("Add departments")
            //run code
        }
    })
}
module.exports = menu;
