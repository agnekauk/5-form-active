import express from "express";
import { readFile, writeFile } from 'fs';
import { clientDatabase } from '../config/index.js';

const router = express.Router();

router.put('/edit/:id', (req, res) => {
    let id = req.params.id;
    let editedCompany = req.body.company;
    let editedName = req.body.clientName;
    let editedEmail = req.body.clientEmail;
    let editedPhone = req.body.phone;

    readFile(clientDatabase, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Not able to read file' })
            return
        }

        const json = JSON.parse(data);

        const jsonId = json.findIndex((el) => el.id == id);
        if (jsonId === -1) {
            res.json({ status: 'failed', message: 'Not able to find the client' });
            return
        }

        json[jsonId].company = editedCompany;
        json[jsonId].name = editedName;
        json[jsonId].email = editedEmail;
        json[jsonId].phone = editedPhone;

        let jsonString = JSON.stringify(json);

        writeFile(clientDatabase, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: 'failed', message: 'Not able to save the file' });
            } else {
                res.json({ status: 'success', message: 'Client information changed' });
            }
        })
    })
})

export default router;