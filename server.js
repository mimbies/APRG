//Zugriff auf website mit : ???
// FEHLT: Sessions, Cookies
//Sachen in CAPS später ersetzen



//Initialisierungen

//Express.js
const express = require("express");
const app = express();

// ? 
app.use(express.urlencoded({extended: true}))

//EJS
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");




//Connection zur Datenbank
//Datenbank noch nicht vorhanden! :D
const DATABASE = "DATENBANKNAME.db";
let db = require("better-sqlite3")(DATABASE);

//Server Starten
app.listen(3000,function(){
    console.log("listening on 3000");
});


 // Get-Requests
 //Gerne umbenennen!
 //eventuell später das ./sites/xyz.html umbenennen, weil wir mit ejs oder so arbeiten!

 //Startseite
app.get("/Startseite", function(req,res) {
    res.sendFile(__dirname + "/sites/startseite.html");
});

 //Registrierung
 app.get("/Registrierung", function(req,res) {
    res.sendFile(__dirname + "/sites/registrierung.html");
});

//Login
app.get("/Login", function(req,res) {
    res.sendFile(__dirname + "/sites/login.html");
});

//Startseite nach Login
app.get("/Startseite2", function(req,res) {
    res.sendFile(__dirname + "/sites/startseite2.html");
});

//About
app.get("/About", function(req,res) {
    res.sendFile(__dirname + "/sites/about.html");
});

//Kontakt
app.get("/Kontakt", function(req,res) {
    res.sendFile(__dirname + "/sites/kontakt.html");
});

//Mein Account
app.get("/Mein_Account", function(req,res) {
    res.sendFile(__dirname + "/sites/mein_account.html");
});

//Spenden 1 (Übersicht)
//Umbenennen in Spendenübersicht?
app.get("/Spenden_1", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_1.html");
});

//Spenden 2A (Erste Möglichkeit, Name anpassen!)
app.get("/Spenden_2A", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_2A.html");
});

//Spenden 2B (Zweite Möglichkeit, Name anpassen!)
app.get("/Spenden_2B", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_2B.html");
});

//Spenden 2C (Dritte Möglichkeit, Name anpassen!)
app.get("/Spenden_2C", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_2C.html");
});

//Spenden 3 (Optionen und Belohnungen, Ankreuzen etc)
app.get("/Spenden_3", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_3.html");
});

//Spenden 4 (Danke)
app.get("/Spenden_4", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_4.html");
});


//Zugriff auf CSS-Dateien
app.get("/styles", function(req,res) {
    res.sendFile(__dirname + "/sites/style.css");
});
