
CREATE DATABASE unimelb;

CREATE TABLE subjects(
  subject_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  code VARCHAR(255),
  level VARCHAR(255),
  field VARCHAR(255)
);

INSERT INTO subjects (name, code, level, field) VALUES ($1, $2, $3, $4) RETURNING *; /* Insert subject into databse */

SELECT * FROM subjects WHERE subjects.name LIKE '%' || $1 || '%'; /* Filter based on substring match */