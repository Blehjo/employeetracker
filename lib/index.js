const express = require("express");

const Department = require("./addDepartment");
const Employee = require("./addEmployee");
const Role = require("./addRole");
const UpdateEmployee = require("./updateEmployeeRole");
const viewRoles = require("./viewRoles")
const viewDepartment = require("./viewDepartment")
const viewEmployee = require("./viewEmployee");


module.exports = { Department, Employee, Role, UpdateEmployee, viewRoles, viewDepartment, viewEmployee }