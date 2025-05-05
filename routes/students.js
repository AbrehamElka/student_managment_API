const { Router } = require("express");
const route = Router();
const studentController = require("../controllers/studentController");
const StudentSchema = require("../validations/studentSchema");

route.post('/', StudentSchema.createStudentSchema, studentController.createStudent);
route.put('/:id', StudentSchema.createStudentSchema, studentController.updateStudent);
route.delete('/:id', StudentSchema.deleteSchema, studentController.deleteStudentById);
route.get('/search', StudentSchema.searchSchema, studentController.searchStudent);
route.get('/:id', StudentSchema.getStudentByIdSchema,studentController.getStudentById);

module.exports = route;