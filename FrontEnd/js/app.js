const url = "http://localhost:5678/api/works";

//Recuperation des categories depuis l'API
async function getWorks() {
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
}  catch (error) {
    console.error(error.message);
    }
}
getWorks();

//Recuperation des photos et titres
const figure1 = document.createElement("figure1");
figure1.innerHTML = `<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
				<figcaption>Abajour Tahina</figcaption>`
document.body.append(figure1);

const figure2 = document.createElement("figure2");
figure2.innerHTML = `<img src="assets/images/appartement-paris-v.png" alt="Appartement Paris V">
				<figcaption>Appartement Paris V</figcaption>`
document.body.append(figure2);

const figure3 = document.createElement("figure3");
figure3.innerHTML = `<img src="assets/images/restaurant-sushisen-londres.png" alt="Restaurant Sushisen - Londres">
				<figcaption>Restaurant Sushisen - Londres</figcaption>`
document.body.append(figure3);

const figure4 = document.createElement("figure4");
figure4.innerHTML = `<img src="assets/images/la-balisiere.png" alt="Villa “La Balisiere” - Port Louis">
				<figcaption>Villa “La Balisiere” - Port Louis</figcaption>`
document.body.append(figure4);

const figure5 = document.createElement("figure5");
figure5.innerHTML = `<img src="assets/images/structures-thermopolis.png" alt="Structures Thermopolis">
				<figcaption>Structures Thermopolis</figcaption>`
document.body.append(figure5);

const figure6 = document.createElement("figure6");
figure6.innerHTML = `<img src="assets/images/appartement-paris-x.png" alt="Appartement Paris X">
				<figcaption>Appartement Paris X</figcaption>`
document.body.append(figure6);

const figure7 = document.createElement("figure7");
figure7.innerHTML = `<img src="assets/images/le-coteau-cassis.png" alt="Pavillon “Le coteau” - Cassis">
				<figcaption>Pavillon “Le coteau” - Cassis</figcaption>`
document.body.append(figure7);

const figure8 = document.createElement("figure8");
figure8.innerHTML = `<img src="assets/images/villa-ferneze.png" alt="Villa Ferneze - Isola d’Elba">
				<figcaption>Villa Ferneze - Isola d’Elba</figcaption>`
document.body.append(figure8);

const figure9 = document.createElement("figure9");
figure9.innerHTML = `<img src="assets/images/appartement-paris-xviii.png" alt="Appartement Paris XVIII">
				<figcaption>Appartement Paris XVIII</figcaption>`
document.body.append(figure9);

const figure10 = document.createElement("figure10");
figure10.innerHTML = `<img src="assets/images/bar-lullaby-paris.png" alt="Bar “Lullaby” - Paris">
				<figcaption>Bar “Lullaby” - Paris</figcaption>`
document.body.append(figure10);

const figure11 = document.createElement("figure11");
figure11.innerHTML = `<img src="assets/images/hotel-first-arte-new-delhi.png" alt="Hotel First Arte - New Delhi">
				<figcaption>Hotel First Arte - New Delhi</figcaption>`
document.body.append(figure11);

