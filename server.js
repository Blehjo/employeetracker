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
                    updateEmployee();
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
                default:
                    writeToFile("./dist/index.html", generateHTML(team))
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
    initDatabase();
    viewDepartment();
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
            type: 'input',
            message: "What is the employee's title?",
            name: 'title',
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'title',
        },
        // {
        //     type: 'list',
        //     message: "Who is the employee's manager?",
        //     name: 'manager',
        //     choices: trees
        // },
    ])
    .then(employeeData => {
        const employee = new Employee(employeeData.firstname, employeeData.lastname, employeeData.title, employeeData.roles)
        employee.addToEmployee();
        initDatabase();
    })
}

const updateEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: "What is the name of the employee?",
            name: 'name',
            choices: []
        },
        {
            type: 'input',
            message: "What is their new role?",
            name: 'role',
        }
    ])
    .then(updatedData => {
        const updatedEmployee = new UpdateEmployee(updatedData.role)
        updatedEmployee.updateEmployee();
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
                choices: ["Engineering", "Finance", "Legal", "Sales"]
            },
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