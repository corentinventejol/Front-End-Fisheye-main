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
        const modalContainer = document.getElementById('lightbox_modal');
        const carousel = document.getElementById('carousel');
        carousel.innerHTML = ''; // Clear any existing content

        const item = document.createElement('div');
        item.classList.add('carousel-item', 'active');

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

        item.appendChild(mediaElement);
        carousel.appendChild(item);

        modalContainer.style.display = 'flex'; // Show the modal after its creation
    }

    // Show the media the user clicked on
    showMedia(currentIndex);

    // Close button functionality
    const closeButton = document.getElementById('close_button');
    closeButton.addEventListener('click', () => {
        const modalContainer = document.getElementById('lightbox_modal');
        modalContainer.style.display = 'none';
    });

    // Add event listeners for prev and next buttons
    const prevButton = document.getElementById('prev_button');
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        showMedia(currentIndex);
    });

    const nextButton = document.getElementById('next_button');
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        showMedia(currentIndex);
    });
}

export default createModalWithCarousel;
