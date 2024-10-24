//Recuperation du Works depuis l'API
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

function setFigure(data) {
    const figure = document.createElement("figure");
    figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
				<figcaption>${data.title}</figcaption>`

document.querySelector(".gallery").append(figure);
}

//Recuperation des categories depuis l'API
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

//creation des filtres
function setFilters(data) {
    const filters = document.createElement("div");
    filters.classList.add("filter");
    filters.dataset.cat = data.id;
    filters.innerHTML = `${data.name}`;
    filters.addEventListener("click", () => filterWorks(data.id));
document.querySelector(".filters").append(filters);
}

//Ajouter un événement de clic et filtres
const allButtom = document.querySelector(".all");
allButtom.addEventListener("click", () => getWorks());

function filterWorks(cat){
    console.log(cat)
}


