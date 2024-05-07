import database from '../utils/database.js'

// Récupérer l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));

// Récupération du photographe
const photographer = await database.getPhotographerById(id)
const medias = await database.getMediasByPhotographerId(id)

// Récupération des éléments du DOM de la bannière
const photographerName = document.querySelector('#photographer-name')
const photographerLocation = document.querySelector('#photographer-location')
const photographerDescription = document.querySelector('#photographer-description')
const photographerPicture = document.querySelector('#photographer-picture')

// Récupération des éléments du DOM de l'encadré
const photographerLikes = document.querySelector('#photographer-likes')
const photographerPrice = document.querySelector('#photographer-price')

// Affichage des informations de la bannière
photographerName.textContent = photographer.name
photographerLocation.textContent = `${photographer.city}, ${photographer.country}`
photographerDescription.textContent = photographer.tagline
photographerPicture.src = `/assets/photographers/${photographer.portrait}`
photographerPicture.alt = photographer.name

// Affichage des informations de l'encadré
photographerLikes.textContent = medias.likes + "♥"
photographerPrice.textContent = photographer.price + "€ / jour";

console.log(medias)