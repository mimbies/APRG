//später: http://localhost:3000/startseite!
// FEHLT: Sessions, Cookies

//VOR Serverstart: npm install express, sqlite3, better-sqlite3, ejs, bcrypt, express-session


//Initialisierungen

const express = require("express");
const app = express();

const bcrypt = require('bcrypt');

//sessions, cookies
const session = require('express-session');
const timeout = 24 * 60 * 60 * 100;

app.use(session({
secret: 'example',
saveUninitialized: false,
resave: false,
cookie: {maxAge:timeout}
}));

app.use(express.urlencoded({extended: true}))

app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");



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
    if(req.session.authenticated == true){
    return res.redirect("/mein_account");
    }
    else {
        res.sendFile(__dirname + "/views/login.html");
    }
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

    let ma_benutzername = db.prepare("SELECT benutzername FROM benutzer WHERE benutzername")
    res.send(`

    <html> 
    <head>
        <!-- Titel der Internetseite-->
        <title>Hands & Paws</title>

         <!--CSS-Code in Extradatei-->
         <link rel="stylesheet" type="text/css" href="/css"/>

    </head>
    <body>

        <!--Navigationsbar und Überschrift -->
        <nav> 
            <div class="container">  
                
                <!--Logo-->
                <div class="logo"> 
                    <img src="logo2.png" alt="Logo">   
                </div> 
                
            <h1 class ="headline" >
            HANDS & PAWS 
            </h1>

                <div class="menu"> 
                    <a href="/startseite">Home</a>
                    <a href="/about">About</a>
                    <a href="/spenden_1">Spenden</a>
                    <a href="/kontakt" >Kontakt</a>
                    <a href="/mein_account" class="currently-active">mein Account</a>
                   
                </div>
             </div>
         </nav>
        
    <!--Startseite1 -->

    <div class="welcome-text"> 

        <h2>
             Mein Account

        <h3> <br>  </h3>
        
        <!--Textparagraph -->
        <p>
           <br>
            Benutzername: ${ma_benutzername}
            <br><a href="/sessionDelete" method="POST" >Ausloggen</a>  <br><span class="text-highlight2"></span>
        </p>

          
        </div>     
    </body>

</html> 

    `);
});

//Spenden 1 (Übersicht)
app.get("/spenden_1", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_1.html");
});

//Spenden 2A 
app.get("/spenden_2A", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_2A.html");
});

//Spenden 2B 
app.get("/spenden_2B", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_2B.html");
});

//Spenden 2C 
app.get("/spenden_2C", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_2C.html");
});

//Spenden 3 
app.get("/spenden_3", function(req,res) {

    if(req.session.authenticated == true){
        return res.sendFile(__dirname + "/views/spenden_3.html");
        }
        else{
            res.redirect("/login");
        }
});

//Spenden 4
app.get("/spenden_4", function(req,res) {
    res.sendFile(__dirname + "/views/spenden_4.html");
});


//Zugriff auf CSS-Dateien
app.get("/css", function(req,res) {
    res.sendFile(__dirname + "/views/style.css");
});

app.get("/css_about", function(req,res) {
    res.sendFile(__dirname + "/views/about_style.css");
});

app.get("/css_kontakt", function(req,res) {
    res.sendFile(__dirname + "/views/kontakt_style.css");
});


//Zugriff auf images
app.use(express.static(__dirname + "/images"));



//Post-Request Spenden 3 buttons
app.post("/spenden_3", function(req,res){
    const spendenbetrag = req.body.spendenbetrag;
    const dauer = req.body.dauer;

    res.render("spenden_4",{"spendenbetrag": spendenbetrag, "dauer":dauer});
    

});

//Ausloggen
app.get("/sessionDelete", function(req,res){
    req.session.destroy();
    res.redirect("/startseite");
    

});


//Post-Request,registrierung
app.post("/registrierung", function(req,res){
    const param_benutzername = req.body.benutzername;
    const param_passwort = req.body.passwort;
    const param_email = req.body.email;
    const param_passwortbestaetigung = req.body.passwortbestaetigung;
    if (param_passwort == param_passwortbestaetigung ) {
        rows = db.prepare("SELECT * FROM benutzer WHERE benutzername = ?").all(param_benutzername);
        if (rows.length == 0) {
            const hash = bcrypt.hashSync(param_passwort, 10);
            const info = db.prepare("INSERT INTO benutzer(benutzername, email, passwort) VALUES (?, ?, ?)").run(param_benutzername,param_email,hash);
            return res.render("erfolg");
        }

        else {
            res.render("fehlermeldung", {"failmessage": "Dieser Benutzer existiert schon."});

        };
    } else { 
        res.render("fehlermeldung", { 'failmessage': "Die Passwörter stimmen nicht überein." });

    }
    
    });

//Post-Request, login
app.post("/login", function(req,res){
    const param_benutzername = req.body.benutzername;
    const param_passwort = req.body.passwort;
    const rows = db.prepare("SELECT passwort FROM benutzer WHERE benutzername = ?").all(param_benutzername);
    if (rows && rows.length ==1) {
        const hash = rows[0].passwort;
        const isValid = bcrypt.compareSync(param_passwort, hash);
        if (isValid == true){
            req.session.authenticated = true;
            req.session.benutzername = param_benutzername;
            /*res.render("content", {"benutzername": param_benutzername});*/
            return res.render("startseite2",{"benutzername": param_benutzername});
        }
        else {
            res.render("fehlermeldung", {"failmessage": "Der Benutzername und das Passwort stimmen nicht überein.", "login" : "/login"});
        }
    }
    else {
        res.render("fehlermeldung", {"failmessage": "Dieser Benutzer existiert nicht."});
    }
});
