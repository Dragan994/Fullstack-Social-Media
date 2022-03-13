# Fullstack-Social-Media
Fullstack Social Media App - Angular / Node-Express.js / MySQL  / E2E-Cypress


After you pulled/downloaded this repository, you have to go to every folder  [ client, e2e, server ] and run following command:

>npm install

That installs dependencies requierd in node_modules folder.
___
# CLIENT

Start client that wont work w/o server:

link: https://localhost:4200

>npm start

After you are done developing client, use following command to make build so you can try it on your local network.

>npm run build

That compiles all client code to one html and four js files that our server is going to serve.

And after build new changes will be availible on you local network.


___

# SERVER
Start server:

Link will be logged in console after you start it, that will look like next two following lines.

Server starting...

Listening at 100.103.0.120:3000


This address is availible on your local network.

So if your pc is connected to router you can acces this adress from any device that is connected to same Wi-Fi.

>cd server

>npm run serve


After starting server, you can visit app on https://localhost:4200 from Angular server that has proxy to our coded server.

So app will work fine on Angular dev-server and our server.
___

# TESTING

Start end to end test tool Cypress:

>npm run e2e

After this Cypress will open a new window and you will get to choose which test to run.
___