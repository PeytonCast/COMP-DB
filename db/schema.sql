-- Drops the company_db if it exists currently --
DROP DATABASE IF EXISTS company_db;
-- Creates the company_db database --
CREATE DATABASE company_db;

USE company_db;

-- to veiw all -> select * from departments 
-- department table
CREATE TABLE departments (
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
-- role table
CREATE TABLE purpose (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  
);
-- employee table
CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES purpose(id)
);