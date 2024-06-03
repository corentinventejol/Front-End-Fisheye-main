import database from "../utils/database.js";
import { sortMedia } from '../utils/sorter.js';

async function createModalWithCarousel(photographerId, mediaSrc, mediaType, altText, sortOption) {
    const medias = await database.getMediasByPhotographerId(photographerId);
    const sortedMedia = sortMedia([...medias], sortOption); // Trier les médias selon l'option de tri actuelle
    const mediaItems = sortedMedia.map(media => ({
        src: media.image || media.video,
        type: media.image ? 'image' : 'video',
        title: media.title
    }));

    let currentIndex = mediaItems.findIndex(media => media.src === mediaSrc && media.type === mediaType);

    function showMedia(index) {
        const modalContainer = document.getElementById('lightbox');
        const carousel = document.getElementById('lightbox_image');
        
        carousel.innerHTML = ''; // Clear any existing content

        let mediaElement;
        if (mediaItems[index].type === 'image') {
            mediaElement = document.createElement('img');
            mediaElement.src = `../../assets/images/${photographerId}/${mediaItems[index].src}`;
            mediaElement.alt = mediaItems[index].title;
        } else if (mediaItems[index].type === 'video') {
            mediaElement = document.createElement('video');
            mediaElement.src = `../../assets/images/${photographerId}/${mediaItems[index].src}`;
            mediaElement.controls = true;
            mediaElement.alt = mediaItems[index].title;
        }

        // Append media element to the carousel
        carousel.appendChild(mediaElement);

        // Create and append title element
        const titleElement = document.createElement('div');
        titleElement.classList.add('lightbox_title');
        titleElement.textContent = mediaItems[index].title;
        carousel.appendChild(titleElement);

        modalContainer.classList.add('active'); // Show the modal after its creation
    }

    // Show the media the user clicked on
    showMedia(currentIndex);

    // Close button functionality
    const closeButton = document.getElementById('lightbox_close');
    closeButton.addEventListener('click', () => {
        const modalContainer = document.getElementById('lightbox');
        modalContainer.classList.remove('active');
    });

    // Add event listeners for prev and next buttons
    const prevButton = document.getElementById('lightbox_prev');
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        showMedia(currentIndex);
    });

    const nextButton = document.getElementById('lightbox_next');
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        showMedia(currentIndex);
    });
}

export default createModalWithCarousel;
