const express = require("express"); // Framework per creare il server HTTP
const body = require("body-parser"); //Middleware per analizzare i dati JSON nel body delle richieste
const sqlite3 = require("sqlite3").verbose(); // Libreria per interagire con SQLite
const cors = require("cors"); //Middleware per abilitare richieste cross-origin
const path = require("path");

const app = express(); // Crea un nuovo oggetto Express
// Configurazione CORS
const corsOptions = {
     origin: ["http://localhost:3000","http://127.0.0.1:5500"]
    };
app.use(cors(corsOptions));
app.use(body.json()); // Gestisce i dati JSON nel body delle richieste

// Creazione e Connessione al database SQLite con il perscorso assoluto
const dbPath = path.resolve(__dirname, "../db/database.db");
const db = new sqlite3.Database(dbPath, (err) => { 
    if (err) {
        console.error("Errore nella connessione al database", err.message);
        process.exit(1);
    }
    console.log("Connessione al database SQLite stabilita.");
});

// Creazione della tabella "utenti"
db.run(
    `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL
    )` ,
    (err) => {
        if (err) {
            console.error('Errore durante la creazione della tabella:', err.message);
        } else {
            console.log('Tabella "utenti" pronta.');
        }
    }
);

//Endpoint per la registrazione di un nuovo utente
app.post("/sign-up", (req, res) => {
    console.log("Richiesta ricevuta",req.body); //Stampa il body della richiesta
    const { email, name, password } = req.body; //Riceve l'email, il nome e la password dal body della richiesta

    //Query per inserire un nuovo utente nella tabella "utenti"
    const query = "INSERT INTO users (email, name, password) VALUES (?, ?, ?)";
    db.run(query, [email, name, password], function (err){
        if (err) {
            console.error("Errore nell\'inserimento dei dati:", err.message);
            return res.status(500).send('Errore nell\'inserimento dei dati');
        }
        res.status(200).send('Utente registrato correttamente');
    });

});

//Endpoint per il login di un utente
app.post("/log-in", (req, res) => {
    const { email, password } = req.body; //Riceve l'email e la password dal body della richiesta

    //Query per verificare se l'utente esiste nella tabella "utenti"
    const query = ` SELECT * FROM users WHERE email = ? AND password = ? `;
    db.get(query, [email, password], (err, row) => {
        if (err){
            console.error("Errore nella ricerca dell'utente:", err.message);
            return res.status(500).send('Errore del server');
        }
        if (row){
            // Se l'utente è trovato
            res.status(200).send('Login effettuato con successo');
        }
        else{
            // Se l'utente non viene trovato
            res.status(401).send('Utente non trovato');
        }
    });
});

//avvio il server
app.listen(3000, () => {
    console.log('Server in ascolto su http://localhost:3000');
});


