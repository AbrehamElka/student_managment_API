const pool = require("../db/pool");
const { validationResult } = require("express-validator");

exports.createStudent = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ "errors": errors.array() });
    }

    const { first_name, last_name, age, gpa } = req.body;
    try {
        const result = await pool.query(`
            INSERT INTO student (first_name, last_name, age, gpa)
            VALUES ($1::text, $2::text, $3::integer, $4::numeric(3,2))
            RETURNING *
            `, [first_name, last_name, age, gpa]);
        res.status(201).json(result.rows[0]);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
};

exports.updateStudent = async(req, res) => {
    const { first_name, last_name, age, gpa, is_graduated } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ "errors": errors.array() });
    }

    try {
        const result = await pool.query(`UPDATE student
            SET first_name = $1::text,
                last_name = $2::text,
                age = $3::integer,
                gpa = $4::numeric,
                is_graduated = $5::boolean
            WHERE id = $6
                RETURNING *`, [first_name, last_name, age, gpa, is_graduated, parseInt(req.params.id)]);
        if (result.rows.length === 0) return res.status(404).json('Student Not Found');
        res.json(result.rows[0])
    } catch(err) {
        console.error(err);
        res.status(500).json(result);
    }
}

exports.getStudentById = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ "errors": errors.array() });
    }


    try {
        const result = await pool.query(`SELECT * FROM student WHERE id = $1::integer`, [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('Student not found');
        res.status(200).json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({"error": err});
    }
}

exports.deleteStudentById = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ "errors": errors.array() });
    }


    try {
        const result = await pool.query(`DELETE FROM student
            WHERE id = $1::integer
            RETURNING *;`, [parseInt(req.params.id)]);
        if (result.rows.length === 0) return res.status(404).json('student not found');
        res.json(result.rows[0]);
    } catch(err) {
        console.error(err);
        res.status(500).json({"error": err});
    }
}

exports.searchStudent = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ "errors": errors.array() });
    }


    const { gpa, age, name } = req.query;
    let query = 'SELECT * FROM student WHERE 1=1';
    const values = [];
    let index = 1;
  
    if (gpa !== undefined) {
      const parsedGpa = parseFloat(gpa);
      if (isNaN(parsedGpa)) {
        return res.status(400).json({ error: "Invalid gpa value" });
      }
      query += ` AND gpa >= $${index++}`;
      values.push(parsedGpa);
    }
  
    if (age !== undefined) {
      const parsedAge = parseInt(age, 10);
      if (isNaN(parsedAge)) {
        return res.status(400).json({ error: "Invalid age value" });
      }
      query += ` AND age = $${index++}`;
      values.push(parsedAge);
    }
  
    if (name) {
      query += ` AND (first_name ILIKE $${index} OR last_name ILIKE $${index})`;
      values.push(`%${name}%`);
      index++;
    }
  
    try {
      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Search failed");
    }
}