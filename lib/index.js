const express = require("express");

const Department = require("./addDepartment");
const Employee = require("./addEmployee");
const Role = require("./addRole");
const updateEmployee = require("./updateEmployeeRole");

const trees = new department("hospitality")

console.log(trees.getDepartment());

module.exports = { Department, Employee, Role }