import express from "express";
import { readFile, writeFile } from 'fs';
import { database } from "../config/index.js";
import session from 'express-session';

const router = express.Router();

router.use(session({
    secret: 'authentification',
    resave: false,
    saveUninitialized: true,
}));

router.post('/sign-up', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Not able to read the file' })
            return
        }
        let json = JSON.parse(data);
        let id = json.length > 0 ? json[json.length - 1].id + 1 : 0;
        json.push({ id, username, email, password });

        writeFile(database, JSON.stringify(json), 'utf8', err => {
            if (err) {
                res.json({ status: 'failed', message: 'Not able to sign you up' })
            } else {
                res.json({ status: 'success', message: 'You successfully signed up' })
            }
        })
    })
})

router.post('/login', (req, res) => {

    if (Object.keys(req.body).length > 0) {
        if (req.body.username != '' &&
            req.body.password != '' &&
            req.body.username === 'Agne' &&
            req.body.password === 'tre'
        ) {
            req.session.loggedIn = true;
            req.session.username = "Agne"
            res.json({ status: 'success', message: 'You are logged in' });
            return
        } else {
            res.json({ status: 'failed', message: "Username or password is not correct" });
        }
    }
})

export default router;
