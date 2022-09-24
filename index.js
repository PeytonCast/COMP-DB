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

function newRole() {
    db.promise().query("SELECT * FROM departments;")
    .then((res) => {
        //builds an array of departments
        let departments = res[0].map((department) => {
            return {
                value : department.id,
                name : department.department_name
            }

        })
        inquirer.prompt([
            {
                type : "input",
                name : "title",
                message : "Enter the new role's title"
            },
            {
                type : "input",
                name : "salary",
                message : "Enter the new role's salary"
            },
            
            {
                type: "list",
                name:"department",
                message:"please select a department",
                choices: departments
            }
        
        ]).then((res) => {// validates prompts
            db.promise().query(`INSERT INTO purpose (title, salary, department_id) VALUES ("${res.title}", "${res.salary}", ${res.department})`)
        .then(() => {
           veiwAllRoles()
        })
    
        })


    })
}

//gets all data on roles
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
        //builds an array of departments
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
          // validates prompts
        }).then((res) => {
            db.promise().query(`SELECT purpose.department_id, departments.department_name, employee.first_name, employee.last_name, employee.id, employee.manager_id FROM employee LEFT JOIN purpose ON employee.role = purpose.id LEFT JOIN departments ON purpose.department_id = departments.id where departments.id = ${res.department};`)
        .then(([rows]) => {
            console.table(rows)
            menu()
        })
    
        })


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
    db.promise().query("SELECT * FROM purpose;")
    .then((res) => {
        //builds an array of roles
        let purpose = res[0].map((purpose) => {
            return {
               value : purpose.id,
                name : purpose.title
            }
        })
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
            type: 'list',
            message: `please select employee's role`,
            name: 'role',
            choices: purpose,
            
        },
        {
            type: 'input',
            message: `please enter employee's manager id`,
            name: 'manager',
            
        },
    ]).then((res) => {
        if (res.manager === ''){
            //with no manager
            db.promise().query(`INSERT INTO employee (first_name, last_name, role) VALUES ("${res.first}", "${res.last}", ${res.role})`)
            .then((res) => {
                veiwAllEmployees()}
                )} else { //with a manager
        db.promise().query(`INSERT INTO employee (first_name, last_name, role, manager_id) VALUES ("${res.first}", "${res.last}", ${res.role}, ${res.manager})`)
        .then((res) => {
            veiwAllEmployees()
        })}
    })
})}


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


//changes the employee's role
function updateEmployee() {
    db.promise().query("SELECT * FROM employee;")
    .then((res) => {
        // makes an array of data from employee
        let employees = res[0].map((employee) => {
            return {
               value : employee.id,
                name : employee.id

            }

        })
        db.promise().query("SELECT * FROM purpose;")
    .then((res) => {
        // makes an array of data from purpose *note purpose is the eqivelent to roles
        let purpose = res[0].map((purpose) => {
            return {
               value : purpose.id,
                name : purpose.title
            }

        })
    inquirer.prompt([
        {
            type: 'list',
            message: `please enter the employee's id`,
            name: 'id',
            choices: employees
            //using the arrays here 
        },
        {
            type: 'list',
            message: `please enter the the new role`,
            name: 'role',
            choices: purpose
            //using the arrays here 
        }
    ]).then((res) => {
        // validating the prompts
        db.promise().query(`UPDATE employee SET role = ${res.role} WHERE id = ${res.id}`)
        .then((res) => {
            veiwAllEmployees()
        })
    })
})})}

menu()
module.exports = menu