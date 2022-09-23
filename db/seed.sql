INSERT INTO departments (id, department_name)
VALUES (1, "Engineering"),
       (2, "Managment"),
       (3, "HR"),
       (4, "Tech Support"),
       (5, "Assasians Guild");
       
INSERT INTO purpose (id, title, salary, department_id)
VALUES (1, "Head Enngineer", 100.000, 1),
       (2, "Agent", 400.000, 5),
       (3, "Assistant", 50.000, 3),
       (4, "Manager", 120.000, 2),
       (5, "TS man", 59.000, 4);

INSERT INTO employee (id, first_name, last_name, manager_id, role)
VALUES (1, "Bob", "Bobson", 1, 1),
       (2, "Rob", "Booth", 2, 2),
       (3, "Ribeca", "Rachel", 3, 4),
       (4, "Lloyd", "Likely", 2, 3),
       (5, "Karen", "Karen", 2, 5);
       
       
