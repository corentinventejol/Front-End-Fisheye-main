import db from "../utils/database.js"
import phTemplate from '../templates/photographer.js';

const photographers = await db.getAllPhotographers();

const photographersSection = document.querySelector(".photographer_section");

photographers.forEach(photographer => {
    const cardPhotographer = phTemplate.photographerTemplate(photographer).getUserCardDOM()
    photographersSection.appendChild(cardPhotographer);
})