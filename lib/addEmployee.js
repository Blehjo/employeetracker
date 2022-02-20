const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1!',
        database: 'company_db'
    }
)

class Employee {
    constructor (firstname, lastname, roles, manager) {
        this.firstname = firstname,
        this.lastname = lastname,
        this.roles = roles,
        this.manager = manager.split(' ')
        console.log(this.manager)
        
    }

    addToEmployee() {
        db.query("SELECT id FROM roles WHERE title = ?", this.roles, (err, results) => {
            if (err) console.error(err);

            const [{ id }]  = results;
            
            const employeeInput = [this.firstname, this.lastname, id];

            db.query("SELECT id FROM employee WHERE first_name = ? and last_name = ?", this.manager, (err, results) => {
                if (err) console.error(err);
    
                const [{ id }]  = results;
                
                employeeInput.push(id)

                db.query("INSERT INTO employee(first_name, last_name, roles, manager) VALUES (?, ?, ?, ?)", employeeInput, (err, results) => {
                    if (err) console.error(err);
    
                    console.log(`-Added ${this.firstname} ${this.lastname} to the database-`)
                    console.log("---Press Up or Down Arrow Key To Continue---")
                });
            });
        });
    }
}

module.exports = Employee;