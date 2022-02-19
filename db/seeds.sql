INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineer"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (title, salary, department)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead",250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, roles)
VALUES ("Sheila", "Morton", 3),
       ("Tucker", "Okpaleke", 1),
       ("Kevin", "Wartemberg", 2),
       ("Lourdes", "Carter", 5),
       ("Aude", "Pereira", 6),
       ("Afrika", "Oseki", 4),
       ("Tino", "Martinez", 7),
       ("Ben", "Smith", 8);
