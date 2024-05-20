import db from "../utils/database.js"
import phTemplate from '../templates/photographer.js';

const photographers = await db.getAllPhotographers();

const photographersSection = document.querySelector(".photographer_section");

photographers.forEach(photographer => {
    const cardPhotographer = phTemplate.photographerTemplate(photographer).getUserCardDOM()
    photographersSection.appendChild(cardPhotographer);
})




// async function getPhotographers() {
//     const response = await fetch('../data/photographers.json');
//     const data = await response.json();
//     return data;
// }

// async function displayData(photographers) {
//     const photographersSection = document.querySelector(".photographer_section");

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerTemplate(photographer);
//         const userCardDOM = photographerModel.getUserCardDOM();
//         photographersSection.appendChild(userCardDOM);
//     });
// }

// async function init() {
//     // Récupère les datas des photographes
//     const photographers = await getAllPhotographers();
//     displayData(photographers);
// }

// init();