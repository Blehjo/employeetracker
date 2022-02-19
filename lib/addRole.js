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
        db.query(`INSERT INTO roles(title, salary, department) VALUES ("${this.role}", ${this.salary}, ${this.department})`);        
    }
}

module.exports = Role;