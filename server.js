// Require packages
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const { application } = require("express");
const cTable = require("console.table");

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
                choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
            },
        ])
        .then(data => {
            switch (data.role) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addManager();
                    break;
                case 'Update Employee Role':
                    addManager();
                    break;
                case 'View All Roles':
                    addManager();
                    break;
                case 'Add Role':
                    addManager();
                    break;
                case 'View All Departments':
                    addEngineer();
                    break;
                case 'Add Department':
                    addIntern();
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
        console.log(results);
    });
}

const addEngineer = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the engineer's name?",
                name: 'name',
            },
            {
                type: 'input',
                message: "What is the engineer's id?",
                name: 'id',
            },
            {
                type: 'input',
                message: "What is the engineer's email?",
                name: 'email',
            },
            {
                type: 'input',
                message: "What is the engineer's github?",
                name: 'github',
            },
        ])
        .then(engineerData => {
            const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github)
            team.push(engineer)
            addEmployee();
        })
}

const addIntern = () => {
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