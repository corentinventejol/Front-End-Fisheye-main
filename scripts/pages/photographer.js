import database from '../utils/database.js';
import mediaCardTemplate from '../templates/mediaCard.js';
import { sortMedia } from '../utils/sorter.js';
import createModalWithCarousel from '../utils/lightBox.js'; 

async function displayPhotographer(id) {
    // Récupération du photographe
    const photographer = await database.getPhotographerById(id);
    const medias = await database.getMediasByPhotographerId(id);

    // Récupération des éléments du DOM de la bannière
    const photographerName = document.querySelector('#photographer-name');
    const photographerLocation = document.querySelector('#photographer-location');
    const photographerDescription = document.querySelector('#photographer-description');
    const photographerPicture = document.querySelector('#photographer-picture');

    // Récupération des éléments du DOM de l'encadré
    const photographerLikes = document.querySelector('#photographer-likes');
    const photographerPrice = document.querySelector('#photographer-price');

    // Récupération du conteneur des médias dans le DOM
    // const mediaContainer = document.querySelector('#media-container');

    // récuperation pour le modal de contact
    const contactModalName = document.querySelector('#contact_Modal_Name');

    // Affichage des informations de la bannière
    photographerName.textContent = photographer.name;
    photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
    photographerDescription.textContent = photographer.tagline;
    photographerPicture.src = `/assets/photographers/${photographer.portrait}`;
    photographerPicture.alt = photographer.name;

    // Affichage des informations de l'encadré
    photographerLikes.innerHTML = `${medias.reduce((totalLikes, media) => totalLikes + media.likes, 0)} <i class="fas fa-heart"></i>`;
    photographerPrice.textContent = photographer.price + "€ / jour";

    // Afficher les médias initialement triés par popularité
    const sortedMedia = sortMedia([...medias], 'popularité');
    displayMediaCards(sortedMedia, photographer.id);

    // Gérer le tri des médias
    document.getElementById('orderByTitle').addEventListener('change', (event) => {
        const sortedMedia = sortMedia([...medias], event.target.value);
        displayMediaCards(sortedMedia, photographer.id);
    });

    // Affichage du prénom dans la modal de contact
    contactModalName.textContent = photographer.name;
}

function displayMediaCards(medias, photographerId) {
    const mediaContainer = document.querySelector('#media-container');
    mediaContainer.innerHTML = ''; // Clear previous media cards

    medias.forEach(media => {
        const mediaCard = mediaCardTemplate(media).getMediaCardDOM();
        mediaContainer.appendChild(mediaCard);
        // Ajoutez un écouteur d'événements pour afficher le carrousel lorsque l'utilisateur clique sur une image ou une vidéo
        mediaCard.querySelector('span').addEventListener('click', () => {
            createModalWithCarousel(photographerId, media.image || media.video, media.image ? 'image' : 'video', media.title, document.getElementById('orderByTitle').value);
        });
    });
}

// Appel de la fonction displayPhotographer avec l'ID récupéré depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));
displayPhotographer(id);
