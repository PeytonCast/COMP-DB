const inquirer = require("inquirer")
const mysql = require('mysql2');

// TODO 
//DONE Update employee managers. +2
//DONE View employees by manager. +2
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
               "View All Managers",
               "Add Manager",
               "Update Manager BONUS +2",
               "View employees by manager BONUS +2",
               "View all employees",
               "View employees by department BONUS +2",
               "Add an employee",
               "Update employee role",
               "Veiw all roles",
               "Add role",
               "Veiw all departments",
               "Add departments",
               "Delete Employee BONUS +2",
               "Delete Department BONUS +2",
               "Delete Role BONUS +2"
             ] 
        }
    ]).then((options) => 
    //validates prompts
    {

        if (options.menu == "Delete Employee BONUS +2") {
            console.log("\n ----Delete Employee---- \n")
            deleteEmployee()
             
        } if (options.menu == "Delete Department BONUS +2") {
            console.log("\n ----Delete Department---- \n")
            deleteDepartment()
             
        } if (options.menu == "Delete Role BONUS +2") {
            console.log("\n ----Delete Role---- \n")
            deleteRole()

        }
        if (options.menu == "View All Managers") {
            console.log("\n ----View all managers---- \n")
            veiwAllManagers()
             
        }
        if (options.menu == "Add Manager") {
            console.log("\n ----add manager---- \n")
            addManager()
             
        }      
        if (options.menu == "Update Manager BONUS +2") {
            console.log("\n ----update manager---- \n")
            updateManager()
             
        }      
        if (options.menu == "View all employees") {
            console.log("\n ----View all employees---- \n")
            veiwAllEmployees()
             
        }
        if (options.menu == "View employees by manager BONUS +2") {
            console.log("\n ----Employees by department---- \n")
            employeeByManager()
        }
        if (options.menu == "View employees by department BONUS +2") {
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

function deleteEmployee() {
    db.promise().query("SELECT * FROM employee;")
    .then((res) => {
        // makes an array of data from employee
        let employee = res[0].map((employees) => {
        
            return {
               value : employees.id,
                name : employees.id
            }

        })
    inquirer.prompt([
        {
            type: 'list',
            message: `Please select the employee's id to delete`,
            name: 'id',
            choices: employee
            //using the arrays here 
        }
    ]).then((res) => 
    {
        // validating the prompts
        db.promise().query(`DELETE FROM employee WHERE id = ${res.id}`)
        .then((res) => 
        {
            veiwAllEmployees()
        })
    })
})
}

function deleteDepartment() {

}

function deleteRole()  {

}

//gets all data on manager
function veiwAllManagers() {
    db.promise().query('SELECT * FROM manager;')
    .then(([rows]) => {
        console.table(rows)
        menu()
    })
}

//adds a new manager to db
function addManager() {
    inquirer.prompt([
        {
            type: 'input',
            message: `please enter manager's first name`,
            name: 'first',
        },
        {
            type: 'input',
            message: `please enter manager's last name`,
            name: 'last',
        }
    ]).then((res) => {
        db.promise().query(`INSERT INTO manager (Manager_first_name, Manager_last_name) VALUES ("${res.first}", "${res.last}");`)
        .then((res) => {
            veiwAllManagers()
        })
    })
}

//bonus 
function updateManager() {
    db.promise().query("SELECT * FROM manager;")
    .then((res) => {
        // makes an array of data from employee
        let manager = res[0].map((manager) => {
        
            return {
               value : manager.id,
                name : manager.id
            }

        })
    inquirer.prompt([
        {
            type: 'list',
            message: `Please enter the manager's id`,
            name: 'id',
            choices: manager
            //using the arrays here 
        },
        {
            type: 'input',
            message: `Edit first name`,
            name: 'first'
            
        },
        {
            type: 'input',
            message: `Edit last name`,
            name: 'last'
            
        }
    ]).then((res) => 
    {
        // validating the prompts
        db.promise().query(`UPDATE manager SET Manager_first_name = "${res.first}", Manager_last_name = "${res.last}" WHERE id = ${res.id}`)
        .then((res) => 
        {
            veiwAllManagers()
        })
    })
})}

//gets all data on employees
function veiwAllEmployees() {
    db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, employee.role, purpose.title, purpose.salary, departments.department_name, manager.Manager_first_name, manager.Manager_last_name FROM employee JOIN purpose ON employee.role = purpose.id JOIN departments ON purpose.department_id = departments.id LEFT JOIN manager ON employee.manager_id = manager.id;')
    .then(([rows]) => {
        console.table(rows)
        menu()
    })
}

//adds a new role to db
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
function employeeByManager() {
    db.promise().query("SELECT * FROM manager;")
    .then((res) => {
        //builds an array of departments
        let managers = res[0].map((manager) => {
            return {
                value : manager.id,
                name : manager.Managers_last_name
            }

        })
        inquirer.prompt({
            type: "list",
            name:"manager",
            message:"please select a manager",
            choices: managers
          // validates prompts
        }).then((res) => {
            db.promise().query(`SELECT manager.Manager_first_name, manager.Manager_last_name, employee.first_name, employee.last_name, employee.id FROM employee LEFT JOIN purpose ON employee.role = purpose.id LEFT JOIN manager ON employee.manager_id = manager.id where manager.id = ${res.manager};`)
        .then(([rows]) => {
            console.table(rows)
            menu()
        })
    
        })


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