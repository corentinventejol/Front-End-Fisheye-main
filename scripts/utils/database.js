async function getPhotographerById(id) {
    const data = await fetch('../../data/photographers.json').then(response => response.json());
    const photographers = data.photographers;
    const photographer = photographers.find(photographer => photographer.id === id);
    return photographer;
}

async function getMediasByPhotographerId(id) {
    const data = await fetch('../../data/photographers.json').then(response => response.json());
    const currentPhotographerMedias = medias.filter(media => media.photographerId === id);
    return currentPhotographerMedias;
}

export default { getPhotographerById, getMediasByPhotographerId };