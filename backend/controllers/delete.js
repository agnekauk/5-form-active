import express from "express";
import { readFile, writeFile } from 'fs';
import { clientDatabase } from '../config/index.js';

const router = express.Router();

router.delete('/delete-client/:id', (req, res) => {
    let id = req.params.id;
    readFile(clientDatabase, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Not able to read the file' })
            return
        }

        const json = JSON.parse(data);

        const jsonId = json.findIndex((el) => el.id == id);
        if (jsonId === -1) {
            res.json({ status: 'failed', message: 'Not able to find this client' });
            return
        }

        json.splice(jsonId, 1);
        let jsonString = JSON.stringify(json);

        writeFile(clientDatabase, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: 'failed', message: 'Not able to save the file' });
            } else {
                res.json({ status: 'success', message: 'Client successfully deleted' });
            }
        })
    })
})

// router.delete('/mass-delete', (req, res) => {
//     let ids = req.body.ids;

//     readFile(database, 'utf8', (err, data) => {
//         if (err) {
//             res.json({ status: 'failed', message: 'Not able to read the file' })
//             return
//         }

//         const json = JSON.parse(data);
//         let dataArray = [];
//         json.forEach((value, index) => {
//             if (!ids.includes(value.id.toString())) {
//                 dataArray.push(value);
//             }
//         })

//         let jsonString = JSON.stringify(dataArray);

//         writeFile(database, jsonString, 'utf8', (err) => {
//             if (err) {
//                 res.json({ status: 'failed', message: 'Not able to save the file' });
//             } else {
//                 res.json({ status: 'success', message: 'Users successfully deleted' });
//             }
//         })
//     })
// })

export default router;