const API_URL = "http://localhost:5678/api"; // Centraliser l'URL de base//

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
document.querySelector(".gallery-modal").append(figure);
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
}

function filterWorks(cat) {
    console.log(cat)
}

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

// Fonction pour créer les éléments d'une œuvre//
function setFigure(data) {
    const figure = document.createElement("figure");
    figure.innerHTML = `<img src="${data.imageUrl}" alt="${data.title}">
                        <figcaption>${data.title}</figcaption>`;
    document.querySelector(".gallery").append(figure);

    }

    function displayAdminMode() {
        if (localStorage.getItem("token")) {
            const editBanner = document.createElement("div");
            editBanner.className = "edition-bar";
            editBanner.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>, <p class="js-modal">Mode édition</p>'
            
            document.body.prepend(editBanner);
        }
    }
    displayAdminMode();

    // function displayAdminMode() {
    //     if (localStorage.getItem("token")) {
    //         const modifyProjects = document.createElement("div");
    //         modifyProjects.className = "modifyProjects";
    //         modifyProjects.innerHTML = '<i class="fa-regular fa-pen-to-square" id="modify"></i><p>modifier</p>'
            
    //         document.body.prepend(modifyProjects);
    //     }
    // }
    // displayAdminMode();
    
    // <div class="modify-projetcs">
    // <i class="fa-regular fa-pen-to-square" id="modify"></i>
    // <p>modifier</p>
    // </div>

    //Modale//
    let modal = null
    const openModal = function (e) {
        e.preventDefault()
        const target = document.querySelector(e.target.getAttribute("href"))
        target.style.display = null
        target.removeAttribute("aria-hidden")
        target.setAttribute("aria-modal", "true")
        modal = target
        modal.addEvenListener("click", closeModal)
        modal.querySelector(".js-modal-close").addEvenListener("click", closeModal)
    }
    const closeModal = function (e) {
        if (modal === null) return
        e.preventDefault()
        modal.style.display = "none"
        modal.setAttribute("aria-hidden", "true")
        modal.removeAttribute("aria-modal")
        modal.removeEvenListener("click", closeModal)
        modal.querySelector(".js-modal-close").removeEvenListener("click", closeModal)
        modal = null
    }
    document.querySelectorAll(".js-modal").forEach((a) => {
        a.addEventListener("click", openModal);
    });