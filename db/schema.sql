-- Drops the company_db if it exists currently --
DROP DATABASE IF EXISTS company_db;
-- Creates the company_db database --
CREATE DATABASE company_db;

USE company_db;

-- to veiw all -> select * from departments 
-- department table
CREATE TABLE departments (
  id INT AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
-- role table
CREATE TABLE purpose (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT DEFAULT NUll,
  FOREIGN KEY (department_id)
  REFERENCES departments(id) ON DELETE CASCADE
  
);

CREATE TABLE manager (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Manager_first_name VARCHAR(30) NOT NULL,
    Manager_last_name VARCHAR(30) NOT NULL
);
-- employee table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT DEFAULT NULL,
    role INT,
    FOREIGN KEY (role) REFERENCES purpose(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES manager(id)
);



