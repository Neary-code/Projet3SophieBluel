const API_URL = "http://localhost:5678/api";   // URL de l'API

//Recuperation du Works depuis l'API
async function getWorks() {
    const url = "http://localhost:5678/api/works";
    try {
    const response = await fetch(url); // Requête API pour récupérer les œuvres
    if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json(); // Récupère la réponse au format JSON
    console.log(json);
    // console.log("Works fetched:", json);  // Débogage : Affiche les œuvres récupérées
    for(let i = 0; i < json.length; i++) {
    setFigure(json[i]); // Affiche chaque œuvre dans la galerie
    setFigureModal(json[i]); // Affiche chaque œuvre dans la modale
    }
}  catch (error) {
    console.error(error.message); // Affiche l'erreur si la requête échoue
    }
}
getWorks();

// Fonction pour afficher les œuvres dans la galerie
function setFigure(data) {
    const figure = document.createElement("figure");
    figure.setAttribute("data-id", data.id); // Ajoute un attribut data-id pour identifier chaque œuvre
    figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}> 
				<figcaption>${data.title}</figcaption>`;  // Affiche le titre de l'œuvre
document.querySelector(".gallery").append(figure); // Ajoute l'œuvre à la galerie principale
}

// Fonction pour afficher les œuvres dans la galerie modale
function setFigureModal(data) {
    const figure = document.createElement("figure")
    figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
    <i id=${data.id} class="fa-solid fa-trash-can overlay-icon"></i>`

    // Evénement pour supprimer une œuvre
    const deleteIcon = figure.querySelector(".overlay-icon");
    deleteIcon.addEventListener("click", () => deleteWork(data.id, figure));

document.querySelector(".modal-gallery").append(figure);
}

//Fonction pour supprimer une oeuvre//
async function deleteWork(workId, figureElement) {
    const token = localStorage.getItem("token"); // Récupère le token de l'utilisateur pour l'authentification
    const url = `http://localhost:5678/api/works/${workId}`; // URL de l'API pour suppression
    try {
        const response = await fetch(url, {
            method: "DELETE", // Méthode HTTP DELETE pour supprimer l'œuvre
            headers: {
                "Authorization": `Bearer ${token}`, // Ajout du token pour authentification
                "Content-Type": "application/json"
            }
        });
        
        if (response.ok) {
// Si la suppression est réussie, retirer l'élément de la galerie modale
            figureElement.remove(); // Supprime l'œuvre de la galerie modale
            console.log(`Work ${workId} deleted successfully`);
            
// Retirer l'élément correspondant dans la galerie principale
            const galleryFigure = document.querySelector(`.gallery [data-id='${workId}']`);
            if (galleryFigure) {
                galleryFigure.remove(); // Supprime également l'œuvre de la galerie principale
            }
        } else {
            throw new Error(`Failed to delete work with status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error deleting work:", error); // Affiche l'erreur en cas de problème
    }
}

//Recuperation des categories depuis l'API//
async function getCategories() {
    const url = "http://localhost:5678/api/categories"; // URL de l'API pour récupérer les catégories
    try {
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error(`Response status: ${response.status}`); // Vérifie si la réponse est OK
    }
    const json = await response.json(); // Récupère la réponse au format JSON
    // console.log("Categories fetched:", json);  // Débogage : Affiche les catégories récupérées
    console.log(json);
    for(let i = 0; i < json.length; i++) {
    setFilters(json[i]); // Crée un filtre pour chaque catégorie
    }
}  catch (error) {
    // console.error("Error fetching categories:", error.message);  // Affiche l'erreur en cas de problème
    }
}
getCategories();

// Fonction pour afficher les filtres de catégories
function setFilters(data) {
    const filters = document.createElement("div");
    filters.classList.add("filter");
    filters.dataset.cat = data.id; // Ajoute un attribut data-cat pour lier chaque filtre à une catégorie
    filters.innerHTML = `${data.name}`; // Affiche le nom de la catégorie
    filters.addEventListener("click", () => fetchAndFilterWorks(data.id)); // Filtre les œuvres par catégorie lorsqu'on clique
    document.querySelector(".filters").append(filters); // Ajoute le filtre à la barre des filtres
}

// Ajouter un événement de clic et filtre au bouton Tous
const buttonAll = document.querySelector(".all");
buttonAll.addEventListener("click", () => getWorks());

// Fonction pour récupérer et filtrer les œuvres par catégorie
async function fetchAndFilterWorks(cat) {
    const url = `${API_URL}/works`; // Récupère toutes les œuvres depuis l'API
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`); // Vérifie si la réponse est OK
        }
        const works = await response.json(); // Récupère les œuvres
        console.log("Toutes les œuvres :", works);

        // console.log("Œuvres récupérées depuis l'API :", works); // DEBUG : Affiche toutes les œuvres récupérées

        const filteredWorks = works.filter(work => work.categoryId === Number(cat)); // Filtre les œuvres par catégorie
        console.log("Œuvres filtrées :", filteredWorks);

        displayWorks(filteredWorks); // Affiche les œuvres filtrées
    } catch (error) {
        console.error(error.message); // Affiche l'erreur en cas de problème
    }
}

// Fonction pour afficher les œuvres dans la galerie//
function displayWorks(works) {
    clearGallery();  // Nettoie la galerie avant d'afficher les œuvres filtrées//
    works.forEach(work => setFigure(work));  // Ajoute chaque œuvre filtrée à la galerie//
}

// Fonction pour nettoyer la galerie avant chaque nouvel affichage//
function clearGallery() {
    document.querySelector(".gallery").innerHTML = "";  //Supprime toutes les œuvres actuellement affichées//
}

//Fonction pour afficher le mode admin
function displayAdminMode() {
    // Vérifie la présence du token
    const token = localStorage.getItem("token");
    // Afficher le mode admin et gérer le bouton login/logout
    const logButton = document.querySelector(".log-button"); // Récupère le bouton de connexion/déconnexion

    if (token) {
        // Supprime la barre de filtres//
        //console.log("Admin mode active");  // Débogage : Affiche que le mode admin est activé
        const filterBar = document.querySelector(".filters");
        if (filterBar) {
            filterBar.remove(); // En mode admin, on supprime la barre de filtres
        }

        // Affiche la barre d'édition
        const editBanner = document.querySelector(".edition-bar");
        if (editBanner) {
            editBanner.style.display = "flex";
        }

        // Affiche le bouton modifier
        const modifyProjects = document.querySelector(".modify-modal");
        if (modifyProjects) {
            modifyProjects.style.display = "flex";
        }

        // Change le bouton login en logout et ajoute un événement de déconnexion
        if (logButton) {
            logButton.textContent = "logout"; // Retire le lien de login
            logButton.addEventListener("click", logout); // Evénement de déconnexion
        }

    } else {
        // Masquer les éléments admin si déconnecté//
        //console.log("Admin mode inactive");  // Débogage : Affiche que le mode admin est désactivé
        const editBanner = document.querySelector(".edition-bar");
        if (editBanner) {
            editBanner.style.display = "none";
        }
        const modifyProjects = document.querySelector(".modify-modal");
        if (modifyProjects) {
            modifyProjects.style.display = "none";
        }

        // Remet le bouton à "login" si l'utilisateur est déconnecté
        if (logButton) {
            logButton.textContent = "login";
            logButton.setAttribute("href", "./login/login.html");
            logButton.removeEventListener("click", logout); // Evenement de déconnexion
        }
    }
}

//Fonction de deconnexion
function logout() {
    localStorage.removeItem("token"); // Retire le token du localStorage
    window.location.reload(); // Recharge la page pour mettre à jour l'affichage
}

// Affiche ou masque le mode admin après le chargement de la page
displayAdminMode();


 //Modale
let modal = null;

const openModal = function (targetId) {
    const target = document.getElementById(targetId); // Récupère la modale cible
    if (!target) return;
    target.style.display = "flex";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;

    modal.addEventListener("click", closeModal); // Ferme la modale en cliquant à l'extérieur

     // Ajout d'un stopPropagation pour le contenu de la modale
    const stopElements = modal.querySelectorAll(".js-modal-stop");
    stopElements.forEach((element) => {
        element.addEventListener("click", stopPropagation); // Empêche la fermeture si on clique à l'intérieur
    });

     // Ajout des événements pour la fermeture (croix) et le retour (flèche)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    const backButton = modal.querySelector(".js-back-modal1");
    if (backButton) {
        backButton.addEventListener("click", returnToModal1); // Retour à la première modale
    }
};

const closeModal = function () {
    if (modal === null) return;
    modal.style.display = "none"; // Ferme la modale
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");

    modal.removeEventListener("click", closeModal);

    const stopElements = modal.querySelectorAll(".js-modal-stop");
    stopElements.forEach((element) => {
        element.removeEventListener("click", stopPropagation); // Supprime l'écouteur d'événements
    });

    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    const backButton = modal.querySelector(".js-back-modal1");
    if (backButton) {
        backButton.removeEventListener("click", returnToModal1);
    }

    modal = null;
};

const returnToModal1 = function (e) {
    e.preventDefault();
     closeModal();  // Ferme la modale actuelle (modal2)
     openModal("modal1");  // Ouvre la première modale
};

const stopPropagation = function (e) {
    e.stopPropagation(); // Empêche la propagation du clic pour ne pas fermer la modale
};

 // Ouverture de la première modale (Galerie photo)
document.querySelector(".js-modal").addEventListener("click", function (e) {
    e.preventDefault();
    openModal("modal1"); // Retour à la première modale
});

 // Fermeture avec la touche Escape
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModal();
    }
});

 // Gestion du passage à la modale2 (Ajouter une photo)
const addPhotoButton = document.querySelector(".add-photo-button");
addPhotoButton.addEventListener("click", function (e) {
    e.preventDefault();
     closeModal();  // Ferme la première modale
     openModal("modal2");  // Ouvre la deuxième modale
});


// Ajouter une photo
const addPictureButton = document.querySelector(".add-picture-button");
const picture = document.getElementById("picture");
const addPictureModalContainer = document.querySelector(".add-picture-modal-2");

// Ouvrir l'explorateur de fichiers au clic sur le bouton "Ajouter photo"
addPictureButton.addEventListener("click", () => {
    picture.click();
});

// Afficher l'aperçu de l'image sélectionnée dans .add-picture-modal-2
picture.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            // Efface .add-picture-modal-2
            addPictureModalContainer.innerHTML = '';

            // Crée un nouvel élément <img> pour l'aperçu de l'image
            const imgPreview = document.createElement("img");
            imgPreview.src = e.target.result;
            imgPreview.alt = "Aperçu de l'image";
            imgPreview.id = "preview";

            // Ajoute l'image dans la div `.add-picture-modal-2`
            addPictureModalContainer.appendChild(imgPreview);
        };
        
        reader.readAsDataURL(file);

    } else {
alert("Veuillez selectionner une image au format JPEG ou PNG.");
    }
});

// Déclaration des variables
const titleInput = document.querySelector("#title");
const categoryInput = document.querySelector("#category");
const imageInput = document.querySelector("#picture");
const validationButton = document.querySelector(".validation-button");
const error = document.querySelector("#error");
const url = "http://localhost:5678/api/works";
const token = ("token")

// Fonction pour vérifier si tous les champs du formulaire sont remplis
function checkFormCompletion() {
    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const imageFile = imageInput.files[0];

    if (title && category && imageFile) {
        validationButton.classList.add("active"); // Change la couleur du bouton en vert
        validationButton.disabled = false;         // Active le bouton
    } else {
        validationButton.classList.remove("active"); // Restaure la couleur grise
        validationButton.disabled = true;            // Désactive le bouton
    }
}

// Ajouter les écouteurs d'événements aux champs pour vérifier le remplissage du formulaire
titleInput.addEventListener("input", checkFormCompletion);
categoryInput.addEventListener("change", checkFormCompletion);
imageInput.addEventListener("change", checkFormCompletion);

async function fetchCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    console.log(categories);
}
fetchCategories();


// Fonction pour réinitialiser le formulaire après une soumission réussie
function resetForm() {
    titleInput.value = "";
    categoryInput.value = "";
    imageInput.value = "";
    
    // Supprime l'aperçu de l'image
    addPictureModalContainer.innerHTML = '';
    
    // Désactive et remet le bouton de validation à l'état initial
    validationButton.classList.remove("active");
    validationButton.disabled = true;
}

// Fonction pour ajouter l'œuvre à la galerie et à la modale après une soumission réussie
function updateGallery(work) {
    // Ajoute l'œuvre à la galerie principale
    setFigure(work);

    // Ajoute l'œuvre à la galerie modale 1
    setFigureModal(work);
}

// Fonction pour afficher un message de confirmation
function showConfirmationMessage(message) {
    const messageElement = document.getElementById("confirmation-message");

    messageElement.textContent = message;

// Affiche le message
    messageElement.classList.remove("hidden");
    messageElement.classList.add("show");

// Masque le message après 3 secondes
    setTimeout(() => {
        messageElement.classList.remove("show");
        messageElement.classList.add("hidden");
    }, 3000);

}

// Fonction pour soumettre le formulaire
async function submitForm() {
    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const imageFile = imageInput.files[0];
    error.style.display = "none";

    if (!imageFile) {
        error.style.display = "block";
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", imageFile);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Formulaire soumis avec succès!", responseData);

            updateGallery(responseData);
            resetForm();
            closeModal();

            // Affiche un message de confirmation
            showConfirmationMessage("L'œuvre a été ajoutée avec succès !");
        } else {
            console.error("Erreur lors de l'envoi", response.status, await response.text());
        }
    } catch (error) {
        console.error("Erreur de requête:", error);
    }

}

// Appel de la fonction `submitForm` au clic sur le bouton "Valider"
validationButton.addEventListener("click", submitForm);





