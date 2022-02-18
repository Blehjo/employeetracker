// Require packages
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { Department, Employee, Role } = require("./lib/index")

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
                    viewEmployees();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View All Roles':
                    viewRoles();
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
const viewEmployees = () => {
    // Query database
    db.query('SELECT * FROM employee', function (err, results) {
        const table = cTable.getTable(results);
        console.log('')
        console.log(table);
    });
    initDatabase();
}

// This should show a table of departments
const viewDepartments = () => {
    // Query database
    db.query('SELECT * FROM department', function (err, results) {
        const table = cTable.getTable(results);
        console.log('');
        console.log(table);
    });
    initDatabase();
}

const addEmployee = () => {
    tv = [];
    trees = db.query('SELECT first_name, last_name FROM employee', function (err, results) {
        const table = cTable.getTable(results);
        // return table
        console.log(table)
    })
    tv.push(trees)
    console.log(tv)
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
        // {
        //     type: 'list',
        //     message: "Who is the employee's manager?",
        //     name: 'manager',
        //     choices: trees
        // },
    ])
    .then(employeeData => {
        db.query(`INSERT INTO employee (first_name, last_name, title) VALUES (${employeeData.firstname}, ${employeeData.lastname}, ${employeeData.title})`, function (err, results) {
            const table = cTable.getTable(results);
            console.log(table)
            initDatabase();
        })
    })
    // .then(employeeData => {
    //     const employee = new Employee(employeeData.firstname, employeeData.lastname, employeeData.role, employeeData.manager)
    //     team.push(employee)
    //     initDatabase();
    // })
}

const updateEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: "What is the intern's name?",
            name: 'name',
        },
        {
            type: 'input',
            message: "What is the intern's id?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the intern's email?",
            name: 'email',
        },
        {
            type: 'input',
            message: "What is the intern's school?",
            name: 'school',
        },
    ])
    .then(internData => {
        const intern = new Intern(internData.name, internData.id, internData.email, internData.school)
        team.push(intern)
        addEmployee();
    })
}

// This should show a table of departments
const viewRoles = () => {
    // Query database
    db.query('SELECT * From roles', function (err, results) {
        const table = cTable.getTable(results);
        console.log(table);
    });
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
                name: 'role',
            },
            {
                type: 'list',
                message: "Which department does the role belong to?",
                name: 'department',
                choices: ["Engineering", "Finance", "Legal", "Sales"]
            },
        ])
        .then(roleData => {
            const role = new Role(roleData.name, roleData.role, roleData.department)
            companyDb.push(role)
            addEmployee();
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
            console.log("Added Service to the database")
            const department = new Department(departmentData)
            companyDb.push(department)
            initDatabase();
        })
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.log(err) : console.log('Success! The index.html was created in the dist/ folder')
    );
}

// TODO: Create a function to initialize app
function init() {
    initDatabase();
}

// Function call to initialize app
init();