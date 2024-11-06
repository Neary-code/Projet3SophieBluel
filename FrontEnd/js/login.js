// URL de l'API
const loginApi = "http://localhost:5678/api/users/login";

document.querySelector("#log-in form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupère email et mot de passe
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validation des champs
    if (!email || !password) {
        showMessage("Veuillez remplir tous les champs.", "error");
        return;
    }

    // Création des données à envoyer sous forme d'objet
    const data = {
        email: email,
        password: password,
    };

    // Envoie de la requête POST avec fetch
    fetch(loginApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (!response.ok) {
            return response.json().then((errData) => {
                throw new Error(errData.message || "Erreur lors de la connexion");
            });
        }
        return response.json();
    })
    .then((data) => {
        // console.log(data) verif contenu de l'API
              // Vérifie si la connexion est réussie et si un jeton est renvoyé
            if (data.token) {
                // Stocke le jeton dans le localStorage
                localStorage.setItem("token", data.token);
    
                // Affiche un message de succès
                showMessage("Connexion réussie !", "success");
    
                // Redirige vers la page d'accueil avec un délai
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 1000);
            } else {
                showMessage("Erreur de connexion !", "error");
            }
        })
        .catch((error) => {
            showMessage(error.message, "error");
        });
    });

// Fonction pour afficher les messages
function showMessage(message, type) {
    let messageDiv = document.querySelector(".message");
    
    // Si aucun élément de message, on en crée un
    if (!messageDiv) {
        messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        document.querySelector("#log-in").appendChild(messageDiv);
    }

    // CSS
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
}
