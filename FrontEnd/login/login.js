const loginApi = ""

// Quand on submit
form.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();
    console.log();

    // On récupère les deux champs et on affiche leur valeur
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("E-mail", email);
    console.log("Mot de passe", password);
});

async function handleSubmit () {
    let user = {
    email: "sophie.bluel@test.tld";
    password: "S0phie ";
}};

let response = await fetch(loginApi, {
    method = "POST";
    Header = {
        "content-type": "applcation/json";
    }
    body = JSON Stringify(user);
});

let result = await response.json();
console.log(result);


handleSubmit();

document.getElementById('loginForm').addEventListener('submit', => (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Valider les entrées
    if (!email || !password) {
        showMessage('Veuillez remplir tous les champs.', 'error');
        return;
    }

    // Créer un objet avec les données à envoyer
    const data = {
        email: email,
        password: password
    };

    // Envoyer les données via une requête POST
    fetch('loginApi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }
        return response.json();
    })
    .then(data => {
        // Traiter la réponse de l'API
        if (data.success) {
            showMessage('Connexion réussie !', 'success');
            // Rediriger vers la page d'accueil
            window.location.href = 'homepage.html';
        } else {
            showMessage(data.message || 'Erreur de connexion.', 'error');
        }
    })
    .catch(error => {
        showMessage(error.message, 'error');
    });
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = type; // Ajoute une classe pour le style (optionnel)
}