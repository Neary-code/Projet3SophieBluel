const API_URL = "http://localhost:5678/api"; 

//Recuperation du Works depuis l'API//
async function getWorks() {
    const url = "http://localhost:5678/api/works";
    try {
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    for(let i = 0; i < json.length; i++) {
    setFigure(json[i]);
    setFigureModal(json[i]);
    }
}  catch (error) {
    console.error(error.message);
    }
}
getWorks();

//Affichage de la galerie//
function setFigure(data) {
    const figure = document.createElement("figure");
    figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
				<figcaption>${data.title}</figcaption>`
document.querySelector(".gallery").append(figure);
}

//Affichage de la galerie modale//
function setFigureModal(data) {
    const figure = document.createElement("figure")
    figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
    <i id=${data.id} class="fa-solid fa-trash-can overlay-icon"></i>`
document.querySelector(".modal-gallery").append(figure);
}

//Recuperation des categories depuis l'API//
async function getCategories() {
    const url = "http://localhost:5678/api/categories";
    try {
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    for(let i = 0; i < json.length; i++) {
    setFilters(json[i]);
    }
}  catch (error) {
    console.error(error.message);
    }
}
getCategories();

//creation des filtres//
function setFilters(data) {
    const filters = document.createElement("div");
    filters.classList.add("filter");
    filters.dataset.cat = data.id;
    filters.innerHTML = `${data.name}`;
    filters.addEventListener("click", () => filterWorks(data.id));
document.querySelector(".filters").append(filters);

function filterWorks(cat) {
    console.log(cat)
}}

//Ajouter un événement de clic et filtre au bouton Tous//
const buttonAll = document.querySelector(".all");
buttonAll.addEventListener("click", () => getWorks());

// Fonction pour filtrer les œuvres par catégorie//
async function filterWorks(cat) {
    const url = `${API_URL}/works`;  // Récupère toutes les œuvres depuis l'API//
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const works = await response.json();  // Récupère les œuvres
        const filteredWorks = works.filter(work => work.categoryId === cat);  // Filtre les œuvres par catégorie//
        displayWorks(filteredWorks);  // Affiche les œuvres filtrées//
    } catch (error) {
        console.error(error.message);
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

//Fonction pour afficher le mode admin//
function displayAdminMode() {
    // Vérifie la présence du token//
    const token = localStorage.getItem("token");
    if (token) {
        // Supprime la barre de filtres//
        const filterBar = document.querySelector(".filters");
        if (filterBar) {
            filterBar.remove();
        }

        // Affiche la barre d'édition//
        const editBanner = document.querySelector(".edition-bar");
        if (editBanner) {
            editBanner.style.display = "flex";
        }

        // Affiche le bouton modifier//
        const modifyProjects = document.querySelector(".modify-modal");
        if (modifyProjects) {
            modifyProjects.style.display = "flex";
        }
    } else {
        // Masquer les éléments admin si déconnecté//
        const editBanner = document.querySelector(".edition-bar");
        if (editBanner) {
            editBanner.style.display = "none";
        }
        const modifyProjects = document.querySelector(".modify-modal");
        if (modifyProjects) {
            modifyProjects.style.display = "none";
        }
    }
}

//Fonction de deconnexion
function logout() {
    localStorage.removeItem("token");
    window.location.reload(); // Recharge la page pour mettre à jour l'affichage
}

// Appel de la fonction après le chargement de la page//
displayAdminMode();


 //Modale//
let modal = null;

const openModal = function (targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.style.display = "flex";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;

    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
};

const closeModal = function () {
    if (modal === null) return;
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");

    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
};

const stopPropagation = function (e) {
    e.stopPropagation();
};

 // Ouverture de la première modale (Galerie photo)
document.querySelector(".js-modal").addEventListener("click", function (e) {
    e.preventDefault();
    openModal("modal1");
});

 // Fermeture avec la touche Escape
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModal();
    }
});

 // Gestion du passage à la deuxième modale (Ajouter une photo)
const addPhotoButton = document.querySelector(".add-photo-button");
addPhotoButton.addEventListener("click", function (e) {
    e.preventDefault();
     closeModal();  // Ferme la première modale
     openModal("modal2");  // Ouvre la deuxième modale
});

 // Bouton retour dans la deuxième modale
document.querySelector("#modal2 #arrow").addEventListener("click", function (e) {
    e.preventDefault();
     closeModal();  // Ferme la deuxième modale
     openModal("modal1");  // Rouvre la première modale
});
