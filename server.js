//Spenden 1 (Übersicht)
//Umbenennen in Spendenübersicht?
app.get("/spenden_1", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_1.html");
});

//Spenden 2A (Erste Möglichkeit, Name anpassen!)
app.get("/spenden_2A", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_2A.html");
});

//Spenden 2B (Zweite Möglichkeit, Name anpassen!)
app.get("/spenden_2B", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_2B.html");
});

//Spenden 2C (Dritte Möglichkeit, Name anpassen!)
app.get("/spenden_2C", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_2C.html");
});

//Spenden 3 (Optionen und Belohnungen, Ankreuzen etc)
app.get("/spenden_3", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_3.html");
});

//Spenden 4 (Danke)
app.get("/spenden_4", function(req,res) {
    res.sendFile(__dirname + "/sites/spenden_4.html");
});


//Zugriff auf CSS-Dateien
app.get("/css", function(req,res) {
    res.sendFile(__dirname + "/sites/style.css");
});

//Zugriff auf images
app.use(express.static(__dirname + "/images"));




//Post-Request, vergleich User-Input mit Datenbank
/*eventuell weiteres mit registrierung anlegen - falls ein user zb. schon existiert?
app.post("/login", function(req,res){
    const benutzername = req.body.benutzername;
    const passwort = req.body.passwort;
    const row = db.prepare('select * from datenbank where benutzername = ?;').get(benutzername);
    //Wenn der eingegebene Benutzername nicht gefunden wird:
    if (row == undefined){
        return res.render("fehler",{"benutzername": benutzername});
    }
    //Wenn das eingegebene Passwort mit dem aus der Tabelle (und dem Benutzernamen) übereinstimmt:
    if(passwort == row.passwort){
        return res.render("ERFOLGREICH",{"benutzername": benutzername});
    }
    else{
        res.render("ERROR",{"benutzername": benutzername});
        } 
}) */
