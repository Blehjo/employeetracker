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
);


class Role{
    constructor(role, salary, department) {
        this.role = role;
        this.salary = salary;
        this.department = department;
    }

    addToRole() {
        db.query("SELECT id FROM department WHERE name = ?", this.department, (err, results) => {
            if (err) console.error(err);

            const [{ id }] = results;

            const roleInput = [this.role, this.salary, id];

            db.query("INSERT INTO roles (title, salary, department) VALUES (?, ?, ?)", roleInput, (err, results) => {
                if (err) console.error(err);
                console.log(" ")
                console.log(`-Added ${this.role} to the database-`);
                console.log("---Press Up or Down Arrow Key To Continue---");
            });
        });
    }
}

module.exports = Role;