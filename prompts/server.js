const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const first = require('./addEmployee')
const last = require('./addEmployee')
const role = require('./addEmployee')
const manager = require('./addEmployee')



const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
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

//veiw all departments
app.get('/api/departments', (req, res)=> {
  db.query('SELECT * FROM departments', function (err, results) {
  res.json({
      departments: results
    });

  })
})

app.get('/api/employee', (req, res)=> {
  
})
app.get('/api/roles', (req, res)=> {
  db.query(`SELECT * FROM purpose`, function (err, results) {
  res.json({
      roles: results
    });

  })
})
app.post('/api/add_employee', (req, res)=> {
  db.query(`INSERT INTO employee (first_name, last_name, manager_id, role_id, id) VALUES ("${first}", "${last}", ${manager}, ${role}, 7)`, function (err, results) {
  res.json({
      employee: results
    });

  })
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

