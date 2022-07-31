import express from "express";
import { readFile, writeFile } from 'fs';
import { clientDatabase, database } from "../config/index.js";
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
        };

        let json = JSON.parse(data);

        if (json.filter(({ username }) => username === req.body.username).length !== 0) {
            res.json({ status: 'failed', message: 'Such username already exists' })
            return
        };

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

        if (req.body.username != '' && req.body.password != '') {

            readFile(database, 'utf8', (err, data) => {
                if (err) {
                    res.json({ status: 'failed', message: 'Not able to read the file' })
                    return
                }
                let userInQuestion = JSON.parse(data).filter(({ username }) => username === req.body.username);

                let passwordInQuestion = userInQuestion[0].password;

                if (req.body.password === passwordInQuestion) {
                    req.session.loggedIn = true;
                    req.session.username = userInQuestion.username;
                    res.json({ status: 'success', message: 'You are logged in', id: userInQuestion[0].id });
                    return
                } else {
                    res.json({ status: 'failed', message: "Username or password is not correct" });
                };
            });
        };

    };
});

router.post('/add-new', (req, res) => {
    let name = req.body.clientName;
    let company = req.body.company;
    let email = req.body.clientEmail;
    let phone = req.body.phone;

    readFile(clientDatabase, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Not able to read the file' })
            return
        };

        let json = JSON.parse(data);

        if (json.filter(({ name }) => name === req.body.name).length !== 0) {
            res.json({ status: 'failed', message: 'Such client already exists' })
            return
        };

        let id = json.length > 0 ? json[json.length - 1].id + 1 : 0;
        json.push({ id, company, name, email, phone });

        writeFile(clientDatabase, JSON.stringify(json), 'utf8', err => {
            if (err) {
                res.json({ status: 'failed', message: 'Not able to add this client' })
            } else {
                res.json({ status: 'success', message: 'New client successfully saved' })
            }
        })
    })
})

export default router;
