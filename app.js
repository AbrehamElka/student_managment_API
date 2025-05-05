const express = require("express");
const app = express();
const PORT = process.env.PORT;
const student_router = require("./routes/students");

app.use(express.json());

app.use('/students', student_router);

app.get('/', (req, res) => {
    res.json({msg: "student managment REST API"});
});



app.listen(PORT, console.log(`server running on port ${PORT}`));