// Require packages
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { Department, Employee, Role, UpdateEmployee, viewRoles, viewDepartment, viewEmployee } = require("./lib/index")

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1!',
        database: 'company_db'
    },
    console.log('Connected to the company_db database.')
);

app.use((req, res) => res.status(404).end())

const initDatabase = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would you like to do?",
                name: 'role',
                choices: ["View All Employees", "View All Departments", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "Add Department", "Quit"]
            },
        ])
        .then(data => {
            switch (data.role) {
                case 'View All Employees':
                    showEmployees();
                    break;
                case 'View All Departments':
                    showDepartments();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    newRole();
                    break;
                case 'View All Roles':
                    showRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Quit':
                    console.log("Exiting Database");
                    db.end();
                    break;
                default:
                    break;
            }
        })
}

// This should show a table of employees
const showEmployees = () => {
    // Query database
    viewEmployee();
    initDatabase();
}

// This should show a table of departments
const showDepartments = () => {
    // Query database
    viewDepartment();
    initDatabase();
}

function selectEmployees() {
    var employeeList = [];
    db.query("SELECT first_name, last_name FROM employee", function (err, results) {
        if (err) console.error(err);

        results.forEach(element => employeeList.push(`${element.first_name} ${element.last_name}`))

        employeeList.push(new inquirer.Separator());
    })
    return employeeList;
}

function selectTitle() {
    var titleList = [];
    db.query("SELECT title FROM roles", function (err, results) {
        if (err) console.error(err);

        results.forEach(element => titleList.push(element.title));

        titleList.push(new inquirer.Separator());

    })
    return titleList;
}

function selectDepartment() {
    var departmentList = [];
    db.query("SELECT name FROM department", function (err, results) {
        if (err) console.error(err);

        results.forEach(element => departmentList.push(element.name));

        departmentList.push(new inquirer.Separator());
    })
    return departmentList;
}

function selectManager() {
    var managerList = [];
    db.query("SELECT first_name, last_name FROM employee", function (err, results) {
        if (err) console.error(err);

        results.forEach(element => managerList.push(`${element.first_name} ${element.last_name}`));

        managerList.push(new inquirer.Separator());

    })
    return managerList;
}

const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'firstname',
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastname',
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'roles',
            choices: selectTitle()
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'manager',
            choices: selectManager()
        }
    ])
    .then(employeeData => {
        const employee = new Employee(employeeData.firstname, employeeData.lastname, employeeData.roles, employeeData.manager)
        employee.addToEmployee();
        initDatabase();
    })
}

const newRole = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: "Press Enter To Continue",
            name: 'name'
        },
        {
            type: 'list',
            message: "What is the name of the employee?",
            name: 'employee',
            choices: selectEmployees()
        },
        {
            type: 'list',
            message: "What is their new role?",
            name: 'role',
            choices: selectTitle()
        }
    ])
    .then(updatedData => {
        const updateEmployee = new UpdateEmployee(updatedData.employee, updatedData.role)
        updateEmployee.updatedEmployee();
        initDatabase();
    })
}

// This should show a table of departments
function showRoles() {
    viewRoles();
    initDatabase();
}

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the role?",
                name: 'name',
            },
            {
                type: 'input',
                message: "What is the salary of the role?",
                name: 'salary',
            },
            {
                type: 'list',
                message: "Which department does the role belong to?",
                name: 'department',
                choices: selectDepartment()
            }
        ])
        .then(roleData => {
            const role = new Role(roleData.name, roleData.salary, roleData.department)
            role.addToRole();
            initDatabase();
        })
}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the department?",
                name: 'name',
            }
        ])
        .then(departmentData => {
            const department = new Department(departmentData.name)
            department.addToDepartment();
            initDatabase();
        })
}

// TODO: Create a function to initialize app
function init() {
    initDatabase();
}

// Function call to initialize app
init();