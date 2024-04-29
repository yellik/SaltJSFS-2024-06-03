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

        if(!student) {
            res.status(404).json(
                new ResponseModel({
                    statusCode: 404,
                    error: `Could not find student with the id: ${id}`
                })
            );
            return
        }
    });

router.route('/:id')
    .get((req, res) => {
        //assign id
        const id = req.params.id;
        //search student from id
        const student = students.find((s) => s.id === id)
    })