
CREATE DATABASE unimelb_subjects;

CREATE TABLE subjects(
  subject_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  code VARCHAR(255),
  level VARCHAR(255),
  field VARCHAR(255)
);

INSERT INTO subjects (name, code, level, field) VALUES ($1, $2, $3, $4) RETURNING *;

SELECT * FROM subjects WHERE name LIKE `%movie%`;

SELECT *
FROM
   Book
WHERE
   name LIKE 'Lear%';