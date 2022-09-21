const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
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
      message: 'success',
      data: results
    });

})
})
// db.query('SELECT * FROM departments', function (err, results) {
  // console.log('results', results)})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

