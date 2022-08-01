![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
![Security Status](https://img.shields.io/security-headers?label=Security&url=https%3A%2F%2Fgithub.com&style=flat-square)
![Gluten Status](https://img.shields.io/badge/Gluten-Free-green.svg)
![Eco Status](https://img.shields.io/badge/ECO-Friendly-green.svg)

# Forma

_32 group website project_

This project is for **educational** porpuses only. Pull request are welcome, but priority for project authors! **_Thank you for your cooperation!_**

Here: https://agnekauk.github.io/5-forma/ is published non-active version of this form (just HTML and CSS). And this project is made exclusively on my own to make this form work properly. I've created local databases and all the data is written and then gotten from these databases.
You can now create a new user, sign in to reach clients contacts database and then create new client, edit existing client or delete clients.

Design: [Forma](https://cdn.discordapp.com/attachments/850245533838868480/850246368214908970/day1dr.png)

## Project features

-   **_Github pages_**
-   **_CSS_**
-   **_Image_**
-   **_Web content_**
-   **_CSS position absolute_**
-   **_CSS blur effect_**
-   **_Javasript_**
-   **_Node.js_**
-   **_Reading and writing to local databases_**

## Instalation instructions

Frontend and backend must be installed separetely;

$ npm install $

Port for Frontend is set to 5000. If you want to change port go:

Frontend -> package.json -> "scripts": {"start": "dead-server --port=5000 --host=localhost"}

Port for Backend is set to 5004. If you want to change port go:

Backend -> index.js -> last lines of the code: app.listen(5004, () => {})

## Packages to be intalled:

-   dead-server:
    $ npm i -D dead-server $
-   cors:
    $ npm install cors $
-   express:
    $ npm install express $
-   express-session:
    $ npm i express-session $
-   nodemon:
    $ npm i -D nodemon $

## Type should be set in package.json:

"type": "module"

### Authors

Agne: [Github](https://github.com/agnekauk)
