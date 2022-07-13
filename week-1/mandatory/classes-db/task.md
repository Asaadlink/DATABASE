# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

/// Task 1
```sql
createdb cyf_classes

```

/// Task 2
```sql
CREATE TABLE mentors (
id                             SERIAL PRIMARY KEY,
name                           VARCHAR(30) NOT NULL,
years_lived_in_Glasgow         INT NOT NULL,
address                        VARCHAR(120),
favourite_programming_language VARCHAR(30)
);
```
/// Task 3
```sql
INSERT INTO mentors (name, years_lived_in_Glasgow, address, favourite_programming_language) VALUES ('John', 23, '44 Red Road', 'Java' );
INSERT INTO mentors (name, years_lived_in_Glasgow, address, favourite_programming_language) VALUES ('Juan', 3, '24 Main Street', 'JavaScript' );
INSERT INTO mentors (name, years_lived_in_Glasgow, address, favourite_programming_language) VALUES ('Boba', 15, '15 New Road', 'C' );
INSERT INTO mentors (name, years_lived_in_Glasgow, address, favourite_programming_language) VALUES ('Alex', 35, '23 Old Street', 'Python' );
INSERT INTO mentors (name, years_lived_in_Glasgow, address, favourite_programming_language) VALUES ('Wario', 1, '24 Old Street', 'Python' );
```
/// Task 4
```sql
CREATE TABLE students (
  id                              SERIAL PRIMARY KEY,
  name                            VARCHAR(30) NOT NULL,
  address                         VARCHAR(120),
  graduated_from_code_your_future BOOLEAN
  );
```
/// Task 5
```sql
 INSERT INTO students (name, address, graduated_from_code_your_future) VALUES ('Asaad', 'Rambla Del Carmel',true);
 INSERT INTO students (name, address, graduated_from_code_your_future) VALUES ('Akram', 'calle del Born',false);
 INSERT INTO students (name, address, graduated_from_code_your_future) VALUES ('Abdul', 'disco apolo',false);
 INSERT INTO students (name, address, graduated_from_code_your_future) VALUES ('Damian', 'calle del pelele',true);
 INSERT INTO students (name, address, graduated_from_code_your_future) VALUES ('Burcak', 'calle de everywhere',true);
 INSERT INTO students (name, address, graduated_from_code_your_future) VALUES ('Anandamaya', 'carrer del lindos',false);
 INSERT INTO students (name, address, graduated_from_code_your_future) VALUES ('Amine', 'street fighter',true);
 INSERT INTO students (name, address, graduated_from_code_your_future) VALUES ('Usman Ghani', 'corts Catalaness',true);
 INSERT INTO students (name, address, graduated_from_code_your_future) VALUES ('Mehtap', 'Industria 63',false);
 INSERT INTO students (name, address, graduated_from_code_your_future) VALUES ('Gloria', 'carrer nou de santa clara 15 ',true);
```
/// Task 6
```sql
SELECT * FROM mentors
SELECT * FROM students
```
/// Task 7
```sql
CREATE TABLE classes (
  id        SERIAL PRIMARY KEY,
  mentor_id INT REFERENCES mentors(id),
  topic     VARCHAR(30),
  date      DATE NOT NULL,
  location  VARCHAR(30) NOT NULL
);
```
/// Task 8
```sql
 INSERT INTO classes (mentor_id, topic, date, location) VALUES (1, 'Python','2021-11-11','Barcelona');
 INSERT INTO classes (mentor_id, topic, date, location) VALUES (2, 'Java','2021-11-09','Barcelona');
 INSERT INTO classes (mentor_id, topic, date, location) VALUES (3, 'JavaScript','2021-11-04','Barcelona');
```
 /// Task 9
```sql
CREATE TABLE students_attendence (
id              SERIAL primary key,
students_id     INT references students(id),
classes_id      INT references classes(id)
);


INSERT INTO students_attendence (students_id,classes_id) VALUES (1,1);
INSERT INTO students_attendence (students_id,classes_id) VALUES (2,1);
INSERT INTO students_attendence (students_id,classes_id) VALUES (3,2);
INSERT INTO students_attendence (students_id,classes_id) VALUES (9,3);
```
/// Task 10

- Retrieve all the mentors who lived more than 5 years in Glasgow
 ```sql
   SELECT * FROM mentors where years_lived_in_Glasgow > 5;
```
- Retrieve all the mentors whose favourite language is Javascript
```sql
  SELECT * FROM mentors where favourite_programming_language='JavaScript'
```
 - Retrieve all the students who are CYF graduates
```sql
  SELECT * FROM students where graduated_from_code_your_future=true
```
- Retrieve all the classes taught before June this year
   ```sql
   SELECT * FROM classes where date < '2022-06-01'
```
  - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
```sql
  SELECT students_id from  students_attendence where classes_id=2 or classes_id=3  
```



When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
5. Insert 10 students in the `students` table.
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

8. Insert a few classes in the `classes` table
9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.
10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
    - Retrieve all the mentors whose favourite language is Javascript
    - Retrieve all the students who are CYF graduates
    - Retrieve all the classes taught before June this year
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
