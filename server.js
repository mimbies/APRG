//Zugriff auf website mit : http://localhost:3000/login

//später: http://localhost:3000/startseite!
// FEHLT: Sessions, Cookies, Login-Confirmation mit Datenbank, die Datenbank selbst
//ALL-CAPS MUSS ERSETZT WERDEN!
//am liebsten bei variablen nicht mit Großbuchstaben arbeiten, damit wir nirgends durcheinander kommen!!
//VOR Serverstart: npm install express, sqlite3, better-sqlite3, ejs


//Initialisierungen

//Express.js
const express = require("express");
const app = express();

// idk was das ist
app.use(express.urlencoded({extended: true}))

//EJS
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");




//Connection zur Datenbank
//Datenbank noch nicht vorhanden! :D
//Idee: später evtl. in Post-Requests unten ändern!
//Name der Datenbank: datenbank
//Name von Benutzernamen-rows: benutzername
//Name von Passwörtern-rows: passwort
const DATABASE = "datenbank.db";
let db = require("better-sqlite3")(DATABASE);

//Server Starten
app.listen(3000,function(){
    console.log("listening on 3000");
});


 // Get-Requests
 //Gerne umbenennen!
 //eventuell später das ./views/xyz.html umbenennen, weil wir mit ejs oder so arbeiten!

 //Startseite
app.get("/startseite", function(req,res) {
    res.sendFile(__dirname + "/views/startseite.html");
});

 //Registrierung
 app.get("/registrierung", function(req,res) {
    res.sendFile(__dirname + "/views/registrierung.html");
});

//Login
app.get("/login", function(req,res) {
    res.sendFile(__dirname + "/views/login.html");
});

//Startseite nach Login
app.get("/startseite2", function(req,res) {
    res.sendFile(__dirname + "/views/startseite2.html");
});

//About
app.get("/about", function(req,res) {
    res.sendFile(__dirname + "/views/about.html");
});

//Kontakt
app.get("/kontakt", function(req,res) {
    res.sendFile(__dirname + "/views/kontakt.html");
});

//Mein Account
app.get("/mein_account", function(req,res) {
    res.sendFile(__dirname + "/views/mein_account.html");
});

//Spenden 1 (Übersicht)
//Umbenennen in Spendenübersicht?
app.get("/spenden_1", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_1.html");
});

//Spenden 2A (Erste Möglichkeit, Name anpassen!)
app.get("/spenden_2A", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_2A.html");
});

//Spenden 2B (Zweite Möglichkeit, Name anpassen!)
app.get("/spenden_2B", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_2B.html");
});

//Spenden 2C (Dritte Möglichkeit, Name anpassen!)
app.get("/spenden_2C", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_2C.html");
});

//Spenden 3 (Optionen und Belohnungen, Ankreuzen etc)
app.get("/spenden_3", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_3.html");
});

//Spenden 4 (Danke)
app.get("/spenden_4", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_4.html");
});


//Zugriff auf CSS-Dateien
app.get("/css", function(req,res) {
    res.sendFile(__dirname + "/views/style.css");
});

//Zugriff auf images
app.use(express.static(__dirname + "/images"));

/*Post-Request Spenden 3 buttons
app.post("/spenden_3", function(req,res){
    res.sendFile(__dirname + "/views/spenden_4.html");
});
*/

//Post-Request Spenden 3 buttons
app.post("/spenden_3", function(req,res){
    const spendenbetrag = req.body.spendenbetrag;
    const dauer = req.body.dauer;

    res.render("spenden_4",{"spendenbetrag": spendenbetrag, "dauer":dauer});
    

})
