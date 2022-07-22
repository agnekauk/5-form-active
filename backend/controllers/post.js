import express from "express";
import { readFile, writeFile } from 'fs';
import { database } from "../config/index.js";

const router = express.Router();

router.post('/sign-in', (req, res) => {
    let user = req.body.user;

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Not able to read the file' })
            return
        }
        let json = JSON.parse(data);
        let id = json.length > 0 ? json[json.length - 1].id + 1 : 0;
        json.push({ id, user })

        writeFile(database, JSON.stringify(json), 'utf8', err => {
            if (err) {
                res.json({ status: 'failed', message: 'Not able to sign you up' })
            } else {
                res.json({ status: 'success', message: 'You successfully signed up' })
            }
        })
    })
})

export default router;
