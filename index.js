const inquirer = require("inquirer")
const mysql = require('mysql2');

//const cTable = require("console.table")

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'whatifimbroke',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

// //this is a stored GET requests that will run when the prompt is ran
// const getDepartments = async () => await axios.get('http://localhost:3000/api/departments');
// const getEmployee = async () => await axios.get('http://localhost:3000/api/employee');
// const getRoles = async () => await axios.get('http://localhost:3000/api/roles');
//this is a stored POST requests that will run when the prompt is ran
//TODO write some post requests



function menu() {
    inquirer.prompt([
        //list of prompts for the user to use
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
    //validates prompts
    {
       
        if (options.menu == "View all employees") {
            console.log("\n ----View all employees---- \n")
            veiwAllEmployees()
             
        }
        if (options.menu == "Add an employee") {
            console.log("\n ----Add an employee---- \n")
            newEmployee()
            
        }
        if (options.menu == "Update employee role") {
            console.log("\n ----Update employee role---- \n")
            //run code
        }
        if (options.menu == "Veiw all roles") {
            console.log("\n ----Veiw all roles---- \n")
            veiwAllRoles()
            
        }
        if (options.menu == "Add role") {
            console.log("\n ----Add role---- \n")
            //run code
        }
        if (options.menu == "Veiw all departments") {
            console.log("\n ----Veiw all departments---- \n")
            veiwAllDepartments()
        
        }
        if (options.menu == "Add departments") {
            console.log("\n ----Add departments---- \n")
            newDepartment()
            
        }
    })
}
//gets all data on employees
function veiwAllEmployees() {
    db.promise().query('SELECT * FROM employee')
    .then(([rows]) => {
        console.table(rows)
        menu()
    })
}

//gets all data on departments
function veiwAllDepartments(){
    db.promise().query('SELECT * FROM departments')
    .then(([rows]) => {
        console.table(rows)
        menu()
    })
}

//gets all data on roles
function veiwAllRoles() {
    db.promise().query('SELECT * FROM purpose')
    .then(([rows]) => {
        console.table(rows)
        menu()
    })
}

//adds a new employee to the data base 
function newEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: `please enter employees first name`,
            name: 'first',
            
        },
        {
            type: 'input',
            message: `please enter employees last name`,
            name: 'last',
            
        },
        {
            type: 'input',
            message: `please enter employees role id`,
            name: 'role',
            
        },
        {
            type: 'input',
            message: `please enter employees manager id`,
            name: 'manager',
            
        },
    ]).then((res) => {
        db.promise().query(`INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("${res.first}", "${res.last}", ${res.manager}, ${res.role})`)
        .then((res) => {
            veiwAllEmployees()
        })
    })
}

function newDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: `please enter the name of your department`,
            name: 'department',
            
        }
    ]).then((res) => {
        db.promise().query(`INSERT INTO departments (department_name) VALUES ("${res.department}")`)
        .then((res) => {
            veiwAllDepartments()
        })
    })
}

function newRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: `please enter the name of your department`,
            name: 'department',
            
        }
    ]).then((res) => {
        db.promise().query(`INSERT INTO departments (department_name) VALUES ("${res.department}")`)
        .then((res) => {
            veiwAllDepartments()
        })
    })
}

menu()