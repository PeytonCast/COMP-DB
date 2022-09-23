const inquirer = require("inquirer")
const mysql = require('mysql2');

// TODO 
//add Update employee managers. +2
//add View employees by manager. +2
//add  BONUS. +2
//add Delete departments +2
//add Delete roles +2
//add delete employee +2
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


function menu() {
    inquirer.prompt([
        //list of prompts for the user to use
        {
            type: 'list',
            message: `Where would you like to go?`,
            name: 'menu',
            choices: [
               "View all employees",
               "View employees by department BONUS",
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
        if (options.menu == "View employees by department BONUS") {
            console.log("\n ----Employees by department---- \n")
            employeeByDepartment()
             
        }
        if (options.menu == "Add an employee") {
            console.log("\n ----Add an employee---- \n")
            newEmployee()
            
        }
        if (options.menu == "Update employee role") {
            console.log("\n ----Update employee role---- \n")
            updateEmployee()
            
        }
        if (options.menu == "Veiw all roles") {
            console.log("\n ----Veiw all roles---- \n")
            veiwAllRoles()
            
        }
        if (options.menu == "Add role") {
            console.log("\n ----Add role---- \n")
            newRole()
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
    db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, employee.role, purpose.title, purpose.salary, departments.department_name FROM employee JOIN purpose ON employee.role = purpose.id LEFT JOIN departments ON purpose.department_id = departments.id;')
    .then(([rows]) => {
        console.table(rows)
        menu()
    })
}
function veiwAllRoles() {
    db.promise().query('SELECT purpose.id, purpose.title, purpose.salary, departments.department_name FROM purpose LEFT JOIN departments ON purpose.department_id = departments.id;')
    .then(([rows]) => {
        console.table(rows)
        menu()
    })
}

//bonus 
function employeeByDepartment() {
    db.promise().query("SELECT * FROM departments;")
    .then((res) => {
        
        let departments = res[0].map((department) => {
            return {
                value : department.id,
                name : department.department_name
            }

        })
        inquirer.prompt({
            type: "list",
            name:"department",
            message:"please select a department",
            choices: departments
    
        }).then((res) => {
            db.promise().query(`SELECT purpose.department_id, departments.department_name, employee.first_name, employee.last_name, employee.id, employee.manager_id FROM employee LEFT JOIN purpose ON employee.role = purpose.id LEFT JOIN departments ON purpose.department_id = departments.id where departments.id = ${res.department};`)
        .then(([rows]) => {
            console.table(rows)
            menu()
        })
    
        })


    })
    
}

//this is used in the update employee function
function veiwEmployees() {
    db.promise().query('SELECT * FROM employee')
    .then(([rows]) => {
        console.log('\n')
        console.table(rows)
    
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
        db.promise().query(`INSERT INTO employee (first_name, last_name, manager_id, role) VALUES ("${res.first}", "${res.last}", ${res.manager}, ${res.role})`)
        .then((res) => {
            veiwAllEmployees()
        })
    })
}
//adds a new department to the data base 
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


//adds a new role to the data base 
function updateEmployee() {
    veiwEmployees()
    inquirer.prompt([
        {
            type: 'input',
            message: `please enter the employee's id`,
            name: 'id',     
        },
        {
            type: 'input',
            message: `please enter the the new role id`,
            name: 'role',
        }
    ]).then((res) => {
        db.promise().query(`UPDATE employee SET role = ${res.role} WHERE id = ${res.id}`)
        .then((res) => {
            veiwAllEmployees()
        })
    })
}

menu()
module.exports = menu