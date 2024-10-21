// Récupérer les images de l'API avec fetch
async function getCategories() {
    try {
    const response = await fetch(`${"http://localhost:5678/api"}/categories`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    for (let i = 0; i < json.length; i++) {
        setFilter(json[i]);
    }
    } catch (error) {
    console.error(error.message);
    }
}






