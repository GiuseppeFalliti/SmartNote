document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault(); // Previene l'invio predefinito del form

    //ottengo i dati dal form
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    //invio dei dati al server tramite fetch
    fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers:{
            "Content-Type": "application/json" //indica il tipo di dati che si sta inviando nel body della richiesta
        },
        body: JSON.stringify({
            email,
            name,
            password,
        }),
    }).then((response) =>{
        if (response.ok) {
            alert("Utente registrato correttamente");
            window.location.href = 'log-in.html'; //reindirizza alla pagina di login.
        } else {
            alert("Errore durante la registrazione");
        }
    }).catch((error) => {
        console.error('Errore durante la richiesta:', error);
        alert('Errore di connessione al server!');
    });
    
});