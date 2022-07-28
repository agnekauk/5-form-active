import express from "express";
import { readFile } from 'fs';
import { clientDatabase } from '../config/index.js';
import session from 'express-session';

const router = express.Router();

router.use(session({
    secret: 'authentification',
    resave: false,
    saveUninitialized: true,
}));

router.get('/', (req, res) => {

    readFile(clientDatabase, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Not able to read the file' })
        } else {
            data = JSON.parse(data);
            res.json({ status: 'success', data })
        }
    })
});

router.get('/:id', (req, res) => {

    let id = req.params.id;
    if (id) {
        readFile(clientDatabase, 'utf8', (err, data) => {
            if (err) {
                res.json({ status: 'failed', message: 'Not able to read the file' })
            } else {
                data = JSON.parse(data);
                res.json({ status: 'success', data })
            }
        });
    };
});

// router.get('/:id', (req, res) => {
//     let id = req.params.id;
//     readFile(clientDatabase, 'utf8', (err, data) => {
//         if (err) {
//             res.json({ status: 'failed', message: 'Not able to read the file' })
//             return
//         }

//         const json = JSON.parse(data);

//         const jsonId = json.findIndex((el) => el.id == id);
//         if (jsonId === -1) {
//             res.json({ status: 'failed', message: 'Not able to find the element' });
//             return
//         }
//         let info = json[jsonId];
//         res.json({ status: 'success', info });
//     })
// })

router.get('/logout', (req, res) => {
    req.session.loggedIn = null;
    req.session.username = null;
    res.json({ status: 'success', message: 'You successfully signed out' });
});

export default router;