import express from 'express';
import { v4 as uuidv4 } from 'uuid'
import students, { ResponseModel } from '../model/ResponseModel.mjs'

//init router 
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.status(200).json(new ResponseModel({ statusCode: 200, data: students}));

    })

    .post((req, res) => {
        //create student id
        const id = uuidv4().replaceAll('-', '');
        //assign the id to req body
        req.body.id = id;
        students.push(req.body)

        res.status(201).json(new ResponseModel({ statusCode: 201, data: req.body}));
    });
    //route through id
router.route('/id')
    .get((req, res) => {
        const id = req.params.id;
        const student = students.find((s) => s.id === id);
        // if no student with ID found, return stat code 404 && error 
        if(!student) {
            res.status(404).json(
                new ResponseModel({
                    statusCode: 404,
                    error: `Could not find student with the id: ${id}`
                })
            );
            return
        }
        res.status(200).json(new ResponseModel({ statusCode: 200, data: student}))
    })
    .put((req, res) => {
        const id = req.params.id
        const student = students.find((s) => s.id === id);

        if(!student) {
            res.status(404).json(
                new ResponseModel({
                    statusCode: 404,
                    error: `Could not find student with the id ${id}`
                })
            );
            return 
        }

        //add new student to the server 
        student.name = req.body.name ?? student.name;
        student.hobbies = req.body.hobbies ?? student.hobbies;

        res.status(204).end();
    })
    .patch((req, res) => {
        const id = req.params.id;
        const student = student.find((s) => s.id === id);

        if(!student) {
            res.status(404). json(
                new ResponseModel({
                    statusCode: 404,
                    error: `Could not find the student with the id ${id}`
                })
            );
            return
        }
        student.name = reqbody.name ?? student.name;
        student.hobbies = req.body.hobbies ?? student.hobbies;

        res.status(204).end();
    })
    .delete((req, res, () => {
        const id = req.params.id;
        const student = students.find((s) => s.id === id);

        if(!student){
            res.status(404).json(
                new ResponseModel({
                    statusCode: 404,
                    error: `Could not delete the student as we didn't find a student with the id ${id}`
                })
            );
            return
        }

        students.splice(students.indexOf(student), 1);

        res.status(204).end();
    }))