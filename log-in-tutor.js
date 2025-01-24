document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault(); // Previene l'invio predefinito del form

    //ottengo i dati dal form
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //invio dei dati al server tramite fetch per la verifica del login
    fetch("http://localhost:3000/log-in-tutor", {
        method: "POST",
        headers:{
            "Content-Type": "application/json" //indica il tipo di dati che si sta inviando nel body della richiesta
        },
        body: JSON.stringify({
            email,
            password,
        }),
    }).then((response) => {
        if (response.ok) {
            alert("Login effettuato con successo");
            window.location.href = "AreaTutor.html"; //reindirizza alla pagina privata dei tutor.
        } else {
            alert("Errore durante il login");
        }
    }).catch((error) => {
        console.error('Errore durante la richiesta:', error);
        alert('Errore di connessione al server!');
    });
});