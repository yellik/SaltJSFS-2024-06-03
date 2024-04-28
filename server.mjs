import express from 'express';
import { v4 } from 'uuid';

const app = express();

//middleware
app.use(express.json())

//a dummy arr of students 

const students = [
    {
        id: 1,
        name: "Jonathan Zeray",
        hobbies: ["reading", "training", "podcast", "eating"]
    },
    {
        id: 2,
        name: "Jelena Cefalu",
        hobbies:  ["surfing", "blackjack", "cake eating"]
    }
];

//define endpoints 
//get all students 
app.get('/api/v1/students', (req, res) => {
    res.status(200).json({ success: true, statuscode: 200, items: students.length, data: students})
});

// get a students based on its id 
app.get('/api/v1/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find((s) => s.id === id);

    res.status(200).json({ id: id, success: true, statusCode: 200, items: 1, data: student})
});

//post a new student
app.post('/api/v1/students', (req, res) => {

    const {name, hobbies} = req.body;

    const id = v4();

    const newStudent = {id, name, hobbies}

    students.push(newStudent)

    res.status(201).json({success: true, statusCode: 201, items: 1, data: newStudent})

});

const PORT = process.env.PORT || 5001;
app.listen((PORT), () => console.log(`Server is running on port ${PORT}`));

