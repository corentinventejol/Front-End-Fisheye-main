import database from "../utils/database.js";

async function createModalWithCarousel(photographerId, mediaSrc, mediaType, altText) {
    const medias = await database.getMediasByPhotographerId(photographerId);
    const mediaItems = medias.map(media => ({
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

        carousel.appendChild(mediaElement);

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
