import express from "express";
import { readFile } from 'fs';
import { clientDatabase } from '../config/index.js';

const router = express.Router();

router.get('/', (req, res) => {

    readFile(clientDatabase, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Not able to read the file' })
        } else {
            data = JSON.parse(data);
            res.json({ status: 'success', data })
        }
    })
})

// router.get('/:id', (req, res) => {
//     let id = req.params.id;
//     readFile(database, 'utf8', (err, data) => {
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

// app.get('/people', function (req, res) {
//     if (req.session.loggedIn) {
//         let zmones = [];
//         for (let i = 0; i < 100; i++) {
//             zmones.push(
//                 {
//                     name: faker.name.firstName(),
//                     surname: faker.name.lastName(),
//                     address: faker.address.streetAddress() + faker.address.secondaryAddress(),
//                     phone: faker.phone.phoneNumber(),
//                     email: faker.internet.email(),
//                 }
//             )
//         }
//         res.render('people', { zmones, user: req.session.userName });
//     } else {
//         res.redirect('/login');
//     }
// })

// // 2022-03-08 routeriai:
// app.get('/logout', function (req, res) {
//     req.session.loggedIn = null;
//     req.session.userName = null;
//     res.redirect('login');
// })

export default router;