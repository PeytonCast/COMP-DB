const inquirer = require("inquirer")
const axios = require("axios")
const cTable = require("console.table")
const getDepartments = async () => await axios.get('http://localhost:3000/api/departments');
const getEmployee = async () => await axios.get('http://localhost:3000/api/employee');
const getRoles = async () => await axios.get('http://localhost:3000/api/roles');
 
    


function menu() {
    inquirer.prompt([
        {
            type: 'list',
            message: `Where would you like to go?`,
            name: 'menu',
            choices: [
               "View all employees",
               "Add an employee",
               "Update employee role",
               "Veiw all roles",
               "Add role",
               "Veiw all departments",
               "Add departments"
               
             ] 
        }
    ]).then((options) => 
    {
       
        if (options.menu == "View all employees") {
            console.log("\n ----View all employees---- \n")
            getEmployee().then((res) => {
                console.table(res.data.employee)
                menu()
            })
             
        }
        if (options.menu == "Add an employee") {
            console.log("\n ----Add an employee---- \n")
            //run code
        }
        if (options.menu == "Update employee role") {
            console.log("\n ----Update employee role---- \n")
            //run code
        }
        if (options.menu == "Veiw all roles") {
            console.log("\n ----Veiw all roles---- \n")
            getRoles().then((res) => {
                console.table(res.data.roles)
                menu()
            })
            
        }
        if (options.menu == "Add role") {
            console.log("\n ----Add role---- \n")
            //run code
        }
        if (options.menu == "Veiw all departments") {
            console.log("\n ----Veiw all departments---- \n")
            getDepartments().then((res) => {
                console.table(res.data.departments)
                menu()
            })
        
        }
        if (options.menu == "Add departments") {
            console.log("\n ----Add departments---- \n")
            
            //run code
        }
    })
}
module.exports = menu;
